var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaActualSchema = Schema({
    idActual: {type : String},
});

module.exports = mongoose.model('venta_actual',VentaActualSchema);