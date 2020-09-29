
// chat >>>>>>>>>
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
// ----------------------------------------------------------
const inquirer = require('inquirer');
const net = require('net');

const host = process.env.HOST || 'localhost';
const port = process.env.port || 4000;

client.connect(port, host, () => {
  console.log('connecting chat...');
})

client.on('data', (data) => {
  let event = JSON.parse(data);
  console.log("event >>>>>>", event);
})

function sendMessageToServer(text) {
  let event = JSON.stringify(text);
  client.write(event);
}

async function getUserInput() {
  let input = await inquirer.prompt([{name: 'text', }]);
  getUserInput();
}

getUserInput();

// logger >>>>>>>>>>>>>
const net = require('net');

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.port || 4000;

client.connect(port, host, () => {
  console.log('connecting logger...');
})

client.on('data', (data) => {
  let jsonData = JSON.parse(data);
  console.log(jsonData);
})

client.on('close', () => {
  console.log('connection is closed');
})

const msg = JSON.stringify({message: 'Hello from logger'});
client.write(msg);
// server >>>>>>>>>>>
const net = require('net');

const server = net.createServer();
const port = process.env.port || 4000;
server.listen(port, () => console.log(`server is running on ${port}`));

let socketPool = {};
server.on('connection', (socket) => {
  console.log('user is online!!!', socket);

  socket.on('data', buffer => {
    let msg = JSON.parse(buffer.toString());
    broadcastMsg(msg);
  })

  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  
  socket.on('close', () => {
    delete socketPool[id];
  })

  function broadcastMsg(msg) {
    let payload = JSON.stringify(msg);
    for (let id in socketPool) {
      socketPool[id].write(payload);
    }
  }

})

