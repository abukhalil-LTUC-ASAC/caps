'use strict';

function log(event, payload, id) {
  if (id) {
    console.log(`DRIVER: ${event} ${id}`);
  }

  let time = new Date();
  console.log('EVENT LOG ', {time, event, payload});
}

module.exports = log;