const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write('<h1> Welcome to My Node.js Server! </h1>');
    res.write('<p> Request received at: ' + new Date().toLocaleString() + '</p>');
    res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server running at http://localhost:${PORT}');
});

// Open http://localhost:3000 in browser