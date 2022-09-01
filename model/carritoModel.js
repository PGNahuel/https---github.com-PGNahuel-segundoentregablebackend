/*
El carrito de compras tendrá la siguiente estructura:

7. El timestamp puede implementarse con Date.now()
8. Realizar la persistencia de productos y del carrito de compras en el filesystem.
*/
const { json } = require('express');
const fs = require('fs');
const {Carrito} = require('../entitys/carritoEntity');
const {ProductoController} = require('../controller/productoController');
const config = require('../config.json');

// Inicializo el dao, por defecto agarra el filesystem
let DAO = require('../daos/filesystem/CarritoDAO')

// Si viene por mongo o firebase, lo cambio.
if (config.Persistencia == 'firebase' || config.Persistencia == 'mongo')
    DAO = require(`../daos/${config.Persistencia}/CarritoDAO`)

class CarritoModel{
    constructor(){
        this.carritoDAO = new DAO();
    }

    getCarrito(id){        
        return this.carritoDAO.getCarrito(id);
    }

    createCarrito(){
        return this.carritoDAO.createCarrito();
    }

    deleteCarrito(id){
        return this.carritoDAO.deleteCarrito(id);
    }

    addProductos(idCarrito, productos){
        return this.carritoDAO.addProductos(idCarrito,productos);
    }

    deleteProducto(idCarrito,idProducto){
        return this.carritoDAO.deleteProducto(idCarrito,idProducto);
    }
}

module.exports = CarritoModel;