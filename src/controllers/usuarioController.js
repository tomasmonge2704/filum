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
    let { password, mail } = req.body;

    // Verificar si password o mail son indefinidos y si es así, no actualizar
    if (password === undefined && mail === undefined) {
      return res.status(400).json({ error: "Password y mail no pueden ser ambos undefined" });
    } else if (password === undefined) {
      const usuario = await UsuarioModel.findOneAndUpdate(
        { username: req.params.username },
        { mail },
        { new: true }
      );
      if (!usuario) throw new Error("Usuario no encontrado");
      return res.json(usuario);
    } else if (mail === undefined) {
      password = createHash(password);
      const usuario = await UsuarioModel.findOneAndUpdate(
        { username: req.params.username },
        { password },
        { new: true }
      );
      if (!usuario) throw new Error("Usuario no encontrado");
      return res.json(usuario);
    } else {
      // Ambos password y mail están definidos, actualizar ambos
      password = createHash(password);
      const usuario = await UsuarioModel.findOneAndUpdate(
        { username: req.params.username },
        { password, mail },
        { new: true }
      );
      if (!usuario) throw new Error("Usuario no encontrado");
      return res.json(usuario);
    }
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
