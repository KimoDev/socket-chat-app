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
  
//   io.on('connection', function (socket) {
//     io.emit('this', { will: 'be received by everyone'});
  
//     socket.on('private message', function (from, msg) {
//       console.log('I received a private message by ', from, ' saying ', msg);
//     });

//   });



http.listen(port, function(){
  console.log('listening on *:3000');
})