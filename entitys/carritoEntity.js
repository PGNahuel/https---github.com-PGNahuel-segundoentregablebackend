const {Producto} = require('./productoEntity');

class Carrito {
    constructor(carrito){
        this.id = (carrito && carrito.id) ? carrito.id : 1;
        this.timestamp = (carrito && carrito.timestamp) ? carrito.timestamp : new Date();
        this.productos = (carrito && carrito.productos) ? carrito.productos : [];
    }

    addProducto(producto){
        this.productos.add(new Producto(producto));
    }
}

module.exports = {Carrito}