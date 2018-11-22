const createMessage = (name, message) => {
    return {
        name,
        message,
        sent: new Date().getTime()
    };
};

module.exports = { createMessage };
