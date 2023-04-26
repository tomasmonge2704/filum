const express = require('express');
const router = express.Router();
const {passport} = require('../passport')

router.get('/', (req, res) => {
  res.render('signup');
});  

router.post('/', (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      if (err.mensaje) {
        return res.status(400).json({ mensaje: err.mensaje });
      }
      return next(err);
    }
    return res.status(200).json({ mensaje: 'Usuario creado exitosamente!' });
  })(req, res, next);
});

module.exports = router;