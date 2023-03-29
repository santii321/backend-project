var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idFactura: {type : String},
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: Date, default: Date.now},
    descuentoFactura: {type : Number},

});

module.exports = mongoose.model('venta',VentaSchema);