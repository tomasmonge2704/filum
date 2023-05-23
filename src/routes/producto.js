const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productoController");
const {isAuthenticated,isAdmin} = require('../passport')

// Obtener todos los productos
router.get("/", productosController.getProductos);

// Obtener un producto por ID
router.get("/:id", productosController.getProductoById);

// Crear un nuevo producto
router.post("/",isAdmin, productosController.crearProducto);

// Actualizar un producto existente
router.put("/:id",isAdmin, productosController.actualizarProducto);

// Eliminar un producto existente
router.delete("/:id",isAdmin, productosController.eliminarProducto);

module.exports = router;
