const {Producto} = require('../entitys/productoEntity');
const model = require('../model/productoModel');

class ProductoController{
    constructor(){
        this.ProductoModel = new model();
    }

    async getByID(id){
        const rta = await this.ProductoModel.getById(id);

        // console.log({ msg: 'Acá estoy en el controller' , rta: rta });

        return rta;
    }

    async add(producto){
        const rta = this.ProductoModel.add(new Producto(producto));//.then(x=>{return x}).catch(err=>{return err;});

        return rta;
    }

    update(producto,id){
        const rta = this.ProductoModel.update(id, producto);
        return rta;
    }

    delete(id){
        return this.ProductoModel.delete(id);
    }
}

// Exporto la clase
module.exports = ProductoController;