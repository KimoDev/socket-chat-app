var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

  io.on('connection', function(socket){
    socket.join('main');
    

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });



  // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
    //if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
  
    // echo globally (all clients) that a person has connected
     socket.in('main').emit('user joined', {
       username: socket.username
     });

    });
  });
  

http.listen(port, function(){
  console.log('listening on *:3000');
})