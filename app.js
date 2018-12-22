// Requires
var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',(err, res)=>
{
    if(err) 
        throw err;
    console.log("Base de Datos: \x1b[32m%s\x1b[0m'",'online')
});
// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok:'true',
        mensaje:'Peticio Exitosa'
    });
});

app.listen(3000, () => {
    // Los carateres raros son para colocar color, y resaltarlo
    console.log('Iniciando Servidor en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});