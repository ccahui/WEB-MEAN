var express = require('express');
var fs = require('fs');
var app = express();

// Donde Tipo puede se { Usuarios, Medicos, Hospitales }
app.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;

    var path = `./uploads/${tipo}/${img}`;
    fs.exists(path, existe => {
        if(!existe){
            path = './assets/no-image.png';
        }/*
        res.status(200).json({
            hola:"hola",
            path
        });*/
         res.sendfile(path);
    });
    
});

module.exports = app;