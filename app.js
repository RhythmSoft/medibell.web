// MediBell Interactive Scripts (Matching Claude Artifact UI)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Manager
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('medibell-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
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

  // 2. Navbar Scroll Shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isBlock = navMenu.style.display === 'flex';
      navMenu.style.display = isBlock ? 'none' : 'flex';
      if (!isBlock) {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--surface)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '20px';
        navMenu.style.boxShadow = 'var(--shadow-lg)';
        navMenu.style.borderBottom = '1px solid var(--border)';
      }
    });
  }

  // 4. Interactive 3D Phone Tilt (Desktop)
  const phoneContainer = document.getElementById('hero-phone');
  if (phoneContainer && window.matchMedia('(pointer: fine)').matches) {
    const parentCol = phoneContainer.closest('.hero-mockup-col');
    if (parentCol) {
      parentCol.addEventListener('mousemove', (e) => {
        const rect = parentCol.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        phoneContainer.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      parentCol.addEventListener('mouseleave', () => {
        phoneContainer.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    }
  }

  // 5. Interactive "Taken" Demo Button on Mockup
  const takenBtn = document.getElementById('mock-take-btn');
  if (takenBtn) {
    takenBtn.addEventListener('click', () => {
      const originalText = takenBtn.textContent;
      takenBtn.textContent = '🎉 Dose Recorded!';
      takenBtn.style.background = '#10B981';
      takenBtn.style.color = '#FFFFFF';
      setTimeout(() => {
        takenBtn.textContent = originalText;
        takenBtn.style.background = '';
        takenBtn.style.color = '';
      }, 2500);
    });
  }

  // 6. Day Chips Toggle in Bento Grid
  const dayChips = document.querySelectorAll('.day-chip');
  dayChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // 7. FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const headerBtn = card.querySelector('.faq-header-btn');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        faqCards.forEach(c => c.classList.remove('open'));
        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });

  // 8. Privacy Policy Language Switcher (for privacy.html)
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
});
