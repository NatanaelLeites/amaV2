document.addEventListener('DOMContentLoaded', function () {
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.product-card__footer .btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Get product info
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-card__title').textContent;
      const productPriceText = productCard.querySelector('.product-card__price').textContent;

      // Eliminar el signo de dólar y convertir a número
      const productPrice = parseFloat(productPriceText.replace('$', ''));
      const productImage = productCard.querySelector('.product-card__image img').src; // Obtener la URL de la imagen

      addToCart(productName, productPrice, productImage);
      console.log('Added to cart:', productName, productPrice);

      // Show feedback
      const originalText = this.textContent;
      this.textContent = '¡Añadido!';

      // Reset button text after a delay
      setTimeout(() => {
        this.textContent = originalText;
      }, 1500);

      // Open cart sidebar
      if (cartSidebar) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#') {
        e.preventDefault();

        const targetElement = document.querySelector(href);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Responsive image loading
  function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
      // Set the src attribute based on screen size
      if (window.innerWidth < 768 && img.getAttribute('data-src-mobile')) {
        img.src = img.getAttribute('data-src-mobile');
      } else {
        img.src = img.getAttribute('data-src');
      }

      // Remove data attributes to prevent future processing
      img.removeAttribute('data-src');
      img.removeAttribute('data-src-mobile');
    });
  }

  // Initial call and on resize
  handleResponsiveImages();
  window.addEventListener('resize', handleResponsiveImages);
});