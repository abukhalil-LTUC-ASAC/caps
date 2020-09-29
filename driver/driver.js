'use strict';

const inquirer = require('inquirer');
const net = require('net');

const host = process.env.HOST || 'localhost';
const port = process.env.port || 4000;
const client = new net.Socket();

client.connect(port, host, () => {
  console.log('connecting chat...');
});

client.on('data', (data) => {
  let event = JSON.parse(data);
  console.log("event >>>>>>", event);
});

function sendMessageToServer(text) {
  let event = JSON.stringify(text);
  client.write(event);
}

// const events = require('../events');
// const log = require('../caps/caps');

// events.on('pickup', payload => {
//   log('pickup', payload, undefined);
//   events.emit('in-transit', payload);
// });

// events.on('in-transit', payload => setTimeout(() => {
//   log('in-transit', payload, payload.orderId);
//   events.emit('delivered', payload);
// }, 1000));

// events.on('delivered', payload => setTimeout(() => {
//   log('delivered', payload, payload.orderId);
//   console.log('\n\nThank You for using YA Delivery Services!\n---------------------------------------');
// }, 3000));
