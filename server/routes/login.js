//
// =============================================
// Inicio 
// routes/login.js
// =============================================
//
require('../config/config');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const app = express();


app.post('/login', (req, res) => {
    //let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (!usuarioDB) {
            return res.status(400).json({ ok: false, err: { message: 'Usuario o (contraseña) incorrectos' } });
        }
        /*    
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        */
        // console.log('CADUCIDAD DEL TOKEN: ', process.env.CADUCIDAD_TOKEN)
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });
    });
});

module.exports = app;