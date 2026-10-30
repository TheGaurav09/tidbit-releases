/**
 * TidBit Landing Page Interactive Systems
 * Powers Phone Mockup Switcher, Bud AI Playground, Theme Toggle & Modals.
 * Zero external libraries — pure vanilla ES6.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPhoneSimulator();
  initBudPlayground();
  initGlassDock();
  initModals();
  initSmoothScroll();
});

/* =========================================================
   1. THEME TOGGLE (Dark / Light)
   ========================================================= */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('tidbit-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tidbit-theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

/* =========================================================
   2. PHONE SIMULATOR (Live Screen Switcher)
   ========================================================= */
function initPhoneSimulator() {
  const tabs = document.querySelectorAll('.phone-tab-btn');
  const screens = document.querySelectorAll('.phone-screen-card');
  if (!tabs.length || !screens.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetScreen = tab.getAttribute('data-screen');

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch screen view
      screens.forEach(screen => {
        if (screen.id === `screen-${targetScreen}`) {
          screen.classList.add('active');
        } else {
          screen.classList.remove('active');
        }
      });
    });
  });
}

/* =========================================================
   3. BUD AI PLAYGROUND (Interactive Quiz & Flashcard)
   ========================================================= */
const BUD_DEMO_DATA = {
  quantum: {
    title: "Quantum Superposition & Entanglement",
    badge: "Physics & CS",
    time: "45 sec breakdown",
    summary: "In quantum systems, particles remain in multiple states simultaneously until measured. Entangled pairs exhibit instantaneous state correlation regardless of physical separation.",
    quiz: {
      question: "What occurs to a qubit in superposition the exact instant it is measured?",
      options: [
        { text: "It remains in both states infinitely", correct: false, expl: "Measurement forces the wave function to collapse into a definite eigenstate." },
        { text: "It collapses into a single definite state (0 or 1)", correct: true, expl: "Correct! The act of observation forces the probabilistic wave function into a single state." },
        { text: "It is destroyed by thermal radiation", correct: false, expl: "The qubit is not destroyed; its quantum state becomes classical information." }
      ]
    },
    flashcard: {
      front: "What is 'Quantum Decoherence'?",
      back: "Decoherence is the loss of quantum coherence when a quantum system interacts with its surrounding environment, causing it to behave classically."
    }
  },
  crispr: {
    title: "CRISPR-Cas9 Gene Editing",
    badge: "Genetics & Biotech",
    time: "60 sec breakdown",
    summary: "CRISPR uses a guide RNA (gRNA) molecule matching the target DNA sequence paired with the Cas9 enzyme which acts as molecular scissors to cut and replace genetic code.",
    quiz: {
      question: "What is the primary role of the 'Guide RNA' in the CRISPR-Cas9 complex?",
      options: [
        { text: "It slices through double-stranded DNA", correct: false, expl: "Cas9 is the nuclease that performs the physical cut, not the guide RNA." },
        { text: "It directs Cas9 to the precise matching genomic address", correct: true, expl: "Spot on! The gRNA has a complementary 20-base sequence directing Cas9 to the exact coordinate." },
        { text: "It repairs damaged DNA strands", correct: false, expl: "Cellular repair mechanisms (NHEJ or HDR) perform repair after Cas9 cuts." }
      ]
    },
    flashcard: {
      front: "What is the 'PAM' sequence?",
      back: "Protospacer Adjacent Motif (PAM) is a short 2-6 base pair sequence immediately following the DNA target that Cas9 requires to bind and cut."
    }
  },
  relativity: {
    title: "Gravitational Time Dilation",
    badge: "Astrophysics",
    time: "50 sec breakdown",
    summary: "General Relativity demonstrates that mass curves spacetime. Clocks closer to massive gravitational bodies tick measurably slower relative to distant observers.",
    quiz: {
      question: "Why do GPS satellites need relativistic time corrections every day?",
      options: [
        { text: "Their clocks tick ~38 microseconds faster per day in weaker gravity", correct: true, expl: "Exactly! Without general and special relativistic corrections, GPS drift would accumulate kilometers of error per day." },
        { text: "Solar wind pushes satellite batteries off timing", correct: false, expl: "This is purely a gravitational and velocity time dilation effect, not battery decay." },
        { text: "Atmospheric refraction delays satellite radio waves", correct: false, expl: "Atmospheric refraction is corrected separately from the on-board atomic clock dilation." }
      ]
    },
    flashcard: {
      front: "What is the Equivalence Principle?",
      back: "Einstein's principle stating that the physical effects of a gravitational field are indistinguishable from uniform acceleration in flat spacetime."
    }
  }
};

