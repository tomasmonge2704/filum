const ProductoModel = require("../mongoDB/productosSchema");

const getProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await ProductoModel.findById(req.params.id);
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, cantidad,imageURL,categoria,descripcion } = req.body;
    const producto = new ProductoModel({nombre:nombre, precio:precio,cantidad:cantidad,imageURL:imageURL,categoria:categoria,descripcion:descripcion});
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { nombre, precio,descripcion,categoria } = req.body;
    const producto = await ProductoModel.findByIdAndUpdate(
      req.params.id,
      { nombre, precio,descripcion,categoria },
      { new: true }
    );
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const producto = await ProductoModel.findByIdAndDelete(req.params.id);
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
