let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name')) {
    window.location = '/';
    throw new Error('El nombre es requerido');
}

let user = {
    name: params.get('name')
};

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('startChat', user, (usuarios) => {
        console.log('Usuarios conectados', usuarios);
    });
});

socket.on('disconnect', () => {
    console.log('Conexión perdida con el servidor');
});

socket.emit('sendMessage', {
    user: 'Max Alva',
    messaje: 'Hello World'
}, (response) => {
    console.log('Server response', response);
});

socket.on('sendMessage', (message) => {
    console.log('Servidor:', message);
});
