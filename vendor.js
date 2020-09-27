'use strict';

const events = require('./events');
const faker = require('faker/locale/en');
const { setInterval } = require('timers');
require('dotenv').config();
require('./caps');
require('./driver');

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

setInterval(() => events.emit('pickup', generateFake(order_template)), 5000);