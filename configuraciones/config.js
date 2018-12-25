
const mongoose = require('mongoose');
const URI = 'mongodb://localhost/hospitalDB';

mongoose.connect(URI,{ useNewUrlParser: true }) // Una nueva caracteristica de mngodb
    .then(db => console.log("Conexion Realizada \x1b[32m%s\x1b[0m",'start'))
    .catch(err => console.error(err));

module.exports.DATA_BASE = mongoose;
module.exports.SEED = 'esta-es-mi-clave';
