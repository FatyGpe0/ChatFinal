const express = require('express');
const router = express.Router();
const net = require('net');
const model = require('../models/logins.js')();
const logins = require('../models/logins.js');
const { Console, error } = require('console');
const jwt = require('jsonwebtoken');
const { decode } = require('punycode');
const secretKey = 'tu-clave-valida';

//const readline = require('readline-sync');

const servidor={
    port:3000,
    host: 'localhost'
};

let mensaje ='';

router.get('/index', verificarToken, async (req, res) => {
  const token = req.query.token;
  console.log('Ruta /chat se está ejecutando'); // Agrega registros de consola
  res.render('index', { token, mensaje }); 
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

function verificarToken(req, res, next){
  const token = req.query.token;

  if(!token){
    return res.status(403).json({mensaje: 'token no proporcionado'});
  }

  jwt.verify(token,secretKey,(err, decoded)=>{
    if (err)  {
      console.error(err);
      return res.status(401).json({mensaje: 'token invalido'});
    }

    req.usuario = decoded;
    next();
  });

};


//ruta para registro
router.post('/add', async(req, res)=>{
    const info = new logins(req.body);
    console.log(req.body);
    await info.save();
    res.redirect('/');
});

//ruta para inicio de sesion
router.get('/', async (req, res) => {
  try {
     // Busca un usuario con el correo electrónico proporcionado
  const users = await Usuarios.find();
     // Si las credenciales son válidas, puedes redirigir al usuario a la página de chat o realizar otras acciones
  res.render('index', {
    users
  });
  } catch (error) {
  console.error(error);
  res.status(500).send('Error al obtener usuario');
  }
});


router.post('/login', async (req, res) => {
    const { nombre, psw } = req.body;
    
    try {
      // Busca al usuario con el correo
    const user = await logins.findOne({ nombre: nombre });

      // Verificar si encuentra al usuario
      if (!user || user.psw !== psw) {
        return res.status(401).send('Nombre o contrasena incorrectos');
      } else {  

    }

    const usuario = { id:1, nombre: 'Ejemplo' };
    const token = jwt.sign(usuario, secretKey, {expiresIn: '1h' });

      // Si el usuario es correcto envia al chat
    res.redirect('/index?token=' + token);
    } catch (error) {
    console.error(error);
    res.status(500).send('Error servidor');
    }
})


const client = net.createConnection(servidor);
    client.on('connect', ()=>{
        console.log('conexion satisfactoria');
        
    })

    
    client.on('data', (data)=>{
        mensaje = data.toString('utf-8');
        console.log('mensajes del servidor:' + mensaje);

    });


//holaa
router.post('/send', async(req, res)=>{
  const datos = req.body;
  if (datos && typeof datos.mensaje === 'string') {
      console.log("Mensaje de: " + datos.mensaje);
      client.write(datos.mensaje);
  } else {
      console.error("Error: 'mensaje' no es una cadena válida");
  }

  const token = req.query.token;

  if(token){
    res.redirect('/index?token=' + token)
  }else{
    res.redirect('/index');
  }
  
});


module.exports = router;
