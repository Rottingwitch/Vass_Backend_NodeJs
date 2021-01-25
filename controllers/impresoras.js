const Impresora = require('../models/impresoras');
const { response } = require('express');


/** */
const getImpresoras = async(req, res) => {

    const impresora = await Impresora.find();

    res.json({
       ok:true,
       impresora
    });


}

/** */
const crearImpresoras = async(req, res) => {

    const { serial, modelo, ciudad, empresa, centro_operacion, sucursal } = req.body;

    try {
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



        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }

}


/** */
const actualizarImpresora = async(req, res = response) => {
    const pid = req.params.id;


    try {

        const printerInDB = await Impresora.findById( pid );

        // Esta validacion saltara si no existe este uid en la base de datos 
        if ( !printerInDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe una impreosora con ese id'
            });            
        }

        // Actualizacion de usuario
        const { serial, ...campos } = req.body;
        
        // Validad que no se modifiquen email ya reguistrados
        if ( printerInDB.serial !== serial) {
             const existeSerial = await Impresora.findOne({ serial });
            if ( existeSerial ) {
                return res.status(400).json({
                 ok:false,
                 msg: 'Este serial ya esta registrado'
               });
            }
        }
        
        campos.serial = serial;
        // El new: true hace referencia para regresar el valor actualizado
        const impresoraActualizacion = await Impresora.findByIdAndUpdate( pid, campos, { new: true, useFindAndModify: false } );
        
        res.json({
            ok:true,
            impresora: impresoraActualizacion        
        });
        
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }


} 

/** */
const borrarImpresora = async( req, res = response ) => {

    const pid = req.params.id;

    try {

        const printerInDB = await Impresora.findById( pid );

        // Esta validacion saltara si no existe este uid en la base de datos 
        if ( !printerInDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe una impreosora con ese id'
            });            
        }

        await Impresora.findByIdAndDelete( pid );



        res.json({ 
            ok:true,
            msg:'Impresora eliminada',
         });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }    
}





module.exports = {
    getImpresoras,
    crearImpresoras,
    actualizarImpresora,
    borrarImpresora
}