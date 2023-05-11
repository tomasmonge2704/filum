const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./mongoDB/userSchema');
const {isValidPassword,createHash} = require('./bcrypt')
const jwt = require('jsonwebtoken');

passport.use(
  "login",
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
//singup
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
     (req, username, password, done) => {
      // Revisa si existe algún usuario que ya tenga ese username
      User.findOne({ username: username }, async function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          return done({ mensaje: 'el usuario ya se encuentra registrado.' });
        }
        // Revisa si existe algún usuario que ya tenga ese correo electrónico
        const existingUser = await User.findOne({ mail: req.body.mail });
        if (existingUser) {
          return done({ mensaje:'El correo electrónico ya se encuentra registrado.'});
        }

        try {
          const newUser = {
            username: username,
            password: createHash(password),
            mail: req.body.mail
          };
          // Crear una nueva instancia de Upload y guardarla en la base de datos
          const user = new User(newUser);
          await user.save();
          // Enviar una respuesta con un mensaje
          return done(null);
        } catch (error) {
          console.error('Error al cargar los archivos', error);
          return done(error);
        }
      });
      
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const vefifyToken = (token) => {
  const response = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false
    } else {
      return true
    }
  });
  return response
}
// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || vefifyToken(req.headers.authentication) === true) {
    return next();
  }
  res.redirect('/login')
}
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == 'admin') {
    return next();
  }
  res.redirect('/login')
}
module.exports = {passport,isAuthenticated,isAdmin};