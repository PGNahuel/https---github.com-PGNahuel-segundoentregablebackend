/*
El carrito de compras tendrá la siguiente estructura:

7. El timestamp puede implementarse con Date.now()
8. Realizar la persistencia de productos y del carrito de compras en el filesystem.
*/
const fs = require('fs');
const {Carrito} = require('../../entitys/carritoEntity');
const config = require('../../config.json');
const ProductoController = require('../../controller/productoController');

class CarritoDAO{
    constructor(){
        this.archivo = config.filesystem.archivo;
        this.productoController = new ProductoController();
    }
    
    getCarrito(id){        
        try{
            if(fs.existsSync(this.archivo)){
                const carritos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));
                
                if(carritos.filter(x=>{return x.id == id}).length > 0){
                    return carritos.filter(x=>{return x.id == id})[0];
                }
            }
        }catch(e){
            console.error(e);
        }

        return null;
    }

    createCarrito(){
        let carrito = new Carrito();

        try{
            if(fs.existsSync(this.archivo)){
                const carritos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));
                console.log(carritos);

                // Le asigno un ID nuevo, si no eliminé todos los carritos.
                if(carritos.length > 0){
                    carrito.id = carritos[carritos.length-1].id + 1;
                }
                
                // Pusheo el carrito creado
                carritos.push(carrito);
                
                // Sobre escribo el archivo con el carrito nuevo
                fs.writeFileSync(this.archivo,JSON.stringify(carritos));
            }else{
                const carritos = [];
                carritos.push(carrito);
                fs.writeFileSync(this.archivo,JSON.stringify(carritos));
            }
        }catch(e){
            console.error(e);
            return {id:-1, error: e};
        }

        return carrito;
    }

    deleteCarrito(id){
        const rta = {error: true, msg: ''};
        
        if(fs.existsSync(this.archivo)){
            console.log(`Se va a eliminar el carrito ${id}`);
            let carritos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));
            
            // Si existe
            if(carritos.filter(x=>{return x.id == id}).length > 0){
                carritos = carritos.filter(x=>x.id != id)
                try{
                    fs.writeFileSync(this.archivo,JSON.stringify(carritos));

                    rta.msg = `Carrito ${id} Eliminado`;
                    rta.error = false;
                }catch(e){
                    rta.error = e.stackTrace;
                }
            }else{
                rta.msg = `No existe el carrito ID ${id}`;
            }
        }else{
            rta.msg = 'No hay registros de carritos';
        }
        
        return rta;
    }

    addProductos(idCarrito, productos){
        const rta = {error: true, msg: ''};

        console.log(productos);
        // Obtengo el catalogo de productos
        const productosHabilitados = this.productoController.getByID();
        const productosAgregar = [];

        // Veo si los ID que me llegaron están en el catalogo de productos
        productos.forEach(p=>{
            if(productosHabilitados.findIndex(ph => {return ph.id == p}) >= 0){
                // Si está y no está agregado al carrito, lo agrega
                if(productosAgregar.filter(pf=>{return pf.id == p}).length == 0)
                    productosAgregar.push(p);
            }
        });
        
        try{
            if(fs.existsSync(this.archivo)){
                const carritos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));

                if(carritos.filter(x=>{return x.id = idCarrito}).length > 0){
                    const carritoIdx = carritos.findIndex(carrito =>{
                        return carrito.id == idCarrito;
                    })

                    carritos[carritoIdx].productos = productosAgregar;

                    fs.writeFileSync(this.archivo,JSON.stringify(carritos));

                    rta.msg = `Productos agregados al carrito ID #${idCarrito}: ${productosAgregar}`;
                    rta.error = false;
                }else{
                    rta.msg = `El carrito ${idCarrito} no existe.`;
                }
            }
        } catch(e){
            rta.msg = e;
        }

        return rta;
    }

    deleteProducto(idCarrito,idProducto){
        const rta = {error:true,msg:''};

        try{
            if(fs.existsSync(this.archivo)){
                const carritos = JSON.parse(fs.readFileSync(this.archivo,"utf-8"));

                if(carritos.filter(x=>{return x.id = idCarrito}).length > 0){
                    const carritoIdx = carritos.findIndex(carrito =>{
                        return carrito.id == idCarrito;
                    })

                    if(carritos[carritoIdx].productos.filter(p=>{return p.id == idProducto}).length > 0){
                        carritos[carritoIdx].productos = carritos[carritoIdx].productos.filter(p=>{return p.id != idProducto});
                        fs.writeFileSync(this.archivo,JSON.stringify(carritos));
    
                        rta.msg = `El producto ID ${idProducto} fue eliminado del carrito ID ${idCarrito}`;
                        rta.error = false;
                    }else{
                        rta.msg = `El carrito no contiene el producto ID ${idProducto}`;
                    }
                }else{
                    rta.msg = `El carrito ${idCarrito} no existe.`;
                }
                
            }else{
                rta.msg = 'No se pueden obtener los carritos';
            }
        }catch(e){
            rta.msg = `Hubo un error al eliminar el producto - ${e.stackTrace}`;
        }

        return rta;
    }
}

module.exports = CarritoDAO;