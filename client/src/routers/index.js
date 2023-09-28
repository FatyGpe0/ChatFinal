const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{

    //console.log("hola");
    res.render('index.ejs');
}); 


router.post('/enviar', async (req, res) => {
    const datos = req.body;
    console.log("Mensaje: ", datos.mensaje);
    client.write(datos.mensaje)
    res.rendirect('/');
});

module.exports = router;