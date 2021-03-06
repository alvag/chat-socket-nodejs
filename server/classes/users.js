class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(user => user.room === room);
    }

    deleteUser(id) {
        let deletedUser = this.getUser(id);
        this.users = this.users.filter(user => user.id !== id);
        return deletedUser;
    }

}

module.exports = { Users };
