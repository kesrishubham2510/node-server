const http = require('http');

/* 
    -> createServer accepts a event listener
    -> This eventListener is executed for every incoming request
*/

const server = http.createServer((request, response)=> {

    response.setHeader('processed-by', request.url);
    response.setHeader('method-type', request.method);
    response.write('<html>');
    response.write('<h1>');
    response.write('This is processed by my first node js sever');
    response.write('<\h1>');
    response.write('<\html>');
    response.end();
});

server.listen(3000);
