const express = require('express');
const router = express.Router();
const net = require('net');
//const model = require('../models/logins.js')();
const logins = require('../models/logins.js');
//const { Console, error } = require('console');

//const readline = require('readline-sync');

const servidor={
    port:3000,
    host: 'localhost'
};

let mensaje ='';

//ruta para registro
router.post('/add', async(req, res)=>{
    const info = new logins(req.body);
    console.log(req.body);
    await info.save();
    res.redirect('/');
});

//ruta para inicio de sesion
router.post('/login', async (req, res) => {
    const { nombre, psw } = req.body;
    
    try {
      // Busca al usuario con el correo
    const user = await logins.findOne({ nombre: nombre });

      // Verificar si encuentra al usuario
    if (!user) {
        return res.status(500).send("Usuario Invalido");
    }

      // Verificarr la contraseña
    if (user.psw !== psw) {
        return res.status(500).send("Usuario no encontrado");
    }


      // Si el usuario es correcto envia al chat
    res.redirect('/chat');
    } catch (error) {
    console.error(error);
    res.status(500).send('Error servidor');
    }
});


const client = net.createConnection(servidor);
    client.on('connect', ()=>{
        console.log('conexion satisfactoria');
        
    })

    

    client.on('data', (data)=>{
        mensaje = data.toString('utf-8');
        console.log('mensajes del servidor:' + mensaje);

    });

router.get('/chat', async (req, res)=>{
    res.render('chat.ejs', {mensaje});

});

//holaa
router.post('/send', async(req, res)=>{
    const datos = req.body;
        console.log("Mensaje de: ", datos.nombre,":"," ", datos.mensaje);
        client.write(datos.nombre + ":"+ " " + datos.mensaje);
        res.locals.mensaje = datos.mensaje;
    res.redirect('/chat');
});

module.exports = router;
