// =============================================
// Inicio 
// routes/usuario.js
// =============================================
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function(req, res) {

    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 5);

    Usuario.find({ estado: true }, 'nombre role estado google img')
        .skip(desde) // salta 5
        .limit(limite) // máximo 5
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'FIND de MongoDB ha devuelto un error',
                    err
                });
            };
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                });
            });
        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'SAVE de MongoDB ha devuelto un error',
                err
            });
        };

        res.json({
            ok: true,
            usr: usrDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    /*
    delete body.password;
    delete body.google;
    */

    Usuario.findByIdAndUpdate(id, { body }, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'findByIdAndUpdate da error',
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false,
        role: 'ADMIN_ROLE',
        email: 'este-es-el-email-cambiado@cambialo.aquesi'
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'findByIdAndUpdate da error',
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    /*
            //
            // BORRA el usuario de la BD físicamente
        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'findByIdAndRemove da error',
                    err
                });
            };
            if (usuarioBorrado === null) {
                return res.status(400).json({
                    ok: false,
                    err: 'USUARIO NO EXISTE para findByIdAndRemov'
                        //err: {
                        //    message: 'USUARIO NO EXISTE para findByIdAndRemove',
                        //}
                });
            };
            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        });
        */
});

module.exports = app;