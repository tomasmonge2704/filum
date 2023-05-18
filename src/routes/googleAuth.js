const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { passport } = require('../passport');
const jwtSecret = process.env.JWT_SECRET;
const { createHash } = require('../bcrypt');
const Usuario = require("../mongoDB/userSchema");

router.get('/', passport.authenticate('google', { scope: ['email'] }));

router.get('/callback', passport.authenticate('google', {
    session: false
  }),async (req, res, next) => {
      user = await Usuario.findOne({ username: req.user.email }).lean()
      if(user){
        const token = jwt.sign({ user }, jwtSecret);
        res.json({ token });
      }else{
        const newUser = {
            username: req.user.email,
            password: createHash(req.user.id),
            mail: req.user.email,
            googleId:req.user.id,
            avatar:req.user.picture
          };
          const user = new Usuario(newUser);
          await user.save();
        const token = jwt.sign({ user }, jwtSecret);
        return res.status(200).json({ token });
      }
  });  
router.get('/failure', (req, res) => {
    res.send('La autenticación con Google ha fallado');
  });
module.exports = router;
