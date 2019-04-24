const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dragondexLib = require('../lib');

mongoose.connect(process.env.MONGODB_SERVER || 'mongodb://localhost/dragondex', { useNewUrlParser: true });

let server = new dragondexLib.Server(process.env.PORT || 3000, '/', __dirname + '/routes');
server.registerRoutes();
server.app.use('/static', express.static(path.join(__dirname, './public')));
server.listen('Server running on port ' + server.port + '!');
