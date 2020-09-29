'use strict';

const io = require('socket.io')(4001);
const caps = io.of('/caps'); // of is only for caps namespace (url part)

io.on('connection', (socket)=> {
  console.log('Welcome to My Global Connection!');
});

caps.on('connection', (socket)=> {
  socket.on('join', payload=> {
    console.log('connecting =>>', payload);
    socket.join(payload);
  });

  socket.on('data', buffer => {
    let msg = JSON.parse(buffer.toString());
    if (msg.event && msg.payload) {
      broadcastMsg(msg);
    }
  });
});

/**
 * Broadcasts the object input as a string from each client to everyone again
 * @param {Object} msg incoming object from a client with payload and event
 */
function broadcastMsg(msg) {
  let payload = JSON.stringify(msg);
  console.log('emitting', msg);
    
  caps.emit('data', payload);
}

