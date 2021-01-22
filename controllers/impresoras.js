const Impresora = require('../models/impresoras');

const getImpresoras = async(req, res) => {

    const impresora = await Impresora.find();

    res.json({
       ok:true,
       impresora
    });


}

const crearImpresoras = async(req, res) => {

    const { serial, modelo, ciudad, empresa, centro_operacion, sucursal } = req.body;

    const impresora = new Impresora( req.body );

    await impresora.save();


    res.json({
        ok:true,
        impresora
    });

}





module.exports = {
    getImpresoras,
    crearImpresoras

}