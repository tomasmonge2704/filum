const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { passport } = require('../passport');
const jwtSecret = process.env.JWT_SECRET;

router.post('/api', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        req.flash('error', info.message);
        return res.status(401).json({ message: info.message });
      }
      const token = jwt.sign({ user }, jwtSecret);
      res.json({ token });
    })(req, res, next);
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