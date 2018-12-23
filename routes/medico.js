var express = require('express');
var app = express();
var Medico = require('../modelos/medico'); // Schema Medico

var middleware = require('../middlewares/autentificacion'); // Autentificacion TOKEN


// ==============================
// Obtener todos los Medicos
// ==============================
app.get('/', (req, res) => {
    // Especificando los campos devueltos
    Medico.find({}, (err, medicos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Medicos',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            medicos
        });
    });

});

// ==============================
// Crear Nuevo Medico
// ==============================
app.post('/', middleware.verificaToken, (req, res) => {
    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        usuario: req.usuario._id, // Este usuario es el que esta en sesion, realizado por el middleware
        hospital:body.hospital
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error guardando Medico',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            medico: medicoGuardado,
            usuarioToken: req.usuario
        });

    });

});

// ==============================
// Actualizar Medico
// ==============================
app.put('/:id', middleware.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    
    Medico.findById(id, (err, medicoBuscado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar Usuario"
            });
        }
        if (!medicoBuscado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe',
                errors: {
                    messaje: 'No existe un medico con ese ID'
                }

            });
        }

        medicoBuscado.nombre = body.nombre;
        
        medicoBuscado.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Medico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });
        });
    });
});

// ==============================
// Eliminar Hospital
// ==============================
app.delete('/:id', middleware.verificaToken, (req, res) => {
    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Medico',
                errors: err
            });
        }
        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Medico con ese ID',
                errors: {
                    messaje: 'No existe un Medico con ese ID'
                }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });

    });

});


module.exports = app;