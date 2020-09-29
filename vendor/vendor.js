'use strict';

require('dotenv').config();
// const events = require('./events');
const faker = require('faker/locale/en');
const util = require('util')
const { setInterval } = require('timers');
const net = require('net');

      // console.log(util.inspect(jsonData, {showHidden: false, depth: null}))

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

client.connect(port, host, ()=> {
  console.log("connecting Vendor ... ");

  setInterval(() => {
    sendMessageToServer({event: 'pickup', payload: generateFake(order_template)});
  }, 5000);
});


client.on('data', (data)=> {
    let jsonData = JSON.parse(data);
    if (jsonData.event == 'delivered') {
      console.log(`thank you for delivering ${jsonData.payload.orderId}`);
    }
});

client.on('close', function () {
    console.log("connection is closed!!");
});

sendMessageToServer({message: 'Hello from Vendor!!'});

const order_template = {
  storeName: process.env.VENDOR,
  orderId: 0,
  customerName: 'Yahya Abu Khalil',
  address: 'Not gonna give you up',
};

function generateFake(order) {
  order.orderId = faker.random.number(1000);
  order.customerName = faker.name.findName(...Array(1),'Abu Khalil');
  order.address = faker.address.streetAddress();
  return order;
}

function sendMessageToServer(text) {
  let event = JSON.stringify(text);
  client.write(event);
}