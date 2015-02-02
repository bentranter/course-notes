'use strict';


/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var chalk = require('chalk');
// var r = require('rethinkdb');
var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
});
var r = thinky.r;
var app = express();


/**
 * A helper for fixing paths.
 *
 * @param {String} the path string
 * @return {String} the resolved path
 *
 * @api private
 *
 */

var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


/**
 * Configure express.
 */

app.use(compress());
app.use(serveStatic(fixPath('public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Only expose tests in development mode
if (config.isDev) {
    app.use(serveStatic(fixPath('test/assets')));
    app.use(serveStatic(fixPath('test/spacemonkey')));
}
// Setup frames to test with SpaceMOnkey
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
// Use Jade
app.set('view engine', 'jade');


/**
 * Setup fake API.
 */

// var api = require('./server/api');
// app.get('/api/people', api.list);
// app.get('/api/people/:id', api.get);
// app.delete('/api/people/:id', api.delete);
// app.put('/api/people/:id', api.update);
// app.post('/api/people', api.add);

/**
 * Enable the functional test site in development.
 */

if (config.isDev) {
    app.get('/test*', semiStatic({
        folderPath: fixPath('test'),
        root: '/test'
    }));
}


/**
 * Set our client config cookie.
 */

app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


/**
 * Use a router for testing.
 . @TODO: You don't need to use express.Router() as of Express 4
 */

var router = express.Router();

/**
 * Initial dummy route for testing.
 */

router.get('/test', function(req, res) {
    res.json({ message: 'Test passed.' });
});

// Put stupid constructor here
var People = thinky.createModel('People', {
  firstName: String,
  lastName:  String,
  coolnessFactor: Number,
  date: { _type: Date, default: r.now() }
});

// Ensure that date can be used as an index
People.ensureIndex('date');

// Create route for 'people'
var peopleRoute = router.route('/people');
var personRoute = router.route('/people/:person_id');

/*
 * Inserts a new document into the table 'People' with the 
 * request body.
 *
 * @param {Object} The HTTP request object
 * @param (Object) The HTTP response object
 * @HTTP POST
 * ENDPOINT `/api/people`
 * @API public
 */

peopleRoute.post(function(req, res) {

    // Log the request body in case
    console.log(req.body.firstName);

    // Create new instance of 'People' model
    var person = new People({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        coolnessFactor: parseInt(req.body.coolnessFactor)
    });

    // Inform where execution gets to
    console.log(chalk.green('Looks good so far...'));

    // @TODO: Open issue in Thinky about promises not resolving according to docs

    // Save the person and check for errors kind-of
    person.save(function(err, doc) {
        if (err) {
            res.send(err);
            console.log(err);
            console.log('Error');
        } else {
            res.json(doc);
            console.log(doc);
            console.log('Success');
        }
    });
});


/**
 * Responds with every person in the database haha.
 *
 * @param {Object} The HTTP request object
 * @param (Object) The HTTP response object
 * @HTTP GET
 * ENDPOINT `/api/people`
 * @API public
 */

peopleRoute.get(function(req, res) {

    People.orderBy({ index: r.desc('date') }).run().then(function(people) {
        res.json(people);
    });
});

/**
 * Responds with the person matching the ID passed.
 *
 * @param {Object} The HTTP request object
 * @param (Object) The HTTP response object
 * @HTTP GET
 * ENDPOINT `/api/people/:person_id`
 * @API public
 */

personRoute.get(function(req, res) {

    People.get(req.params.person_id).run().then(function(person) {
        res.json(person);
    });
});

/**
 * Updates a user based on whatever you pass it.
 *
 * @param {Object} The HTTP request object
 * @param (Object) The HTTP response object
 * @HTTP PUT
 * ENDPOINT `/api/people/:person_id`
 * @API public
 */

personRoute.put(function(req, res) {

    console.log(req.body);

    // NOTE TO DUMB SELF: Use `x-www-url-formencoded` for put req's you idiot
    People.get(req.params.person_id).run().then(function(person) {

        // So &yet does this with Underscore's `_.extend` but it's more
        // readable with if statements IMHO. Obv here we're just checking
        // to see if the field is sent in the body of the req.

        if (req.body.firstName) {
            person.firstName = req.body.firstName;
        }

        if (req.body.lastName) {
            person.lastName = req.body.lastName;
        }

        if (req.body.coolnessFactor) {
            person.coolnessFactor = parseInt(req.body.coolnessFactor);
        }
        // Shoudl I update this??
        person.date = r.now();

        // Save the person and check for errors kind-of
        person.save(function(err, doc) {
            if (err) {
                res.send(err);
                console.log(err);
                console.log('Error');
            } else {
                res.json(doc);
                console.log(doc);
                console.log('Success');
            }
        });
    });
});


personRoute.delete(function(req, res) {

    People.get(req.params.person_id).delete().run().then(function(error, result) {
        res.json({
            error: error,
            result: result
        });
    });
});

/**
 * Register test with router.
 */

app.use('/api', router);


/**
 * Configure Moonboots to serve our client application.
 */

new Moonboots({
    moonboots: {
        jsFileName: 'course-notes',
        cssFileName: 'course-notes',
        main: fixPath('client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('public/css/bootstrap.css'),
            fixPath('public/css/app.css')
        ],
        browserify: {
            debug: false
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested, which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('templates'), fixPath('client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main css file is 
            // requested. Which means you can seamlessly change stylus files and see
            // new styles on refresh.
            if (config.isDev) {
                stylizer({
                    infile: fixPath('public/css/app.styl'),
                    outfile: fixPath('public/css/app.css'),
                    development: true
                }, done);
            } else {
                done();
            }
        }
    },
    server: app
});


/**
 * Listen for incoming http requests on the port as specified in our config.
 */

app.listen(config.http.port);

/**
 * Send startup message to user in the console.
 */
 
console.log(chalk.green(config.client.name) + ' is running at: http://localhost:' + config.http.port);

