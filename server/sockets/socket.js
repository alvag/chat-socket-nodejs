const { io } = require('../server');
const { Users } = require('../classes/users');

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

    client.on('disconnect', () => {
        let deletedUser = users.deleteUser(client.id);

        client.broadcast.emit('sendMessage', {
            user: 'Administrador',
            message: `${deletedUser.name} abandonó el chat`
        });

        client.broadcast.emit('listUsers', users.getUsers());
    });
});
