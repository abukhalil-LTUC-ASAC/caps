'use strict';

require('dotenv').config();
// const events = require('./events');
const faker = require('faker/locale/en');
const { setInterval } = require('timers');
const net = require('net');


const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

client.connect(port, host, ()=> {
  console.log("connecting ... ");

  setInterval(() => {
    console.log('intervals');
    let event = JSON.stringify({event: 'pickup', payload: generateFake(order_template)});
    client.write(event);
  }, 5000);
});


client.on('data', (data)=> {
    let jsonData = JSON.parse(data);
    if (jsonData.event == 'delivered')
    console.log(`thank you for delivering ${jsonData.payload.payload}`);
});

client.on('close', function () {
    console.log("connection is closed!!");
});

const msg = JSON.stringify({message: 'Hello from Logger!!'});
client.write(msg);

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