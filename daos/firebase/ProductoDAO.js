const {Producto} = require('../../entitys/productoEntity');

class ProductoDAO {
    constructor(){
        this.maxID = 1;

        this.admin = require("firebase-admin");

        this.serviceAccount = require("../../db/ecommerce-fff80-firebase-adminsdk-twy4g-d95a262e83.json");
        
        this.admin.initializeApp({
          credential: this.admin.credential.cert(this.serviceAccount)
        });

        this.db = this.admin.firestore();
        this.query = this.db.collection('productos');
    };

    async add(producto){        
        const msgRta = {
            error: true,
            msg: 'No implementado'
        };

        try{
            let doc = this.query.doc();

            await doc.create({
                id: doc.id,
                timestamp: producto.timestamp,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                foto: producto.foto,
                precio: producto.precio,
                stock: producto.stock
            });

            msgRta.error = false;
            msgRta.msg = `Dato insertado. ID: ${doc.id}`;
        } catch(e){
            console.log(e);
            msgRta.msg = e;
        }

        // console.log('Agregar producto por Firebase');
        return msgRta;
    }
    
    async getByID(id){
        let productosConCodigo = [];
        
        try{
            const item = await this.query.where("id","==",id).get();
            productosConCodigo = item.docs.map(p=>{
                return {id: p.id
                    , timestamp: p.data().timestamp
                    , nombre: p.data().nombre
                    , descripcion: p.data().descripcion
                    , codigo: p.data().codigo
                    , foto: p.data().foto
                    , precio: p.data().precio
                    , stock: p.data().stock};
            });

            // console.log('Productos Obtenidos');
        }catch(e){
            console.log(e);
        }

        return productosConCodigo;
    }
    
    async delete(id){
        try{
            const item = await this.query.doc(id).delete();
            console.log('Eliminado');
        }catch(e){
            console.log(e);
        }
    }

    async update(id,producto){
        console.log({
            id:id,
            producto:producto
        })
        const item = await this.query.doc(`${id}`).update({
              nombre: producto.nombre
            , descripcion: producto.descripcion
            , codigo: producto.codigo
            , foto: producto.foto
            , precio: producto.precio
            , stock: producto.stock
        });
        
        console.log('Producto Actualizado por firebase');
    }
}

module.exports = ProductoDAO;