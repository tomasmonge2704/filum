const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");
const {isAuthenticated} = require('../passport')


// Obtener un usuario por username
router.get("/:username",isAuthenticated, usuariosController.getUsuarioByUsername);

// Actualizar un usuario existente
router.put("/:username",isAuthenticated, usuariosController.actualizarUsuarioByUsername);

// Eliminar un usuario existente
router.delete("/:username",isAuthenticated, usuariosController.eliminarUsuarioByUsername);

module.exports = router;
