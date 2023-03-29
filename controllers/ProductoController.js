var Producto = require("../models/producto");
var fs = require("fs");
var path = require("path");

function registrar(req, res) {
  var data = req.body;
  Producto.findOne({ titulo: data.titulo }, (err, producto_existente) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (producto_existente) {
        res.status(403).send({ message: "Referencia del producto ya existe" });
      } else {
        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.save((err, producto_save) => {
          if (err) {
            res.status(500).send({ message: "Error en el servidor" });
          } else {
            if (producto_save) {
              res.status(200).send({ produto: producto_save });
            } else {
              res.status(403).send({ message: "No se registro el producto" });
            }
          }
        });
      }
    }
  });
}

function listar(req, res) {
  var titulo = req.params["titulo"];

  Producto.find({ titulo: new RegExp(titulo, "i") })
    .populate("idcategoria")
    .exec((err, productos_listado) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (productos_listado) {
          res.status(200).send({ productos: productos_listado });
        } else {
          res
            .status(403)
            .send({ message: "No hay ningun registro con ese titulo" });
        }
      }
    });
}

function editar(req, res) {
  var data = req.body;
  var id = req.params["id"];

  Producto.findById(id, (err, producto_data) => {
    if (producto_data) {
      Producto.update(
        { _id: id },
        {
          descripcion: data.descripcion,
          precio_compra: data.precio_compra,
          precio_venta: data.precio_venta,
          idcategoria: data.idcategoria,
          stock: data.stock,
        },
        (err, producto_edit) => {
          if (producto_edit) {
            res.status(200).send({ producto: producto_edit });
          }
        }
      );
    } else {
      res.status(500).send(err);
    }
  });
}

function obtener_producto(req, res) {
  var id = req.params["id"];

  Producto.findOne({ _id: id }, (err, producto_data) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (producto_data) {
        res.status(200).send({ producto: producto_data });
      } else {
        res.status(403).send({ message: "No existe el registro" });
      }
    }
  });
}

function eliminar(req, res) {
  var id = req.params["id"];

  Producto.findOneAndRemove({ _id: id }, (err, producto_delete) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (producto_delete) {
        res.status(200).send({ produto: producto_delete });
      } else {
        res.status(403).send({ message: "No se elimino ningun registro" });
      }
    }
  });
}

module.exports = {
  registrar,
  listar,
  editar,
  obtener_producto,
  eliminar,
};
