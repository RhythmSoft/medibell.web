// MediBell Interactive Scripts
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

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. FAQ Accordion
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

  // 4. Privacy Policy Language Switcher (EN / HI)
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

  // 5. Screenshot Category Filter (for Landing Page)
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
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

