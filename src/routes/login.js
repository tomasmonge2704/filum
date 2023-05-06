const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { passport } = require('../passport');
const jwtSecret = process.env.JWT_SECRET;
const UsuarioModel = require("../mongoDB/userSchema");

router.post('/api', passport.authenticate('login', {
    failureFlash: '¡Inicio de sesión fallido! Usuario o contraseña incorrectos.'
}), async (req, res) => {
    const user = await UsuarioModel.findOne({ username: req.user.username }).lean()
    const token = jwt.sign({ user }, jwtSecret);
    res.json({ token });
});

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/fail', (req, res) => {
    res.render('loginFailed');
});  
router.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login/fail'
}));

module.exports = router;