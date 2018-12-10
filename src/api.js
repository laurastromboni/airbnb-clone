import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5555/');

function connect(cb) {
  socket.on('chat', (message) => {
    console.log(message)
    cb(message);
  })
}

export { connect }
