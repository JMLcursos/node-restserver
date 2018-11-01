// =============================================
// Inicio 
// routes/usuario.js
// =============================================
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
// const { verificaAdminRole } = require('../middlewares/autenticacion');
// const autenfica = require('../middlewares/autenticacion');

const app = express();

//app.get('/usuario', autenfica.verificaToken, function(req, res) {
app.get('/usuario', [verificaToken, verificaAdminRole], function(req, res) {

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

app.post('/usuario', [verificaToken, verificaAdminRole], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        //password: body.password,
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

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role']);

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
            usuario: usuarioDB,
            mensaje: 'Se ha actualizado con éxito'
        });
    });
});

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;
    let cambiaEstado = { estado: false, role: 'USER_ROLE' }

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
});

module.exports = app;