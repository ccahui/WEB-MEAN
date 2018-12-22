var express = require('express');
var app = express();
var Usuario = require('../modelos/usuario'); // Schema Usuario

// ==============================
// Obtener todos los Usuarios
// ==============================
app.get('/', (req, res, next) => {
    // Especificando los campos devueltos
    Usuario.find({}, 'nombre email img role').exec(
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: 'false',
                    mensaje: 'Error cargando Usuarios',
                    errors: err
                });
            }
            res.status(200).json({
                ok: 'true',
                usuarios: usuarios
            });
        });

});

// ==============================
// Crear Nuevo Usuario
// ==============================
app.post('/', (req, res)=> {
    var usuario = req.body;
    res.status(200).json({
        ok: 'true',
        usuario
    });


});

module.exports = app;