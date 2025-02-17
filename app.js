const http = require('http');

const express = require('express');

// because express package exports a function 
const app = express();

// Adding the middleware
app.use((req, res, next)=>{
    console.log("This is my first middleware");
    next();
})

app.use((req, res, next)=>{
    res.send("<h1>! Hello from a middleware !</h1>");
})

/* 
    -> createServer accepts a event listener
    -> This eventListener is executed for every incoming request
*/

const server = http.createServer(app);

server.listen(3000);
