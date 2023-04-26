const UsuarioModel = require("../mongoDB/userSchema");

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
    const { username, password, mail } = req.body;
    const usuario = await UsuarioModel.findOneAndUpdate(
      { username: req.params.username },
      { username, password, mail },
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
