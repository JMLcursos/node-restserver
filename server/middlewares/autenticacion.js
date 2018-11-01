'use strict'

const jwt = require('jsonwebtoken');

// =================
//  Verificar Token
// =================

let verificaToken = (req, res, next) => {

    let token = req.get('token'); // recibe el nombre del Header
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Error token. ¡Solicite un nuevo token!'
                }
            });
        };

        req.usuario = decoded.usuario;

        next();
    });

};

// ===================
//  Verifica AdminRole
// ===================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;
    try {
        if (usuario.role != 'ADMIN_ROLE') {
            return res.status(401).json({
                ok: false,
                err: {
                    message: '¡¡¡ ERROR !!! El usuario no está autorizado a realizar esta acción'
                }
            });
        };

    } catch (error) {
        return res.json({
            ok: false,
            err: {
                message: '¡¡¡ ERROR MUY GRAVE !!! NO EXISTE LA PROPIEDAD <<< ROL >>>'
            }
        });
    }

    next();
};

module.exports = {
    verificaToken,
    verificaAdminRole
}