const express = require('express');
const { isAuthenticated } = require('../passport');
const mercadoPagoController = require('../controllers/mercadoPagoController')
const router = express.Router();

router.post("/create-preference", isAuthenticated,mercadoPagoController.createPreference)

module.exports = router;