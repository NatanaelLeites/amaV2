  // Mobile menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');

  // Cart sidebar
  const cartBtn = document.getElementById('cart-btn');
  const cartClose = document.getElementById('cart-close');
  const cartSidebar = document.getElementById('cart-sidebar');

  // Toggle mobile menu
  if (mobileToggle && mobileClose && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    mobileClose.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Toggle cart sidebar
  if (cartBtn && cartClose && cartSidebar) {
    cartBtn.addEventListener('click', function () {
      cartSidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    cartClose.addEventListener('click', function () {
      cartSidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menus when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function () {
      if (mobileMenu) mobileMenu.classList.remove('active');
      if (cartSidebar) cartSidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }