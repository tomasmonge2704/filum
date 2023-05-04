const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { passport } = require('../passport');
const jwtSecret = process.env.JWT_SECRET;


router.post('/api', passport.authenticate('login', {
    failureFlash: '¡Inicio de sesión fallido! Usuario o contraseña incorrectos.'
}), (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, jwtSecret);
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