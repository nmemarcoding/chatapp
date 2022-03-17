const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')


const app = express();
const server = http.createServer(app)
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')))

// run wen client conect   
io.on('connection', socket => {

    socket.emit('message', formatMessage('chatcord Bot', 'welcom to chatCord'));

    socket.broadcast.emit('message', formatMessage('chatcord Bot', 'A user joined the chat'));

    socket.on('disconnect', () => {
        // immit to everybody
        io.emit('message', 'A user has left the chat');
    })

    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('chatcord Bot', msg))
    })

})

const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));