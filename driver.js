'use strict';

const events = require('./events');
const log = require('./caps');

events.on('pickup', payload => {
  log('pickup', payload, undefined);
  events.emit('in-transit', payload);
});

events.on('in-transit', payload => setTimeout(() => {
  log('in-transit', payload, payload.orderId);
  events.emit('delivered', payload);
}, 1000));

events.on('delivered', payload => setTimeout(() => {
  log('delivered', payload, payload.orderId);
  console.log('\n\nThank You for using YA Delivery Services!\n---------------------------------------');
}, 3000));
