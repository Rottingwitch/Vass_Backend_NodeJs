const Usuario = require('../models/usuarios');
const { response } = require('express'); // ayuda para los snippet de status, .json , etc

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email cargo');

    res.json({
       ok:true,
       usuarios
    });

}



// Creacion de usuarios
const crearUsuario = async(req, res = response) => {

    const { email, password, nombre, cargo } = req.body;

    try {

        // 
        const mailExiste = await Usuario.findOne({ email });
        if ( mailExiste ) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya existe'
            });
            
        }
        
       // crear una nueva instancia del usuario, para crear varios usuarios
       const usuario = new Usuario( req.body );
       // guardar en base de datos 
       await usuario.save();


       res.json({
          ok:true,
          usuario
       });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inisperado'
        })        
    }





}






module.exports = {
    getUsuarios,
    crearUsuario

}