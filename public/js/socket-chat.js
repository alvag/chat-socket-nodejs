let socket = io();

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

    socket.emit('startChat', user, (users) => {
        //console.table('Usuarios conectados');
        //console.table(users);
        renderUsers(users);
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
    renderMessages(message, false);
    scrollBottom();
});

socket.on('listUsers', (users) => {
    renderUsers(users);
});

// Mensajes privados

socket.on('privateMessage', (message) => {
    console.log('Mensaje privado', message);
});
