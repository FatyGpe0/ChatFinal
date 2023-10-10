const net = require('net'); //crear objeto y require es la libreria node
const server = net.createServer(); //creacion de servidor

const clientes = {};

server.on('connection', (socket) => {
  console.log('Nueva conexión establecida.');

  socket.setEncoding('utf-8');

  let nombreUsuario;

  socket.on('data', (data) => {
    const mensaje = data.toString().trim();

    if (!nombreUsuario) {
        // El primer mensaje enviado se considera como el nombre de usuario
        nombreUsuario = mensaje;
        clientes[nombreUsuario] = socket;
        console.log(`Usuario conectado: ${nombreUsuario}`);
        socket.write('¡Bienvenido al chat!\n');
        return;
      }
  
      // Envía el mensaje a todos los clientes (incluido el remitente)
      const mensajeCompleto = `${nombreUsuario}: ${mensaje}`;
      for (const cliente in clientes) {
        clientes[cliente].write(mensajeCompleto + '\n');
      }
    });

    socket.on('close', ()=>{
        if (nombreUsuario) {
            console.log(`Usuario desconectado: ${nombreUsuario}`);
            delete clientes[nombreUsuario];
          } else {
        console.log('Comunicacion finalizada');
    }
    });

    socket.on('error', (err)=>{
        console.log(err.message);
    });
});
server.listen(3000, ()=>{
    console.log('Servidor funcionando en el puerto:', server.address().port)
});