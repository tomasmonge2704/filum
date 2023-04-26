const ProductoModel = require("../mongoDB/productosSchema");
const CarritoModel = require("../mongoDB/carritoSchema");

// Función para obtener el carrito de un usuario
exports.getCarrito = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carrito = await CarritoModel.findOne({ userId }).populate("productos");
    if (!carrito) throw new Error("Carrito no encontrado");
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para obtener un producto específico dentro de un carrito de un usuario
exports.getProducto = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productoId = req.params.productoId;
    const carrito = await CarritoModel.findOne({ userId }).populate("productos");
    if (!carrito) throw new Error("Carrito no encontrado");
    const productoEncontrado = carrito.productos.find(
      (producto) => producto._id.toString() === productoId
    );
    if (!productoEncontrado) throw new Error("Producto no encontrado en el carrito");
    res.json(productoEncontrado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Función para agregar un producto al carrito de un usuario
exports.agregarProducto = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productoId = req.body.productoId;
      const producto = await ProductoModel.findById(productoId);
      if (!producto) throw new Error("Producto no encontrado");
      const carrito = await CarritoModel.findOne({ userId });
      if (!carrito) {
        const nuevoCarrito = new CarritoModel({
          userId: userId,
          productos: [{ producto: producto, cantidad: 1 }],
        });
        await nuevoCarrito.save();
        res.status(201).json(nuevoCarrito);
      } else {
        const productoEncontrado = carrito.productos.find(
          (producto) => producto.producto._id.toString() === productoId
        );
        if (productoEncontrado) {
          productoEncontrado.cantidad++;
        } else {
          carrito.productos.push({ producto: producto, cantidad: 1 });
        }
        await carrito.save();
        res.json(carrito);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Función para actualizar la cantidad de un producto en el carrito de un usuario
exports.actualizarProducto = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productoId = req.params.productoId;
    const cantidad = req.body.cantidad;
    const carrito = await CarritoModel.findOne({ userId });
    if (!carrito) throw new Error("Carrito no encontrado");
    const productoEncontrado = carrito.productos.find(
      (producto) => producto._id.toString() === productoId
    );
    if (!productoEncontrado) throw new Error("Producto no encontrado en el carrito");
    productoEncontrado.cantidad = cantidad;
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Función para eliminar un producto específico dentro de un carrito de un usuario
exports.eliminarProducto = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productoId = req.params.productoId;
    const carrito = await CarritoModel.findOne({ userId });
    if (!carrito) throw new Error("Carrito no encontrado");
    const index = carrito.productos.findIndex(
    (producto) => producto._id.toString() === productoId
    );
    if (index === -1) throw new Error("Producto no encontrado en el carrito");
    carrito.productos.splice(index, 1);
    await carrito.save();
    res.json(carrito);
    } catch (error) {
    res.status(404).json({ error: error.message });
    }
    };
    
// Función para eliminar todos los productos del carrito de un usuario
exports.eliminarTodo = async (req, res) => {
    try {
      const userId = req.params.userId;
      const carrito = await CarritoModel.findOne({ userId });
      if (!carrito) throw new Error("Carrito no encontrado");
      carrito.productos = [];
      await carrito.save();
      res.json(carrito);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  