const config = require('../../config.json')
const mongoose = require('mongoose');

const productoCollection = 'productos';
const ProductoSchema = {
    id: {type: Number, require:true}
    ,timestamp: {type: Date, require:true}
    ,nombre: {type: String, require:true, max:100}
    ,descripcion: {type: String, require:true, max:100}
    ,codigo: {type: Number, require:true}
    ,foto: {type: String, require:true, max:100}
    ,precio: {type: Number, require:true}
    ,stock: {type: Number, require:true}
}

const model = new mongoose.model(productoCollection, ProductoSchema);

class ProductoDAO{
    constructor(){
        this.url = config.mongo.coneccion;
    }
    
    async add(producto){        
        const msgRta = {
            error: true,
            msg: ''
        };

        let rta = await mongoose.connect(this.url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        let productosConCodigo = await model.find({codigo:producto.codigo});

        if(productosConCodigo.length == 0){
            let productoSave = await new model(producto).save();

            msgRta.error = false;
            msgRta.msg = `Producto Agregado. ID: ${producto.codigo}`;
        }else{
            msgRta.msg = 'El código del producto ya existe en la base de datos';
        }

        return msgRta;
    }
    
    async getByID(id){
        let rta = await mongoose.connect(this.url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        let productosConCodigo = await model.find({codigo:id});
        
        console.log(productosConCodigo);
        
        return productosConCodigo;
    }
    
    async delete(id){
        try{
            let p = await model.deleteOne({codigo:id});
        }catch(e){
            console.log(e);
        }
    }

    async update(id,producto){
        try{
            let p = await model.updateOne({codigo:id},
                {$set:{nombre:producto.nombre}});
        }catch(e){
            console.log(e);
        }
    }
}

//module.exports = {productos: mongoose.model(productoCollection, ProductoSchema)};
module.exports = ProductoDAO;