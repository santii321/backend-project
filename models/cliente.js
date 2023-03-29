var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: String,
    dni: { type: String, unique: true }, 
    correo: String,
    puntos: Number,
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente',ClienteSchema);