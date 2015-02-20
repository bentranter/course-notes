'use strict';

/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  jwt = require('jwt-simple'),
  errorHandler = require('express-error-handler'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  c = require('chalk'),
  thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
  });

var r = thinky.r;
var app = module.exports = express();


/**
 * Configuration
 */

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(compress());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
  next();
});

var env = process.env.NODE_ENV || 'development';

// Development only
if (env === 'development') {
  app.use(errorHandler());
}

// Production only
if (env === 'production') {
  // @TODO
}


/**
 * Routes
 */

// Serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// API

// Nonsecure endpoints. You can sign up or login 
// at these.
app.post('/api/login', api.login);
app.post('/api/signup', api.signUp);

// Secure endpoints
app.get('/api/user', api.authorizeToken, api.getUserList);

// People -- use this for testing
app.get('/api/people', api.list);
app.get('/api/people/:id', api.get);
app.delete('/api/people/:id', api.delete);
app.put('/api/people/:id', api.update);
app.post('/api/people', api.authorizeToken, api.add);

// Notes -- this is the real stuff. The server won't actually
// accept a username from you, it'll grab it instead from your
// token
app.get('/api/notes', api.authorizeToken, api.listNotes);
app.get('/api/notes/:id', api.authorizeToken, api.getNote);
app.delete('/api/notes/:id', api.authorizeToken, api.deleteNote);
app.put('/api/notes/:id', api.authorizeToken, api.updateNote);
app.post('/api/notes', api.authorizeToken, api.addNote);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app)
  .listen(app.get('port'), function () {
    console.log('\nExpress server listening on port ' + c.green(app.get('port')));
  });