const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");
const {isAuthenticated} = require('../passport')


// Obtener un usuario por username
router.get("/:username",isAuthenticated, usuariosController.getUsuarioByUsername);
// Valida si existe un usuario y sino existe crea uno nuevo
router.post("/verify",usuariosController.verifyUsuarioByUsername);
// Actualizar un usuario existente
router.put("/:username",isAuthenticated, usuariosController.actualizarUsuarioByUsername);

// Eliminar un usuario existente
router.delete("/:username",isAuthenticated, usuariosController.eliminarUsuarioByUsername);

module.exports = router;
