require('dotenv').config(); // Permite leer las variables de entorno

const cors = require('cors');
const express = require('express');

const { dbConnection } = require('./database/config');

// Crear servidor de express
const app = express();

// Confirgurar CORS
app.use(cors());


// Lectura y parceo del body
app.use( express.json() );

// Base de datos conexion
dbConnection();

// mean_user
//Thoh7Nc7ti4H3hVE
//mongodb+srv://mean_user:Thoh7Nc7ti4H3hVE@cluster0.rheup.mongodb.net/test?authSource=admin&replicaSet=atlas-tdtmkf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true


// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth') );
app.use('/api/impresoras', require('./routes/impresoras') );





app.listen(process.env.PORT, () => {
    console.log('servidor en el puerto ' + process.env.PORT );
})



