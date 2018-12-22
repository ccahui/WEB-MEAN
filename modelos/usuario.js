var moongose = require('mongoose');
var Schema = moongose.Schema;

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El  nombre es necesario'] // Mensaje de Validacion []
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    }
});

module.exports = moongose.model('Usuario',usuarioSchema);