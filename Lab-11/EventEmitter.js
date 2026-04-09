const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.on('greet', (name) => {
    console.log(`Welcome email sent to ${name}`);
});

emitter.on('login', (user) => {
    console.log(`User logged in: ${user.name} at ${user.time}`);
});

emitter.on('error', (msg) => {
    console.log(`Error occurred: ${msg}`);
});

console.log('--- Triggering greet event ---');
emitter.emit('greet', 'Riyan');

console.log('\n--- Triggering login event ---');
emitter.emit('login', { name: 'Tanisha', time: new Date().toLocaleTimeString() });

console.log('\n--- Triggering error event ---');
emitter.emit('error', 'Something went wrong!');