function initBudPlayground() {
  const topicPills = document.querySelectorAll('.bud-topic-pill');
  if (!topicPills.length) return;

  const titleEl = document.getElementById('demoTopicTitle');
  const badgeEl = document.getElementById('demoTopicBadge');
  const summaryEl = document.getElementById('demoTopicSummary');
  const questionEl = document.getElementById('demoQuizQuestion');
  const optionsContainer = document.getElementById('demoQuizOptions');
  const feedbackEl = document.getElementById('demoQuizFeedback');
  const flashcardFront = document.getElementById('flashcardFront');
  const flashcardBack = document.getElementById('flashcardBack');
  const flashcardEl = document.getElementById('demoFlashcard');
  const flipBtn = document.getElementById('btnFlipCard');

  function loadTopic(key) {
    const data = BUD_DEMO_DATA[key];
    if (!data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (summaryEl) summaryEl.textContent = data.summary;
    if (questionEl) questionEl.textContent = data.quiz.question;
    if (flashcardFront) flashcardFront.textContent = data.flashcard.front;
    if (flashcardBack) flashcardBack.textContent = data.flashcard.back;

    // Reset feedback
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.innerHTML = '';
    }

    // Reset flashcard flip
    if (flashcardEl) {
      flashcardEl.classList.remove('flipped');
    }

    // Populate options
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      data.quiz.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<span class="opt-index">${String.fromCharCode(65 + idx)}</span> <span class="opt-text">${opt.text}</span>`;
        btn.addEventListener('click', () => {
          handleQuizAnswer(btn, opt, optionsContainer, feedbackEl);
        });
        optionsContainer.appendChild(btn);
      });
    }
  }

  function handleQuizAnswer(selectedBtn, option, container, feedback) {
    const allButtons = container.querySelectorAll('.quiz-option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (option.correct) {
      selectedBtn.classList.add('correct');
      feedback.className = 'quiz-feedback correct';
      feedback.innerHTML = `<strong>Correct!</strong> ${option.expl}`;
    } else {
      selectedBtn.classList.add('incorrect');
      feedback.className = 'quiz-feedback incorrect';
      feedback.innerHTML = `<strong>Not quite:</strong> ${option.expl}`;
    }
    feedback.style.display = 'block';
  }

  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topicPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const topicKey = pill.getAttribute('data-topic');
      loadTopic(topicKey);
    });
  });

  // Flip card
  if (flipBtn && flashcardEl) {
    flipBtn.addEventListener('click', () => {
      flashcardEl.classList.toggle('flipped');
    });
  }

  // Initial load
  loadTopic('quantum');
}

/* =========================================================
   4. FLOATING GLASS DOCK (Mobile & Interactive)
   ========================================================= */
function initGlassDock() {
  const dockItems = document.querySelectorAll('.dock-item');
  if (!dockItems.length) return;

  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* =========================================================
   5. MODALS (Waitlist & QR Code)
   ========================================================= */
function initModals() {
  // Waitlist Modal
  const openWaitlistBtns = document.querySelectorAll('[data-open-waitlist]');
  const waitlistModal = document.getElementById('waitlistModal');
  const closeWaitlistBtn = document.getElementById('closeWaitlistBtn');
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistSuccess = document.getElementById('waitlistSuccess');

  openWaitlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (waitlistModal) waitlistModal.classList.add('open');
    });
  });

  if (closeWaitlistBtn && waitlistModal) {
    closeWaitlistBtn.addEventListener('click', () => {
      waitlistModal.classList.remove('open');
    });
  }

  if (waitlistForm && waitlistSuccess) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = waitlistForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        waitlistForm.style.display = 'none';
        waitlistSuccess.style.display = 'block';
      }
    });
  }

  // QR Modal
  const openQrBtns = document.querySelectorAll('[data-open-qr]');
  const qrModal = document.getElementById('qrModal');
  const closeQrBtn = document.getElementById('closeQrBtn');

  openQrBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (qrModal) qrModal.classList.add('open');
    });
  });

  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.remove('open');
    });
  }

  // Close modals on outside click or Escape key
  window.addEventListener('click', (e) => {
    if (e.target === waitlistModal) waitlistModal.classList.remove('open');
    if (e.target === qrModal) qrModal.classList.remove('open');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (waitlistModal) waitlistModal.classList.remove('open');
      if (qrModal) qrModal.classList.remove('open');
    }
  });
}

/* =========================================================
   6. SMOOTH SCROLL FOR NAV LINKS
   ========================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

