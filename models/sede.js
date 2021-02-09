const { Schema, model } = require('mongoose');


const SedeSchema = Schema ({

    sede: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,        
    },
    barrio: {
        type: String,
        required: true,        
    }

});

SedeSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.sid = _id;
    return object
})



module.exports = model( 'Sede', SedeSchema );