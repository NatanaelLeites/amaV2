document.addEventListener('DOMContentLoaded', function () {
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

  // Product wishlist functionality
  /* const wishlistButtons = document.querySelectorAll('.product-card__wishlist');

  wishlistButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Toggle active class for visual feedback
      this.classList.toggle('active');

      // Here you would typically add logic to save the wishlist state
      // For example, sending an AJAX request to your backend
      console.log('Product added to wishlist');
    });
  }); */

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.product-card__footer .btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Get product info
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-card__title').textContent;
      const productPrice = productCard.querySelector('.product-card__price').textContent;

      // Here you would typically add the product to the cart
      // For example, updating a cart object and refreshing the UI
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

  /* productos */
  fetch('../productos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(productos => {
      const contenedorProductos = document.getElementById('productos-container');

      productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-card__image');
        const imageLink = document.createElement('a');
        imageLink.src = producto.foto;
        imageLink.alt = producto.nombre;
        const image = document.createElement('img');
        image.src = producto.foto;
        image.alt = producto.nombre;

        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);


        const contentContainer = document.createElement('div');
        contentContainer.classList.add('product-card__content');
        const titleLink = document.createElement('a');
        titleLink.href = producto.url || '#';
        titleLink.classList.add('product-card__title');
        titleLink.textContent = producto.nombre;

        const footerContainer = document.createElement('div');
        footerContainer.classList.add('product-card__footer');

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('product-card__price');
        priceSpan.textContent = producto.precio;

        const addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn--small', 'btn--primary');
        addButton.textContent = 'Añadir';
        // Aquí puedes agregar la lógica para añadir al carrito si lo necesitas
        addButton.addEventListener('click', () => {
          console.log(`Producto "${producto.nombre}" añadido al carrito.`);
          // Implementa tu lógica de carrito aquí
        });

        footerContainer.appendChild(priceSpan);
        footerContainer.appendChild(addButton);

        contentContainer.appendChild(titleLink);
        contentContainer.appendChild(footerContainer);

        productCard.appendChild(imageContainer);
        productCard.appendChild(contentContainer);

        contenedorProductos.appendChild(productCard);
        
      });
    })
    .catch(error => {
      console.error('Hubo un error al cargar los productos:', error);
      const contenedorProductos = document.getElementById('contenedor-productos');
      contenedorProductos.innerHTML = '<p>No se pudieron cargar los productos.</p>';
    });

  // Initial call and on resize
  handleResponsiveImages();
  window.addEventListener('resize', handleResponsiveImages);
});