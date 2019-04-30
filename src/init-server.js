const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dragondexLib = require('../lib');
const rateLimit = require('express-rate-limit');

mongoose.connect(process.env.MONGODB_SERVER || 'mongodb://localhost/dragondex', { useNewUrlParser: true });

let server = new dragondexLib.Server(process.env.PORT || 3000, '/', __dirname + '/routes');

// Add ratelimiting for API endpoints. 60 requests max / minute.
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60
});

server.app.use('/api/v1/', apiLimiter);

server.registerRoutes();
server.app.use('/static', express.static(path.join(__dirname, './public')));
server.listen('Server running on port ' + server.port + '!');
