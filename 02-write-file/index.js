const fs = require('fs');
const readline = require('readline');
const path = require('path');

const folderPath = __dirname;
const filePath = path.join(folderPath, 'result.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
console.log('Здравствуйте! Введите свое сообщение. Для выхода можете ввести exit');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    console.log('Вы вышли из программы');
    rl.close();
    writeStream.end();
  }
  else {
    writeStream.write(input + '\n');
  }
});

rl.on('SIGINT', () => {
  console.log('Вы вышли из программы');
  rl.close();
  writeStream.end();
  process.exit();
});