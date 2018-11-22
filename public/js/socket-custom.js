// eslint-disable-next-line no-undef
let socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
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
