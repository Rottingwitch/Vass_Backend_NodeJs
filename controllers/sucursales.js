const Ciudad = require('../models/sucursales');
const { response } = require('express');


/** */
const crearCiudad = async(req, res) => {

    const { ciudad, departamento } = req.body;

    try {

        const ciudad = new Ciudad( req.body );

        await ciudad.save();


        res.json({
            ok:true,
            ciudad
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

const getImpresorasById = async(req, res = response ) => {

    const id = req.params.id;

    try {
        const impresora = await Impresora.findById(id);
    
        res.json({
           ok:true,
           impresora
        });
        
    } catch (error) {
        console.log(error);
        res.json({            
            ok: false,
            msg: 'Error inesperado'
         });
    }


}





module.exports = {
    crearCiudad,
    borrarImpresora,
    getImpresorasById
}