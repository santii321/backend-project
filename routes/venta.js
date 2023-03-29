var express = require('express');
const { mostrarVenta } = require('../controllers/VentaActual');
var ventaController = require('../controllers/VentaController');

var api = express.Router();

api.post('/venta/registrar',ventaController.registrar);
api.get('/venta/:id',ventaController.datos_venta);
api.get('/ventas',ventaController.listado_venta);
api.get('/ventas/actual',mostrarVenta);
api.get('/ventas/contar',ventaController.contadorVentas)
api.get('/venta/data/:id',ventaController.detalles_venta);
api.delete('/venta/data/:id',ventaController.eliminar);

module.exports = api;