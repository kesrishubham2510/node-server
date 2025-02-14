const http = require('http');
const fileSystem = require('fs');

/* 
    -> createServer accepts a event listener
    -> This eventListener is executed for every incoming request
*/

const server = http.createServer((request, response)=> {

    const requestUrl = request.url;
    const requetMethod = request.method;

    if(requestUrl === '/') {
        response.setHeader('processed-by', request.url);
        response.setHeader('method-type', request.method);
        response.write('<html>');
        response.write('<head>');
        response.write('<title>Contact Form</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('<h2>Contact Form</h2>');
        response.write('<form action="http://localhost:3000/message" method="post">');
        response.write('<label for="name">Name:</label><br>');
        response.write('<input type="text" id="name" name="name" required><br><br>');
        response.write('<label for="email">Email:</label><br>');
        response.write('<input type="email" id="email" name="email" required><br><br>');
        response.write('<label for="phone">Phone Number:</label><br>');
        response.write('<input type="tel" id="phone" name="phone" required><br><br>');
        response.write('<button type="submit">Send</button>');
        response.write('</form>');
        response.write('</body>');
        response.write('</html>');
        return response.end();
    
    }else if(requestUrl === "/message" && requetMethod==='POST'){
       
        const methodBody = [];

        // event listener to read the chunks of request body
        request.on('data', (chunk)=>{
            methodBody.push(chunk);
        })

        // event listener triggered when the requestBody stream is completely parsed
        request.on('end', ()=>{
            const formInput = Buffer.concat(methodBody).toString();
            const messages = formInput.split('&');
            messages.forEach(message => fileSystem.appendFileSync('messages.txt', message+'\n'));
        });

        return response.end();
    }

});

server.listen(3000);
