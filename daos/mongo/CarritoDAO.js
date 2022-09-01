const {Carrito} = require('../../entitys/carritoEntity');
const config = require('../../config.json');
const ProductoController = require('../../controller/productoController');

class CarritoDAO{
    constructor(){
    }
    
    getCarrito(id){        
        console.log('No está implementado mongo getCarrito');
    }

    createCarrito(){
        console.log('No está implementado mongo createCarrito');
    }

    deleteCarrito(id){
        console.log('No está implementado mongo deleteCarrito');
    }

    addProductos(idCarrito, productos){
        console.log('No está implementado mongo addProductos');
    }

    deleteProducto(idCarrito,idProducto){
        console.log('No está implementado mongo deleteProducto');
    }
}

module.exports = CarritoDAO;