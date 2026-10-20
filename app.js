// MediBell Interactive & Animated Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Manager (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('medibell-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }

  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (systemPrefersDark) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('medibell-theme', newTheme);
    });
  }

  // 2. Navbar Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .reveal-fade-in, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. 3D Tilt Effect on Hero Phone Mockup (Desktop)
  const mockupWrapper = document.querySelector('.mockup-wrapper');
  const phoneDevice = document.querySelector('.phone-device');

  if (mockupWrapper && phoneDevice && window.matchMedia('(pointer: fine)').matches) {
    mockupWrapper.addEventListener('mousemove', (e) => {
      const rect = mockupWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      phoneDevice.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    mockupWrapper.addEventListener('mouseleave', () => {
      phoneDevice.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 6. Interactive Alarm Sound & Vibration Simulator
  const simBtn = document.getElementById('sim-alarm-btn');
  let audioCtx = null;
  let isAlarmRinging = false;
  let ringInterval = null;

  function playChimeNote(freq, startTime, duration) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      // Audio not permitted or interrupted
    }
  }

  function ringAlarmCycle() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    playChimeNote(587.33, now, 0.25); // D5
    playChimeNote(880.00, now + 0.15, 0.35); // A5
    playChimeNote(1174.66, now + 0.35, 0.45); // D6
  }

  if (simBtn && phoneDevice) {
    simBtn.addEventListener('click', () => {
      if (!isAlarmRinging) {
        // Start Alarm Simulation
        isAlarmRinging = true;
        phoneDevice.classList.add('vibrating');
        simBtn.classList.add('active');
        simBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"></rect>
          </svg>
          Stop Alarm Ringing
        `;

        try {
          if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          ringAlarmCycle();
          ringInterval = setInterval(ringAlarmCycle, 1400);
        } catch (e) {}

        // Auto stop after 7 seconds
        setTimeout(() => {
          if (isAlarmRinging) {
            stopAlarmSimulation();
          }
        }, 7000);
      } else {
        stopAlarmSimulation();
      }
    });

    function stopAlarmSimulation() {
      isAlarmRinging = false;
      phoneDevice.classList.remove('vibrating');
      simBtn.classList.remove('active');
      if (ringInterval) clearInterval(ringInterval);
      simBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        Simulate Alarm
      `;
    }
  }

  // 7. Animated Number Counters (for Stats)
  const counterElements = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          let count = 0;
          const duration = 1200;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.textContent = `${prefix}${target}${suffix}`;
              clearInterval(timer);
            } else {
              el.textContent = `${prefix}${Math.floor(count)}${suffix}`;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 9. Privacy Policy Language Switcher (EN / HI)
  const langEnBtn = document.getElementById('lang-en-btn');
  const langHiBtn = document.getElementById('lang-hi-btn');
  const policyEn = document.getElementById('policy-content-en');
  const policyHi = document.getElementById('policy-content-hi');

  if (langEnBtn && langHiBtn && policyEn && policyHi) {
    langEnBtn.addEventListener('click', () => {
      langEnBtn.classList.add('active');
      langHiBtn.classList.remove('active');
      policyEn.style.display = 'block';
      policyHi.style.display = 'none';
    });

    langHiBtn.addEventListener('click', () => {
      langHiBtn.classList.add('active');
      langEnBtn.classList.remove('active');
      policyEn.style.display = 'none';
      policyHi.style.display = 'block';
    });
  }

  // 10. Screenshot Category Filter
  const tabs = document.querySelectorAll('.showcase-tab');
  const items = document.querySelectorAll('.showcase-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter');

      items.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = 'block';
          item.style.animation = 'scaleIn 0.35s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
