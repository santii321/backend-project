const venta_actual = require("../models/venta_actual")


const mostrarVenta = async (req, res) => {
    venta_actual.find((err,venta)=>{
        if(venta){
            res.status(200).send({ventasActuales: venta});
        }else{
            res.status(403).send({message: 'No hay clientes en la bd'});
        }
    })
}


module.exports = {
    mostrarVenta

}
