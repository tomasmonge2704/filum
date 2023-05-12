const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const {isAuthenticated,isAdmin} = require('../passport')

// Ruta para obtener todas las compras
router.get('/',isAuthenticated, compraController.getAll);

// Ruta para obtener las compras de un usuario especifico
router.get('/:username',isAuthenticated, compraController.getUserCompras);
// Ruta para obtener una compra especifica
router.get('/id/:id',isAuthenticated, compraController.getCompraById);
// Ruta para agregar una compra nueva
router.post('/',isAuthenticated, compraController.addCompra);
// Ruta para actualizar el status de una compra 
router.put('/id/:id',isAdmin, compraController.actualizarCompra);

module.exports = router;
