const express = require('express');
const { createLogger, transports, format } = require('winston');

const app = express();
app.use(express.json());

// Create a logger instance with a file transport
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'requests.log' })
    ]
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

// Middleware to log requests
app.use((req, res, next) => {
    logger.info({
        message: 'Request received',
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString()
    });
    next();
});

app.get('/webhook', (req, res) => {
    const a = req.query["hub.challenge"];
    res.send(a);
});

app.post("/webhook", (request, response) => {
    const status = {
        "Status": "Running"
    };
    
    response.send(status);
});
