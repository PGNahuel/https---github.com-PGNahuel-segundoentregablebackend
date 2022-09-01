/*
El carrito de compras tendrá la siguiente estructura:

7. El timestamp puede implementarse con Date.now()
8. Realizar la persistencia de productos y del carrito de compras en el filesystem.
*/
const fs = require('fs');
const {Producto} = require('../entitys/productoEntity');
const config = require('../config.json');

// Inicializo el dao, por defecto agarra el filesystem
let DAO = require('../daos/firebase/ProductoDAO')

// Si viene por mongo o firebase, lo cambio.
if (config.Persistencia == 'firebase' || config.Persistencia == 'mongo')
    DAO = require(`../daos/${config.Persistencia}/ProductoDAO`)

class ProductoModel{
    constructor(){
        this.ProductoDAO = new DAO();
    }

    add(producto){
        const rta = this.ProductoDAO.add(producto).then(x=>{
            return x;
        }).catch(err=>{
            return err;
        });
        return rta;
    }

    getById(id){
        return this.ProductoDAO.getByID(id).then(x=>{
            return x;
        }).catch(err=>{
            return err;
        });
    }

    delete(id){
        return this.ProductoDAO.delete(id).then(x=>{
            return x;
        }).catch(err=>{
            return err;
        });
    }

    update(id,producto){
        return this.ProductoDAO.update(id,producto).then(x=>{
            return x;
        }).catch(err=>{
            return err;
        });
    }
}

module.exports = ProductoModel;