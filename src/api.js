import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5555/');

function connect(userId, cb) {
  socket.on("chat", (message) => {
    console.log("aiaiaiaiia", message, userId)
      if(userId !== message.sender._id){
          console.log("chat!----------", message)
          console.log("userID!----------", userId)
          cb(message);
      }
  })
}


function sendMessage(msg) {
  socket.emit('chat message', msg);
}

export { connect, sendMessage }
