'use strict';

const io = require('socket.io-client');
const driver = io.connect('http://localhost:4001/caps');

console.log('connecting Driver...');
driver.on('connect', () => {
  console.log('Driver Connected!');
  driver.emit('join', 'driver');
});

driver.on('data', (data) => {
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
/**
 * emits client data object as a string to the server
 * @param {Object} text outgoing object from the client with payload and event
 */
function sendMessageToServer(text) {
  let event = JSON.stringify(text);
  driver.emit('data', event);
}
