const Sede = require('../models/sede');
const { response } = require('express');



/** */
const crearSede = async(req, res) => {

    const { sede, ubicacion, barrio } = req.body;

    try {
        // // Validar que este campo no se repita
        // const serialNoRepite = await Impresora.findOne({ ciudad });
        // if ( serialNoRepite ) {
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Esta Impresora ya esta registrada en la base de datos, verifique el serial'
        //     });            
        // }
        const sede = new Sede( req.body );

        await sede.save();


        res.json({
            ok:true,
            sede
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

    crearSede,
    borrarImpresora,
    getImpresorasById
}