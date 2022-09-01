class Producto {
    constructor(producto){
        this.id = (producto && producto.id) ? producto.id : 0; 
        this.timestamp = (producto && producto.timestamp) ? producto.timestamp : new Date();
        this.nombre = (producto && producto.nombre) ? producto.nombre : '';
        this.descripcion = (producto && producto.descripcion) ? producto.descripcion : '';
        this.codigo = (producto && producto.codigo) ? producto.codigo : '';
        this.foto = (producto && producto.foto) ? producto.foto : '';
        this.precio = (producto && producto.precio) ? producto.precio : 0;
        this.stock = (producto && producto.stock) ? producto.stock : 0;
    }
}

module.exports = {Producto}