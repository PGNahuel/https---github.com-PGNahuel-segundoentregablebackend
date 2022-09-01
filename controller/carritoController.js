const model = require('../model/carritoModel');

class CarritoController{
    constructor(){
        this.id = 0;
        this.CarritoModel = new model();
    }

    getAll(idCarrito){
        const carrito = this.CarritoModel.getCarrito(idCarrito);
        
        if(carrito){
            return carrito.productos;
        }else{
            return {error:-1, mensaje:'El ID del carrito indicado no existe.'}
        }
    }

    add(){
        const carritoNuevo = this.CarritoModel.createCarrito();

        return carritoNuevo.id;
    }

    delete(id){
        const rta = this.CarritoModel.deleteCarrito(id);

        return rta;
    }

    addProductos(idCarrito,productos){
        const rta = this.CarritoModel.addProductos(idCarrito,productos);

        return rta;
    }

    deleteProducto(idCarrito,idProducto){
        const rta = this.CarritoModel.deleteProducto(idCarrito,idProducto);

        return rta;
    }


}

module.exports = CarritoController;