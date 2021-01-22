const { Schema, model } = require('mongoose');


const ImpresoraSchema = Schema ({

    serial: {
        type: String,
        required: true,
        unique: true,
    },
    modelo: {
        type: String,
        required: true,        
    },
    ciudad: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: true,
    },
    centro_operacion: {
        type: Number,
        required: true,
    },
    sucursal: {
        type: String,
        required: true,
    },


});

ImpresoraSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object
})



module.exports = model( 'Impresora', ImpresoraSchema );