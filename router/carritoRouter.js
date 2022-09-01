const CarritoController = require('../controller/carritoController.js');
const express = require('express');
const {Router} = express;
const router = Router();

const carritoController = new CarritoController();

// a. POST: '/' - Crea un carrito y devuelve su id.
router.post('/',(req,res)=>{
    const idCarritoNuevo = carritoController.add(req.body);
    res.status(201).json({id:idCarritoNuevo});
});


// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/:id',(req,res)=>{
    const rtaDelete = carritoController.delete(req.params.id);

    if(!rtaDelete.error){
        res.status(200).json(rtaDelete);
    }else{
        res.status(500).json(rtaDelete);
    };
    
});

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/:id/productos',(req,res)=>{
    res.status(200).json(carritoController.getAll(req.params.id));
});

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
router.post('/:id/productos',(req,res)=>{
    const rta = carritoController.addProductos(req.params.id, req.body);
    
    if(!rta.error){
        res.status(200).json(rta);
    }else{
        res.status(500).json(rta);
    };
});

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod',(req,res)=>{
    const rta = carritoController.deleteProducto(req.params.id,req.params.id_prod);
    res.status(200).json(rta);
});

module.exports = router;
