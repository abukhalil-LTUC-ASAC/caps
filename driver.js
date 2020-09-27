'use strict';

const events = require('./events');
const log = require('./caps');

events.on('pickup', payload => {
  log('pickup', payload, undefined, 0)
  events.emit('in-transit', payload);
});

events.on('in-transit', payload => setTimeout(() => {
  log('in-transit', payload, payload.orderId);
  events.emit('delivered', payload);
}, 1000));

events.on('delivered', payload => setTimeout(() => log('delivered', payload, payload.orderId), 3000));

