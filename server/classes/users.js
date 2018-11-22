class Users {

    constructor() {
        this.persons = [];
    }

    addPerson(id, name) {
        let person = { id, name };
        this.persons.push(person);
        return this.persons;
    }

    getPerson(id) {
        return this.persons.filter(person => person.id === id)[0];
    }

    getPersons() {
        return this.persons;
    }

    getPersonsByRoom(room) { }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter(person => person.id !== id);
        return deletedPerson;
    }

}

module.exports = Users;
