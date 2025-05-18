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
            priceSpan.textContent = `$ ${producto.precio}`;

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