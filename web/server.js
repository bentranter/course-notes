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
var r = require('rethinkdb');
var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
});
var app = express();

/**
 * A helper for fixing paths.
 *
 * @param {String} the path string
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
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * We only want to expose tests in development.
 */

if (config.isDev) {
    app.use(serveStatic(fixPath('test/assets')));
    app.use(serveStatic(fixPath('test/spacemonkey')));
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * To test with Spacemoneky, you have to use frames.
 */
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

/**
 * Set the view engine. We're going to use Jade.
 */
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
  coolnessFactor: Number
});

// Create route for 'people'
var peopleRoute = router.route('/people');

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
 
console.log(chalk.magenta(config.client.name) + ' is running at: http://localhost:' + config.http.port);