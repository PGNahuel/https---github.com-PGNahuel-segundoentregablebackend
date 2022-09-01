const controller = require('../controller/productoController');

const ProductoController = new controller();

const express = require('express');
const {Router} = express;
const router = Router();

const usrAdmin = true;

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.get('/:id?',(req,res)=>{
    const params = req.params;
    const prod = ProductoController.getByID(params.id).then(r=>{
        //console.log({ msg :'acá estoy en el router then' , prod: r });
        res.status(200).json(r);
    }).catch(e=>{
        // console.log({ msg:'acá estoy en el catch' , prod: e });
        res.status(500).json({error:-1, descripcion: e});
    });

        
});

// b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
router.post('/',(req,res)=>{
    if(usrAdmin){
        const rta = ProductoController.add(req.body)
        .then(rta=>{
            res.status(201).json(rta);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
        
    }else{
        res.status(500).json({error:-1,descripcion:`ruta 'api/productos' método 'post' no autorizada`});
    }
});

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
router.put('/:id',(req,res)=>{
    if(usrAdmin){
        const rta = ProductoController.update(req.body,req.params.id);
        res.status(200).json(rta);
    }else{
        res.status(500).json({error:-1,descripcion:`ruta 'api/productos/id' método 'put' no autorizada`});
    }
});

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
router.delete('/:id',(req,res)=>{
    if(usrAdmin){
        const rta = ProductoController.delete(req.params.id);
        res.status(200).json(rta);
    }else{
        res.status(500).json({error:-1,descripcion:`ruta 'api/productos/id' método 'delete' no autorizada`});
    }
});


module.exports = router;
