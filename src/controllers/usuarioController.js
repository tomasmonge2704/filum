const UsuarioModel = require("../mongoDB/userSchema");
const { createHash } = require("../bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const getUsuarioByUsername = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findOne({
      username: req.params.username,
    });
    if (!usuario) throw new Error("Usuario no encontrado");
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarUsuarioByUsername = async (req, res) => {
  try {
    let { password, mail, adress, celular } = req.body;
    // Objeto auxiliar para almacenar solo los campos definidos
    const updateFields = {};
    if (password) {
      password = createHash(password);
      updateFields.password = password;
    }
    if (mail) updateFields.mail = mail;
    if (adress) updateFields.adress = adress;
    if (celular) updateFields.celular = celular;

    const user = await UsuarioModel.findOneAndUpdate(
      { username: req.params.username },
      updateFields,
      { new: true }
    );

    if (!user) throw new Error("Usuario no encontrado");
    const token = jwt.sign({ user }, jwtSecret);
    user.token = token;

    res.json({ user, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const verifyUsuarioByUsername = async (req, res) => {
  try {
    let { username,imageURL } = req.body;
    let user = await UsuarioModel.findOne({ username: username });
    if (!user) {
      const newUser = {
        username: username,
        password: createHash(username),
        googleId:"yes",
        mail: username,
        avatar:imageURL
      };
      user = new UsuarioModel(newUser);
      await user.save();
    }
    const token = jwt.sign({ user }, jwtSecret);
    user.token = token;
    res.json({ user, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const eliminarUsuarioByUsername = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findOneAndDelete({
      username: req.params.username,
    });
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
  verifyUsuarioByUsername
};
