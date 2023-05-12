const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  status: { type: String, required: true },
  datosComprador: {
    username: { type: String, required: true },
    metodoPago: { type: String, required: true },
    numeroCuenta: { type: String },
    adress: {
      calle: { type: String },
      altura: { type: String },
      piso: { type: String },
    },
  },
  datosVendedor: {
    numeroCuenta: { type: String },
    nombreCuenta: { type: String },
  },
  productData: {
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
  },
  fechaCompra: { type: Date, default: Date.now, required: true },
  fechaRecibido: { type: Date },
});

module.exports = mongoose.model('Compras', compraSchema);