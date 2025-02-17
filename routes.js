const fileSystem = require('fs');

const requestHandler = (request, response) => {

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
                /*
                   -> Writing to a file in a synchronised mode is not advisable as file I/O is blocking.
                   -> It blocks the execution of next instructions until the I/O is complete.
                */
    
                messages.forEach(message => fileSystem.writeFile('messages.txt', message+'\n', (err => {
                    
                    /*  
                        Returning the response from callback ensures that the successful response is returned 
                        when the writing to the file is executed without any issue.
                    */
                    if(err==null){
                        response.write('<html>');
                        response.write('<head/>');
                        response.write('<body>');
                        response.write('<h2>Message Saved</h2>');
                        response.write('</body>');
                        response.write('</html>');
                        return response.end();
                    }
                })));
            });
        }
    
}

// registering the requestHandler function in the global module registry of nodeJs
module.exports = requestHandler;