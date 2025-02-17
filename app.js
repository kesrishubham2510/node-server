const http = require('http');
const bodyParser = require('body-parser');

const express = require('express');

// because express package exports a function 
const app = express();

// Middleware to parse the requestBody
// false means, parse the incoming data as simple objects like array, String
app.use(bodyParser.urlencoded({extended: false}));

// Adding the middleware
app.use('/contact',(req, res, next)=>{
    res.send('<!DOCTYPE html> <html> <head> <title>Contact Form</title> </head> <body> <h2>Contact Form</h2> <form action="/add-contact" method="POST"> <label for="name">Name:</label><br> <input type="text" id="name" name="name" required><br><br> <button type="submit">Send</button> </form> </body> </html>');
});

// Adding the middleware to add the contact
app.use('/add-contact',(req, res, next)=>{
    console.log(req.body);
    res.send('<html><head></head><body><h1>! Contact stored !</h1></body></html>')
});

app.use('/', (req, res, next)=>{
    res.send("<h1>! Hello from a middleware !</h1>");
});

/* 
    -> createServer accepts a event listener
    -> This eventListener is executed for every incoming request
*/

const server = http.createServer(app);

server.listen(3000);
