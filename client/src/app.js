const express = require('express'); // referencia a framework express
const app = express(); //se crea la aplicación de express
const log = require('morgan'); // para saber los clientes conectados
const bodyParser = require('body-parser');
const path = require('path');

const IndexRoutes = require('./routers/index.js');
const {default: mongoose} = require('mongoose');


app.set('port', process.env.PORT || 4000 ); //asigno puerto 3000

//Middleware utiliza morgan
app.use(log('dev'));
app.use(bodyParser.urlencoded({extended: false}));

//Rutas
app.use('/',IndexRoutes);

app.use((req, res, next)=>{
    res.locals.mensajes = '';
    next();
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/index', (req, res) => {
    res.render('index');
});


mongoose.connect("mongodb+srv://faty:Sx09AnoKdsJewkAY@cluster0.q3on5sh.mongodb.net/Chat?retryWrites=true&w=majority")
.then(db=>console.log('BD conectada'))
.catch(err=>console.log(err));

app.listen(app.get('port'), () =>{
    console.log('El servidor esta funcionando en el puerto', app.get('port'));
});

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


