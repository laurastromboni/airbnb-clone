import openSocket from 'socket.io-client';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const socket = openSocket('http://localhost:5555/');

function connect(userId, cb) {
  socket.on("chat", (message) => {
      if(userId !== message.sender){
          NotificationManager.info('New message')
          console.log("chat!----------", message)
          console.log("userID!----------", userId)
          cb(message);
      }
      else{
        // NotificationManager.info('Message Sent')
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
