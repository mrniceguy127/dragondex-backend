const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dragondexLib = require('../lib');


let server = new dragondexLib.Server(process.env.PORT || 3000, '/', './routes');
server.registerRoutes();
server.listen('Server running on port ' + server.port + '!');
