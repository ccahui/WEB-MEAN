// Requires
var express = require('express');

var app = express();

// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok:true,
        mensaje:'Peticio Exitosa'
    });
});

app.listen(3000, () => {
    // Los carateres raros son para colocar color, y resaltarlo
    console.log('Iniciando Servidor en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});