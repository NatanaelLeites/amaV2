function agregarCarrito(producto) {
  const memoria = localStorage.getItem("productos")
  if (memoria === null) {
    const nuevoProducto = producto
    nuevoProducto.cantidad = 1
    localStorage.setItem("productos", JSON.stringify(nuevoProducto))
  }
}