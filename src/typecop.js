const WebSocket = require('ws');
const { spawn } = require('child_process');
const { backgroundColors, fontColors } = require('./colorize');

console.log('Started typecop');

const TAG = {
  LOG: backgroundColors.white + fontColors.black + ' LOG ' + fontColors.reset,
  ERROR: backgroundColors.red + fontColors.black + ' ERROR ' + fontColors.reset,
};

const hasError = (chunk) => {
  // const tsRegexError = /TS\d+(?=:)/;
  // return tsRegexError.test(chunk);
  return chunk.includes(' error');
};

const stopPoint = (chunk) => {
  const stopRegex = /\[ (\d{1,2}:\d{2}:\d{2} [APap][Mm]) \]/;
  return stopRegex.test(chunk);
};

const wss = new WebSocket.Server({ port: 8080 });

const cleanText = (text) => {
  return text.replace(/\u001b\[\d{1,2}m/g, ' ');
};

let errors = [];

const typeCheck = (ws) => {
  const child = spawn('npx', ['ts-watch', '--pretty']);

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', (chunkRaw) => {
    const chunk = cleanText(chunkRaw);

    const splittedChunk = chunk.split('\n').filter((v) => !!v);

    if (stopPoint(splittedChunk[0]) && !splittedChunk[0].includes('Found')) {
      errors = [];
    }

    if (hasError(chunk)) {
      const onlyErrors = splittedChunk.filter((c) => !stopPoint(c));
      errors = [...errors, ...onlyErrors];
    }

    if (splittedChunk[splittedChunk.length - 1].includes('Found')) {
      const sanitizedErrors = [];
      for (let i = 0; i < errors.length; i = i + 3) {
        sanitizedErrors.push({
          message: errors[i],
          line: errors[i + 1],
          hint: errors[i + 2],
        });
      }

      errors.forEach((error) => {
        console.log(TAG.ERROR + error);
      });
      ws.send(JSON.stringify(sanitizedErrors));

      if (!errors.length) {
        console.log(TAG.LOG + ' ' + 'No types Error');
      }
      errors = [];
      return;
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
