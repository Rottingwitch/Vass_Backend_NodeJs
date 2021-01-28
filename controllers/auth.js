const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Validar Email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg:'Email no entontrado'
            });
        }
        
        // Varificar Contraseña
        const validPasword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPasword ) {
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no valida'
            });
        }

        // Generar Token
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok:true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado'
        });
    }
}

const renewToken = async( req, res = response ) => {

    const uid = req.uid;   

    const usuarios = await Usuario.findById(uid);

    // Generar un TOKEN - JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token,
        usuarios,
    });


};


module.exports = {
    login,
    renewToken
}