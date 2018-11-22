const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('startChat', (user, callback) => {
        if (!user.name || !user.room) {
            return callback({
                error: true,
                messaje: 'El nombre y la sala son requeridos'
            });
        }

        client.join(user.room);

        let listUsers = users.addUser(client.id, user.name, user.room);

        client.broadcast.emit('listUsers', users.getUsers());

        callback(listUsers);
    });

    client.on('sendMessage', (msg) => {
        let user = users.getUser(client.id);
        let message = createMessage(user.name, msg.message);
        client.broadcast.emit('sendMessage', message);
    });

    client.on('disconnect', () => {
        let deletedUser = users.deleteUser(client.id);

        client.broadcast.emit('sendMessage', createMessage('Administrador', `${deletedUser.name} abandonó el chat`));

        client.broadcast.emit('listUsers', users.getUsers());
    });

    // Mensajes privados

    client.on('privateMessage', (msg, callback) => {
        if (!msg.to) {
            return callback({
                error: true,
                messaje: 'El ID del usuario receptor es requerido'
            });
        }

        let user = users.getUser(client.id);

        client.broadcast.to(msg.to).emit('privateMessage', createMessage(user.name, msg.message));
    });
});
