import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL + '/');

function connect(userId, cb) {
  socket.on("chat", (message) => {
    console.log("aiaiaiaiia", message, userId)
      if(userId == message.recipient._id){
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
