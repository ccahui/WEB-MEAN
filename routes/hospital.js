var express = require('express');
var app = express();
var Hospital = require('../modelos/hospital');
var middleware = require('../middlewares/autentificacion');


// ==============================
// Obtener todos los Hospitales
// ==============================
app.get('/', (req, res) => {
    Hospital.find({})
    .populate('usuario','nombre email') // Campos de Usuario que debemos especificar
    .exec((err, hospitales) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Hospitales',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            hospitales
        });
    });
});

// ==============================
// Crear Nuevo Hospital
// ==============================
app.post('/', middleware.verificaToken, (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
        usuario: req.usuario._id // Dato Obtenido gracias el middleware que verifica la autenticacion de un Usuario, y guarda el dato en req.usuario
    });

    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error guardando Hospital',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            hospital: hospitalGuardado,
            usuarioToken: req.usuario
        });

    });

});

// ==============================
// Actualizar Hospital
// ==============================
app.put('/:id', middleware.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Hospital.findById(id, (err, hospitalBuscado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar Hospital"
            });
        }
        if (!hospitalBuscado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ' no existe',
                errors: {
                    messaje: 'No existe un hospital con ese ID'
                }

            });
        }

        hospitalBuscado.nombre = body.nombre;
        hospitalBuscado.usuario = req.usuario._id;

        hospitalBuscado.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Hospital',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });

        });
    });
});

// ==============================
// Eliminar Hospital
// ==============================
app.delete('/:id', middleware.verificaToken, (req, res) => {
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Hospital',
                errors: err
            });
        }
        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Hospital con ese ID',
                errors: {
                    messaje: 'No existe un Hospital con ese ID'
                }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });

    });

});
module.exports = app; // Me hicieron un problema por no colocar esto