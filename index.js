const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {passport} = require('./src/passport');
const app = express();
const admin = require('firebase-admin');
require('dotenv').config();
const loginRoutes = require('./src/routes/login');
const signupRoutes = require('./src/routes/signup');
const productsRoutes = require('./src/routes/producto');
const cartRoutes = require('./src/routes/carrito');
const userRoutes = require('./src/routes/user');
const mercadoPagoRoutes = require('./src/routes/mercadoPago');
const comprasRoutes = require('./src/routes/compras')
const indexRoutes = require('./src/routes/inicio');
const exphbs = require('express-handlebars')
const {connectMongoDB} = require('./src/mongoDB/connect')
const flash = require('connect-flash');
var cors = require('cors')
connectMongoDB()
// Configuración de Express
admin.initializeApp();
app.use(cors())
app.use(express.static('views'))
app.engine("hbs", exphbs.engine({
  extname: ".hbs",
  defaultLayout: null,
  layoutsDir: __dirname + "/views",
  partialsDir: __dirname + "/views"
}))
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash());
app.use(express.json())
app.use(cookieParser());
app.use(session({
  secret: 'super-secreto',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use('/',indexRoutes)
app.use('/api/mercadopago',mercadoPagoRoutes)
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/api/producto', productsRoutes);
app.use('/api/carrito', cartRoutes);
app.use('/user', userRoutes);
app.use('/api/compras', comprasRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, function() {
    console.log('Servidor iniciado en el puerto ' + PORT);
  });