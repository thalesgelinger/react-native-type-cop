const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to server');

  ws.on('message', (message) => {
    console.log('Received:', JSON.parse(message.toString()));
  });
});

ws.on('close', () => {
  console.log('Connection to server closed');
});
