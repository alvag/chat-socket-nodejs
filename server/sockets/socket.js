const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('startChat', (user, callback) => {
        if (!user.name) {
            return callback({
                error: true,
                messaje: 'El nombre es requerido'
            });
        }

        let listUsers = users.addUser(client.id, user.name);

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
});
