const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cargo: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE' 
    },


});


// Fines estetico este seccion del codigo cambia el _id por el uid
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object
})



module.exports = model( 'Usuario', UsuarioSchema );