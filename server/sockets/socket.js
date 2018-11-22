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

        callback(listUsers);
    });
});
