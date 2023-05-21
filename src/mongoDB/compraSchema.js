const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  status: { type: String, required: true },
  datosComprador: {
    username: { type: String, required: true },
    metodoPago: { type: String, required: true },
    numeroCuenta: { type: String },
    envio:{type:String,required:true},
    adress: {
      calle: { type: String },
      altura: { type: String },
      piso: { type: String },
    },
  },
  pagoId:{type:String, default:null},
  datosVendedor: {
    numeroCuenta: { type: String },
    nombreCuenta: { type: String },
  },
  productos:[{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    imageURL: { type: String, required: true },
    cantidad: { type: Number, required: true },
    descripcion: { type: String, required: true },
  }],
  total:{type:Number,required:true},
  fechaCompra: { type: Date, default: Date.now, required: true },
  fechaRecibido: { type: Date },
});

module.exports = mongoose.model('Compras', compraSchema);