const express = require("express");
const router = express.Router();
const { isAdmin } = require("../passport");
const ProductoModel = require("../mongoDB/productosSchema");
const UsuarioModel = require("../mongoDB/userSchema");
const comprasModel = require("../mongoDB/compraSchema")

router.get("/", isAdmin, (req, res) => {
    res.render("home");
});
router.get('/compras', isAdmin, (req, res) => {
  comprasModel.find({}).lean().then(function (result) {
  res.render("compras", { result });
});
});
router.get('/compras/id/:id', isAdmin, (req, res) => {
  comprasModel.findById(req.params.id).lean().then(function (result) {
  res.render("compraDetail", { result });
});
});
router.get("/productos", isAdmin, (req, res) => {
    ProductoModel.find({}).lean().then(function (result) {
    res.render("productos", { result });
  });
});
router.get("/usuarios", isAdmin, (req, res) => {
    UsuarioModel.find({}).lean().then(function (result) {
    res.render("usuarios", { result });
  });
});

router.get('/register/producto', isAdmin, (req, res) => {
    res.render('register')
})

module.exports = router;