var socket = io();

    $(function () {
        const $usernameInput = $('.usernameInput');

        const setUsername = () => {
            username = $usernameInput.val().trim();

            // If the username is valid
            
            $(".login-page").fadeOut();
            $(".chat-page").show();

            // Tell the server your username
            socket.emit('add user', username);
            
            console.log(username);
            }

            //Keyboard Event Listener
            $(".usernameInput").on('keyup', function (e) {
                if (e.keyCode == 13) {
                    setUsername();

                }
            });

        socket.on('user joined', (data) => {
            $('#messages').append($('<li>').text(data.username + ' joined the chat'));
        });

       

    $(".chat-page").hide();
    $('form').submit(function(){
      socket.emit('chat message', $('#msg').val());
      $('#msg').val('');
      return false;
    });


    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
    
    
  });