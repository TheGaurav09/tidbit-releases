/**
 * Bud Mascot — Official 3D Clay Companion for TidBit
 * Rendered with vector SVG & dynamic eye physics, cursor tracking, and moods.
 * Faithfully mirrors BudMascot.kt.
 */

class BudMascotRenderer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.mood = options.mood || 'Classic';
    this.size = options.size || 220;
    this.interactive = options.interactive !== false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pupilX = 0;
    this.pupilY = 0;
    this.targetPupilX = 0;
    this.targetPupilY = 0;
    this.isBlinking = false;

    this.init();
  }

  init() {
    this.renderSVG();
    this.bindEvents();
    this.startBlinkLoop();
    this.startEyePhysics();
  }

  setMood(newMood) {
    this.mood = newMood;
    this.updateEyeShapes();
  }

  renderSVG() {
    this.container.innerHTML = `
      <div class="bud-mascot-wrapper" style="width: ${this.size}px; height: ${this.size}px; position: relative; margin: 0 auto; user-select: none;">
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="overflow: visible;" class="bud-svg">
          <defs>
            <!-- Ambient Contact Shadow -->
            <radialGradient id="budShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#2457D6" stop-opacity="0.35"/>
              <stop offset="50%" stop-color="#15171B" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            <!-- Book Back Cover Depth Gradient -->
            <linearGradient id="budBackCover" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#2E2880"/>
              <stop offset="45%" stop-color="#4E42D4"/>
              <stop offset="85%" stop-color="#7680F8"/>
              <stop offset="100%" stop-color="#93C5FD"/>
            </linearGradient>

            <!-- Recessed Page Stack U-Channel -->
            <linearGradient id="budPageStack" x1="10%" y1="100%" x2="90%" y2="0%">
              <stop offset="0%" stop-color="#BAE6FD"/>
              <stop offset="60%" stop-color="#EFF6FF"/>
              <stop offset="100%" stop-color="#FFFFFF"/>
            </linearGradient>

            <!-- Swallowtail Bookmark Ribbon -->
            <linearGradient id="budRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F472B6"/>
              <stop offset="40%" stop-color="#C084FC"/>
              <stop offset="75%" stop-color="#67E8F9"/>
              <stop offset="100%" stop-color="#38BDF8"/>
            </linearGradient>

            <!-- Plump Clay Body Main Gradient -->
            <linearGradient id="budClayBody" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stop-color="#4E42D4"/>
              <stop offset="45%" stop-color="#3B32A8"/>
              <stop offset="85%" stop-color="#221C6E"/>
              <stop offset="100%" stop-color="#18134F"/>
            </linearGradient>

            <!-- Clay Specular Top Highlight -->
            <linearGradient id="budSpecular" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55"/>
              <stop offset="50%" stop-color="#93C5FD" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </linearGradient>

            <!-- Subsurface Cyan Cheek Scatter -->
            <radialGradient id="budCyanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.45"/>
              <stop offset="70%" stop-color="#38BDF8" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- 1. Ambient Contact Shadow -->
          <ellipse cx="260" cy="405" rx="100" ry="24" fill="url(#budShadow)" class="bud-shadow-element" />

          <!-- Bud Floater Group (Continuous Hover Animation) -->
          <g class="bud-floater" transform="translate(0, 0)">
            <!-- 2. Back Cover Upper Lip -->
            <path d="M152 190 C152 155 170 141 201 131 L276 109 C295 103 307 112 309 132 L297 150 L179 188 Z" fill="url(#budBackCover)"/>

            <!-- 3. Recessed White Page Stack -->
            <path d="M185 172 C181 162 192 151 210 145 L289 121 C308 115 329 125 333 144 L322 159 L211 188 Z" fill="url(#budPageStack)"/>

            <!-- 4. Swallowtail Bookmark Ribbon -->
            <path d="M243 352 L246 399 C246.5 407 250.5 408 255 402 L262.5 392.5 L266.8 392.5 L274 399 C278.5 403 281.5 400 281 392 L276 348 Z" fill="url(#budRibbon)"/>

            <!-- 5. Plump 3D Clay Book Shell -->
            <path d="M152 188 C152 156 172 148 195 158 C204 162 211 172 220 174 C231 176 300 151 322 145 C342 139 355 154 356 181 C358 221 356 272 349 312 C345 337 330 347 306 354 C279 362 248 369 226 371 C210 373 201 367 195 358 C185 359 171 354 162 340 C153 327 150 299 150 258 Z" fill="url(#budClayBody)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>

            <!-- Clay Top Edge Specular Rim -->
            <path d="M165 175 C185 152 230 156 315 146 C335 143 346 150 350 168" fill="none" stroke="url(#budSpecular)" stroke-width="4" stroke-linecap="round"/>

            <!-- Subsurface Glow Accent (Cheek) -->
            <ellipse cx="190" cy="270" rx="35" ry="30" fill="url(#budCyanGlow)"/>
            <ellipse cx="310" cy="250" rx="35" ry="30" fill="url(#budCyanGlow)"/>

            <!-- 6. Parametric Expressive Clay Eyes -->
            <g id="budEyesGroup">
              <!-- Left Eye -->
              <g id="budLeftEye" transform="translate(208, 240)">
                <ellipse cx="0" cy="0" rx="14" ry="20" fill="#FFFFFF" class="eye-sclera left-sclera"/>
                <ellipse cx="0" cy="0" rx="7.5" ry="11" fill="#111827" class="eye-pupil left-pupil"/>
                <circle cx="-3" cy="-4" r="3.2" fill="#FFFFFF" class="eye-catchlight"/>
              </g>

              <!-- Right Eye -->
              <g id="budRightEye" transform="translate(282, 226)">
                <ellipse cx="0" cy="0" rx="14" ry="20" fill="#FFFFFF" class="eye-sclera right-sclera"/>
                <ellipse cx="0" cy="0" rx="7.5" ry="11" fill="#111827" class="eye-pupil right-pupil"/>
                <circle cx="-3" cy="-4" r="3.2" fill="#FFFFFF" class="eye-catchlight"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
    `;

    this.floater = this.container.querySelector('.bud-floater');
    this.leftEye = this.container.querySelector('#budLeftEye');
    this.rightEye = this.container.querySelector('#budRightEye');
    this.leftPupil = this.container.querySelector('.left-pupil');
    this.rightPupil = this.container.querySelector('.right-pupil');
    this.leftSclera = this.container.querySelector('.left-sclera');
    this.rightSclera = this.container.querySelector('.right-sclera');

    this.updateEyeShapes();
  }

  updateEyeShapes() {
    if (!this.leftEye || !this.rightEye) return;

    // Reset scales
    this.leftEye.style.transform = `translate(208px, 240px)`;
    this.rightEye.style.transform = `translate(282px, 226px)`;
    this.leftSclera.setAttribute('rx', '14');
    this.leftSclera.setAttribute('ry', '20');
    this.rightSclera.setAttribute('rx', '14');
    this.rightSclera.setAttribute('ry', '20');

    if (this.mood === 'Happy') {
      // Crescent happy eyes (^ ^)
      this.leftSclera.setAttribute('ry', '10');
      this.rightSclera.setAttribute('ry', '10');
      this.leftPupil.setAttribute('ry', '5');
      this.rightPupil.setAttribute('ry', '5');
    } else if (this.mood === 'Wink') {
      // Right eye winks shut
      this.rightSclera.setAttribute('ry', '2.5');
      this.rightPupil.setAttribute('ry', '1');
      this.leftSclera.setAttribute('rx', '15');
      this.leftSclera.setAttribute('ry', '22');
    } else if (this.mood === 'Surprised') {
      // Wide open eyes
      this.leftSclera.setAttribute('rx', '18');
      this.leftSclera.setAttribute('ry', '25');
      this.rightSclera.setAttribute('rx', '18');
      this.rightSclera.setAttribute('ry', '25');
    } else if (this.mood === 'Curious') {
      // One eyebrow / eye raised higher
      this.leftEye.style.transform = `translate(208px, 245px)`;
      this.rightEye.style.transform = `translate(282px, 218px)`;
    }
  }

  startBlinkLoop() {
    const triggerBlink = () => {
      if (this.mood === 'Wink') {
        setTimeout(triggerBlink, 3000);
        return;
      }

      this.isBlinking = true;
      if (this.leftSclera && this.rightSclera) {
        this.leftSclera.style.transform = 'scaleY(0.1)';
        this.rightSclera.style.transform = 'scaleY(0.1)';
        this.leftSclera.style.transformOrigin = 'center';
        this.rightSclera.style.transformOrigin = 'center';
        this.leftSclera.style.transition = 'transform 90ms ease-in';
        this.rightSclera.style.transition = 'transform 90ms ease-in';
      }

      setTimeout(() => {
        if (this.leftSclera && this.rightSclera) {
          this.leftSclera.style.transform = 'scaleY(1)';
          this.rightSclera.style.transform = 'scaleY(1)';
          this.leftSclera.style.transition = 'transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1)';
          this.rightSclera.style.transition = 'transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        this.isBlinking = false;
        setTimeout(triggerBlink, 2800 + Math.random() * 2500);
      }, 110);
    };

    setTimeout(triggerBlink, 2000);
  }

  startEyePhysics() {
    const loop = () => {
      // Smooth interpolation towards cursor target
      this.pupilX += (this.targetPupilX - this.pupilX) * 0.12;
      this.pupilY += (this.targetPupilY - this.pupilY) * 0.12;

      if (this.leftPupil && this.rightPupil) {
        this.leftPupil.setAttribute('cx', this.pupilX.toFixed(2));
        this.leftPupil.setAttribute('cy', this.pupilY.toFixed(2));
        this.rightPupil.setAttribute('cx', this.pupilX.toFixed(2));
        this.rightPupil.setAttribute('cy', this.pupilY.toFixed(2));
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  bindEvents() {
    if (!this.interactive) return;

    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp pupil movement to natural eye socket range (-6px to +6px)
      this.targetPupilX = Math.max(-6, Math.min(6, deltaX * 6));
      this.targetPupilY = Math.max(-6, Math.min(6, deltaY * 6));
    });

    // Bounce on click
    this.container.addEventListener('click', () => {
      const svg = this.container.querySelector('.bud-svg');
      if (svg) {
        svg.animate([
          { transform: 'scale(1, 1)' },
          { transform: 'scale(1.12, 0.88)' },
          { transform: 'scale(0.94, 1.06)' },
          { transform: 'scale(1.02, 0.98)' },
          { transform: 'scale(1, 1)' }
        ], {
          duration: 480,
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
      }
    });
  }
}

// Export to window
window.BudMascotRenderer = BudMascotRenderer;

