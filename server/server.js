const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log("User connected: "+ socket.id.substr(0,5));
    socket.on('message', (msg) => {
        io.emit('message', `${socket.id.substr(0,5)} said ${msg}` );   
    });
});

server.listen(8080, () => {
  console.log('listening on 8080');
});