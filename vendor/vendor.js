'use strict';

require('dotenv').config();
const faker = require('faker/locale/en');
const { setInterval } = require('timers');
const io = require('socket.io-client');
const vendor = io.connect('http://localhost:4001/caps');

console.log('connecting Vendor ... ');
vendor.on('connect', ()=> {
  console.log('Vendor Connected!');
  vendor.emit('join', 'vendor');

  setInterval(() => {
    console.log('interval ... ');
    sendMessageToServer({event: 'pickup', payload: generateFake(order_template)});
  }, 5000);
});

vendor.on('data', (data)=> {
  let jsonData = JSON.parse(data);
  if (jsonData.event == 'delivered') {
    console.log(`thank you for delivering ${jsonData.payload.orderId}`);
  }
});

sendMessageToServer({message: 'Hello from Vendor!!'});
/**
 * template data object that is going to be passed around as a purchase
 * 
 */
const order_template = {
  storeName: process.env.VENDOR,
  orderId: 0,
  customerName: 'Yahya Abu Khalil',
  address: 'Not gonna give you up',
};
/**
 * Faker library generator to generate object values as fit
 * @param {Object} order input template to manipulate it's values
 */
function generateFake(order) {
  order.orderId = faker.random.number(1000);
  order.customerName = faker.name.findName(...Array(1),'Abu Khalil');
  order.address = faker.address.streetAddress();
  return order;
}
/**
 * emits client data object as a string to the server
 * @param {Object} text outgoing object from the client with payload and event
 */
function sendMessageToServer(text) {
  let event = JSON.stringify(text);
  vendor.emit(`data`, event);
}