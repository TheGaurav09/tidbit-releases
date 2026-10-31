"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type CloudShaderProps = {
  className?: string;
  children?: React.ReactNode;
  /** Animation speed multiplier. 1 = default drift. */
  speed?: number;
  /** Number of clouds (1-6). */
  count?: number;
  /** Cloud tint color (hex or rgb string). */
  cloudColor?: string;
  /** Sky color at the top (hex or rgb string). */
  skyTopColor?: string;
  /** Sky color at the bottom (hex or rgb string). */
  skyBottomColor?: string;
};

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Optimized cloud shader with high precision check and compact clouds
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;

uniform vec2 u_res;
uniform float u_time;
uniform float u_count;
uniform vec3 u_cloud;
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;

vec2 rot(vec2 p) {
  return vec2(p.x * 0.80 + p.y * 0.60, -p.x * 0.60 + p.y * 0.80);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.31, 289.17))) * 26737.367);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = rot(p * 2.03) + 19.19;
    amp *= 0.5;
  }
  return sum;
}

// billow noise: sharp puffy ridges, like cauliflower cloud tops
float billow(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * (1.0 - abs(2.0 * vnoise(p) - 1.0));
    p = rot(p * 2.11) + 13.37;
    amp *= 0.5;
  }
  return sum;
}

// raw density for one cloud at point p
float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t) {
  vec2 q = p - c;

  // envelope: dome above the center, flat base below
  float ry = q.y > 0.0 ? r.y : r.y * 0.42;
  float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));
  if (env < -0.35) return 0.0;

  // domain-warped billow detail, moves with the cloud, evolves slowly
  vec2 dp = q * (2.4 / r.x) + seed;
  dp += 0.6 * vec2(
    fbm(dp * 1.4 + t * 0.04),
    fbm(dp * 1.4 + 7.7 - t * 0.03)
  );
  float detail = billow(dp * 1.6);

  return env + (detail - 0.62) * 0.62;
}

// shades one cloud and blends it over the current color
vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist) {
  // Ultra-fast bounding-box rejection to skip expensive noise on clear sky
  vec2 q = p - c;
  if (abs(q.x) > r.x * 1.35 || q.y > r.y * 1.35 || q.y < -r.y * 0.65) {
    return color;
  }

  float d = cloudDensity(p, c, r, seed, t);
  if (d < 0.02) return color;

  // sample density toward the sun (straight up) for self-shadowing
  float dUp = cloudDensity(p + vec2(0.0, r.y * 0.55), c, r, seed, t);
  float occl = clamp((dUp - d) * 1.1 + d * 0.55, 0.0, 1.0);

  vec3 lit = u_cloud * 1.04;
  vec3 shadow = mix(u_cloud * 0.60, sky, 0.38);
  vec3 cloudCol = mix(lit, shadow, occl * 0.85);

  float alpha = smoothstep(0.02, 0.38, d);

  // silver lining on thin edges
  float rim = smoothstep(0.02, 0.14, d) * (1.0 - smoothstep(0.14, 0.40, d));
  cloudCol += rim * 0.10;

  // atmospheric perspective: far clouds fade into the sky
  cloudCol = mix(cloudCol, sky, dist * 0.35);
  alpha *= mix(1.0, 0.8, dist);

  return mix(color, cloudCol, alpha);
}

