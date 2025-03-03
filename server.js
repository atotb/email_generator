// server.js
import http from 'http';  // Import the HTTP module
import parse from 'querystring'; // We might need this to parse the request data
import StringDecoder from 'string_decoder';  // For easier body parsing

// Set up the HTTP server
const server = http.createServer((req, res) => {
      // Set the content type to JSON for responses
      res.setHeader('Content-Type', 'application/json');

      // Check if the request method is POST and the URL matches the webhook endpoint
      if (req.method === 'POST' && req.url === '/webhook') {
            let body = '';

            // Create a string decoder to handle incoming chunks of data
            const decoder = new StringDecoder('utf-8');

            // Listen for incoming data chunks
            req.on('data', (chunk) => {
                  body += decoder.write(chunk);  // Concatenate each chunk to the body
            });

            // After all data is received
            req.on('end', () => {
                  body += decoder.end();  // Finish decoding the body

                  try {
                        const webhookData = JSON.parse(body); // Parse the JSON data from the body
                        console.log('Received webhook data:', webhookData);

                        // Handle your webhook data here (e.g., save to database, call other APIs)

                        // Send a response back to the client
                        res.writeHead(200);  // HTTP Status Code for Success
                        res.end(JSON.stringify({ message: 'Webhook received successfully' }));
                  } catch (error) {
                        console.error('Error parsing JSON:', error);
                        res.writeHead(400);  // Bad Request error
                        res.end(JSON.stringify({ message: 'Invalid JSON in webhook' }));
                  }
            });
      } else {
            // For any other requests, send a 404 error (not found)
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Not Found' }));
      }
});

// Start the server
server.listen(5050, () => {
      console.log('Server running on port 5000');
});