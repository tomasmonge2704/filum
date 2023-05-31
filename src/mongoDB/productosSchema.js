const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  linea:{
    type:String,
    required:true,
    default:null
  },
  cantidad: {
    type: Number,
  },
  stock: { type: Number, required: true, default: 1 },
  categoria: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
