const express = require('express');
const router = express.Router();
const {passport} = require('../passport')
const jwt = require('jsonwebtoken');
const UsuarioModel = require("../mongoDB/userSchema");
const jwtSecret = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  res.render('signup');
});  

router.post('/', (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    if (err) {
      if (err.mensaje) {
        return res.status(400).json({ mensaje: err.mensaje });
      }
      return next(err);
    }
    user = await UsuarioModel.findOne({ username: req.body.username }).lean()
    const token = jwt.sign({ user }, jwtSecret);
    return res.status(200).json({ token });
  })(req, res, next);
});

module.exports = router;