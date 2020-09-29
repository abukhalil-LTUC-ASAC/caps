'use strict';

const net = require('net');

const host = process.env.HOST || 'localhost';
const port = process.env.port || 4000;
const client = new net.Socket();

client.connect(port, host, () => {
  console.log('connecting Driver...');
});

client.on('data', (data) => {
  let msg = JSON.parse(data);
  if (msg.event == 'pickup') {
    setTimeout(() => {
      console.log(`picking up ${msg.payload.orderId}`);
      sendMessageToServer({event: 'in-transit', payload: msg.payload});

      
      setTimeout(() => {
        console.log(`delivered ${msg.payload.orderId}`);
        sendMessageToServer({event: 'delivered', payload: msg.payload});
      }, 3000);
    }, 1000);
  }
});

sendMessageToServer({message: 'Hello from Driver!!'});

client.on('close', function () {
  console.log("connection is closed!!");
});

function sendMessageToServer(text) {
  let event = JSON.stringify(text);
  client.write(event);
}
