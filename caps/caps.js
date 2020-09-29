'use strict';

const { Socket } = require('dgram');
const net = require('net');

const server = net.createServer();
const port = process.env.port || 4000;

let socketPool = {};

server.listen(port, () => {
  console.log(`server is running on ${port}`)
});



server.on('connection', (socket) => {
  console.log('user is online!!!', socket);

  socket.on('data', buffer => {
    console.log('buffer ====================>', buffer);
    let msg = JSON.parse(buffer.toString());
    console.log('msg ====================>', msg);
    if (msg.event && msg.payload) {
      broadcastMsg(msg);

      setTimeout(() => {
        // log('in-transit', payload, payload.orderId);
        socket.write(JSON.stringify({event: 'delivered', payload: msg.payload}));
      }, 1000);
    }
  });

  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  
  socket.on('close', () => {
    delete socketPool[id];
  });

  function broadcastMsg(msg) {
    let payload = JSON.stringify(msg);
    for (let id in socketPool) {
      socketPool[id].write(payload);
    }
  }
})
// function log(event, payload, id) {
//   if (id) {
//     console.log(`DRIVER: ${event} ${id}`);
//   }

//   let time = new Date();
//   console.log('EVENT LOG ', {time, event, payload});
// }

