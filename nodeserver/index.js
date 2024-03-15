/*const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));*/


/*const io = require('socket.io')(5500)
const users = {};


io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
    });


socket.on('send', message =>{
    socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    });
});*/
const io = require('socket.io')(5500, {
    cors: {
      origin: 'http://127.0.0.1:5500',
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    },
  });
  
  const users = {};
  
  io.on('connection', socket => {
    socket.on('new-user-joined', name => {
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });
  
    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, name: users[socket.id]});
    });
    socket.on('disconnect', message => {
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
  });

});