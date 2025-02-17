const http = require('http');

const requestHandler = require('./routes');

/* 
    -> createServer accepts a event listener
    -> This eventListener is executed for every incoming request
*/

const server = http.createServer((request, response)=> {

    return requestHandler(request, response);

});

server.listen(3000);
