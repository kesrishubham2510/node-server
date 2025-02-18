const http = require('http');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const bodyParser = require('body-parser');

const express = require('express');

// because express package exports a function 
const app = express();

// Middleware to parse the requestBody
// false means, parse the incoming data as simple objects like array, String
app.use(bodyParser.urlencoded({extended: false}));

// adding the route middleware
app.use(adminRoutes);
app.use(homeRoutes);

// middleware to handle any un-recognised API
app.use('/', (req, res, next)=>{
    res.status(404);
    res.send('<html><head></head><body><h1>! 404 Not found !</h1></body></html>')
});

const server = http.createServer(app);

server.listen(3000);
