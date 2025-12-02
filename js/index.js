// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme
function initializeTheme() {
  if (savedTheme) {
    if (savedTheme === 'light') {
      body.classList.remove('dark-theme');
    } else {
      body.classList.add('dark-theme');
    }
  } else if (prefersDarkScheme.matches) {
    body.classList.add('dark-theme');
  } else {
    // Default to dark theme for this portfolio
    body.classList.add('dark-theme');
  }
}

// Toggle theme
function toggleTheme() {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// Event listeners
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
});

// Initialize on page load
initializeTheme();

// Pagination Functionality
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
    
    const items = container.querySelectorAll('[data-page]');
    const pages = new Set();
    
    items.forEach(item => pages.add(parseInt(item.dataset.page)));
    const totalPages = Math.max(...pages);
    let currentPage = 1;
    
    // Update total pages display
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
    
    function showPage(page) {
      items.forEach(item => {
        if (parseInt(item.dataset.page) === page) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      currentPage = page;
      if (currentPageSpan) currentPageSpan.textContent = page;
      
      // Update button states
      if (prevBtn) prevBtn.disabled = page === 1;
      if (nextBtn) nextBtn.disabled = page === totalPages;
    }
    
    // Initialize first page
    showPage(1);
    
    // Event listeners
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

// Initialize pagination on page load
initializePagination();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  
  // Set initial opacity for smooth load
  if (!img.complete) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  }
});

// Console message
console.log('%c👋 Welcome to Christian\'s Portfolio!', 'font-size: 16px; font-weight: bold; color: #4dabf7;');
console.log('%cFeel free to check out the source code on GitHub!', 'font-size: 12px; color: #888;');