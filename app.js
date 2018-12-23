// Requires
var express = require('express');
var mongoose = require('mongoose');

var app = express();

// JSON para que el servidor entienda JSON, es el bodypare


// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario'); 
var loginRoutes = require('./routes/login'); 
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',(err, res)=>
{
    if(err) 
        throw err;
    console.log("Base de Datos: \x1b[32m%s\x1b[0m'",'online')
});

// RUTAS
app.use(express.json());  // Funciona, en postman especificar JSON y no form-data-urlen...
app.use('/hospital',hospitalRoutes);
app.use('/usuario',usuarioRoutes);
app.use('/medico', medicoRoutes);
app.use('/login',loginRoutes);
app.use('/',appRoutes);




app.listen(3000, () => {
    // Los carateres raros son para colocar color, y resaltarlo
    console.log('Iniciando Servidor en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});