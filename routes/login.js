var express = require('express');
var bcrypt = require('bcryptjs'); // npm install para las contraseñas
var jwt = require('jsonwebtoken'); // npm install token
var SEED = require('../configuraciones/config').SEED; // Esta es mi clave para el TOKEN

var Usuario = require('../modelos/usuario'); // Schema Usuario


var app = express();


app.post('/', (req, res, next) => {

    var body = req.body;

    Usuario.findOne({
        email: body.email
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuario',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Login incorrecto - email',
                errors: {
                    error: 'Login Incorrecto'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Login Incorrecto - password',
                errors: {
                    error: 'Login Incorrecto - password'
                }
            });
        }
        // Crear Token
        usuarioDB.password = ':)';
        var token = jwt.sign({
            usuario: usuarioDB
        }, SEED, {
            expiresIn: 14400
        }); // 4horas
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        });

    });

});


module.exports = app;