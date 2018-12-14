import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL + '/');

// function connect opens the connection between server & client (socket.on)
function connect(userId, cb) {
  socket.on("chat", (message) => {
    console.log("aiaiaiaiia", message, userId)
      if(userId === message.recipient._id){
          console.log("chat!----------", message)
          console.log("userID!----------", userId)
          cb(message);
      }
  })
}

// when one user sends a message, it will send info to the socket server (socket.emit)
function sendMessage(msg) {
  console.log("bibibibibibib", msg)
  socket.emit('chat message', msg);
}

export { connect, sendMessage }
