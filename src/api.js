import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5555/');

function connect(cb) {
  socket.on('chat', (message) => {
    console.log("chat!----------", message)
    cb(message);
  })
}

function sendMessage(msg) {
    socket.emit('chat message', msg);
}

export { connect, sendMessage }
