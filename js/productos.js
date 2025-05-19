fetch('../productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(productos => {
        const contenedorProductos = document.getElementById('productos-container');
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartItemsContainer = document.createElement('div');
        cartItemsContainer.classList.add('cart-sidebar__items');
        cartSidebar.insertBefore(cartItemsContainer, cartSidebar.querySelector('.cart-sidebar__footer'));
        const cartTotalElement = cartSidebar.querySelector('.cart-sidebar__total span:last-child');
        const cartEmptyMessage = cartSidebar.querySelector('.cart-sidebar__empty');
        const cartCloseButton = document.getElementById('cart-close');
        const cartButton = document.getElementById('cart-btn');
        const cartCountSpan = document.createElement('span');
        cartCountSpan.classList.add('cart-count');
        cartButton.appendChild(cartCountSpan);


        function agregarCarrito(producto) {
            const existe = carrito.find(item => item.id === producto.id);
            if (existe) {
                existe.cantidad += 1;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log(`Producto "${producto.nombre}" añadido al carrito. Nuevo carrito:`, carrito);
            actualizarContadorCarrito();
            actualizarCarritoVisual();
            cartEmptyMessage.style.display = carrito.length === 0 ? 'block' : 'none';
        }

        function actualizarContadorCarrito() {
            const contadorCarrito = document.getElementById('contador-carrito');
            const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
            if (contadorCarrito) {
                contadorCarrito.textContent = totalItems;
            }
            cartCountSpan.textContent = totalItems > 0 ? totalItems : '';
            cartCountSpan.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }

        function actualizarCarritoVisual() {
            cartItemsContainer.innerHTML = '';
            let totalCarrito = 0;

            if (carrito.length === 0) {
                cartEmptyMessage.style.display = 'block';
            } else {
                cartEmptyMessage.style.display = 'none';
                carrito.forEach(item => {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <img src="${item.foto}" alt="${item.nombre}" class="cart-item__image">
                        <div class="cart-item__details">
                            <h4 class="cart-item__title">${item.nombre}</h4>
                            <p class="cart-item__price">$${item.precio}</p>
                            <div class="cart-item__quantity">
                                <button class="cart-item__quantity-btn quantity-minus" data-id="${item.id}">-</button>
                                <span class="cart-item__quantity-count">${item.cantidad}</span>
                                <button class="cart-item__quantity-btn quantity-plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="cart-item__remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                    totalCarrito += item.precio * item.cantidad;
                });
            }
            cartTotalElement.textContent = `$${totalCarrito.toFixed(2)}`;
        }

        productos.forEach(producto => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('product-card__image');
            const imageLink = document.createElement('a');
            imageLink.href = producto.url || '#';
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
            priceSpan.textContent = `$${producto.precio}`;

            const addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn--small', 'btn--primary');
            addButton.textContent = 'Añadir';
            addButton.addEventListener('click', () => agregarCarrito(producto));

            footerContainer.appendChild(priceSpan);
            footerContainer.appendChild(addButton);

            contentContainer.appendChild(titleLink);
            contentContainer.appendChild(footerContainer);

            productCard.appendChild(imageContainer);
            productCard.appendChild(contentContainer);

            contenedorProductos.appendChild(productCard);
        });

        cartItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const itemId = target.dataset.id;

            if (target.classList.contains('cart-item__quantity-btn')) { // Changed to cart-item__quantity-btn
                const item = carrito.find(i => i.id === itemId);
                if (item) {
                    if (target.classList.contains('quantity-minus')) { // Distinguish between + and -
                        if (item.cantidad > 1) {
                            item.cantidad -= 1;
                        }
                    } else if (target.classList.contains('quantity-plus')) {
                        item.cantidad += 1;
                    }
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarCarritoVisual();
                    actualizarContadorCarrito();
                }
            } else if (target.classList.contains('cart-item__remove')) {
                carrito = carrito.filter(i => i.id !== itemId);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarritoVisual();
                actualizarContadorCarrito();
                cartEmptyMessage.style.display = carrito.length === 0 ? 'block' : 'none';
            }
        });

        cartCloseButton.addEventListener('click', () => {
            cartSidebar.classList.remove('cart-sidebar--active');
        });

        cartButton.addEventListener('click', () => {
            cartSidebar.classList.add('cart-sidebar--active');
        });

        actualizarContadorCarrito();
        actualizarCarritoVisual();
    })
    .catch(error => {
        console.error('Hubo un error al cargar los productos:', error);
        const contenedorProductos = document.getElementById('productos-container');
        contenedorProductos.innerHTML = '<p>No se pudieron cargar los productos.</p>';
    });