var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });

  io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');
  });

  // when the client emits 'add user', this listens and executes
  io.on('connection', function (socket) {
    socket.on('add user', (username) => {
    //if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    
    //addedUser = true;
    
    
    // echo globally (all clients) that a person has connected
     socket.broadcast.emit('user joined', {
       username: socket.username
     });
    
    });
  });

  

http.listen(port, function(){
  console.log('listening on *:3000');
})