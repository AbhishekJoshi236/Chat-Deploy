const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../CSS'));
app.use(express.static(__dirname + '/../images'));
app.use(express.static(__dirname + '/../JS'));
console.log(__dirname+ '/../client.html');


app.get('/', (req, res) => {
    console.log(path.join(__dirname + '/../client.html'));
    res.sendFile(path.join(__dirname + '/../client.html'));
});

const io = require('socket.io')(http);
const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    console.log('New User:', name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (data) => {
    socket.broadcast.emit('receive', data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });

});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// const io = require('socket.io')(8000)
// const users ={};

// io.on('connection',socket=>{
    
//     socket.on('new-user-joined', (name) =>{
//         console.log("New User: ",name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined',name);
//     });

//     socket.on('send', data =>{
//         socket.broadcast.emit('receive',data);
//     });

//     socket.on('disconnect', message =>{
//         socket.broadcast.emit('left',users[socket.id]);
//         delete users[socket.id];
//     });
// })