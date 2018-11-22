let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = '/';
    throw new Error('El nombre y sala son requeridos');
}

let user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('startChat', user, (usuarios) => {
        console.table('Usuarios conectados');
        console.table(usuarios);
    });
});

socket.on('disconnect', () => {
    console.log('Conexión perdida con el servidor');
});

/* socket.emit('sendMessage', {
    messaje: 'Hello World'
}, (response) => {
    console.log('Server response', response);
}); */

socket.on('sendMessage', (message) => {
    console.log('Servidor:', message);
});

socket.on('listUsers', (users) => {
    console.table(users);
});

// Mensajes privados

socket.on('privateMessage', (message) => {
    console.log('Mensaje privado', message);
});
