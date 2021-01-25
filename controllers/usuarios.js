const Usuario = require('../models/usuarios');
const { response } = require('express'); // ayuda para los snippet de status, .json , etc
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email cargo');

    res.json({
       ok:true,
       usuarios,
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
       
       // Encriptar contraseña
       const salt = bcrypt.genSaltSync();
       usuario.password = bcrypt.hashSync( password,salt );
       
       
       // guardar en base de datos 
       await usuario.save();

       
        // Generar Token
        const token = await generarJWT( usuario.id );

       res.json({
          ok:true,
          usuario,
          token
       });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });        
    }

}


//** */

const actualizarUsuario = async( req, res = response ) => {

    const uid = req.params.id;
    // const { nombre, password, email, cargo } = req.boby;

    try {

        const usuarioDB = await Usuario.findById( uid );

        // Esta validacion saltara si no existe este uid en la base de datos 
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });            
        }
        
        // Actualizacion de usuario
        const { email, ...campos } = req.body;

        // Actualizacion de password nuvamente
        const salt = bcrypt.genSaltSync();
        campos.password = bcrypt.hashSync( campos.password,salt );

        // Validad que no se modifiquen email ya reguistrados
        if ( usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        // El new: true hace referencia para regresar el valor actualizado
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true, useFindAndModify: false } );

        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inisperado'
        });          
    }

}






module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario

}