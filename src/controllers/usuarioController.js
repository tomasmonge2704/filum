const UsuarioModel = require("../mongoDB/userSchema");
const {createHash} = require('../bcrypt')
const getUsuarioByUsername = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findOne({ username: req.params.username });
    if (!usuario) throw new Error("Usuario no encontrado");
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarUsuarioByUsername = async (req, res) => {
  try {
    let { password, mail, adress, celular } = req.body;
    password = createHash(password);

    // Objeto auxiliar para almacenar solo los campos definidos
    const updateFields = {};
    if (password) updateFields.password = password;
    if (mail) updateFields.mail = mail;
    if (adress) updateFields.adress = adress;
    if (celular) updateFields.celular = celular;

    const usuario = await UsuarioModel.findOneAndUpdate(
      { username: req.params.username },
      updateFields,
      { new: true }
    );

    if (!usuario) throw new Error("Usuario no encontrado");
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const eliminarUsuarioByUsername = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findOneAndDelete({ username: req.params.username });
    if (!usuario) throw new Error("Usuario no encontrado");
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getUsuarioByUsername,
  actualizarUsuarioByUsername,
  eliminarUsuarioByUsername,
};
