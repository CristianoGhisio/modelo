const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('prompt: ', (user_input) => {
  console.log(user_input);
  rl.close();
}); 