// one drifting cloud: horizontal wrap + gentle vertical bob
vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t,
               float spd, float phase, float y, vec2 r, float seed, float dist) {
  float cx = mix(-r.x - 0.25, aspect + r.x + 0.25, fract(t * spd + phase));
  float cy = y + sin(t * 0.05 + phase * 6.2831) * 0.012;
  return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(v_uv.x * aspect, v_uv.y);
  float t = u_time;

  vec3 sky = mix(u_skyBottom, u_skyTop, v_uv.y);
  vec3 color = sky;

  // faint haze band near the horizon
  color = mix(color, u_skyBottom * 1.06, smoothstep(0.35, 0.0, v_uv.y) * 0.5);

  // soft sun glow, upper area
  vec2 sunPos = vec2(aspect * 0.78, 0.92);
  float sunDist = length(p - sunPos);
  color += vec3(1.0, 0.95, 0.82) * exp(-sunDist * sunDist * 5.0) * 0.28;

  // thin cirrus streaks, stretched horizontally, high in the sky
  float cirrusBand = smoothstep(0.55, 0.8, v_uv.y) * (1.0 - smoothstep(0.9, 1.0, v_uv.y));
  if (cirrusBand > 0.01) {
    float streak = fbm(vec2(p.x * 1.6 - t * 0.006, p.y * 12.0));
    float wisp = smoothstep(0.52, 0.78, streak) * cirrusBand;
    color = mix(color, u_cloud * 0.98, wisp * 0.35);
  }

  // Far layer (reduced, delicate)
  if (u_count > 5.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.006, 0.10, 0.84, vec2(0.14, 0.07), 43.7, 1.0);
  }
  if (u_count > 4.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.008, 0.62, 0.73, vec2(0.16, 0.08), 71.3, 0.85);
  }

  // Middle layer (compact, fluffy)
  if (u_count > 3.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.011, 0.33, 0.60, vec2(0.22, 0.11), 17.3, 0.55);
  }
  if (u_count > 2.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.013, 0.80, 0.47, vec2(0.20, 0.10), 29.9, 0.45);
  }

  // Near layer (scaled down ~40% for cleaner presentation)
  if (u_count > 1.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.016, 0.05, 0.35, vec2(0.30, 0.14), 91.1, 0.15);
  }
  color = cloudPass(color, sky, p, aspect, t, 0.020, 0.48, 0.20, vec2(0.36, 0.16), 57.2, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function parseHex(color: string): [number, number, number] {
  const value = color.trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const rgb = value.match(/[\d.]+/g);
  if (rgb && rgb.length >= 3) {
    return [Number(rgb[0]) / 255, Number(rgb[1]) / 255, Number(rgb[2]) / 255];
  }
  return [1.0, 1.0, 1.0];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const CloudShader = ({
  className,
  children,
  speed = 1,
  count = 6,
  cloudColor = "#ffffff",
  skyTopColor = "#183761",
  skyBottomColor = "#2d6cb5",
}: CloudShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef({
    speed,
    count,
    cloudColor,
    skyTopColor,
    skyBottomColor,
  });

  paramsRef.current = {
    speed,
    count,
    cloudColor,
    skyTopColor,
    skyBottomColor,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let vert: WebGLShader | null = null;
    let frag: WebGLShader | null = null;
    let frame = 0;
    let running = true;
    let isVisible = true;
    let hasRenderedFirstFrame = false;
    const start = performance.now();

    const loc: {
      res?: WebGLUniformLocation | null;
      time?: WebGLUniformLocation | null;
      count?: WebGLUniformLocation | null;
      cloud?: WebGLUniformLocation | null;
      skyTop?: WebGLUniformLocation | null;
      skyBottom?: WebGLUniformLocation | null;
    } = {};

    const initGL = () => {
      try {
        // Crucial: alpha: true ensures canvas never renders an opaque white box if context resets
        gl =
          (canvas.getContext("webgl", {
            alpha: true,
            antialias: false,
            premultipliedAlpha: false,
            powerPreference: "high-performance",
          }) as WebGLRenderingContext | null) ||
          (canvas.getContext("experimental-webgl", {
            alpha: true,
          }) as WebGLRenderingContext | null);
      } catch (e) {
        console.warn("WebGL initialization failed:", e);
        return false;
      }

      if (!gl || gl.isContextLost()) return false;

      vert = compile(gl, gl.VERTEX_SHADER, VERT);
      frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vert || !frag) return false;

      program = gl.createProgram();
      if (!program) return false;

      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.bindAttribLocation(program, 0, "a_pos");
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("Program link error:", gl.getProgramInfoLog(program));
        return false;
      }

      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      loc.res = gl.getUniformLocation(program, "u_res");
      loc.time = gl.getUniformLocation(program, "u_time");
      loc.count = gl.getUniformLocation(program, "u_count");
      loc.cloud = gl.getUniformLocation(program, "u_cloud");
      loc.skyTop = gl.getUniformLocation(program, "u_skyTop");
      loc.skyBottom = gl.getUniformLocation(program, "u_skyBottom");

      return true;
    };

    const success = initGL();
    if (!success) {
      // Graceful fallback: canvas stays opacity 0, container gradient displays perfectly
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      if (!canvas || !gl || gl.isContextLost()) return;
      // High-performance soft resolution: 0.7 DPR cap (max 960px width)
      // Drastically reduces GPU fillrate by ~75% while bilinear texture filtering creates silky soft clouds
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0) * 0.7;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || 500;
      const w = Math.min(960, Math.max(1, Math.floor(width * dpr)));
      const h = Math.min(540, Math.max(1, Math.floor(height * dpr)));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      if (loc.res) {
        gl.uniform2f(loc.res, w, h);
      }
    };

    let lastDrawTime = 0;
    const draw = (now: number) => {
      if (!running || !isVisible || !gl || gl.isContextLost()) return;

      // Throttle shader updates to ~36 FPS (27ms).
      // Atmospheric cloud drift is slow and continuous, so 36 FPS is indistinguishable
      // but frees up 100% of GPU pipelines for 60-120fps scrolling and instant UI interactions
      if (now - lastDrawTime < 27) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = now;

      const p = paramsRef.current;
      const elapsed = reduceMotion ? 0 : ((now - start) / 1000) * p.speed;
      const cloud = parseHex(p.cloudColor);
      const skyTop = parseHex(p.skyTopColor);
      const skyBottom = parseHex(p.skyBottomColor);

      if (loc.time) gl.uniform1f(loc.time, elapsed);
      if (loc.count) gl.uniform1f(loc.count, Math.min(6, Math.max(1, p.count)));
      if (loc.cloud) gl.uniform3f(loc.cloud, cloud[0], cloud[1], cloud[2]);
      if (loc.skyTop) gl.uniform3f(loc.skyTop, skyTop[0], skyTop[1], skyTop[2]);
      if (loc.skyBottom) gl.uniform3f(loc.skyBottom, skyBottom[0], skyBottom[1], skyBottom[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!hasRenderedFirstFrame) {
        hasRenderedFirstFrame = true;
        // Fade in canvas smoothly only after first frame renders successfully
        canvas.style.opacity = "1";
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());

    // Context loss handler: prevents Chrome from rendering the native dead icon '[x]'
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(frame);
      if (canvas) canvas.style.opacity = "0";
    };

    // Context restored handler: re-initializes WebGL once browser restores resources
    const handleContextRestored = () => {
      running = true;
      if (initGL()) {
        resize();
        draw(performance.now());
      }
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && running) {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(draw);
          }
        });
      },
      { threshold: 0.02 },
    );
    visibilityObserver.observe(canvas);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        isVisible = true;
        if (running) {
          cancelAnimationFrame(frame);
          draw(performance.now());
          frame = requestAnimationFrame(draw);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (gl && !gl.isContextLost()) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        if (vert) gl.deleteShader(vert);
        if (frag) gl.deleteShader(frag);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full min-h-80 w-full overflow-hidden",
        className,
      )}
      style={{
        background: `linear-gradient(180deg, ${skyTopColor} 0%, #1c4578 50%, ${skyBottomColor} 100%)`,
      }}
    >
      {/* Soft CSS cloud drift backdrop guaranteed visible even during WebGL loading/fallback */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background: `
            radial-gradient(ellipse 45% 25% at 20% 40%, rgba(255,255,255,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 55% 30% at 75% 65%, rgba(255,255,255,0.2) 0%, transparent 70%),
            radial-gradient(ellipse 40% 20% at 50% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />
      {/* Canvas defaults to opacity: 0 and fades in smoothly once WebGL draws its first valid frame */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          opacity: 0,
          transition: "opacity 0.6s ease-out",
        }}
      />
      {children ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
};
