const http = require('http');
const path = require('path');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const bodyParser = require('body-parser');
const rootDir = require('./utils/pathUtil');

const express = require('express');

// because express package exports a function 
const app = express();

// Middleware to parse the requestBody
// false means, parse the incoming data as simple objects like array, String
app.use(bodyParser.urlencoded({extended: false}));

// adding the route middleware
// only the paths starting with /admin will be redirected to adminRoutes
app.use('/admin', adminRoutes);
app.use(homeRoutes);

// middleware to handle any un-recognised API
app.use('/', (req, res, next)=>{
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', 'NotFound.html'))
});

const server = http.createServer(app);

server.listen(3000);
