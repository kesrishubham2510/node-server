const path = require('path');
const express = require('express');

const router = express.Router();

// path.join() is recommended to use becasue it creates the path based on OS
router.get('/add-product',(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});


// Adding the middleware to add the contact
router.post('/product',(req, res, next)=>{
    console.log(req.body);
    res.send('<html><head></head><body><h1>! Product stored !</h1></body></html>')
});


module.exports = router;