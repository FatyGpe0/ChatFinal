
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Login = new Schema({
    nombre: String,
    email: String,
    psw: String

});
module.exports = mongoose.model('datos', Login);