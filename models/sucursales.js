const { Schema, model } = require('mongoose');


const CiudadSchema = Schema ({

    ciudad: {
        type: String,
        required: true,
    },
    departamento: {
        type: String,
        required: true,        
    }

});

CiudadSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object
})



module.exports = model( 'Ciudade', CiudadSchema );