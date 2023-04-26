const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./mongoDB/userSchema');
const {isValidPassword,createHash} = require('./bcrypt')

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
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
          return done({ mensaje:'El correo electrónico ya está registrado.'});
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

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('usuario no autorizado');
}
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == 'admin') {
    return next();
  }
  res.status(401).send('usuario no autorizado');
}
module.exports = {passport,isAuthenticated,isAdmin};