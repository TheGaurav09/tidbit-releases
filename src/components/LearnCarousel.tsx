import React, { useState, useEffect, useRef, useCallback } from "react";

export function LearnCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- Interactive State for Card 0 (Learn from real posts) ---
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);

  // --- Interactive State for Card 1 (Ask Bud) ---
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [askText, setAskText] = useState("Ask anything…");

  // --- Interactive State for Card 2 (Play games) ---
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [mindfulActive, setMindfulActive] = useState(false);

  // --- Interactive State for Card 3 (Notes) ---
  const [notesFilter, setNotesFilter] = useState<"all" | "imp" | "todo">("all");
  const [tasksDone, setTasksDone] = useState<boolean[]>([true, false, false]);
  const [toastActive, setToastActive] = useState(true);

  // Study tasks list
  const studyTasks = [
    "Photosynthesis recap",
    "Practice 5 flashcards",
  ];

  // --- Interactive State for Card 4 (Read or Listen) ---
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPos, setAudioPos] = useState(40);
  const audioTotal = 162;

  // --- Interactive State for Card 5 (Chat) ---
  const [chatInput, setChatInput] = useState("");
  const [isVanishing, setIsVanishing] = useState(false);

  // Audio timer ticker
  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setAudioPos((prev) => {
        if (prev >= audioTotal) {
          setIsPlayingAudio(false);
          return audioTotal;
        }
        return prev + 0.5;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const formatAudioTime = (sec: number) => {
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m < 10 ? "0" + m : m}:${r < 10 ? "0" + r : r}`;
  };

  // Drag and touch gesture state without re-rendering component on every pixel move
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const isDirectionLocked = useRef<"horizontal" | "vertical" | null>(null);
  const hasMoved = useRef(false);
  const dragDeltaX = useRef(0);
  const rafId = useRef<number | null>(null);

  const cardCount = 6;

  // Track active user interaction to pause auto-advance
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionCooldown = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notifyUserActivity = useCallback(() => {
    setIsInteracting(true);
    if (interactionCooldown.current) {
      clearTimeout(interactionCooldown.current);
    }
    // Pause auto-rotation for 14 seconds when user clicks, toggles, or types anything
    interactionCooldown.current = setTimeout(() => {
      setIsInteracting(false);
    }, 14000);
  }, []);

  useEffect(() => {
    return () => {
      if (interactionCooldown.current) clearTimeout(interactionCooldown.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Auto-advance: Strictly halted whenever user hovers, touches, interacts, or plays audio
  useEffect(() => {
    if (isPaused || isInteracting || isPlayingAudio) return;
    const timer = setInterval(() => {
      if (!isDragging.current) {
        setActiveIdx((prev) => (prev + 1) % cardCount);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isInteracting, isPlayingAudio]);

  // Center active card calculation
  const updateTransform = useCallback(
    (offset = 0) => {
      if (!stageRef.current || !trackRef.current) return;
      const stageW = stageRef.current.clientWidth;
      const cardNodes = trackRef.current.children;
      if (!cardNodes[activeIdx]) return;
      const card = cardNodes[activeIdx] as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const targetX = stageW / 2 - cardCenter + offset;
      trackRef.current.style.transform = `translate3d(${targetX}px, 0, 0)`;
    },
    [activeIdx]
  );

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.5s cubic-bezier(0.22, 0.8, 0.2, 1)";
    }
    updateTransform(0);
  }, [activeIdx, updateTransform]);

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) trackRef.current.style.transition = "none";
      updateTransform(0);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && stageRef.current) {
      ro = new ResizeObserver(() => {
        updateTransform(0);
      });
      ro.observe(stageRef.current);
    }

    const timeout = setTimeout(() => updateTransform(0), 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (ro) ro.disconnect();
      clearTimeout(timeout);
    };
  }, [updateTransform]);

  // Pointer drag events with axis-lock (120 FPS buttery swiping, zero re-render lag)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragDeltaX.current = 0;
    isDirectionLocked.current = null;
    isDragging.current = true;
    hasMoved.current = false;
    setIsPaused(true);
    notifyUserActivity();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current === null || dragStartY.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;

    // Detect swipe axis once user moves finger beyond 6px threshold
    if (isDirectionLocked.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        if (Math.abs(dx) >= Math.abs(dy)) {
          isDirectionLocked.current = "horizontal";
          if (trackRef.current) {
            trackRef.current.style.transition = "none";
          }
        } else {
          isDirectionLocked.current = "vertical";
        }
      }
    }

    // Never hijack scroll if user is scrolling page vertically
    if (isDirectionLocked.current !== "horizontal") return;

    if (Math.abs(dx) > 8) {
      hasMoved.current = true;
    }

    dragDeltaX.current = dx;

    // Direct GPU transform via requestAnimationFrame - zero React re-render overhead!
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      updateTransform(dx);
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (rafId.current) cancelAnimationFrame(rafId.current);

    if (!isDragging.current || dragStartX.current === null) return;
    const dx = dragDeltaX.current;
    const wasHorizontal = isDirectionLocked.current === "horizontal";

    isDragging.current = false;
    dragStartX.current = null;
    dragStartY.current = null;
    isDirectionLocked.current = null;
    dragDeltaX.current = 0;

    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.5s cubic-bezier(0.22, 0.8, 0.2, 1)";
    }

    if (wasHorizontal) {
      if (dx < -35) {
        setActiveIdx((prev) => (prev + 1) % cardCount);
      } else if (dx > 35) {
        setActiveIdx((prev) => (prev - 1 + cardCount) % cardCount);
      } else {
        updateTransform(0);
      }
    } else {
      updateTransform(0);
    }

    setTimeout(() => {
      hasMoved.current = false;
      setIsPaused(false);
    }, 250);
  };

  // Keyboard navigation for accessible multi-device support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      notifyUserActivity();
      setActiveIdx((prev) => (prev - 1 + cardCount) % cardCount);
    } else if (e.key === "ArrowRight") {
      notifyUserActivity();
      setActiveIdx((prev) => (prev + 1) % cardCount);
    }
  };

  const handleCardClick = (idx: number) => {
    notifyUserActivity();
    if (hasMoved.current) return;
    if (idx !== activeIdx) {
      setActiveIdx(idx);
    }
  };

  // Smoothly vanish text from input on send without creating new message bubbles
  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    notifyUserActivity();
    if (!chatInput.trim() || isVanishing) return;
    setIsVanishing(true);
    setTimeout(() => {
      setChatInput("");
      setIsVanishing(false);
    }, 280);
  };

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Features carousel"
      className="learn-carousel-root w-full max-w-7xl mx-auto overflow-hidden select-none outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* SVG Definitions */}
      <svg width="0" height="0" className="sr-only absolute" aria-hidden="true">
        <defs>
          <symbol id="lc-heart" viewBox="0 0 24 24">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </symbol>
          <symbol id="lc-msg" viewBox="0 0 24 24">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.2-4.7A8.4 8.4 0 1 1 21 11.5z" />
          </symbol>
          <symbol id="lc-bm" viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </symbol>
          <symbol id="lc-shr" viewBox="0 0 24 24">
            <path d="M14 3l8 8-8 8v-5c-6 0-9 2-12 6 1-7 5-11 12-12z" />
          </symbol>
          <symbol id="lc-user" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4.2" />
            <path d="M3.5 21c0-4.6 3.8-7.2 8.5-7.2s8.5 2.6 8.5 7.2z" />
          </symbol>
          <symbol id="lc-mic" viewBox="0 0 24 24">
            <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
          </symbol>
          <symbol id="lc-plus" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </symbol>
          <symbol id="lc-pen" viewBox="0 0 24 24">
            <path d="M17 3l4 4L8 20l-5 1 1-5z" />
          </symbol>
          <symbol id="lc-bell" viewBox="0 0 24 24">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
          </symbol>
          <symbol id="lc-send" viewBox="0 0 24 24">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
          </symbol>
          <symbol id="lc-play" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </symbol>
          <symbol id="lc-pause" viewBox="0 0 24 24">
            <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
          </symbol>
          <symbol id="lc-star" viewBox="0 0 24 24">
            <path
              d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3 1.2-6.8-5-4.9 6.9-1z"
              fill="currentColor"
            />
          </symbol>
          <symbol id="lc-cap" viewBox="0 0 24 24">
            <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5" />
          </symbol>
          <symbol id="lc-bolt" viewBox="0 0 24 24">
            <path d="M13 2L3 14h8l-1 8 10-12h-8z" />
          </symbol>
          <symbol id="lc-smile" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </symbol>
          <symbol id="lc-target" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </symbol>
          <linearGradient id="lc-bd" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0f6b63" />
            <stop offset="1" stopColor="#0a3d44" />
          </linearGradient>
          <path id="lc-hxp" d="M40 19l11 6.5v13L40 45l-11-6.5v-13z" />
        </defs>
      </svg>

      {/* Stage Container with explicit pixel heights */}
      <div
        ref={stageRef}
        className="lc-stage relative overflow-hidden touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="lc-track flex gap-4 w-max will-change-transform"
        >
          {/* CARD 0: Learn from real posts */}
          <article
            onClick={() => handleCardClick(0)}
            className={`lc-card ${activeIdx === 0 ? "on" : ""}`}
            style={{ "--c": "#ff7a90" } as React.CSSProperties}
          >
            <div className="lc-card-header">
              <h2>Learn from real posts</h2>
              <p>Short posts from learners and teachers, with no endless scroll.</p>
            </div>
            <div className="ui rl">
              <svg className="bgv" viewBox="0 0 322 330" preserveAspectRatio="xMidYMid slice">
                <rect width="322" height="330" fill="url(#lc-bd)" />
                <circle cx="275" cy="50" r="70" fill="#fff" opacity="0.06" />
                <circle cx="30" cy="250" r="90" fill="#fff" opacity="0.05" />
                <text x="22" y="76" fontSize="40" fontWeight="800" fill="#fff">
                  F = m × a
                </text>
                <path d="M22 94h92" stroke="#5eead4" strokeWidth="4" strokeLinecap="round" />
                <path
                  d="M22 196h210"
                  stroke="#e8fff9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <g className="ball" style={{ "--y": "50px" } as React.CSSProperties}>
                  <circle cx="86" cy="130" r="16" fill="#fbbf24" />
                </g>
              </svg>
              <div className="shade"></div>
              <div className="info">
                <div className="usr">
                  <b>
                    <svg className="i f">
                      <use href="#lc-user" />
                    </svg>
                  </b>
                  <h3 className="usr-name">Tae Sul</h3>
                </div>
                <p className="sub thin-sub">
                  Physics · <em>Intermediate</em>
                </p>
                <p className="cap">Why heavy and light things fall together</p>
              </div>
              <div className="rail">
                <button
                  className={`rb ${postLiked ? "lk" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setPostLiked(!postLiked);
                  }}
                  aria-label="Like"
                >
                  <svg className="i f">
                    <use href="#lc-heart" />
                  </svg>
                </button>
                <button
                  className="rb"
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                  }}
                  aria-label="Comments"
                >
                  <svg className="i f">
                    <use href="#lc-msg" />
                  </svg>
                </button>
                <button
                  className={`rb ${postSaved ? "sv" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setPostSaved(!postSaved);
                  }}
                  aria-label="Save"
                >
                  <svg className="i f">
                    <use href="#lc-bm" />
                  </svg>
                </button>
                <button
                  className="rb"
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                  }}
                  aria-label="Share"
                >
                  <svg className="i f">
                    <use href="#lc-shr" />
                  </svg>
                </button>
              </div>
              <div className="pg">
                <i></i>
              </div>
            </div>
          </article>

          {/* CARD 1: Ask Bud anything (AI Card) */}
          <article
            onClick={() => handleCardClick(1)}
            className={`lc-card ${activeIdx === 1 ? "on" : ""}`}
            style={{ "--c": "#7c6cf0" } as React.CSSProperties}
          >
            <div className="lc-card-header">
              <h2>Ask Bud anything</h2>
              <p>Your AI coach for practice, answers and progress checks.</p>
            </div>
            <div className="ui p2">
              <h3 className="help-text">How can I help?</h3>
              <div className="g4">
                <button
                  className={`ch r ${selectedChip === 0 ? "sel" : ""}`}
                  style={{ "--t": "#ec4899", "--d": "0.3s" } as React.CSSProperties}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    if (selectedChip === 0) {
                      setSelectedChip(null);
                      setAskText("Ask anything…");
                    } else {
                      setSelectedChip(0);
                      setAskText("Practice an interview question");
                    }
                  }}
                >
                  <i>
                    <svg className="i">
                      <use href="#lc-cap" />
                    </svg>
                  </i>
                  Practice an interview
                </button>
                <button
                  className={`ch r ${selectedChip === 1 ? "sel" : ""}`}
                  style={{ "--t": "#0ea5e9", "--d": "0.5s" } as React.CSSProperties}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    if (selectedChip === 1) {
                      setSelectedChip(null);
                      setAskText("Ask anything…");
                    } else {
                      setSelectedChip(1);
                      setAskText("What drill should I try next?");
                    }
                  }}
                >
                  <i>
                    <svg className="i">
                      <use href="#lc-bolt" />
                    </svg>
                  </i>
                  What drill is next?
                </button>
                <button
                  className={`ch r ${selectedChip === 2 ? "sel" : ""}`}
                  style={{ "--t": "#f43f5e", "--d": "0.7s" } as React.CSSProperties}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    if (selectedChip === 2) {
                      setSelectedChip(null);
                      setAskText("Ask anything…");
                    } else {
                      setSelectedChip(2);
                      setAskText("Tips for sounding more confident");
                    }
                  }}
                >
                  <i>
                    <svg className="i">
                      <use href="#lc-smile" />
                    </svg>
                  </i>
                  Sound more confident
                </button>
                <button
                  className={`ch r ${selectedChip === 3 ? "sel" : ""}`}
                  style={{ "--t": "#f59e0b", "--d": "0.9s" } as React.CSSProperties}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    if (selectedChip === 3) {
                      setSelectedChip(null);
                      setAskText("Ask anything…");
                    } else {
                      setSelectedChip(3);
                      setAskText("How’s my progress looking?");
                    }
                  }}
                >
                  <i>
                    <svg className="i">
                      <use href="#lc-target" />
                    </svg>
                  </i>
                  How’s my progress?
                </button>
              </div>
              <div className="ask r" style={{ "--d": "0.3s" } as React.CSSProperties}>
                <svg className="i">
                  <use href="#lc-plus" />
                </svg>
                <span className={`askt ${selectedChip !== null ? "typed" : ""}`}>
                  {askText}
                </span>
                <b>
                  <svg className="i">
                    <use href="#lc-mic" />
                  </svg>
                </b>
              </div>
            </div>
          </article>

          {/* CARD 2: Play to grow your brain */}
          <article
            onClick={() => handleCardClick(2)}
            className={`lc-card ${activeIdx === 2 ? "on" : ""}`}
            style={{ "--c": "#f5a03a" } as React.CSSProperties}
          >
            <div className="lc-card-header">
              <h2>Play to grow your brain</h2>
              <p>Word, math and memory games, plus a mindful minute.</p>
            </div>
            <div className="ui p3">
              <div className="gg">
                <button
                  className={`t r ${selectedGame === 0 ? "pick" : ""}`}
                  style={
                    {
                      "--b": "#fbbf24",
                      "--g1": "#6b3d08",
                      "--g2": "#d97706",
                      "--d": ".3s",
                    } as React.CSSProperties
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setSelectedGame(selectedGame === 0 ? null : 0);
                  }}
                >
                  <div className="art">
                    <svg viewBox="0 0 80 64">
                      <g fill="none" stroke="#b7791f" strokeWidth="1.6">
                        <use href="#lc-hxp" transform="translate(-22 0)" />
                        <use href="#lc-hxp" transform="translate(22 0)" />
                        <use href="#lc-hxp" transform="translate(-11 -19)" />
                        <use href="#lc-hxp" transform="translate(11 -19)" />
                        <use href="#lc-hxp" transform="translate(-11 19)" />
                      </g>
                      <use href="#lc-hxp" className="hx" fill="#fbbf24" />
                      <text
                        x="40"
                        y="37"
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill="#1a1204"
                      >
                        B
                      </text>
                    </svg>
                  </div>
                  <div className="tl">
                    <b>Spelling bee</b>
                    <em>Classic</em>
                  </div>
                </button>
                <button
                  className={`t r ${selectedGame === 1 ? "pick" : ""}`}
                  style={
                    {
                      "--b": "#34d399",
                      "--g1": "#064e3b",
                      "--g2": "#059669",
                      "--d": ".45s",
                    } as React.CSSProperties
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setSelectedGame(selectedGame === 1 ? null : 1);
                  }}
                >
                  <div className="art">
                    <div className="wd">
                      <span className="g">W</span>
                      <span className="y">O</span>
                      <span className="x">R</span>
                      <span className="x">D</span>
                      <span className="g">S</span>
                      <span className="x">P</span>
                      <span className="g">L</span>
                      <span className="g">A</span>
                      <span className="y">N</span>
                      <span className="x">T</span>
                    </div>
                  </div>
                  <div className="tl">
                    <b>Wordle</b>
                    <em>Popular</em>
                  </div>
                </button>
                <button
                  className={`t r ${selectedGame === 2 ? "pick" : ""}`}
                  style={
                    {
                      "--b": "#38bdf8",
                      "--g1": "#172554",
                      "--g2": "#2563eb",
                      "--d": ".6s",
                    } as React.CSSProperties
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setSelectedGame(selectedGame === 2 ? null : 2);
                  }}
                >
                  <div className="art">
                    <div>
                      <div className="dg">
                        <i>7</i>
                        <i>4</i>
                        <i>2</i>
                        <i>9</i>
                      </div>
                      <div className="dt">
                        <i style={{ "--k": "#22c55e", "--d": ".9s" } as React.CSSProperties} />
                        <i style={{ "--k": "#22c55e", "--d": "1.2s" } as React.CSSProperties} />
                        <i style={{ "--k": "#f59e0b", "--d": "1.5s" } as React.CSSProperties} />
                        <i style={{ "--k": "#64748b", "--d": "1.8s" } as React.CSSProperties} />
                      </div>
                    </div>
                  </div>
                  <div className="tl">
                    <b>Code breaker</b>
                    <em>New</em>
                  </div>
                </button>
                <button
                  className={`t r ${selectedGame === 3 ? "pick" : ""}`}
                  style={
                    {
                      "--b": "#c4b5fd",
                      "--g1": "#3b1670",
                      "--g2": "#7c3aed",
                      "--d": ".75s",
                    } as React.CSSProperties
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setSelectedGame(selectedGame === 3 ? null : 3);
                  }}
                >
                  <div className="art">
                    <span className="sg">Σ</span>
                  </div>
                  <div className="tl">
                    <b>Mixed calc</b>
                    <em>Rapid</em>
                  </div>
                </button>
              </div>
              <div
                className={`mind r ${mindfulActive ? "act" : ""}`}
                style={{ "--d": "1s" } as React.CSSProperties}
              >
                <i className="bd" />
                <span>Mindful minute</span>
                <button
                  className="em"
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setMindfulActive(!mindfulActive);
                  }}
                  aria-label="Start or stop mindful minute"
                >
                  {mindfulActive ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          </article>

          {/* CARD 3: Notes that remind you */}
          <article
            onClick={() => handleCardClick(3)}
            className={`lc-card ${activeIdx === 3 ? "on" : ""}`}
            style={{ "--c": "#5b9bf0" } as React.CSSProperties}
          >
            <div className="lc-card-header">
              <h2>Notes that remind you</h2>
              <p>Jot, tick off and get a nudge right when you need it.</p>
            </div>
            <div className="ui nt">
              <div className="fl">
                <button
                  className={notesFilter === "all" ? "a" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setNotesFilter("all");
                  }}
                >
                  All notes
                </button>
                <button
                  className={notesFilter === "todo" ? "a" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setNotesFilter("todo");
                  }}
                >
                  To-do
                </button>
              </div>
              <div className="nn" data-f={notesFilter}>
                <div className="n1 r" style={{ "--d": ".3s" } as React.CSSProperties}>
                  <h3>Photosynthesis</h3>
                  <i className="sk" style={{ "--w": "90%", "--d": ".9s" } as React.CSSProperties} />
                  <i className="sk" style={{ "--w": "68%", "--d": "1.3s" } as React.CSSProperties} />
                  <i className="sk" style={{ "--w": "80%", "--d": "1.7s" } as React.CSSProperties} />
                  <small>
                    <svg className="i">
                      <use href="#lc-star" />
                    </svg>
                    Today
                  </small>
                </div>
                <div className="n2 r" style={{ "--d": ".5s" } as React.CSSProperties}>
                  <h3>Revision</h3>
                  <div className="task-list">
                    {studyTasks.map((taskText, k) => (
                      <button
                        key={k}
                        type="button"
                        className={`enhanced-tick-row ${tasksDone[k] ? "checked" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          notifyUserActivity();
                          const next = [...tasksDone];
                          next[k] = !next[k];
                          setTasksDone(next);
                        }}
                      >
                        <span className={`tick-box ${tasksDone[k] ? "is-checked" : ""}`}>
                          {tasksDone[k] && (
                            <svg viewBox="0 0 16 16" className="tick-svg" fill="none" stroke="currentColor">
                              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span className="task-label">{taskText}</span>
                      </button>
                    ))}
                  </div>
                  <small className="cnt">
                    {tasksDone.filter(Boolean).length} of 2 done
                  </small>
                </div>
              </div>
              <button
                className={`toast r ${!toastActive ? "off" : ""}`}
                style={{ "--d": "1.6s" } as React.CSSProperties}
                onClick={(e) => {
                  e.stopPropagation();
                  notifyUserActivity();
                  setToastActive(!toastActive);
                }}
              >
                <i>
                  <svg className="i">
                    <use href="#lc-bell" />
                  </svg>
                </i>
                Tomorrow, 7:30 pm · Review notes
              </button>
              <div className="dock">
                <button
                  className="db p"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="New note"
                >
                  <svg className="i">
                    <use href="#lc-plus" />
                  </svg>
                </button>
                <button
                  className="db"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Voice note"
                >
                  <svg className="i">
                    <use href="#lc-mic" />
                  </svg>
                </button>
                <button
                  className="db"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Draw"
                >
                  <svg className="i">
                    <use href="#lc-pen" />
                  </svg>
                </button>
              </div>
            </div>
          </article>

          {/* CARD 4: Read it or hear it (Book Card with High-Contrast Text) */}
          <article
            onClick={() => handleCardClick(4)}
            className={`lc-card ${activeIdx === 4 ? "on" : ""}`}
            style={{ "--c": "#c08a5e" } as React.CSSProperties}
          >
            <div className="lc-card-header">
              <h2>Read it or hear it</h2>
              <p>Pick up any book and switch between reading and listening.</p>
            </div>
            <div className={`ui bk book-ui ${isListening ? "ls" : ""}`}>
              <div className="tgl">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setIsListening(false);
                  }}
                >
                  Read
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    notifyUserActivity();
                    setIsListening(true);
                  }}
                >
                  Listen
                </button>
              </div>
              <div className="vw">
                {/* READ TAB */}
                <div className="rv">
                  <h4>The quiet bench</h4>
                  <p>
                    <span className="dc">O</span>n a quiet bench, an old traveller sat beside the boy
                    and asked what he was reading. “A book about choosing your own path,” the boy
                    said.
                  </p>
                </div>

                {/* LISTEN TAB */}
                <div className="lv">
                  <svg viewBox="0 0 52 68">
                    <rect width="52" height="68" rx="6" fill="#0f766e" />
                    <circle cx="26" cy="29" r="14" fill="#fbbf24" />
                    <path
                      d="M12 54h28M16 60h20"
                      stroke="#fde68a"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div>
                    <h3>Alice in Wonderland</h3>
                    <small>Lewis Carroll</small>
                  </div>
                  <div className="pr">
                    <div className="sc">
                      <i style={{ width: `${(audioPos / audioTotal) * 100}%` }} />
                    </div>
                    <div className="tm">
                      <span className="t1">{formatAudioTime(audioPos)}</span>
                      <span>02:42</span>
                    </div>
                  </div>
                  {/* Simple Play/Pause button: clean bg, no border, no zoom, using icon symbol */}
                  <button
                    className="pp"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      notifyUserActivity();
                      setIsPlayingAudio(!isPlayingAudio);
                    }}
                    aria-label={isPlayingAudio ? "Pause audiobook" : "Play audiobook"}
                  >
                    <svg className={`i f ${!isPlayingAudio ? "po" : ""}`}>
                      <use href={isPlayingAudio ? "#lc-pause" : "#lc-play"} />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chapter status with left/right buttons removed - hidden in Listen tab */}
              {!isListening && (
                <div className="cp clean-chapter">
                  <div className="cb">
                    <i></i>Chapter 2 of 8
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* CARD 5: Talk with learners */}
          <article
            onClick={() => handleCardClick(5)}
            className={`lc-card ${activeIdx === 5 ? "on" : ""}`}
            style={{ "--c": "#2dc4a4" } as React.CSSProperties}
          >
            <div className="lc-card-header">
              <h2>Talk with learners</h2>
              <p>Message, send voice notes and share answers with friends.</p>
            </div>
            <div className="ui cc">
              <div className="hd2">
                <b className="av2">
                  <svg className="i f" viewBox="0 0 24 24" fill="currentColor" style={{ width: "18px", height: "18px" }}>
                    <circle cx="12" cy="8" r="4.2" />
                    <path d="M3.5 21c0-4.6 3.8-7.2 8.5-7.2s8.5 2.6 8.5 7.2z" />
                  </svg>
                </b>
                <div>
                  <h3>Teh</h3>
                  <small>Online now</small>
                </div>
              </div>
              <div className="chat-messages">
                <p className="m s r" style={{ "--d": "0.3s" } as React.CSSProperties}>
                  Up for the extra class?
                </p>
                <p className="m r" style={{ "--d": "0.7s" } as React.CSSProperties}>
                  Yes! What should we revise?
                </p>
                <div className="vm r" style={{ "--d": "1.1s" } as React.CSSProperties}>
                  <b>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "15px", height: "15px", marginLeft: "2px" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </b>
                  <span className="w2">
                    {[...Array(20)].map((_, idx) => (
                      <i key={idx} />
                    ))}
                  </span>
                  <small>0:03</small>
                </div>
              </div>

              {/* Chat Input: text smoothly vanishes on send without altering chat bubbles */}
              <form
                className={`inp ${chatInput.trim() ? "has" : ""}`}
                onSubmit={handleSendChat}
                onClick={(e) => e.stopPropagation()}
              >
                <b>
                  <svg className="i">
                    <use href="#lc-plus" />
                  </svg>
                </b>
                <input
                  className={`mi ${isVanishing ? "vanishing" : ""}`}
                  type="text"
                  placeholder="Message…"
                  aria-label="Message"
                  value={chatInput}
                  onFocus={notifyUserActivity}
                  onChange={(e) => {
                    notifyUserActivity();
                    setChatInput(e.target.value);
                  }}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="sd"
                  aria-label="Send"
                  disabled={!chatInput.trim() || isVanishing}
                >
                  <svg className="i">
                    <use href="#lc-send" />
                  </svg>
                </button>
              </form>
            </div>
          </article>
        </div>
      </div>

      {/* Scoped CSS for LearnCarousel */}
      <style>{`
        .learn-carousel-root {
          font-family: "Nunito Sans", system-ui, -apple-system, sans-serif;
        }
        .lc-stage {
          position: relative;
          height: 505px;
          min-height: 505px;
          padding: 16px 0 24px;
          box-sizing: border-box;
          user-select: none;
          -webkit-user-select: none;
          overflow: hidden;
        }
        .lc-track {
          position: relative;
          display: flex;
          gap: 16px;
          height: 465px;
          min-height: 465px;
          width: max-content;
          align-items: stretch;
          will-change: transform;
        }
        .lc-card {
          position: relative;
          flex: none;
          display: flex;
          flex-direction: column;
          width: 350px;
          height: 460px;
          min-height: 460px;
          overflow: hidden;
          border-radius: 30px;
          background: linear-gradient(180deg, color-mix(in srgb, var(--c) 12%, #fff), #fff 55%);
          border: 1.5px solid color-mix(in srgb, var(--c) 30%, #e6ebf5);
          padding: 22px 20px 0;
          box-sizing: border-box;
          opacity: 0.65;
          cursor: pointer;
          transition: opacity 0.4s, box-shadow 0.4s, transform 0.4s;
          box-shadow: 0 4px 12px -6px rgba(15, 23, 42, 0.05);
        }
        .lc-card.on {
          opacity: 1;
          cursor: default;
          box-shadow: 0 10px 20px -12px rgba(15, 23, 42, 0.14);
          transform: translateY(-2px);
        }
        .lc-card::before {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 36%;
          background: radial-gradient(120% 90% at 15% 110%, var(--c), transparent 70%),
                      radial-gradient(90% 70% at 105% 105%, color-mix(in srgb, var(--c) 45%, #fff), transparent 70%);
          opacity: 0.15;
          transition: opacity 0.6s;
          pointer-events: none;
        }
        .lc-card.on::before {
          opacity: 0.25;
        }
        .lc-card-header {
          flex: none;
          margin-bottom: 12px;
        }
        .lc-card h2 {
          position: relative;
          margin: 0 0 6px;
          font-size: 23px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0f172a;
        }
        .lc-card p {
          position: relative;
          margin: 0;
          max-width: 32ch;
          font-size: 13.5px;
          line-height: 1.4;
          font-weight: 500;
          color: #5b6577;
        }
        .learn-carousel-root .i {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .learn-carousel-root .f {
          fill: currentColor;
          stroke: none;
        }
        .lc-card .ui {
          position: relative;
          flex: 1;
          min-height: 0;
          margin: 0 -4px 0;
          padding: 12px;
          border-radius: 22px 22px 0 0;
          background: #fff;
          border: 1.5px solid color-mix(in srgb, var(--c) 24%, #fff);
          border-bottom: 0;
          box-shadow: 0 -4px 16px -8px rgba(15, 23, 42, 0.08);
          opacity: 0.85;
          transform: translateY(8px);
          transition: opacity 0.4s, transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .lc-card.on .ui {
          opacity: 1;
          transform: none;
        }
        .lc-card .ui h3 {
          margin: 0;
          font-size: 14.5px;
          font-weight: 800;
        }
        @keyframes pop {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes pl {
          50% {
            transform: scale(1.18);
          }
        }
        @keyframes grow {
          to {
            width: var(--w);
          }
        }
        @keyframes pf {
          to {
            width: 100%;
          }
        }
        @keyframes drop {
          0% {
            transform: translateY(0);
          }
          55%,
          100% {
            transform: translateY(var(--y));
          }
        }
        .lc-card.on .r {
          animation: pop 0.45s var(--d, 0s) backwards;
        }

        /* -------------------------------------------
           CARD 0: Learn from Real Posts
           ------------------------------------------- */
        .rl {
          padding: 0;
          border: 0;
          background: #0a3d44;
          color: #fff;
        }
        .bgv {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .shade {
          position: absolute;
          inset: auto 0 0;
          height: 58%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
        }
        .lc-card.on .ball {
          animation: drop 2.4s cubic-bezier(0.55, 0, 1, 0.45) infinite;
        }
        .info {
          position: absolute;
          left: 14px;
          right: 66px;
          bottom: 18px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }
        .usr {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .usr b {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
        }
        .usr .i {
          width: 16px;
          height: 16px;
        }
        /* More thin username text */
        .usr-name {
          font-size: 14.5px !important;
          font-weight: 500 !important;
          color: #fff;
          letter-spacing: -0.01em;
        }
        /* More thin Physics & Intermediate text */
        .thin-sub {
          margin: 6px 0 0;
          font-size: 12px;
          font-weight: 400 !important;
          opacity: 0.92;
        }
        .thin-sub em {
          font-style: normal;
          color: #fcd34d;
          font-weight: 500 !important;
        }
        .cap {
          margin: 3px 0 0;
          font-size: 12.5px;
          font-weight: 400;
          opacity: 0.95;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rail {
          position: absolute;
          right: 8px;
          bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        /* Subtly reduced button animation */
        .rb {
          display: grid;
          place-items: center;
          padding: 4px;
          border: 0;
          background: none;
          color: #fff;
          cursor: pointer;
          transition: transform 0.15s ease, color 0.15s ease;
        }
        .rb:hover {
          transform: scale(1.05);
        }
        .rb:active {
          transform: scale(0.96);
        }
        .rb .i {
          width: 26px;
          height: 26px;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
        }
        .rb.lk {
          color: #ff4d6d;
        }
        .rb.sv {
          color: #fcd34d;
        }
        .pg {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
        }
        .pg i {
          display: block;
          width: 0;
          height: 100%;
          background: #fff;
        }
        .lc-card.on .pg i {
          animation: pf 6s linear both;
        }

        /* -------------------------------------------
           CARD 1: Ask Bud Anything (AI Card)
           ------------------------------------------- */
        .p2 {
          text-align: center;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          padding: 6px 4px 6px;
        }
        /* Thinner "How can I help?" */
        .help-text {
          font-size: 18px !important;
          font-weight: 600 !important;
          color: #0f172a;
          margin: 2px 0 8px !important;
          letter-spacing: -0.015em;
        }
        .g4 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          text-align: left;
          flex: 1;
        }
        /* Restored colored suggestion cards with clean, subtle hover effect */
        .ch {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 8px;
          min-height: 76px;
          padding: 10px 11px;
          border-radius: 18px 20px 16px 22px;
          border: 1.5px solid color-mix(in srgb, var(--t) 20%, #fff);
          background: linear-gradient(145deg, color-mix(in srgb, var(--t) 17%, #fff), color-mix(in srgb, var(--t) 5%, #fff));
          color: color-mix(in srgb, var(--t) 45%, #1a1a2e);
          font-size: 12.5px;
          font-weight: 800;
          line-height: 1.2;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ch i {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--t) 22%, #fff);
          color: var(--t);
        }
        .ch .i {
          width: 17px;
          height: 17px;
        }
        /* Clean, simple hover without heavy blur/glow */
        .ch:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -10px color-mix(in srgb, var(--t) 55%, #000);
          border-color: color-mix(in srgb, var(--t) 40%, #fff);
        }
        .ch:active {
          transform: scale(0.96);
        }
        .ch.sel {
          transform: scale(0.97);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--t) 40%, #fff);
          border-color: var(--t);
        }
        .ask {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
          padding: 5px 5px 5px 12px;
          border-radius: 99px;
          background: #fff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px -6px rgba(15, 23, 42, 0.15);
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          text-align: left;
        }
        .ask span {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ask .typed {
          color: #0f172a;
          font-weight: 600;
        }
        .ask b {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
        }
        .ask .i {
          width: 16px;
          height: 16px;
        }

        /* -------------------------------------------
           CARD 2: Play to Grow Your Brain
           ------------------------------------------- */
        .p3 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 6px 4px 6px;
        }
        .gg {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          flex: 1;
        }
        .t {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 6px;
          border-radius: 18px;
          border: 2px solid var(--b);
          background: linear-gradient(170deg, var(--g1), var(--g2));
          color: #fff;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .t:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -8px var(--g2);
        }
        .t:active {
          transform: scale(0.97);
        }
        .t.pick {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--b) 50%, #fff);
        }
        .art {
          display: grid;
          place-items: center;
          height: 56px;
          border-radius: 12px;
          background: rgba(5, 8, 18, 0.55);
          overflow: hidden;
        }
        .art > * {
          transition: transform 0.25s;
        }
        .art svg {
          width: 60px;
          height: 48px;
        }
        .t:hover .art > * {
          transform: scale(1.1);
        }
        .tl {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3px 1px;
        }
        .tl b {
          font-size: 12px;
          font-weight: 800;
        }
        .tl em {
          font-style: normal;
          font-size: 9.5px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 99px;
          background: var(--b);
          color: #1b1305;
        }
        .lc-card.on .hx {
          animation: pl 1.6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .wd {
          display: grid;
          grid-template-columns: repeat(5, 15px);
          gap: 3px;
        }
        .wd span {
          display: grid;
          place-items: center;
          height: 16px;
          border-radius: 3px;
          background: #374151;
          color: #fff;
          font-size: 9px;
          font-weight: 800;
        }
        .wd .g {
          --k: #22c55e;
        }
        .wd .y {
          --k: #eab308;
        }
        .wd .x {
          --k: #374151;
        }
        @keyframes fl {
          0% {
            transform: rotateX(0);
          }
          49% {
            transform: rotateX(90deg);
            background: #374151;
          }
          51% {
            background: var(--k);
          }
          100% {
            transform: rotateX(0);
            background: var(--k);
          }
        }
        .lc-card.on .wd span {
          animation: fl 0.5s 0.4s both;
        }
        .wd span:nth-child(5n + 2) {
          animation-delay: 0.55s !important;
        }
        .wd span:nth-child(5n + 3) {
          animation-delay: 0.7s !important;
        }
        .wd span:nth-child(5n + 4) {
          animation-delay: 0.85s !important;
        }
        .wd span:nth-child(5n) {
          animation-delay: 1s !important;
        }
        .dg {
          display: flex;
          gap: 4px;
          justify-content: center;
        }
        .dg i {
          display: grid;
          place-items: center;
          width: 15px;
          height: 20px;
          border: 1.5px solid #60a5fa;
          border-radius: 5px;
          background: #0b1636;
          color: #fff;
          font-style: normal;
          font-size: 11px;
          font-weight: 800;
        }
        .dt {
          display: flex;
          gap: 5px;
          justify-content: center;
          margin-top: 6px;
        }
        .dt i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #475569;
        }
        @keyframes dc {
          to {
            background: var(--k);
          }
        }
        .lc-card.on .dt i {
          animation: dc 0.3s var(--d) both;
        }
        .sg {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 11px;
          background: linear-gradient(135deg, #fbbf24, #b45309);
          color: #fff;
          font-size: 22px;
          font-weight: 800;
          transform: rotate(8deg);
        }
        .mind {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          padding: 8px 8px 8px 10px;
          border-radius: 16px;
          background: #f3f0ff;
          border: 1px solid #e1d9ff;
          font-size: 13px;
          font-weight: 800;
          color: #3730a3;
          transition: background 0.3s;
          flex: none;
        }
        .mind.act {
          background: #e7e0ff;
        }
        .bd {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #fff, #818cf8 70%);
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.25);
        }
        .mind.act .bd {
          animation: pl 3s ease-in-out infinite;
        }
        .em {
          margin-left: auto;
          padding: 6px 14px;
          border: 0;
          border-radius: 99px;
          background: #4f46e5;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .em:hover {
          background: #4338ca;
        }
        .em:active {
          transform: scale(0.95);
        }

        /* -------------------------------------------
           CARD 3: Notes That Remind You
           ------------------------------------------- */
        .nt {
          position: relative;
          background: linear-gradient(#8fb0e6, #d6e5f8 75%);
          border: 0;
          color: #0f172a;
          padding: 8px 10px 58px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .fl {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          flex: none;
        }
        .fl button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 11px;
          border: 0;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.55);
          color: inherit;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .fl button:hover {
          background: rgba(255, 255, 255, 0.85);
        }
        .fl button:active {
          transform: scale(0.95);
        }
        .fl .a {
          background: #fef08a;
        }
        .fl .i {
          width: 12px;
          height: 12px;
          color: #f59e0b;
        }
        .nn {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 10px;
        }
        .nn > div {
          padding: 10px;
          border-radius: 18px;
          min-height: 108px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 16px -12px rgba(15, 23, 42, 0.45);
          transition: opacity 0.3s, transform 0.3s;
        }
        .nn[data-f="imp"] .n2,
        .nn[data-f="todo"] .n1 {
          opacity: 0.35;
          transform: scale(0.96);
        }
        .n1 {
          background: #d4efe3;
          color: #17644a;
        }
        .n2 {
          background: #fff1bd;
          color: #7a5a00;
        }
        .nn small {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 9px;
          color: inherit;
          opacity: 0.8;
          font-weight: 700;
        }
        .nn small .i {
          width: 11px;
          height: 11px;
        }
        .sk {
          display: block;
          height: 6px;
          margin-top: 8px;
          border-radius: 3px;
          background: currentColor;
          opacity: 0.25;
          width: 0;
          transition: opacity 0.2s;
        }
        .lc-card.on .sk {
          animation: grow 0.8s var(--d, 0s) both;
        }
        /* Enhanced, tactile tick buttons */
        .task-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 7px;
        }
        .enhanced-tick-row {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 2px 0;
          background: none;
          border: 0;
          cursor: pointer;
          text-align: left;
          width: 100%;
          color: inherit;
        }
        .tick-box {
          display: grid;
          place-items: center;
          flex: none;
          width: 16px;
          height: 16px;
          border-radius: 5px;
          border: 1.5px solid #a16207;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.15s ease;
        }
        .tick-box.is-checked {
          background: #a16207;
          border-color: #a16207;
          color: #fff;
        }
        .tick-svg {
          width: 11px;
          height: 11px;
        }
        .task-label {
          font-size: 11.5px;
          font-weight: 700;
          line-height: 1.2;
          color: #7a5a00;
          transition: opacity 0.15s ease, text-decoration 0.15s ease;
        }
        .enhanced-tick-row.checked .task-label {
          text-decoration: line-through;
          opacity: 0.55;
        }
        .toast {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          margin-top: 10px;
          padding: 7px 12px 7px 8px;
          border: 0;
          border-radius: 14px;
          background: #fff;
          color: inherit;
          font-size: 12.5px;
          font-weight: 800;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 8px 16px -12px rgba(15, 23, 42, 0.5);
          transition: opacity 0.25s;
        }
        .toast i {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border-radius: 9px;
          background: #fff3d6;
          color: #f59e0b;
          transition: background 0.25s, color 0.25s;
        }
        .toast .i {
          width: 15px;
          height: 15px;
        }
        .toast.off {
          opacity: 0.6;
        }
        .toast.off i {
          background: #e5e7eb;
          color: #94a3b8;
        }
        .dock {
          position: absolute;
          left: 50%;
          bottom: 12px;
          display: flex;
          gap: 6px;
          padding: 5px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 8px 20px -10px rgba(15, 23, 42, 0.45);
          transform: translateX(-50%);
        }
        .db {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: #e5e7eb;
          color: #0f172a;
          cursor: pointer;
          transition: transform 0.15s, background 0.2s;
        }
        .db.p {
          background: #0f172a;
          color: #fff;
        }
        .db:hover {
          transform: translateY(-2px);
          background: #d5dae3;
        }
        .db.p:hover {
          background: #1e293b;
        }
        .db:active {
          transform: scale(0.9);
        }
        .db .i {
          width: 17px;
          height: 17px;
        }

        /* -------------------------------------------
           CARD 4: Read It or Hear It (High-Contrast)
           ------------------------------------------- */
        .book-ui {
          display: flex;
          flex-direction: column;
          background: #fbf8f3 !important; /* Warm crisp paper background */
          border: 1.5px solid #e7ded2 !important;
          color: #1c1917 !important;
        }
        .tgl {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 74%;
          margin: 0 auto 10px;
          padding: 3.5px;
          border-radius: 99px;
          background: #ede6dc;
        }
        .tgl button {
          position: relative;
          z-index: 1;
          padding: 6px 0;
          border: 0;
          background: none;
          color: #78716c;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .tgl button:first-child {
          color: #1c1917;
        }
        .tgl::before {
          content: "";
          position: absolute;
          left: 3.5px;
          top: 3.5px;
          bottom: 3.5px;
          width: calc(50% - 3.5px);
          border-radius: 99px;
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s cubic-bezier(0.3, 0.8, 0.3, 1);
        }
        .book-ui.ls .tgl::before {
          transform: translateX(100%);
        }
        .book-ui.ls .tgl button:first-child {
          color: #78716c;
        }
        .book-ui.ls .tgl button + button {
          color: #1c1917;
        }
        .vw {
          position: relative;
          flex: 1;
          min-height: 0;
        }
        .vw > div {
          position: absolute;
          inset: 0;
          transition: opacity 0.3s;
        }
        /* Read Tab Text Visibility */
        .rv h4 {
          margin: 4px 0 8px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          color: #1c1917;
          font-family: "Source Serif 4", Georgia, serif;
        }
        .rv p {
          margin: 0;
          font-family: "Source Serif 4", Georgia, serif;
          font-size: 14.5px;
          line-height: 1.65;
          color: #292524;
        }
        .dc {
          float: left;
          margin: 2px 7px 0 0;
          font-family: "Source Serif 4", Georgia, serif;
          font-size: 38px;
          line-height: 0.85;
          font-weight: 700;
          color: #92400e;
        }
        /* Listen Tab Text & Controls Visibility */
        .lv {
          opacity: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 2px 0 4px;
          text-align: center;
        }
        .book-ui.ls .rv {
          opacity: 0;
          pointer-events: none;
        }
        .book-ui.ls .lv {
          opacity: 1;
          pointer-events: auto;
        }
        .lv svg {
          width: 54px;
          height: 72px;
          border-radius: 7px;
        }
        .lv h3 {
          font-size: 15px !important;
          font-weight: 700 !important;
          color: #1c1917 !important;
          margin: 4px 0 1px !important;
        }
        .lv small {
          font-size: 12px;
          font-weight: 500;
          color: #78716c;
        }
        .pr {
          width: 100%;
        }
        .sc {
          height: 6px;
          border-radius: 4px;
          background: #e7ded2;
        }
        .sc i {
          display: block;
          height: 100%;
          border-radius: 4px;
          background: #b45309;
          transition: width 0.25s linear;
        }
        .tm {
          display: flex;
          justify-content: space-between;
          margin-top: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #78716c;
        }
        /* Clean, simple Play/Pause Button - simple bg, no border, no zoom */
        .pp {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          border: 0;
          border-radius: 50%;
          background: #ede6dc;
          color: #292524;
          cursor: pointer;
          transition: background 0.15s ease, opacity 0.15s ease;
        }
        .pp:hover {
          background: #e2d9cd;
        }
        .pp:active {
          opacity: 0.85;
        }
        .pp .i {
          width: 22px;
          height: 22px;
        }
        .pp .po {
          margin-left: 2px;
        }
        /* Chapter navigation - Left/Right arrows removed, hidden in Listen mode */
        .clean-chapter {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
          max-height: 44px;
          overflow: hidden;
        }
        .book-ui.ls .clean-chapter {
          display: none !important;
        }
        .clean-chapter .cb {
          text-align: center;
          font-size: 11.5px;
          font-weight: 600;
          color: #78716c;
        }
        .clean-chapter .cb i {
          display: block;
          height: 3.5px;
          margin-bottom: 5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #b45309 25%, #e7ded2 25%);
        }

        /* -------------------------------------------
           CARD 5: Talk with Learners
           ------------------------------------------- */
        .cc {
          display: flex;
          flex-direction: column;
          background: #eef2fa;
        }
        .hd2 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .av2 {
          position: relative;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 35%, #4f46e5, #1e1b4b);
          color: #ffffff;
          flex: none;
        }
        .av2::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid #eef2fa;
        }
        .hd2 small {
          color: #16a34a;
          font-weight: 800;
        }
        .m {
          margin: 0 0 7px;
          padding: 8px 13px;
          width: fit-content;
          max-width: 80%;
          border-radius: 18px;
          background: #fff;
          font-size: 13px;
          font-weight: 700;
        }
        .m.s {
          margin-left: auto;
          background: #111827;
          color: #fff;
        }
        .vm {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 84%;
          padding: 8px 14px 8px 8px;
          border-radius: 24px;
          background: #fff;
        }
        .vm b {
          display: grid;
          place-items: center;
          flex: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
        }
        .vm b svg {
          width: 14px;
          height: 14px;
          fill: #fff;
          margin-left: 2px;
        }
        .vm .i {
          width: 14px;
          height: 14px;
        }
        .vm small {
          margin: 0;
          flex: none;
          font-weight: 700;
        }
        .w2 {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 28px;
        }
        .w2 i {
          flex: none;
          width: 3px;
          height: 60%;
          border-radius: 2px;
          background: #2563eb;
        }
        .w2 i:nth-child(5n + 1) {
          height: 38%;
        }
        .w2 i:nth-child(5n + 2) {
          height: 72%;
        }
        .w2 i:nth-child(5n + 3) {
          height: 100%;
        }
        .w2 i:nth-child(5n + 4) {
          height: 55%;
        }
        .w2 i:nth-child(n + 10) {
          background: #c3cde3;
        }
        .inp {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: auto 0 -2px;
          padding: 5px 5px 5px 5px;
          border-radius: 99px;
          background: #fff;
          border: 1px solid #e3e8f2;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .inp:focus-within {
          border-color: #93b4f8;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
        .inp > b {
          display: grid;
          place-items: center;
          flex: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
        }
        .mi {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          user-select: text;
          -webkit-user-select: text;
          transition: opacity 0.25s ease-out, transform 0.25s ease-out;
        }
        .mi::placeholder {
          color: #5b6577;
        }
        /* Smooth vanish on send */
        .mi.vanishing {
          opacity: 0;
          transform: translateX(12px);
        }
        .sd {
          display: grid;
          place-items: center;
          flex: none;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 50%;
          background: none;
          color: #5b6577;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .inp.has .sd {
          background: #2563eb;
          color: #fff;
        }
        .sd:active {
          transform: scale(0.9);
        }
        .inp .i {
          width: 16px;
          height: 16px;
        }

        /* -------------------------------------------
           RESPONSIVE DESIGN ACROSS ALL DEVICES & SIZES
           ------------------------------------------- */
        @media (max-width: 768px) {
          .lc-stage {
            height: 470px;
            min-height: 470px;
            padding: 14px 0 20px;
          }
          .lc-track {
            gap: 14px;
            height: 435px;
            min-height: 435px;
          }
          .lc-card {
            width: min(340px, calc(100vw - 44px));
            height: 430px;
            min-height: 430px;
            border-radius: 26px;
            padding: 20px 18px 0;
          }
          .lc-card h2 {
            font-size: 21.5px;
            margin-bottom: 4px;
          }
          .lc-card > p {
            font-size: 13px;
          }
          .lc-card .ui {
            top: 106px;
            left: 12px;
            right: 12px;
            padding: 11px;
            border-radius: 20px 20px 0 0;
          }
        }

        @media (max-width: 480px) {
          .lc-stage {
            height: 456px;
            min-height: 456px;
            padding: 10px 0 16px;
          }
          .lc-track {
            gap: 12px;
            height: 426px;
            min-height: 426px;
          }
          .lc-card {
            width: min(320px, calc(100vw - 36px));
            height: 422px;
            min-height: 422px;
            border-radius: 24px;
            padding: 16px 15px 0;
          }
          .lc-card h2 {
            font-size: 20px;
            margin-bottom: 3px;
          }
          .lc-card > p {
            font-size: 12.5px;
            line-height: 1.35;
            max-width: 29ch;
          }
          .lc-card .ui {
            top: 98px;
            left: 10px;
            right: 10px;
            padding: 10px;
            border-radius: 18px 18px 0 0;
          }

          /* Card 0: Reel */
          .info {
            left: 11px;
            right: 56px;
            bottom: 14px;
          }
          .usr {
            gap: 7px;
          }
          .usr b {
            width: 28px;
            height: 28px;
          }
          .usr .i {
            width: 14px;
            height: 14px;
          }
          .usr-name {
            font-size: 13.5px !important;
          }
          .thin-sub {
            margin: 4px 0 0;
            font-size: 11px;
          }
          .cap {
            font-size: 11.5px;
          }
          .rail {
            right: 7px;
            bottom: 12px;
            gap: 7px;
          }
          .rb .i {
            width: 23px;
            height: 23px;
          }

          /* Card 1: Bud */
          .p2 {
            padding-top: 2px;
          }
          .help-text {
            font-size: 17px !important;
            margin: 2px 0 10px !important;
          }
          .g4 {
            gap: 7px;
          }
          .ch {
            min-height: 72px;
            padding: 8px 10px;
            font-size: 11.5px;
            border-radius: 16px;
            gap: 6px;
          }
          .ch i {
            width: 26px;
            height: 26px;
            border-radius: 8px;
          }
          .ch .i {
            width: 15px;
            height: 15px;
          }
          .ask {
            margin-top: 9px;
            padding: 4px 4px 4px 10px;
            font-size: 12px;
          }
          .ask b {
            width: 28px;
            height: 28px;
          }
          .ask .i {
            width: 14px;
            height: 14px;
          }

          /* Card 2: Games */
          .gg {
            gap: 6px;
          }
          .t {
            padding: 5px;
            border-radius: 15px;
            gap: 4px;
          }
          .art {
            height: 48px;
          }
          .art svg {
            width: 52px;
            height: 42px;
          }
          .wd {
            grid-template-columns: repeat(5, 13px);
            gap: 2.5px;
          }
          .wd span {
            height: 14px;
            font-size: 8px;
          }
          .dg {
            gap: 3px;
          }
          .dg i {
            width: 13px;
            height: 17px;
            font-size: 10px;
          }
          .dt {
            gap: 4px;
            margin-top: 4px;
          }
          .dt i {
            width: 6px;
            height: 6px;
          }
          .sg {
            width: 30px;
            height: 30px;
            font-size: 18px;
          }
          .tl b {
            font-size: 11px;
          }
          .tl em {
            font-size: 8.5px;
            padding: 1.5px 5px;
          }
          .mind {
            margin-top: 6px;
            padding: 6px 7px 6px 8px;
            font-size: 11.5px;
            border-radius: 13px;
          }
          .bd {
            width: 15px;
            height: 15px;
          }
          .em {
            padding: 4px 10px;
            font-size: 11.5px;
          }

          /* Card 3: Notes */
          .fl {
            gap: 5px;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .fl button {
            padding: 4px 9px;
            font-size: 11px;
          }
          .nn {
            gap: 6px;
            margin-top: 7px;
          }
          .nn > div {
            padding: 7px 8px;
            min-height: 96px;
            border-radius: 15px;
          }
          .nn b {
            font-size: 11.5px;
          }
          .nn small {
            font-size: 9.5px;
            margin-top: 5px;
          }
          .task-list {
            gap: 4px;
            margin-top: 5px;
          }
          .tick-box {
            width: 14px;
            height: 14px;
          }
          .tick-svg {
            width: 9px;
            height: 9px;
          }
          .task-label {
            font-size: 10px;
          }
          .toast {
            margin-top: 7px;
            padding: 5px 9px 5px 6px;
            font-size: 11.5px;
            border-radius: 12px;
          }
          .toast i {
            width: 23px;
            height: 23px;
            border-radius: 7px;
          }
          .toast .i {
            width: 13px;
            height: 13px;
          }
          .dock {
            bottom: 8px;
            padding: 3.5px;
            gap: 4px;
          }
          .db {
            width: 29px;
            height: 29px;
          }
          .db .i {
            width: 14px;
            height: 14px;
          }

          /* Card 4: Books */
          .tgl {
            width: 78%;
            margin: 0 auto 7px;
            padding: 2.5px;
          }
          .tgl button {
            padding: 4.5px 0;
            font-size: 11.5px;
          }
          .rv h4 {
            margin: 2px 0 5px;
            font-size: 14.5px;
          }
          .rv p {
            font-size: 12.5px;
            line-height: 1.5;
          }
          .dc {
            font-size: 30px;
            margin: 0 5px 0 0;
          }
          .clean-chapter {
            margin-top: 6px;
          }
          .clean-chapter .cb {
            font-size: 10.5px;
          }
          .lv svg {
            width: 46px;
            height: 60px;
          }
          .lv h3 {
            font-size: 13.5px !important;
            margin: 2px 0 0 !important;
          }
          .lv small {
            font-size: 11px;
          }
          .sc {
            height: 5px;
          }
          .tm {
            font-size: 10px;
          }
          .pp {
            width: 44px;
            height: 44px;
          }
          .pp .i {
            width: 19px;
            height: 19px;
          }

          /* Card 5: Chat */
          .hd2 {
            gap: 7px;
            margin-bottom: 7px;
          }
          .av2 {
            width: 30px;
            height: 30px;
          }
          .m {
            padding: 6px 10px;
            font-size: 11.5px;
            margin-bottom: 5px;
            border-radius: 14px;
          }
          .vm {
            width: 88%;
            padding: 5px 9px 5px 5px;
            gap: 7px;
          }
          .vm b {
            width: 27px;
            height: 27px;
          }
          .vm b svg {
            width: 12px;
            height: 12px;
          }
          .vm small {
            font-size: 10.5px;
          }
          .w2 {
            height: 24px;
          }
          .w2 i {
            width: 2.5px;
          }
          .inp {
            padding: 3.5px 4px 3.5px 6px;
            gap: 5px;
          }
          .inp > b {
            width: 27px;
            height: 27px;
          }
          .inp > b .i {
            width: 13px;
            height: 13px;
          }
          .mi {
            font-size: 12.5px;
          }
          .sd {
            width: 27px;
            height: 27px;
          }
          .sd .i {
            width: 14px;
            height: 14px;
          }
        }

        @media (max-width: 360px) {
          .lc-stage {
            height: 440px;
            min-height: 440px;
            padding: 8px 0 14px;
          }
          .lc-track {
            gap: 10px;
            height: 410px;
            min-height: 410px;
          }
          .lc-card {
            width: calc(100vw - 28px);
            max-width: 295px;
            height: 406px;
            min-height: 406px;
            border-radius: 22px;
            padding: 14px 13px 0;
          }
          .lc-card h2 {
            font-size: 18px;
            margin-bottom: 2px;
          }
          .lc-card > p {
            font-size: 11.5px;
            line-height: 1.32;
            max-width: 27ch;
          }
          .lc-card .ui {
            top: 92px;
            left: 7px;
            right: 7px;
            padding: 8px;
            border-radius: 16px 16px 0 0;
          }

          /* Card 0 */
          .info {
            left: 8px;
            right: 48px;
            bottom: 10px;
          }
          .usr b {
            width: 24px;
            height: 24px;
          }
          .usr-name {
            font-size: 12.5px !important;
          }
          .thin-sub {
            font-size: 10px;
          }
          .cap {
            font-size: 10.5px;
          }
          .rail {
            right: 5px;
            bottom: 8px;
            gap: 5px;
          }
          .rb {
            padding: 2px;
          }
          .rb .i {
            width: 20px;
            height: 20px;
          }

          /* Card 1 */
          .help-text {
            font-size: 15px !important;
            margin: 0 0 6px !important;
          }
          .g4 {
            gap: 5px;
          }
          .ch {
            min-height: 64px;
            padding: 6px 7px;
            font-size: 10.5px;
            border-radius: 13px;
          }
          .ch i {
            width: 22px;
            height: 22px;
            border-radius: 6px;
          }
          .ch .i {
            width: 13px;
            height: 13px;
          }
          .ask {
            margin-top: 6px;
            padding: 3px 3px 3px 8px;
            font-size: 11px;
          }
          .ask b {
            width: 24px;
            height: 24px;
          }

          /* Card 2 */
          .gg {
            gap: 4px;
          }
          .t {
            padding: 4px;
            border-radius: 12px;
          }
          .art {
            height: 40px;
          }
          .wd {
            grid-template-columns: repeat(5, 11px);
            gap: 2px;
          }
          .wd span {
            height: 12px;
            font-size: 7.5px;
          }
          .dg i {
            width: 11px;
            height: 15px;
            font-size: 9px;
          }
          .tl b {
            font-size: 10px;
          }
          .tl em {
            font-size: 8px;
            padding: 1px 4px;
          }
          .sg {
            width: 25px;
            height: 25px;
            font-size: 15px;
          }
          .mind {
            padding: 4px 5px 4px 6px;
            font-size: 10.5px;
          }
          .em {
            padding: 3px 8px;
            font-size: 10.5px;
          }

          /* Card 3 */
          .fl button {
            padding: 3px 7px;
            font-size: 10px;
          }
          .nn {
            gap: 4px;
          }
          .nn > div {
            padding: 6px 6px;
            min-height: 88px;
          }
          .nn b {
            font-size: 11px;
          }
          .task-label {
            font-size: 9.5px;
          }
          .toast {
            margin-top: 6px;
            padding: 4px 6px;
            font-size: 10.5px;
          }
          .dock {
            bottom: 6px;
            padding: 3px;
          }
          .db {
            width: 26px;
            height: 26px;
          }

          /* Card 4 */
          .tgl {
            width: 82%;
            margin-bottom: 5px;
          }
          .rv h4 {
            font-size: 13.5px;
            margin: 1px 0 3px;
          }
          .rv p {
            font-size: 11.5px;
            line-height: 1.4;
          }
          .dc {
            font-size: 26px;
          }
          .lv svg {
            width: 40px;
            height: 52px;
          }
          .lv h3 {
            font-size: 12.5px !important;
          }
          .pp {
            width: 38px;
            height: 38px;
          }
          .pp .i {
            width: 17px;
            height: 17px;
          }

          /* Card 5 */
          .hd2 {
            gap: 6px;
            margin-bottom: 5px;
          }
          .av2 {
            width: 26px;
            height: 26px;
          }
          .m {
            padding: 5px 8px;
            font-size: 10.5px;
          }
          .vm {
            width: 92%;
            padding: 4px 6px;
          }
          .vm b {
            width: 24px;
            height: 24px;
          }
          .inp {
            padding: 2.5px 3px 2.5px 5px;
          }
          .inp > b {
            width: 24px;
            height: 24px;
          }
          .mi {
            font-size: 11.5px;
          }
          .sd {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
}
