const express = require('express');
const path = require('path');
require('dotenv').config();

//App express
const app = express();

//NodeServer 
const server = require('http').createServer();
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path publico
const publicPath = path.resolve( __dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);

    console.log('Servidor corriendo:', process.env.PORT);
})