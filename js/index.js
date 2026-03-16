// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function getSavedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // localStorage unavailable (private browsing, etc.) — silently ignore
  }
}

function toggleTheme() {
  const isDark = root.classList.contains('dark-theme');
  root.classList.toggle('dark-theme', !isDark);
  saveTheme(!isDark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Sync with system preference if no saved preference
prefersDarkScheme.addEventListener('change', (e) => {
  if (!getSavedTheme()) {
    root.classList.toggle('dark-theme', e.matches);
  }
});

// ============================================
// PAGINATION
// ============================================
function initializePagination() {
  const paginationContainers = document.querySelectorAll('.paginated-container');

  paginationContainers.forEach(container => {
    const containerId = container.id;
    const controls = document.querySelector(`.pagination-controls[data-target="${containerId}"]`);

    if (!controls) return;

    const prevBtn = controls.querySelector('.pagination-btn.prev');
    const nextBtn = controls.querySelector('.pagination-btn.next');
    const currentPageSpan = controls.querySelector('.current-page');
    const totalPagesSpan = controls.querySelector('.total-pages');
    const announceEl = controls.querySelector('.pagination-announce');

    const items = container.querySelectorAll('[data-page]');

    // Guard: nothing to paginate
    if (items.length === 0) return;

    const pages = new Set();
    items.forEach(item => pages.add(parseInt(item.dataset.page)));
    const totalPages = Math.max(...pages);
    let currentPage = 1;

    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;

    function showPage(page) {
      items.forEach(item => {
        const isActive = parseInt(item.dataset.page) === page;
        item.classList.toggle('active', isActive);
      });

      currentPage = page;
      if (currentPageSpan) currentPageSpan.textContent = page;

      // Announce page change to screen readers
      if (announceEl) {
        announceEl.textContent = `Page ${page} of ${totalPages}`;
      }

      if (prevBtn) prevBtn.disabled = page === 1;
      if (nextBtn) nextBtn.disabled = page === totalPages;
    }

    // Init first page
    showPage(1);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) showPage(currentPage - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) showPage(currentPage + 1);
      });
    }
  });
}

initializePagination();

// ============================================
// NDA PROJECT MODAL
// ============================================
const ndaCard = document.getElementById('ndaProjectCard');
const ndaModal = document.getElementById('ndaModal');
const ndaModalClose = document.getElementById('ndaModalClose');

function openNdaModal() {
  if (!ndaModal) return;
  ndaModal.classList.add('active');
  ndaModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (ndaModalClose) ndaModalClose.focus();
}

function closeNdaModal() {
  if (!ndaModal) return;
  ndaModal.classList.remove('active');
  ndaModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (ndaCard) ndaCard.focus();
}

if (ndaCard) {
  ndaCard.addEventListener('click', openNdaModal);
  ndaCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openNdaModal();
    }
  });
}

if (ndaModalClose) {
  ndaModalClose.addEventListener('click', closeNdaModal);
}

if (ndaModal) {
  // Close on backdrop click
  ndaModal.addEventListener('click', (e) => {
    if (e.target === ndaModal) closeNdaModal();
  });
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ndaModal.classList.contains('active')) {
      closeNdaModal();
    }
    // Focus trap: keep Tab within modal while open
    if (e.key === 'Tab' && ndaModal.classList.contains('active')) {
      const focusable = ndaModal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  });
}

// ============================================
// IMAGE LOADING ANIMATION
// ============================================
document.querySelectorAll('img').forEach(img => {
  if (!img.complete) {
    img.classList.add('img-loading');
    img.addEventListener('load', function () {
      this.classList.remove('img-loading');
      this.classList.add('img-loaded');
    }, { once: true });
    img.addEventListener('error', function () {
      this.classList.remove('img-loading');
    }, { once: true });
  }
});

// ============================================
// SMOOTH SCROLL — honour prefers-reduced-motion
// ============================================
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c👋 Welcome to Christian\'s Portfolio!', 'font-size: 16px; font-weight: bold; color: #4dabf7;');
console.log('%cFeel free to check out the source code on GitHub!', 'font-size: 12px; color: #888;');