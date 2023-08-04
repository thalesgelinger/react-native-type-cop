const WebSocket = require('ws');
const { spawn } = require('child_process');
const { backgroundColors, fontColors } = require('./colorize');

console.log('Started typecop');

const wss = new WebSocket.Server({ port: 8080 });

const typeCheck = (ws) => {
  const child = spawn('npx', ['ts-watch']);

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', (chunk) => {
    if (chunk.includes('error')) {
      if (!chunk.includes('Found 0 errors')) {
        const errorTag =
          backgroundColors.red +
          fontColors.black +
          ' ERROR ' +
          fontColors.reset;
        console.error(errorTag + ' ' + chunk);
        if (chunk.includes('error ')) {
          console.log('sending');
          ws.send('ERROR ' + chunk);
        }
      } else {
        const logTag =
          backgroundColors.white +
          fontColors.black +
          ' LOG ' +
          fontColors.reset;
        console.log(logTag + ' ' + 'No types Error');
        ws.send('LOG ' + chunk);
      }
    }
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  typeCheck(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
