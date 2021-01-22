const Usuario = require('../models/usuarios')

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email cargo');

    res.json({
       ok:true,
       usuarios
    });

}



// Creacion de usuarios
const crearUsuario = async(req, res) => {

    const { email, password, nombre, cargo } = req.body;

    const usuario = new Usuario( req.body );

    await usuario.save();


    res.json({
        ok:true,
        usuario
    });

}






module.exports = {
    getUsuarios,
    crearUsuario

}