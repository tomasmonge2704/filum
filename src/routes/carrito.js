const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const {isAuthenticated} = require('../passport')

// Ruta para obtener el carrito de un usuario
router.get('/:userId',isAuthenticated, carritoController.getCarrito);

// Ruta para obtener un producto específico dentro de un carrito de un usuario
router.get('/:userId/producto/:productoId',isAuthenticated, carritoController.getProducto);

// Ruta para agregar un producto al carrito de un usuario
router.post('/:userId',isAuthenticated, carritoController.agregarProducto);

// Ruta para actualizar el producto de un carrito
router.put('/:userId/producto/:productoId',isAuthenticated, carritoController.actualizarProducto);

// Ruta para eliminar un producto específico dentro de un carrito de un usuario
router.delete('/:userId/producto/:productoId',isAuthenticated, carritoController.eliminarProducto);

// Ruta para eliminar todos los productos dentro del carrito de un usuario
router.delete('/:userId',isAuthenticated, carritoController.eliminarTodo);

module.exports = router;

