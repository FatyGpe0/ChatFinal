const express = require('express'); // referencia a framework express
const app = express(); //se crea la aplicación de express
const log = require('morgan'); // para saber los clientes conectados
const bodyParser = require('body-parser');
const path = require('path');

const IndexRoutes = require('./routers/index.js');

app.set('port', process.env.PORT || 4000 ); //asigno puerto 3000

//Middleware utiliza morgan
app.use(log('dev'));
app.use(bodyParser.urlencoded({extended: false}));
//Rutas
app.use('/',IndexRoutes);


app.listen(app.get('port'), () =>{
    console.log('El servidor esta funcionando en el puerto', app.get('port'));
}
);


//establecer sistema de vistas
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');