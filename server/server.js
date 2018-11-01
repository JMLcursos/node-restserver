//
//
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const puerto = process.env.PORT;

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Configuración global de rutas
// El fichero index.js contiene todas las rutas
// usuario.js y login.js
app.use(require('./routes/usuario'));
app.use(require('./routes/login'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) {
        //throw err;
        console.log('NO SE PUEDE CONECTAR CON MONGODB');
        return "ERROR";
    } else {
        console.log('Base de datos ONLINE');
    }
});

app.listen(puerto, () => {
    console.log(`Escuchando puerto ${puerto}`)
});