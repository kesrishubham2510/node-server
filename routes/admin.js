const express = require('express');

const router = express.Router();

router.get('/product',(req, res, next)=>{
    res.send('<!DOCTYPE html> <html> <head> <title>Product Form</title> </head> <body> <h2>Product Form</h2> <form action="/product" method="POST"> <label for="name">Name:</label><br> <input type="text" id="name" name="name" required><br><br> <button type="submit">Add</button> </form> </body> </html>');
});

// Adding the middleware to add the contact
router.post('/product',(req, res, next)=>{
    console.log(req.body);
    res.send('<html><head></head><body><h1>! Product stored !</h1></body></html>')
});


module.exports = router;