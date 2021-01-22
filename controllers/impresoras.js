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



    // Validar que este campo no se repita
    const serialNoRepite = await Impresora.findOne({ serial });
    if ( serialNoRepite ) {
        return res.status(400).json({
            ok:false,
            msg: 'Esta Impresora ya esta registrada en la base de datos, verifique el serial'
        });
        
    }

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