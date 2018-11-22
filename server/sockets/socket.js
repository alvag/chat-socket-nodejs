const { io } = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('sendMessage', {
        user: 'Administrador',
        message: 'Bienvenido a esta aplicación'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('sendMessage', (message, callback) => {
        console.log(message);

        client.broadcast.emit('sendMessage', message);

        /* if (message.user) {
            callback({
                response: 'Todo salió bien'
            });
        } else {
            callback({
                response: 'Todo salió mal'
            });
        } */
    });
});
