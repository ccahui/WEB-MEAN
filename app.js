// Requires
var express = require('express');
var cors = require('cors'); // Sirve para establece comunicacion entre 4200 y 3000
var app = express();
var mongoose = require('./configuraciones/config').DATA_BASE; 
// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario'); 
var loginRoutes = require('./routes/login'); 
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var uploadRoutes = require('./routes/upload');
var imagenesRouter = require('./routes/imagenes');


// RUTAS
app.use(express.json());  // Funciona, en postman especificar JSON y no form-data-urlen...
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use('/hospital',hospitalRoutes);
app.use('/usuario',usuarioRoutes);
app.use('/medico', medicoRoutes);
app.use('/login',loginRoutes);
app.use('/upload',uploadRoutes);
app.use('/imagenes', imagenesRouter);
app.use('/',appRoutes);

// Iniciando
app.listen(3000, () => {
    // Los carateres raros son para colocar color, y resaltarlo
    console.log('Iniciando Servidor en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});