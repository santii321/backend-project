var Cliente = require('../models/cliente');

function listar(req,res){
    Cliente.find((err,clientes_data)=>{
        if(clientes_data){
            res.status(200).send({clientes: clientes_data});
        }else{
            res.status(403).send({message: 'No hay clientes en la bd'});
        }
    })
}

function get_cliente(req,res){
    var id = req.params['id'];

    Cliente.findById(id,(err,cliente_data)=>{
        if(cliente_data){
            res.status(200).send({cliente:cliente_data});
        }
    })
}


function registrar(req, res) {
    let data = req.body;
    Cliente.findOne({ dni: data.dni }, (err, cliente_existente) => {
      if (err) {
        res.status(500).send({ message: 'Error al buscar cliente' });
      } else if (cliente_existente) {
        res.status(400).send({ message: 'El DNI ya está registrado' });
      } else {
        var cliente = new Cliente();
        cliente.nombres = data.nombres;
        cliente.correo = data.correo;
        cliente.dni = data.dni;
        cliente.puntos = 10;
  
        cliente.save((err, cliente_save) => {
          if (err) {
            res.status(500).send({ message: 'Error al guardar cliente' });
          } else {
            res.status(200).send({ cliente: cliente_save });
          }
        });
      }
    });
  }
function editar(req,res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findOneAndUpdate(id,{nombres: data.nombres, dni:data.dni, correo: data.correo}, (err,cliente_edit)=>{
        if(cliente_edit){
            res.status(200).send({cliente: cliente_edit});
        }else{
            res.status(500).send(err);
        }
    })
}

function eliminar(req,res){
    let id = req.params['id'];

    Cliente.findByIdAndRemove(id,(err,cliente_delete)=>{
        if(cliente_delete){
            res.status(200).send({cliente:cliente_delete});
        }else{
            res.status(500).send(err);
        }
    })
}
function contarClientes(req,res){
    Cliente.countDocuments({}, (err, count) => {
      if (err) {
        res.status(500).send('Error al contar ventas');
      } else {
        res.send(`${count}`);
      }
    });
  }
  

module.exports = {
    registrar,
    contarClientes,
    editar,
    eliminar,
    listar,
    get_cliente
}