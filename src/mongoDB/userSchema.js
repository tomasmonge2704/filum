const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type:String,
    required:true,
    default:'usuario'
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: '/avatar.png'
  },
  adress:{
    calle:{type:String},
    altura:{type:String},
    piso:{type:String}
  },
  celular:{
    type:String
  }
  ,
  googleId: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
