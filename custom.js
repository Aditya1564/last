document.addEventListener("DOMContentLoaded", function() {
  // Direct DOM manipulation approach
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;
  
  // Only continue if the required elements are present
  if (!hamburger || !mobileNav) {
    console.log('Mobile menu elements not found');
    return; // Exit early if elements aren't found
  }
  
  // Mobile navigation toggle (hamburger click)
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Toggle mobile navigation
    if (mobileNav.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  // Helper functions for mobile menu
  function openMobileMenu() {
    mobileNav.classList.add('open');
    mobileNav.style.right = '0px';
    body.classList.add('menu-open');
    if (menuOverlay) {
      menuOverlay.style.opacity = '1';
      menuOverlay.style.pointerEvents = 'auto';
    }
    console.log('Mobile menu opened');
  }
  
  function closeMobileMenu() {
    body.classList.remove('menu-open');
    if (menuOverlay) {
      menuOverlay.style.opacity = '0';
      menuOverlay.style.pointerEvents = 'none';
      menuOverlay.style.visibility = 'hidden';
    }
    
    // First set right position with animation
    mobileNav.style.right = '-320px';
    
    // After transition completes, remove open class
    setTimeout(() => {
      mobileNav.classList.remove('open');
    }, 800); // Match CSS transition time
    
    console.log('Mobile menu closed');
  }
  
  // Close menu when clicking the overlay (with additional null check)
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
  }
  
  // All dropdown functionality has been removed
});