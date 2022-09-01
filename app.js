const express = require('express');
const productoRouter = require('./router/productosRouter.js');
const carritoRouter = require('./router/carritoRouter.js');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos',productoRouter);
app.use('/api/carrito',carritoRouter);

//app.use(express.static('public',null));

app.get('/',(req,res)=>{
    res.status(200).json({message:"usar API"});
})

app.listen(port,(err,ok)=>{
    if(err){
        console.error('Error al iniciar el servidor')
        return false;
    }
    console.log('Server ON');
});
