const path = require('path');
require('dotenv').config();
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

let server = http.createServer(app);

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/'));

module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(process.env.PORT, (error) => {

    if (error) throw new Error(error);

    // eslint-disable-next-line no-console
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}.`);
});
