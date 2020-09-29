'use strict';

require('./driver');
const events = require('./events');

jest.spyOn(global.console, 'log');

const order_template = {
  storeName: process.env.VENDOR,
  orderId: 0,
  customerName: 'Yahya Abu Khalil',
  address: 'Not gonna give you up',
};

function generateFake(order) {
  return order;
}

describe('caps module has the console logs', ()=> {
  // test case
  it('does nothing with invalid action', ()=> {
    events.emit('wrong', generateFake(order_template));
    expect(console.log).not.toHaveBeenCalled();
  });

  it('logs out when given action', ()=> {
    events.emit('pickup', generateFake(order_template));
    setTimeout(() => {
      expect(console.log).toHaveBeenCalled(3);
    }, 4000);
  });
});


