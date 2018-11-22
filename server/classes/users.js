class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name) {
        let user = { id, name };
        this.users.push(user);
        return this.users;
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) { }

    deleteUser(id) {
        let deletedUser = this.getUser(id);
        this.users = this.users.filter(user => user.id !== id);
        return deletedUser;
    }

}

module.exports = { Users };
