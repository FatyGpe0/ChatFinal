const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
  usuario: String, // El nombre del usuario que envió el mensaje
  mensaje: String, // El contenido del mensaje
  fecha: { type: Date, default: Date.now } // La fecha y hora del mensaje
});

module.exports = mongoose.model('Message', Message);
