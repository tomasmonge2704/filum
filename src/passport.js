const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./mongoDB/userSchema');
const { isValidPassword, createHash } = require('./bcrypt');
const jwt = require('jsonwebtoken');

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      if (!isValidPassword(user, password)) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user);
    });
  })
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, async function (err, user) {
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        if (user) {
          return done({ mensaje: 'el usuario ya se encuentra registrado.' });
        }
        const existingUser = await User.findOne({ mail: req.body.mail });
        if (existingUser) {
          return done({ mensaje: 'El correo electrónico ya se encuentra registrado.' });
        }

        try {
          const newUser = {
            username: username,
            password: createHash(password),
            mail: req.body.mail,
          };
          const user = new User(newUser);
          await user.save();
          return done(null);
        } catch (error) {
          console.error('Error al cargar los archivos', error);
          return done(error);
        }
      });
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const verifyToken = (token) => {
  const response = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
  return response;
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || verifyToken(req.headers.authentication) === true) {
    return next();
  }
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.redirect('/login');
};

module.exports = { passport, isAuthenticated, isAdmin };
