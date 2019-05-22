const path = require('path');
const http = require('http');
const express = require('express');
const rateLimit = require('express-rate-limit');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const dragondexLib = require('../lib');

/*
  1. Set database settings
  2. Connect to database.
  3. Instantiate 'Server' instance from lib.
  4. Set ratelimits for certain subpaths of server.
  5. Set auth flow settings.
  6. Register server routes
  7. Enable static files route
  8. Listen to server on specified port.
*/

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_SERVER || 'mongodb://localhost/dragondex', { useNewUrlParser: true });

let server = new dragondexLib.Server(process.env.PORT || 3000, '/', __dirname + '/routes');

// Add ratelimiting for API endpoints. 60 requests max / minute.
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60
});

server.app.use('/api/v1/', apiLimiter);

server.app.use(cookieParser());

server.app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

server.app.use(passport.initialize());
server.app.use(passport.session());

server.app.use(express.json());

server.registerRoutes();
server.app.use('/static', express.static(path.join(__dirname, './public')));
server.listen('Server running on port ' + server.port + '!');
