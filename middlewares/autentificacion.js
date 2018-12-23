var jwt = require('jsonwebtoken'); // npm install token
var SEED = require('../configuraciones/config').SEED; // Esta es mi clave para el TOKEN


// ==============================
// Verificar TOKEN
// ==============================
exports.verificaToken = function (req, res, next) {
    
    var token = req.query.token;
    
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({ // No autorizado
                ok: false,
                mensaje: 'Token Incorrecto',
                errors: err
            });
        }
        req.usuario = decoded.usuario; // El usuario Actual de Sesion para utilizarlo en hospital y medico
        next();

    });
}