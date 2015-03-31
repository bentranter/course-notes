(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/main.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React         = require('react');
var Router        = require('react-router');
var NoteContainer = require('./NoteContainer.js');
var Sidebar       = require('./Sidebar.js');
var SignInForm    = require('./SignInForm.js');
var SignInPage    = require('./SignInPage.js');

var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;
var Route         = Router.Route;
var RouteHandler  = Router.RouteHandler;

/**
 * App main entry point
 */
var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(NoteContainer, null), 
        React.createElement(Sidebar, null), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

/**
 * Define routes
 */
var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: App}
  )
);

/**
 * Start the Router
 */
Router.run(routes, function(Handler) {
  React.render(React.createElement(Handler, null), document.body);
});
},{"./NoteContainer.js":"/Users/Ben/course-notes/web/react-test/app/NoteContainer.js","./Sidebar.js":"/Users/Ben/course-notes/web/react-test/app/Sidebar.js","./SignInForm.js":"/Users/Ben/course-notes/web/react-test/app/SignInForm.js","./SignInPage.js":"/Users/Ben/course-notes/web/react-test/app/SignInPage.js","react":"react","react-router":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/index.js"}],"/Users/Ben/course-notes/web/react-test/app/NoteContainer.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var NoteContainer = React.createClass({displayName: "NoteContainer",
  render: function() {
    return(
      React.createElement("div", {className: "z1 absolute top-0 left-0 bottom-0 right-offset"}
      )
    );
  }
});

module.exports = NoteContainer;
},{"react":"react"}],"/Users/Ben/course-notes/web/react-test/app/NoteList.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var NoteList = React.createClass({displayName: "NoteList",
  render: function() {
    return (
      React.createElement("div", {className: "ml2 mr2 mt2 btl"}, 
        React.createElement("span", {className: "left"}, 
          React.createElement("h5", {className: "m0 py2 small-caps btd"}, "Your Notes")
        ), 
        React.createElement("span", {className: "right"}, 
          React.createElement("h5", {className: "m0 py2 small-caps light light-gray"}, "Help")
        )
      )
    );
  }
});

module.exports = NoteList;
},{"react":"react"}],"/Users/Ben/course-notes/web/react-test/app/Sidebar.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React      = require('react');
var SignInPage = require('./SignInPage.js');
var NoteList   = require('./NoteList.js');

var Sidebar = React.createClass({displayName: "Sidebar",
  render: function() {
    return(
      React.createElement("div", {className: "z1 absolute sidebar top-0 bottom-0 right-0 bg-silver bll"}, 
        React.createElement(SignInPage, {url: "http://localhost:3000/api/login"}), 
        React.createElement(NoteList, null)
      )
    );
  }
});

module.exports = Sidebar;
},{"./NoteList.js":"/Users/Ben/course-notes/web/react-test/app/NoteList.js","./SignInPage.js":"/Users/Ben/course-notes/web/react-test/app/SignInPage.js","react":"react"}],"/Users/Ben/course-notes/web/react-test/app/SignInForm.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Sign in form
 */
var SignInForm = React.createClass({displayName: "SignInForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    if (!email || !password) {
      return;
    }
    this.props.onSubmit({
      username: email,
      password: password
    });
    React.findDOMNode(this.refs.email).value = '';
    React.findDOMNode(this.refs.password).value = '';
    return;
  },
  componentDidMount: function() {
    console.log('Mounted SignInForm');
  },
  render: function() {
    return (
      React.createElement("form", {className: "signInForm fieldset-reset", onSubmit: this.handleSubmit, action: "http://localhost:3000/api/login", method: "post"}, 
        React.createElement("input", {className: "block full-width", type: "email", placeholder: "Email", ref: "email"}), 
        React.createElement("input", {className: "block full-width", type: "password", placeholder: "Password", ref: "password"}), 
        React.createElement("input", {className: "button full-width bg-silver small-caps light blue center", type: "submit", value: "Sign In"})
      )
    );
  }
});

module.exports = SignInForm;
},{"react":"react"}],"/Users/Ben/course-notes/web/react-test/app/SignInPage.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var request = require('superagent');
var SignInForm = require('./SignInForm.js');
/**
 * Sign in page
 */
var SignInPage = React.createClass({displayName: "SignInPage",
  componentDidMount: function() {
    console.log('Mounted SignInPage');
  },
  handleSignIn: function(userInfo) {
    request
      .post(this.props.url)
      .send(userInfo)
      .end(function(err, res) {
        if (res.ok) {
          window.localStorage.setItem('token', res.body.token);
          console.log(window.localStorage.getItem('token'));
        } else {
          console.log('Oh no! error ' + res.text);
        }
      });
    console.log('Request fired');
  },
  render: function() {
    return (
      React.createElement("div", {className: "signInPage ml2 mr2 mt2 btl"}, 
        React.createElement("span", {className: "left"}, 
          React.createElement("h5", {className: "m0 py2 small-caps btd"}, "Sign in to StudyPiggy")
        ), 
        React.createElement("span", {className: "right"}, 
          React.createElement("h5", {className: "m0 py2 small-caps light light-gray"}, "Forgot password?")
        ), 
        React.createElement("div", {className: "cf"}), 
        React.createElement(SignInForm, {onSubmit: this.handleSignIn})
      )
    );
  }
});

module.exports = SignInPage;
},{"./SignInForm.js":"/Users/Ben/course-notes/web/react-test/app/SignInForm.js","react":"react","superagent":"/Users/Ben/course-notes/web/react-test/node_modules/superagent/lib/client.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Cancellation.js":[function(require,module,exports){
"use strict";

/**
 * Represents a cancellation caused by navigating away
 * before the previous transition has fully resolved.
 */
function Cancellation() {}

module.exports = Cancellation;
},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js":[function(require,module,exports){
"use strict";

var invariant = require("react/lib/invariant");
var canUseDOM = require("react/lib/ExecutionEnvironment").canUseDOM;

var History = {

  /**
   * The current number of entries in the history.
   *
   * Note: This property is read-only.
   */
  length: 1,

  /**
   * Sends the browser back one entry in the history.
   */
  back: function back() {
    invariant(canUseDOM, "Cannot use History.back without a DOM");

    // Do this first so that History.length will
    // be accurate in location change listeners.
    History.length -= 1;

    window.history.back();
  }

};

module.exports = History;
},{"react/lib/ExecutionEnvironment":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Match.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/* jshint -W084 */
var PathUtils = require("./PathUtils");

function deepSearch(route, pathname, query) {
  // Check the subtree first to find the most deeply-nested match.
  var childRoutes = route.childRoutes;
  if (childRoutes) {
    var match, childRoute;
    for (var i = 0, len = childRoutes.length; i < len; ++i) {
      childRoute = childRoutes[i];

      if (childRoute.isDefault || childRoute.isNotFound) continue; // Check these in order later.

      if (match = deepSearch(childRoute, pathname, query)) {
        // A route in the subtree matched! Add this route and we're done.
        match.routes.unshift(route);
        return match;
      }
    }
  }

  // No child routes matched; try the default route.
  var defaultRoute = route.defaultRoute;
  if (defaultRoute && (params = PathUtils.extractParams(defaultRoute.path, pathname))) {
    return new Match(pathname, params, query, [route, defaultRoute]);
  } // Does the "not found" route match?
  var notFoundRoute = route.notFoundRoute;
  if (notFoundRoute && (params = PathUtils.extractParams(notFoundRoute.path, pathname))) {
    return new Match(pathname, params, query, [route, notFoundRoute]);
  } // Last attempt: check this route.
  var params = PathUtils.extractParams(route.path, pathname);
  if (params) {
    return new Match(pathname, params, query, [route]);
  }return null;
}

var Match = (function () {
  function Match(pathname, params, query, routes) {
    _classCallCheck(this, Match);

    this.pathname = pathname;
    this.params = params;
    this.query = query;
    this.routes = routes;
  }

  _createClass(Match, null, {
    findMatch: {

      /**
       * Attempts to match depth-first a route in the given route's
       * subtree against the given path and returns the match if it
       * succeeds, null if no match can be made.
       */

      value: function findMatch(routes, path) {
        var pathname = PathUtils.withoutQuery(path);
        var query = PathUtils.extractQuery(path);
        var match = null;

        for (var i = 0, len = routes.length; match == null && i < len; ++i) match = deepSearch(routes[i], pathname, query);

        return match;
      }
    }
  });

  return Match;
})();

module.exports = Match;
},{"./PathUtils":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PathUtils.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Navigation.js":[function(require,module,exports){
"use strict";

var warning = require("react/lib/warning");
var PropTypes = require("./PropTypes");

function deprecatedMethod(routerMethodName, fn) {
  return function () {
    warning(false, "Router.Navigation is deprecated. Please use this.context.router." + routerMethodName + "() instead");

    return fn.apply(this, arguments);
  };
}

/**
 * A mixin for components that modify the URL.
 *
 * Example:
 *
 *   var MyLink = React.createClass({
 *     mixins: [ Router.Navigation ],
 *     handleClick(event) {
 *       event.preventDefault();
 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
 *     },
 *     render() {
 *       return (
 *         <a onClick={this.handleClick}>Click me!</a>
 *       );
 *     }
 *   });
 */
var Navigation = {

  contextTypes: {
    router: PropTypes.router.isRequired
  },

  /**
   * Returns an absolute URL path created from the given route
   * name, URL parameters, and query values.
   */
  makePath: deprecatedMethod("makePath", function (to, params, query) {
    return this.context.router.makePath(to, params, query);
  }),

  /**
   * Returns a string that may safely be used as the href of a
   * link to the route with the given name.
   */
  makeHref: deprecatedMethod("makeHref", function (to, params, query) {
    return this.context.router.makeHref(to, params, query);
  }),

  /**
   * Transitions to the URL specified in the arguments by pushing
   * a new URL onto the history stack.
   */
  transitionTo: deprecatedMethod("transitionTo", function (to, params, query) {
    this.context.router.transitionTo(to, params, query);
  }),

  /**
   * Transitions to the URL specified in the arguments by replacing
   * the current URL in the history stack.
   */
  replaceWith: deprecatedMethod("replaceWith", function (to, params, query) {
    this.context.router.replaceWith(to, params, query);
  }),

  /**
   * Transitions to the previous URL.
   */
  goBack: deprecatedMethod("goBack", function () {
    return this.context.router.goBack();
  })

};

module.exports = Navigation;
},{"./PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","react/lib/warning":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/warning.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PathUtils.js":[function(require,module,exports){
"use strict";

var invariant = require("react/lib/invariant");
var objectAssign = require("object-assign");
var qs = require("qs");

var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?\/|\/\?/g;
var queryMatcher = /\?(.*)$/;

var _compiledPatterns = {};

function compilePattern(pattern) {
  if (!(pattern in _compiledPatterns)) {
    var paramNames = [];
    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
      if (paramName) {
        paramNames.push(paramName);
        return "([^/?#]+)";
      } else if (match === "*") {
        paramNames.push("splat");
        return "(.*?)";
      } else {
        return "\\" + match;
      }
    });

    _compiledPatterns[pattern] = {
      matcher: new RegExp("^" + source + "$", "i"),
      paramNames: paramNames
    };
  }

  return _compiledPatterns[pattern];
}

var PathUtils = {

  /**
   * Returns true if the given path is absolute.
   */
  isAbsolute: function isAbsolute(path) {
    return path.charAt(0) === "/";
  },

  /**
   * Joins two URL paths together.
   */
  join: function join(a, b) {
    return a.replace(/\/*$/, "/") + b;
  },

  /**
   * Returns an array of the names of all parameters in the given pattern.
   */
  extractParamNames: function extractParamNames(pattern) {
    return compilePattern(pattern).paramNames;
  },

  /**
   * Extracts the portions of the given URL path that match the given pattern
   * and returns an object of param name => value pairs. Returns null if the
   * pattern does not match the given path.
   */
  extractParams: function extractParams(pattern, path) {
    var _compilePattern = compilePattern(pattern);

    var matcher = _compilePattern.matcher;
    var paramNames = _compilePattern.paramNames;

    var match = path.match(matcher);

    if (!match) {
      return null;
    }var params = {};

    paramNames.forEach(function (paramName, index) {
      params[paramName] = match[index + 1];
    });

    return params;
  },

  /**
   * Returns a version of the given route path with params interpolated. Throws
   * if there is a dynamic segment of the route path for which there is no param.
   */
  injectParams: function injectParams(pattern, params) {
    params = params || {};

    var splatIndex = 0;

    return pattern.replace(paramInjectMatcher, function (match, paramName) {
      paramName = paramName || "splat";

      // If param is optional don't check for existence
      if (paramName.slice(-1) === "?") {
        paramName = paramName.slice(0, -1);

        if (params[paramName] == null) return "";
      } else {
        invariant(params[paramName] != null, "Missing \"%s\" parameter for path \"%s\"", paramName, pattern);
      }

      var segment;
      if (paramName === "splat" && Array.isArray(params[paramName])) {
        segment = params[paramName][splatIndex++];

        invariant(segment != null, "Missing splat # %s for path \"%s\"", splatIndex, pattern);
      } else {
        segment = params[paramName];
      }

      return segment;
    }).replace(paramInjectTrailingSlashMatcher, "/");
  },

  /**
   * Returns an object that is the result of parsing any query string contained
   * in the given path, null if the path contains no query string.
   */
  extractQuery: function extractQuery(path) {
    var match = path.match(queryMatcher);
    return match && qs.parse(match[1]);
  },

  /**
   * Returns a version of the given path without the query string.
   */
  withoutQuery: function withoutQuery(path) {
    return path.replace(queryMatcher, "");
  },

  /**
   * Returns a version of the given path with the parameters in the given
   * query merged into the query string.
   */
  withQuery: function withQuery(path, query) {
    var existingQuery = PathUtils.extractQuery(path);

    if (existingQuery) query = query ? objectAssign(existingQuery, query) : existingQuery;

    var queryString = qs.stringify(query, { arrayFormat: "brackets" });

    if (queryString) {
      return PathUtils.withoutQuery(path) + "?" + queryString;
    }return PathUtils.withoutQuery(path);
  }

};

module.exports = PathUtils;
},{"object-assign":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/object-assign/index.js","qs":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/index.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js":[function(require,module,exports){
"use strict";

var assign = require("react/lib/Object.assign");
var ReactPropTypes = require("react").PropTypes;
var Route = require("./Route");

var PropTypes = assign({}, ReactPropTypes, {

  /**
   * Indicates that a prop should be falsy.
   */
  falsy: function falsy(props, propName, componentName) {
    if (props[propName]) {
      return new Error("<" + componentName + "> may not have a \"" + propName + "\" prop");
    }
  },

  /**
   * Indicates that a prop should be a Route object.
   */
  route: ReactPropTypes.instanceOf(Route),

  /**
   * Indicates that a prop should be a Router object.
   */
  //router: ReactPropTypes.instanceOf(Router) // TODO
  router: ReactPropTypes.func

});

module.exports = PropTypes;
},{"./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Route.js","react":"react","react/lib/Object.assign":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/Object.assign.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Redirect.js":[function(require,module,exports){
"use strict";

/**
 * Encapsulates a redirect to the given route.
 */
function Redirect(to, params, query) {
  this.to = to;
  this.params = params;
  this.query = query;
}

module.exports = Redirect;
},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Route.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = require("react/lib/Object.assign");
var invariant = require("react/lib/invariant");
var warning = require("react/lib/warning");
var PathUtils = require("./PathUtils");

var _currentRoute;

var Route = (function () {
  function Route(name, path, ignoreScrollBehavior, isDefault, isNotFound, onEnter, onLeave, handler) {
    _classCallCheck(this, Route);

    this.name = name;
    this.path = path;
    this.paramNames = PathUtils.extractParamNames(this.path);
    this.ignoreScrollBehavior = !!ignoreScrollBehavior;
    this.isDefault = !!isDefault;
    this.isNotFound = !!isNotFound;
    this.onEnter = onEnter;
    this.onLeave = onLeave;
    this.handler = handler;
  }

  _createClass(Route, {
    appendChild: {

      /**
       * Appends the given route to this route's child routes.
       */

      value: function appendChild(route) {
        invariant(route instanceof Route, "route.appendChild must use a valid Route");

        if (!this.childRoutes) this.childRoutes = [];

        this.childRoutes.push(route);
      }
    },
    toString: {
      value: function toString() {
        var string = "<Route";

        if (this.name) string += " name=\"" + this.name + "\"";

        string += " path=\"" + this.path + "\">";

        return string;
      }
    }
  }, {
    createRoute: {

      /**
       * Creates and returns a new route. Options may be a URL pathname string
       * with placeholders for named params or an object with any of the following
       * properties:
       *
       * - name                     The name of the route. This is used to lookup a
       *                            route relative to its parent route and should be
       *                            unique among all child routes of the same parent
       * - path                     A URL pathname string with optional placeholders
       *                            that specify the names of params to extract from
       *                            the URL when the path matches. Defaults to `/${name}`
       *                            when there is a name given, or the path of the parent
       *                            route, or /
       * - ignoreScrollBehavior     True to make this route (and all descendants) ignore
       *                            the scroll behavior of the router
       * - isDefault                True to make this route the default route among all
       *                            its siblings
       * - isNotFound               True to make this route the "not found" route among
       *                            all its siblings
       * - onEnter                  A transition hook that will be called when the
       *                            router is going to enter this route
       * - onLeave                  A transition hook that will be called when the
       *                            router is going to leave this route
       * - handler                  A React component that will be rendered when
       *                            this route is active
       * - parentRoute              The parent route to use for this route. This option
       *                            is automatically supplied when creating routes inside
       *                            the callback to another invocation of createRoute. You
       *                            only ever need to use this when declaring routes
       *                            independently of one another to manually piece together
       *                            the route hierarchy
       *
       * The callback may be used to structure your route hierarchy. Any call to
       * createRoute, createDefaultRoute, createNotFoundRoute, or createRedirect
       * inside the callback automatically uses this route as its parent.
       */

      value: function createRoute(options, callback) {
        options = options || {};

        if (typeof options === "string") options = { path: options };

        var parentRoute = _currentRoute;

        if (parentRoute) {
          warning(options.parentRoute == null || options.parentRoute === parentRoute, "You should not use parentRoute with createRoute inside another route's child callback; it is ignored");
        } else {
          parentRoute = options.parentRoute;
        }

        var name = options.name;
        var path = options.path || name;

        if (path && !(options.isDefault || options.isNotFound)) {
          if (PathUtils.isAbsolute(path)) {
            if (parentRoute) {
              invariant(path === parentRoute.path || parentRoute.paramNames.length === 0, "You cannot nest path \"%s\" inside \"%s\"; the parent requires URL parameters", path, parentRoute.path);
            }
          } else if (parentRoute) {
            // Relative paths extend their parent.
            path = PathUtils.join(parentRoute.path, path);
          } else {
            path = "/" + path;
          }
        } else {
          path = parentRoute ? parentRoute.path : "/";
        }

        if (options.isNotFound && !/\*$/.test(path)) path += "*"; // Auto-append * to the path of not found routes.

        var route = new Route(name, path, options.ignoreScrollBehavior, options.isDefault, options.isNotFound, options.onEnter, options.onLeave, options.handler);

        if (parentRoute) {
          if (route.isDefault) {
            invariant(parentRoute.defaultRoute == null, "%s may not have more than one default route", parentRoute);

            parentRoute.defaultRoute = route;
          } else if (route.isNotFound) {
            invariant(parentRoute.notFoundRoute == null, "%s may not have more than one not found route", parentRoute);

            parentRoute.notFoundRoute = route;
          }

          parentRoute.appendChild(route);
        }

        // Any routes created in the callback
        // use this route as their parent.
        if (typeof callback === "function") {
          var currentRoute = _currentRoute;
          _currentRoute = route;
          callback.call(route, route);
          _currentRoute = currentRoute;
        }

        return route;
      }
    },
    createDefaultRoute: {

      /**
       * Creates and returns a route that is rendered when its parent matches
       * the current URL.
       */

      value: function createDefaultRoute(options) {
        return Route.createRoute(assign({}, options, { isDefault: true }));
      }
    },
    createNotFoundRoute: {

      /**
       * Creates and returns a route that is rendered when its parent matches
       * the current URL but none of its siblings do.
       */

      value: function createNotFoundRoute(options) {
        return Route.createRoute(assign({}, options, { isNotFound: true }));
      }
    },
    createRedirect: {

      /**
       * Creates and returns a route that automatically redirects the transition
       * to another route. In addition to the normal options to createRoute, this
       * function accepts the following options:
       *
       * - from         An alias for the `path` option. Defaults to *
       * - to           The path/route/route name to redirect to
       * - params       The params to use in the redirect URL. Defaults
       *                to using the current params
       * - query        The query to use in the redirect URL. Defaults
       *                to using the current query
       */

      value: function createRedirect(options) {
        return Route.createRoute(assign({}, options, {
          path: options.path || options.from || "*",
          onEnter: function onEnter(transition, params, query) {
            transition.redirect(options.to, options.params || params, options.query || query);
          }
        }));
      }
    }
  });

  return Route;
})();

module.exports = Route;
},{"./PathUtils":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PathUtils.js","react/lib/Object.assign":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/Object.assign.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js","react/lib/warning":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/warning.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/ScrollHistory.js":[function(require,module,exports){
"use strict";

var invariant = require("react/lib/invariant");
var canUseDOM = require("react/lib/ExecutionEnvironment").canUseDOM;
var getWindowScrollPosition = require("./getWindowScrollPosition");

function shouldUpdateScroll(state, prevState) {
  if (!prevState) {
    return true;
  } // Don't update scroll position when only the query has changed.
  if (state.pathname === prevState.pathname) {
    return false;
  }var routes = state.routes;
  var prevRoutes = prevState.routes;

  var sharedAncestorRoutes = routes.filter(function (route) {
    return prevRoutes.indexOf(route) !== -1;
  });

  return !sharedAncestorRoutes.some(function (route) {
    return route.ignoreScrollBehavior;
  });
}

/**
 * Provides the router with the ability to manage window scroll position
 * according to its scroll behavior.
 */
var ScrollHistory = {

  statics: {

    /**
     * Records curent scroll position as the last known position for the given URL path.
     */
    recordScrollPosition: function recordScrollPosition(path) {
      if (!this.scrollHistory) this.scrollHistory = {};

      this.scrollHistory[path] = getWindowScrollPosition();
    },

    /**
     * Returns the last known scroll position for the given URL path.
     */
    getScrollPosition: function getScrollPosition(path) {
      if (!this.scrollHistory) this.scrollHistory = {};

      return this.scrollHistory[path] || null;
    }

  },

  componentWillMount: function componentWillMount() {
    invariant(this.constructor.getScrollBehavior() == null || canUseDOM, "Cannot use scroll behavior without a DOM");
  },

  componentDidMount: function componentDidMount() {
    this._updateScroll();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._updateScroll(prevState);
  },

  _updateScroll: function _updateScroll(prevState) {
    if (!shouldUpdateScroll(this.state, prevState)) {
      return;
    }var scrollBehavior = this.constructor.getScrollBehavior();

    if (scrollBehavior) scrollBehavior.updateScrollPosition(this.constructor.getScrollPosition(this.state.path), this.state.action);
  }

};

module.exports = ScrollHistory;
},{"./getWindowScrollPosition":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/getWindowScrollPosition.js","react/lib/ExecutionEnvironment":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/State.js":[function(require,module,exports){
"use strict";

var warning = require("react/lib/warning");
var PropTypes = require("./PropTypes");

function deprecatedMethod(routerMethodName, fn) {
  return function () {
    warning(false, "Router.State is deprecated. Please use this.context.router." + routerMethodName + "() instead");

    return fn.apply(this, arguments);
  };
}

/**
 * A mixin for components that need to know the path, routes, URL
 * params and query that are currently active.
 *
 * Example:
 *
 *   var AboutLink = React.createClass({
 *     mixins: [ Router.State ],
 *     render() {
 *       var className = this.props.className;
 *   
 *       if (this.isActive('about'))
 *         className += ' is-active';
 *   
 *       return React.DOM.a({ className: className }, this.props.children);
 *     }
 *   });
 */
var State = {

  contextTypes: {
    router: PropTypes.router.isRequired
  },

  /**
   * Returns the current URL path.
   */
  getPath: deprecatedMethod("getCurrentPath", function () {
    return this.context.router.getCurrentPath();
  }),

  /**
   * Returns the current URL path without the query string.
   */
  getPathname: deprecatedMethod("getCurrentPathname", function () {
    return this.context.router.getCurrentPathname();
  }),

  /**
   * Returns an object of the URL params that are currently active.
   */
  getParams: deprecatedMethod("getCurrentParams", function () {
    return this.context.router.getCurrentParams();
  }),

  /**
   * Returns an object of the query params that are currently active.
   */
  getQuery: deprecatedMethod("getCurrentQuery", function () {
    return this.context.router.getCurrentQuery();
  }),

  /**
   * Returns an array of the routes that are currently active.
   */
  getRoutes: deprecatedMethod("getCurrentRoutes", function () {
    return this.context.router.getCurrentRoutes();
  }),

  /**
   * A helper method to determine if a given route, params, and query
   * are active.
   */
  isActive: deprecatedMethod("isActive", function (to, params, query) {
    return this.context.router.isActive(to, params, query);
  })

};

module.exports = State;
},{"./PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","react/lib/warning":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/warning.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Transition.js":[function(require,module,exports){
"use strict";

/* jshint -W058 */

var Cancellation = require("./Cancellation");
var Redirect = require("./Redirect");

/**
 * Encapsulates a transition to a given path.
 *
 * The willTransitionTo and willTransitionFrom handlers receive
 * an instance of this class as their first argument.
 */
function Transition(path, retry) {
  this.path = path;
  this.abortReason = null;
  // TODO: Change this to router.retryTransition(transition)
  this.retry = retry.bind(this);
}

Transition.prototype.abort = function (reason) {
  if (this.abortReason == null) this.abortReason = reason || "ABORT";
};

Transition.prototype.redirect = function (to, params, query) {
  this.abort(new Redirect(to, params, query));
};

Transition.prototype.cancel = function () {
  this.abort(new Cancellation());
};

Transition.from = function (transition, routes, components, callback) {
  routes.reduce(function (callback, route, index) {
    return function (error) {
      if (error || transition.abortReason) {
        callback(error);
      } else if (route.onLeave) {
        try {
          route.onLeave(transition, components[index], callback);

          // If there is no callback in the argument list, call it automatically.
          if (route.onLeave.length < 3) callback();
        } catch (e) {
          callback(e);
        }
      } else {
        callback();
      }
    };
  }, callback)();
};

Transition.to = function (transition, routes, params, query, callback) {
  routes.reduceRight(function (callback, route) {
    return function (error) {
      if (error || transition.abortReason) {
        callback(error);
      } else if (route.onEnter) {
        try {
          route.onEnter(transition, params, query, callback);

          // If there is no callback in the argument list, call it automatically.
          if (route.onEnter.length < 4) callback();
        } catch (e) {
          callback(e);
        }
      } else {
        callback();
      }
    };
  }, callback)();
};

module.exports = Transition;
},{"./Cancellation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Cancellation.js","./Redirect":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Redirect.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/actions/LocationActions.js":[function(require,module,exports){
"use strict";

/**
 * Actions that modify the URL.
 */
var LocationActions = {

  /**
   * Indicates a new location is being pushed to the history stack.
   */
  PUSH: "push",

  /**
   * Indicates the current location should be replaced.
   */
  REPLACE: "replace",

  /**
   * Indicates the most recent entry should be removed from the history stack.
   */
  POP: "pop"

};

module.exports = LocationActions;
},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/behaviors/ImitateBrowserBehavior.js":[function(require,module,exports){
"use strict";

var LocationActions = require("../actions/LocationActions");

/**
 * A scroll behavior that attempts to imitate the default behavior
 * of modern browsers.
 */
var ImitateBrowserBehavior = {

  updateScrollPosition: function updateScrollPosition(position, actionType) {
    switch (actionType) {
      case LocationActions.PUSH:
      case LocationActions.REPLACE:
        window.scrollTo(0, 0);
        break;
      case LocationActions.POP:
        if (position) {
          window.scrollTo(position.x, position.y);
        } else {
          window.scrollTo(0, 0);
        }
        break;
    }
  }

};

module.exports = ImitateBrowserBehavior;
},{"../actions/LocationActions":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/actions/LocationActions.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/behaviors/ScrollToTopBehavior.js":[function(require,module,exports){
"use strict";

/**
 * A scroll behavior that always scrolls to the top of the page
 * after a transition.
 */
var ScrollToTopBehavior = {

  updateScrollPosition: function updateScrollPosition() {
    window.scrollTo(0, 0);
  }

};

module.exports = ScrollToTopBehavior;
},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/ContextWrapper.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * This component is necessary to get around a context warning
 * present in React 0.13.0. It sovles this by providing a separation
 * between the "owner" and "parent" contexts.
 */

var React = require("react");

var ContextWrapper = (function (_React$Component) {
  function ContextWrapper() {
    _classCallCheck(this, ContextWrapper);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(ContextWrapper, _React$Component);

  _createClass(ContextWrapper, {
    render: {
      value: function render() {
        return this.props.children;
      }
    }
  });

  return ContextWrapper;
})(React.Component);

module.exports = ContextWrapper;
},{"react":"react"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/DefaultRoute.js":[function(require,module,exports){
"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PropTypes = require("../PropTypes");
var RouteHandler = require("./RouteHandler");
var Route = require("./Route");

/**
 * A <DefaultRoute> component is a special kind of <Route> that
 * renders when its parent matches but none of its siblings do.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */

var DefaultRoute = (function (_Route) {
  function DefaultRoute() {
    _classCallCheck(this, DefaultRoute);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(DefaultRoute, _Route);

  return DefaultRoute;
})(Route);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

DefaultRoute.propTypes = {
  name: PropTypes.string,
  path: PropTypes.falsy,
  children: PropTypes.falsy,
  handler: PropTypes.func.isRequired
};

DefaultRoute.defaultProps = {
  handler: RouteHandler
};

module.exports = DefaultRoute;
},{"../PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Route.js","./RouteHandler":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/RouteHandler.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Link.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = require("react");
var assign = require("react/lib/Object.assign");
var PropTypes = require("../PropTypes");

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <Link> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <Link to="showPost" params={{ postID: "123" }} />
 *
 * In addition to params, links may pass along query string parameters
 * using the `query` prop.
 *
 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
 */

var Link = (function (_React$Component) {
  function Link() {
    _classCallCheck(this, Link);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Link, _React$Component);

  _createClass(Link, {
    handleClick: {
      value: function handleClick(event) {
        var allowTransition = true;
        var clickResult;

        if (this.props.onClick) clickResult = this.props.onClick(event);

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

        event.preventDefault();

        if (allowTransition) this.context.router.transitionTo(this.props.to, this.props.params, this.props.query);
      }
    },
    getHref: {

      /**
       * Returns the value of the "href" attribute to use on the DOM element.
       */

      value: function getHref() {
        return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
      }
    },
    getClassName: {

      /**
       * Returns the value of the "class" attribute to use on the DOM element, which contains
       * the value of the activeClassName property when this <Link> is active.
       */

      value: function getClassName() {
        var className = this.props.className;

        if (this.getActiveState()) className += " " + this.props.activeClassName;

        return className;
      }
    },
    getActiveState: {
      value: function getActiveState() {
        return this.context.router.isActive(this.props.to, this.props.params, this.props.query);
      }
    },
    render: {
      value: function render() {
        var props = assign({}, this.props, {
          href: this.getHref(),
          className: this.getClassName(),
          onClick: this.handleClick.bind(this)
        });

        if (props.activeStyle && this.getActiveState()) props.style = props.activeStyle;

        return React.DOM.a(props, this.props.children);
      }
    }
  });

  return Link;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Link.contextTypes = {
  router: PropTypes.router.isRequired
};

Link.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.route]).isRequired,
  params: PropTypes.object,
  query: PropTypes.object,
  activeStyle: PropTypes.object,
  onClick: PropTypes.func
};

Link.defaultProps = {
  activeClassName: "active",
  className: ""
};

module.exports = Link;
},{"../PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","react":"react","react/lib/Object.assign":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/Object.assign.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/NotFoundRoute.js":[function(require,module,exports){
"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PropTypes = require("../PropTypes");
var RouteHandler = require("./RouteHandler");
var Route = require("./Route");

/**
 * A <NotFoundRoute> is a special kind of <Route> that
 * renders when the beginning of its parent's path matches
 * but none of its siblings do, including any <DefaultRoute>.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */

var NotFoundRoute = (function (_Route) {
  function NotFoundRoute() {
    _classCallCheck(this, NotFoundRoute);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(NotFoundRoute, _Route);

  return NotFoundRoute;
})(Route);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

NotFoundRoute.propTypes = {
  name: PropTypes.string,
  path: PropTypes.falsy,
  children: PropTypes.falsy,
  handler: PropTypes.func.isRequired
};

NotFoundRoute.defaultProps = {
  handler: RouteHandler
};

module.exports = NotFoundRoute;
},{"../PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Route.js","./RouteHandler":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/RouteHandler.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Redirect.js":[function(require,module,exports){
"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PropTypes = require("../PropTypes");
var Route = require("./Route");

/**
 * A <Redirect> component is a special kind of <Route> that always
 * redirects to another route when it matches.
 */

var Redirect = (function (_Route) {
  function Redirect() {
    _classCallCheck(this, Redirect);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(Redirect, _Route);

  return Redirect;
})(Route);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Redirect.propTypes = {
  path: PropTypes.string,
  from: PropTypes.string, // Alias for path.
  to: PropTypes.string,
  handler: PropTypes.falsy
};

// Redirects should not have a default handler
Redirect.defaultProps = {};

module.exports = Redirect;
},{"../PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Route.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Route.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = require("react");
var invariant = require("react/lib/invariant");
var PropTypes = require("../PropTypes");
var RouteHandler = require("./RouteHandler");

/**
 * <Route> components specify components that are rendered to the page when the
 * URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is requested,
 * the tree is searched depth-first to find a route whose path matches the URL.
 * When one is found, all routes in the tree that lead to it are considered
 * "active" and their components are rendered into the DOM, nested in the same
 * order as they are in the tree.
 *
 * The preferred way to configure a router is using JSX. The XML-like syntax is
 * a great way to visualize how routes are laid out in an application.
 *
 *   var routes = [
 *     <Route handler={App}>
 *       <Route name="login" handler={Login}/>
 *       <Route name="logout" handler={Logout}/>
 *       <Route name="about" handler={About}/>
 *     </Route>
 *   ];
 *   
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 *
 * Handlers for Route components that contain children can render their active
 * child route using a <RouteHandler> element.
 *
 *   var App = React.createClass({
 *     render: function () {
 *       return (
 *         <div class="application">
 *           <RouteHandler/>
 *         </div>
 *       );
 *     }
 *   });
 *
 * If no handler is provided for the route, it will render a matched child route.
 */

var Route = (function (_React$Component) {
  function Route() {
    _classCallCheck(this, Route);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Route, _React$Component);

  _createClass(Route, {
    render: {
      value: function render() {
        invariant(false, "%s elements are for router configuration only and should not be rendered", this.constructor.name);
      }
    }
  });

  return Route;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Route.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  handler: PropTypes.func,
  ignoreScrollBehavior: PropTypes.bool
};

Route.defaultProps = {
  handler: RouteHandler
};

module.exports = Route;
},{"../PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","./RouteHandler":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/RouteHandler.js","react":"react","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/RouteHandler.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = require("react");
var ContextWrapper = require("./ContextWrapper");
var assign = require("react/lib/Object.assign");
var PropTypes = require("../PropTypes");

var REF_NAME = "__routeHandler__";

/**
 * A <RouteHandler> component renders the active child route handler
 * when routes are nested.
 */

var RouteHandler = (function (_React$Component) {
  function RouteHandler() {
    _classCallCheck(this, RouteHandler);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(RouteHandler, _React$Component);

  _createClass(RouteHandler, {
    getChildContext: {
      value: function getChildContext() {
        return {
          routeDepth: this.context.routeDepth + 1
        };
      }
    },
    componentDidMount: {
      value: function componentDidMount() {
        this._updateRouteComponent(this.refs[REF_NAME]);
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        this._updateRouteComponent(this.refs[REF_NAME]);
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        this._updateRouteComponent(null);
      }
    },
    _updateRouteComponent: {
      value: function _updateRouteComponent(component) {
        this.context.router.setRouteComponentAtDepth(this.getRouteDepth(), component);
      }
    },
    getRouteDepth: {
      value: function getRouteDepth() {
        return this.context.routeDepth;
      }
    },
    createChildRouteHandler: {
      value: function createChildRouteHandler(props) {
        var route = this.context.router.getRouteAtDepth(this.getRouteDepth());
        return route ? React.createElement(route.handler, assign({}, props || this.props, { ref: REF_NAME })) : null;
      }
    },
    render: {
      value: function render() {
        var handler = this.createChildRouteHandler();
        // <script/> for things like <CSSTransitionGroup/> that don't like null
        return handler ? React.createElement(
          ContextWrapper,
          null,
          handler
        ) : React.createElement("script", null);
      }
    }
  });

  return RouteHandler;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

RouteHandler.contextTypes = {
  routeDepth: PropTypes.number.isRequired,
  router: PropTypes.router.isRequired
};

RouteHandler.childContextTypes = {
  routeDepth: PropTypes.number.isRequired
};

module.exports = RouteHandler;
},{"../PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","./ContextWrapper":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/ContextWrapper.js","react":"react","react/lib/Object.assign":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/Object.assign.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/createRouter.js":[function(require,module,exports){
(function (process){
"use strict";

/* jshint -W058 */
var React = require("react");
var warning = require("react/lib/warning");
var invariant = require("react/lib/invariant");
var canUseDOM = require("react/lib/ExecutionEnvironment").canUseDOM;
var LocationActions = require("./actions/LocationActions");
var ImitateBrowserBehavior = require("./behaviors/ImitateBrowserBehavior");
var HashLocation = require("./locations/HashLocation");
var HistoryLocation = require("./locations/HistoryLocation");
var RefreshLocation = require("./locations/RefreshLocation");
var StaticLocation = require("./locations/StaticLocation");
var ScrollHistory = require("./ScrollHistory");
var createRoutesFromReactChildren = require("./createRoutesFromReactChildren");
var isReactChildren = require("./isReactChildren");
var Transition = require("./Transition");
var PropTypes = require("./PropTypes");
var Redirect = require("./Redirect");
var History = require("./History");
var Cancellation = require("./Cancellation");
var Match = require("./Match");
var Route = require("./Route");
var supportsHistory = require("./supportsHistory");
var PathUtils = require("./PathUtils");

/**
 * The default location for new routers.
 */
var DEFAULT_LOCATION = canUseDOM ? HashLocation : "/";

/**
 * The default scroll behavior for new routers.
 */
var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;

function hasProperties(object, properties) {
  for (var propertyName in properties) if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName]) {
    return false;
  }return true;
}

function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
  return routes.some(function (r) {
    if (r !== route) return false;

    var paramNames = route.paramNames;
    var paramName;

    // Ensure that all params the route cares about did not change.
    for (var i = 0, len = paramNames.length; i < len; ++i) {
      paramName = paramNames[i];

      if (nextParams[paramName] !== prevParams[paramName]) return false;
    }

    // Ensure the query hasn't changed.
    return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
  });
}

function addRoutesToNamedRoutes(routes, namedRoutes) {
  var route;
  for (var i = 0, len = routes.length; i < len; ++i) {
    route = routes[i];

    if (route.name) {
      invariant(namedRoutes[route.name] == null, "You may not have more than one route named \"%s\"", route.name);

      namedRoutes[route.name] = route;
    }

    if (route.childRoutes) addRoutesToNamedRoutes(route.childRoutes, namedRoutes);
  }
}

function routeIsActive(activeRoutes, routeName) {
  return activeRoutes.some(function (route) {
    return route.name === routeName;
  });
}

function paramsAreActive(activeParams, params) {
  for (var property in params) if (String(activeParams[property]) !== String(params[property])) {
    return false;
  }return true;
}

function queryIsActive(activeQuery, query) {
  for (var property in query) if (String(activeQuery[property]) !== String(query[property])) {
    return false;
  }return true;
}

/**
 * Creates and returns a new router using the given options. A router
 * is a ReactComponent class that knows how to react to changes in the
 * URL and keep the contents of the page in sync.
 *
 * Options may be any of the following:
 *
 * - routes           (required) The route config
 * - location         The location to use. Defaults to HashLocation when
 *                    the DOM is available, "/" otherwise
 * - scrollBehavior   The scroll behavior to use. Defaults to ImitateBrowserBehavior
 *                    when the DOM is available, null otherwise
 * - onError          A function that is used to handle errors
 * - onAbort          A function that is used to handle aborted transitions
 *
 * When rendering in a server-side environment, the location should simply
 * be the URL path that was used in the request, including the query string.
 */
function createRouter(options) {
  options = options || {};

  if (isReactChildren(options)) options = { routes: options };

  var mountedComponents = [];
  var location = options.location || DEFAULT_LOCATION;
  var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
  var state = {};
  var nextState = {};
  var pendingTransition = null;
  var dispatchHandler = null;

  if (typeof location === "string") location = new StaticLocation(location);

  if (location instanceof StaticLocation) {
    warning(!canUseDOM || process.env.NODE_ENV === "test", "You should not use a static location in a DOM environment because " + "the router will not be kept in sync with the current URL");
  } else {
    invariant(canUseDOM || location.needsDOM === false, "You cannot use %s without a DOM", location);
  }

  // Automatically fall back to full page refreshes in
  // browsers that don't support the HTML history API.
  if (location === HistoryLocation && !supportsHistory()) location = RefreshLocation;

  var Router = React.createClass({

    displayName: "Router",

    statics: {

      isRunning: false,

      cancelPendingTransition: function cancelPendingTransition() {
        if (pendingTransition) {
          pendingTransition.cancel();
          pendingTransition = null;
        }
      },

      clearAllRoutes: function clearAllRoutes() {
        Router.cancelPendingTransition();
        Router.namedRoutes = {};
        Router.routes = [];
      },

      /**
       * Adds routes to this router from the given children object (see ReactChildren).
       */
      addRoutes: function addRoutes(routes) {
        if (isReactChildren(routes)) routes = createRoutesFromReactChildren(routes);

        addRoutesToNamedRoutes(routes, Router.namedRoutes);

        Router.routes.push.apply(Router.routes, routes);
      },

      /**
       * Replaces routes of this router from the given children object (see ReactChildren).
       */
      replaceRoutes: function replaceRoutes(routes) {
        Router.clearAllRoutes();
        Router.addRoutes(routes);
        Router.refresh();
      },

      /**
       * Performs a match of the given path against this router and returns an object
       * with the { routes, params, pathname, query } that match. Returns null if no
       * match can be made.
       */
      match: function match(path) {
        return Match.findMatch(Router.routes, path);
      },

      /**
       * Returns an absolute URL path created from the given route
       * name, URL parameters, and query.
       */
      makePath: function makePath(to, params, query) {
        var path;
        if (PathUtils.isAbsolute(to)) {
          path = to;
        } else {
          var route = to instanceof Route ? to : Router.namedRoutes[to];

          invariant(route instanceof Route, "Cannot find a route named \"%s\"", to);

          path = route.path;
        }

        return PathUtils.withQuery(PathUtils.injectParams(path, params), query);
      },

      /**
       * Returns a string that may safely be used as the href of a link
       * to the route with the given name, URL parameters, and query.
       */
      makeHref: function makeHref(to, params, query) {
        var path = Router.makePath(to, params, query);
        return location === HashLocation ? "#" + path : path;
      },

      /**
       * Transitions to the URL specified in the arguments by pushing
       * a new URL onto the history stack.
       */
      transitionTo: function transitionTo(to, params, query) {
        var path = Router.makePath(to, params, query);

        if (pendingTransition) {
          // Replace so pending location does not stay in history.
          location.replace(path);
        } else {
          location.push(path);
        }
      },

      /**
       * Transitions to the URL specified in the arguments by replacing
       * the current URL in the history stack.
       */
      replaceWith: function replaceWith(to, params, query) {
        location.replace(Router.makePath(to, params, query));
      },

      /**
       * Transitions to the previous URL if one is available. Returns true if the
       * router was able to go back, false otherwise.
       *
       * Note: The router only tracks history entries in your application, not the
       * current browser session, so you can safely call this function without guarding
       * against sending the user back to some other site. However, when using
       * RefreshLocation (which is the fallback for HistoryLocation in browsers that
       * don't support HTML5 history) this method will *always* send the client back
       * because we cannot reliably track history length.
       */
      goBack: function goBack() {
        if (History.length > 1 || location === RefreshLocation) {
          location.pop();
          return true;
        }

        warning(false, "goBack() was ignored because there is no router history");

        return false;
      },

      handleAbort: options.onAbort || function (abortReason) {
        if (location instanceof StaticLocation) throw new Error("Unhandled aborted transition! Reason: " + abortReason);

        if (abortReason instanceof Cancellation) {
          return;
        } else if (abortReason instanceof Redirect) {
          location.replace(Router.makePath(abortReason.to, abortReason.params, abortReason.query));
        } else {
          location.pop();
        }
      },

      handleError: options.onError || function (error) {
        // Throw so we don't silently swallow async errors.
        throw error; // This error probably originated in a transition hook.
      },

      handleLocationChange: function handleLocationChange(change) {
        Router.dispatch(change.path, change.type);
      },

      /**
       * Performs a transition to the given path and calls callback(error, abortReason)
       * when the transition is finished. If both arguments are null the router's state
       * was updated. Otherwise the transition did not complete.
       *
       * In a transition, a router first determines which routes are involved by beginning
       * with the current route, up the route tree to the first parent route that is shared
       * with the destination route, and back down the tree to the destination route. The
       * willTransitionFrom hook is invoked on all route handlers we're transitioning away
       * from, in reverse nesting order. Likewise, the willTransitionTo hook is invoked on
       * all route handlers we're transitioning to.
       *
       * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the
       * transition. To resolve asynchronously, they may use the callback argument. If no
       * hooks wait, the transition is fully synchronous.
       */
      dispatch: function dispatch(path, action) {
        Router.cancelPendingTransition();

        var prevPath = state.path;
        var isRefreshing = action == null;

        if (prevPath === path && !isRefreshing) {
          return;
        } // Nothing to do!

        // Record the scroll position as early as possible to
        // get it before browsers try update it automatically.
        if (prevPath && action === LocationActions.PUSH) Router.recordScrollPosition(prevPath);

        var match = Router.match(path);

        warning(match != null, "No route matches path \"%s\". Make sure you have <Route path=\"%s\"> somewhere in your routes", path, path);

        if (match == null) match = {};

        var prevRoutes = state.routes || [];
        var prevParams = state.params || {};
        var prevQuery = state.query || {};

        var nextRoutes = match.routes || [];
        var nextParams = match.params || {};
        var nextQuery = match.query || {};

        var fromRoutes, toRoutes;
        if (prevRoutes.length) {
          fromRoutes = prevRoutes.filter(function (route) {
            return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });

          toRoutes = nextRoutes.filter(function (route) {
            return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });
        } else {
          fromRoutes = [];
          toRoutes = nextRoutes;
        }

        var transition = new Transition(path, Router.replaceWith.bind(Router, path));
        pendingTransition = transition;

        var fromComponents = mountedComponents.slice(prevRoutes.length - fromRoutes.length);

        Transition.from(transition, fromRoutes, fromComponents, function (error) {
          if (error || transition.abortReason) return dispatchHandler.call(Router, error, transition); // No need to continue.

          Transition.to(transition, toRoutes, nextParams, nextQuery, function (error) {
            dispatchHandler.call(Router, error, transition, {
              path: path,
              action: action,
              pathname: match.pathname,
              routes: nextRoutes,
              params: nextParams,
              query: nextQuery
            });
          });
        });
      },

      /**
       * Starts this router and calls callback(router, state) when the route changes.
       *
       * If the router's location is static (i.e. a URL path in a server environment)
       * the callback is called only once. Otherwise, the location should be one of the
       * Router.*Location objects (e.g. Router.HashLocation or Router.HistoryLocation).
       */
      run: function run(callback) {
        invariant(!Router.isRunning, "Router is already running");

        dispatchHandler = function (error, transition, newState) {
          if (error) Router.handleError(error);

          if (pendingTransition !== transition) return;

          pendingTransition = null;

          if (transition.abortReason) {
            Router.handleAbort(transition.abortReason);
          } else {
            callback.call(Router, Router, nextState = newState);
          }
        };

        if (!(location instanceof StaticLocation)) {
          if (location.addChangeListener) location.addChangeListener(Router.handleLocationChange);

          Router.isRunning = true;
        }

        // Bootstrap using the current path.
        Router.refresh();
      },

      refresh: function refresh() {
        Router.dispatch(location.getCurrentPath(), null);
      },

      stop: function stop() {
        Router.cancelPendingTransition();

        if (location.removeChangeListener) location.removeChangeListener(Router.handleLocationChange);

        Router.isRunning = false;
      },

      getLocation: function getLocation() {
        return location;
      },

      getScrollBehavior: function getScrollBehavior() {
        return scrollBehavior;
      },

      getRouteAtDepth: function getRouteAtDepth(routeDepth) {
        var routes = state.routes;
        return routes && routes[routeDepth];
      },

      setRouteComponentAtDepth: function setRouteComponentAtDepth(routeDepth, component) {
        mountedComponents[routeDepth] = component;
      },

      /**
       * Returns the current URL path + query string.
       */
      getCurrentPath: function getCurrentPath() {
        return state.path;
      },

      /**
       * Returns the current URL path without the query string.
       */
      getCurrentPathname: function getCurrentPathname() {
        return state.pathname;
      },

      /**
       * Returns an object of the currently active URL parameters.
       */
      getCurrentParams: function getCurrentParams() {
        return state.params;
      },

      /**
       * Returns an object of the currently active query parameters.
       */
      getCurrentQuery: function getCurrentQuery() {
        return state.query;
      },

      /**
       * Returns an array of the currently active routes.
       */
      getCurrentRoutes: function getCurrentRoutes() {
        return state.routes;
      },

      /**
       * Returns true if the given route, params, and query are active.
       */
      isActive: function isActive(to, params, query) {
        if (PathUtils.isAbsolute(to)) {
          return to === state.path;
        }return routeIsActive(state.routes, to) && paramsAreActive(state.params, params) && (query == null || queryIsActive(state.query, query));
      }

    },

    mixins: [ScrollHistory],

    propTypes: {
      children: PropTypes.falsy
    },

    childContextTypes: {
      routeDepth: PropTypes.number.isRequired,
      router: PropTypes.router.isRequired
    },

    getChildContext: function getChildContext() {
      return {
        routeDepth: 1,
        router: Router
      };
    },

    getInitialState: function getInitialState() {
      return state = nextState;
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
      this.setState(state = nextState);
    },

    componentWillUnmount: function componentWillUnmount() {
      Router.stop();
    },

    render: function render() {
      var route = Router.getRouteAtDepth(0);
      return route ? React.createElement(route.handler, this.props) : null;
    }

  });

  Router.clearAllRoutes();

  if (options.routes) Router.addRoutes(options.routes);

  return Router;
}

module.exports = createRouter;
}).call(this,require('_process'))

},{"./Cancellation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Cancellation.js","./History":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js","./Match":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Match.js","./PathUtils":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PathUtils.js","./PropTypes":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/PropTypes.js","./Redirect":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Redirect.js","./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Route.js","./ScrollHistory":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/ScrollHistory.js","./Transition":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Transition.js","./actions/LocationActions":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/actions/LocationActions.js","./behaviors/ImitateBrowserBehavior":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/behaviors/ImitateBrowserBehavior.js","./createRoutesFromReactChildren":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/createRoutesFromReactChildren.js","./isReactChildren":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/isReactChildren.js","./locations/HashLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HashLocation.js","./locations/HistoryLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HistoryLocation.js","./locations/RefreshLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/RefreshLocation.js","./locations/StaticLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/StaticLocation.js","./supportsHistory":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/supportsHistory.js","_process":"/Users/Ben/course-notes/web/react-test/node_modules/browserify/node_modules/process/browser.js","react":"react","react/lib/ExecutionEnvironment":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js","react/lib/warning":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/warning.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/createRoutesFromReactChildren.js":[function(require,module,exports){
"use strict";

/* jshint -W084 */
var React = require("react");
var assign = require("react/lib/Object.assign");
var warning = require("react/lib/warning");
var DefaultRoute = require("./components/DefaultRoute");
var NotFoundRoute = require("./components/NotFoundRoute");
var Redirect = require("./components/Redirect");
var Route = require("./Route");

function checkPropTypes(componentName, propTypes, props) {
  componentName = componentName || "UnknownComponent";

  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error = propTypes[propName](props, propName, componentName);

      if (error instanceof Error) warning(false, error.message);
    }
  }
}

function createRouteOptions(props) {
  var options = assign({}, props);
  var handler = options.handler;

  if (handler) {
    options.onEnter = handler.willTransitionTo;
    options.onLeave = handler.willTransitionFrom;
  }

  return options;
}

function createRouteFromReactElement(element) {
  if (!React.isValidElement(element)) {
    return;
  }var type = element.type;
  var props = assign({}, type.defaultProps, element.props);

  if (type.propTypes) checkPropTypes(type.displayName, type.propTypes, props);

  if (type === DefaultRoute) {
    return Route.createDefaultRoute(createRouteOptions(props));
  }if (type === NotFoundRoute) {
    return Route.createNotFoundRoute(createRouteOptions(props));
  }if (type === Redirect) {
    return Route.createRedirect(createRouteOptions(props));
  }return Route.createRoute(createRouteOptions(props), function () {
    if (props.children) createRoutesFromReactChildren(props.children);
  });
}

/**
 * Creates and returns an array of routes created from the given
 * ReactChildren, all of which should be one of <Route>, <DefaultRoute>,
 * <NotFoundRoute>, or <Redirect>, e.g.:
 *
 *   var { createRoutesFromReactChildren, Route, Redirect } = require('react-router');
 *
 *   var routes = createRoutesFromReactChildren(
 *     <Route path="/" handler={App}>
 *       <Route name="user" path="/user/:userId" handler={User}>
 *         <Route name="task" path="tasks/:taskId" handler={Task}/>
 *         <Redirect from="todos/:taskId" to="task"/>
 *       </Route>
 *     </Route>
 *   );
 */
function createRoutesFromReactChildren(children) {
  var routes = [];

  React.Children.forEach(children, function (child) {
    if (child = createRouteFromReactElement(child)) routes.push(child);
  });

  return routes;
}

module.exports = createRoutesFromReactChildren;
},{"./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Route.js","./components/DefaultRoute":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/DefaultRoute.js","./components/NotFoundRoute":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/NotFoundRoute.js","./components/Redirect":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Redirect.js","react":"react","react/lib/Object.assign":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/Object.assign.js","react/lib/warning":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/warning.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/getWindowScrollPosition.js":[function(require,module,exports){
"use strict";

var invariant = require("react/lib/invariant");
var canUseDOM = require("react/lib/ExecutionEnvironment").canUseDOM;

/**
 * Returns the current scroll position of the window as { x, y }.
 */
function getWindowScrollPosition() {
  invariant(canUseDOM, "Cannot get current scroll position without a DOM");

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

module.exports = getWindowScrollPosition;
},{"react/lib/ExecutionEnvironment":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/index.js":[function(require,module,exports){
"use strict";

exports.DefaultRoute = require("./components/DefaultRoute");
exports.Link = require("./components/Link");
exports.NotFoundRoute = require("./components/NotFoundRoute");
exports.Redirect = require("./components/Redirect");
exports.Route = require("./components/Route");
exports.RouteHandler = require("./components/RouteHandler");

exports.HashLocation = require("./locations/HashLocation");
exports.HistoryLocation = require("./locations/HistoryLocation");
exports.RefreshLocation = require("./locations/RefreshLocation");
exports.StaticLocation = require("./locations/StaticLocation");
exports.TestLocation = require("./locations/TestLocation");

exports.ImitateBrowserBehavior = require("./behaviors/ImitateBrowserBehavior");
exports.ScrollToTopBehavior = require("./behaviors/ScrollToTopBehavior");

exports.History = require("./History");
exports.Navigation = require("./Navigation");
exports.State = require("./State");

exports.createRoute = require("./Route").createRoute;
exports.createDefaultRoute = require("./Route").createDefaultRoute;
exports.createNotFoundRoute = require("./Route").createNotFoundRoute;
exports.createRedirect = require("./Route").createRedirect;
exports.createRoutesFromReactChildren = require("./createRoutesFromReactChildren");
exports.create = require("./createRouter");
exports.run = require("./runRouter");
},{"./History":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js","./Navigation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Navigation.js","./Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/Route.js","./State":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/State.js","./behaviors/ImitateBrowserBehavior":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/behaviors/ImitateBrowserBehavior.js","./behaviors/ScrollToTopBehavior":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/behaviors/ScrollToTopBehavior.js","./components/DefaultRoute":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/DefaultRoute.js","./components/Link":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Link.js","./components/NotFoundRoute":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/NotFoundRoute.js","./components/Redirect":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Redirect.js","./components/Route":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/Route.js","./components/RouteHandler":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/components/RouteHandler.js","./createRouter":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/createRouter.js","./createRoutesFromReactChildren":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/createRoutesFromReactChildren.js","./locations/HashLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HashLocation.js","./locations/HistoryLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HistoryLocation.js","./locations/RefreshLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/RefreshLocation.js","./locations/StaticLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/StaticLocation.js","./locations/TestLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/TestLocation.js","./runRouter":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/runRouter.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/isReactChildren.js":[function(require,module,exports){
"use strict";

var React = require("react");

function isValidChild(object) {
  return object == null || React.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
}

module.exports = isReactChildren;
},{"react":"react"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HashLocation.js":[function(require,module,exports){
"use strict";

var LocationActions = require("../actions/LocationActions");
var History = require("../History");

var _listeners = [];
var _isListening = false;
var _actionType;

function notifyChange(type) {
  if (type === LocationActions.PUSH) History.length += 1;

  var change = {
    path: HashLocation.getCurrentPath(),
    type: type
  };

  _listeners.forEach(function (listener) {
    listener.call(HashLocation, change);
  });
}

function ensureSlash() {
  var path = HashLocation.getCurrentPath();

  if (path.charAt(0) === "/") {
    return true;
  }HashLocation.replace("/" + path);

  return false;
}

function onHashChange() {
  if (ensureSlash()) {
    // If we don't have an _actionType then all we know is the hash
    // changed. It was probably caused by the user clicking the Back
    // button, but may have also been the Forward button or manual
    // manipulation. So just guess 'pop'.
    var curActionType = _actionType;
    _actionType = null;
    notifyChange(curActionType || LocationActions.POP);
  }
}

/**
 * A Location that uses `window.location.hash`.
 */
var HashLocation = {

  addChangeListener: function addChangeListener(listener) {
    _listeners.push(listener);

    // Do this BEFORE listening for hashchange.
    ensureSlash();

    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener("hashchange", onHashChange, false);
      } else {
        window.attachEvent("onhashchange", onHashChange);
      }

      _isListening = true;
    }
  },

  removeChangeListener: function removeChangeListener(listener) {
    _listeners = _listeners.filter(function (l) {
      return l !== listener;
    });

    if (_listeners.length === 0) {
      if (window.removeEventListener) {
        window.removeEventListener("hashchange", onHashChange, false);
      } else {
        window.removeEvent("onhashchange", onHashChange);
      }

      _isListening = false;
    }
  },

  push: function push(path) {
    _actionType = LocationActions.PUSH;
    window.location.hash = path;
  },

  replace: function replace(path) {
    _actionType = LocationActions.REPLACE;
    window.location.replace(window.location.pathname + window.location.search + "#" + path);
  },

  pop: function pop() {
    _actionType = LocationActions.POP;
    History.back();
  },

  getCurrentPath: function getCurrentPath() {
    return decodeURI(
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    window.location.href.split("#")[1] || "");
  },

  toString: function toString() {
    return "<HashLocation>";
  }

};

module.exports = HashLocation;
},{"../History":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js","../actions/LocationActions":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/actions/LocationActions.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HistoryLocation.js":[function(require,module,exports){
"use strict";

var LocationActions = require("../actions/LocationActions");
var History = require("../History");

var _listeners = [];
var _isListening = false;

function notifyChange(type) {
  var change = {
    path: HistoryLocation.getCurrentPath(),
    type: type
  };

  _listeners.forEach(function (listener) {
    listener.call(HistoryLocation, change);
  });
}

function onPopState(event) {
  if (event.state === undefined) {
    return;
  } // Ignore extraneous popstate events in WebKit.

  notifyChange(LocationActions.POP);
}

/**
 * A Location that uses HTML5 history.
 */
var HistoryLocation = {

  addChangeListener: function addChangeListener(listener) {
    _listeners.push(listener);

    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener("popstate", onPopState, false);
      } else {
        window.attachEvent("onpopstate", onPopState);
      }

      _isListening = true;
    }
  },

  removeChangeListener: function removeChangeListener(listener) {
    _listeners = _listeners.filter(function (l) {
      return l !== listener;
    });

    if (_listeners.length === 0) {
      if (window.addEventListener) {
        window.removeEventListener("popstate", onPopState, false);
      } else {
        window.removeEvent("onpopstate", onPopState);
      }

      _isListening = false;
    }
  },

  push: function push(path) {
    window.history.pushState({ path: path }, "", path);
    History.length += 1;
    notifyChange(LocationActions.PUSH);
  },

  replace: function replace(path) {
    window.history.replaceState({ path: path }, "", path);
    notifyChange(LocationActions.REPLACE);
  },

  pop: History.back,

  getCurrentPath: function getCurrentPath() {
    return decodeURI(window.location.pathname + window.location.search);
  },

  toString: function toString() {
    return "<HistoryLocation>";
  }

};

module.exports = HistoryLocation;
},{"../History":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js","../actions/LocationActions":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/actions/LocationActions.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/RefreshLocation.js":[function(require,module,exports){
"use strict";

var HistoryLocation = require("./HistoryLocation");
var History = require("../History");

/**
 * A Location that uses full page refreshes. This is used as
 * the fallback for HistoryLocation in browsers that do not
 * support the HTML5 history API.
 */
var RefreshLocation = {

  push: function push(path) {
    window.location = path;
  },

  replace: function replace(path) {
    window.location.replace(path);
  },

  pop: History.back,

  getCurrentPath: HistoryLocation.getCurrentPath,

  toString: function toString() {
    return "<RefreshLocation>";
  }

};

module.exports = RefreshLocation;
},{"../History":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js","./HistoryLocation":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/HistoryLocation.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/StaticLocation.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var invariant = require("react/lib/invariant");

function throwCannotModify() {
  invariant(false, "You cannot modify a static location");
}

/**
 * A location that only ever contains a single path. Useful in
 * stateless environments like servers where there is no path history,
 * only the path that was used in the request.
 */

var StaticLocation = (function () {
  function StaticLocation(path) {
    _classCallCheck(this, StaticLocation);

    this.path = path;
  }

  _createClass(StaticLocation, {
    getCurrentPath: {
      value: function getCurrentPath() {
        return this.path;
      }
    },
    toString: {
      value: function toString() {
        return "<StaticLocation path=\"" + this.path + "\">";
      }
    }
  });

  return StaticLocation;
})();

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

StaticLocation.prototype.push = throwCannotModify;
StaticLocation.prototype.replace = throwCannotModify;
StaticLocation.prototype.pop = throwCannotModify;

module.exports = StaticLocation;
},{"react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/locations/TestLocation.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var invariant = require("react/lib/invariant");
var LocationActions = require("../actions/LocationActions");
var History = require("../History");

/**
 * A location that is convenient for testing and does not require a DOM.
 */

var TestLocation = (function () {
  function TestLocation(history) {
    _classCallCheck(this, TestLocation);

    this.history = history || [];
    this.listeners = [];
    this._updateHistoryLength();
  }

  _createClass(TestLocation, {
    needsDOM: {
      get: function () {
        return false;
      }
    },
    _updateHistoryLength: {
      value: function _updateHistoryLength() {
        History.length = this.history.length;
      }
    },
    _notifyChange: {
      value: function _notifyChange(type) {
        var change = {
          path: this.getCurrentPath(),
          type: type
        };

        for (var i = 0, len = this.listeners.length; i < len; ++i) this.listeners[i].call(this, change);
      }
    },
    addChangeListener: {
      value: function addChangeListener(listener) {
        this.listeners.push(listener);
      }
    },
    removeChangeListener: {
      value: function removeChangeListener(listener) {
        this.listeners = this.listeners.filter(function (l) {
          return l !== listener;
        });
      }
    },
    push: {
      value: function push(path) {
        this.history.push(path);
        this._updateHistoryLength();
        this._notifyChange(LocationActions.PUSH);
      }
    },
    replace: {
      value: function replace(path) {
        invariant(this.history.length, "You cannot replace the current path with no history");

        this.history[this.history.length - 1] = path;

        this._notifyChange(LocationActions.REPLACE);
      }
    },
    pop: {
      value: function pop() {
        this.history.pop();
        this._updateHistoryLength();
        this._notifyChange(LocationActions.POP);
      }
    },
    getCurrentPath: {
      value: function getCurrentPath() {
        return this.history[this.history.length - 1];
      }
    },
    toString: {
      value: function toString() {
        return "<TestLocation>";
      }
    }
  });

  return TestLocation;
})();

module.exports = TestLocation;
},{"../History":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/History.js","../actions/LocationActions":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/actions/LocationActions.js","react/lib/invariant":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/runRouter.js":[function(require,module,exports){
"use strict";

var createRouter = require("./createRouter");

/**
 * A high-level convenience method that creates, configures, and
 * runs a router in one shot. The method signature is:
 *
 *   Router.run(routes[, location ], callback);
 *
 * Using `window.location.hash` to manage the URL, you could do:
 *
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 * 
 * Using HTML5 history and a custom "cursor" prop:
 * 
 *   Router.run(routes, Router.HistoryLocation, function (Handler) {
 *     React.render(<Handler cursor={cursor}/>, document.body);
 *   });
 *
 * Returns the newly created router.
 *
 * Note: If you need to specify further options for your router such
 * as error/abort handling or custom scroll behavior, use Router.create
 * instead.
 *
 *   var router = Router.create(options);
 *   router.run(function (Handler) {
 *     // ...
 *   });
 */
function runRouter(routes, location, callback) {
  if (typeof location === "function") {
    callback = location;
    location = null;
  }

  var router = createRouter({
    routes: routes,
    location: location
  });

  router.run(callback);

  return router;
}

module.exports = runRouter;
},{"./createRouter":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/createRouter.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/supportsHistory.js":[function(require,module,exports){
"use strict";

function supportsHistory() {
  /*! taken from modernizr
   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
   * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
   */
  var ua = navigator.userAgent;
  if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
    return false;
  }
  return window.history && "pushState" in window.history;
}

module.exports = supportsHistory;
},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/object-assign/index.js":[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/index.js":[function(require,module,exports){
module.exports = require('./lib/');

},{"./lib/":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/index.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/index.js":[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/parse.js","./stringify":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/stringify.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/parse.js":[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
};


internals.parseValues = function (str, options) {

    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (Object.prototype.hasOwnProperty(key)) {
                continue;
            }

            if (!obj.hasOwnProperty(key)) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val, options) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        var indexString = '' + index;
        if (!isNaN(index) &&
            root !== cleanRoot &&
            indexString === cleanRoot &&
            index >= 0 &&
            index <= options.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val, options);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, options) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val, options);
};


module.exports = function (str, options) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj);
    }

    return Utils.compact(obj);
};

},{"./utils":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/utils.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/stringify.js":[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    arrayPrefixGenerators: {
        brackets: function (prefix, key) {
            return prefix + '[]';
        },
        indices: function (prefix, key) {
            return prefix + '[' + key + ']';
        },
        repeat: function (prefix, key) {
            return prefix;
        }
    }
};


internals.stringify = function (obj, prefix, generateArrayPrefix) {

    if (Utils.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        if (Array.isArray(obj)) {
            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix));
        }
        else {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix));
        }
    }

    return values;
};


module.exports = function (obj, options) {

    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;

    var keys = [];

    if (typeof obj !== 'object' ||
        obj === null) {

        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in internals.arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    }
    else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    }
    else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix));
    }

    return keys.join(delimiter);
};

},{"./utils":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/utils.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react-router/node_modules/qs/lib/utils.js":[function(require,module,exports){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        }
        else {
            target[source] = true;
        }

        return target;
    }

    if (typeof target !== 'object') {
        target = [target].concat(source);
        return target;
    }

    if (Array.isArray(target) &&
        !Array.isArray(source)) {

        target = exports.arrayToObject(target);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (!target[key]) {
            target[key] = value;
        }
        else {
            target[key] = exports.merge(target[key], value);
        }
    }

    return target;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj, refs) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0, il = obj.length; i < il; ++i) {
            if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};


exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};


exports.isBuffer = function (obj) {

    if (obj === null ||
        typeof obj === 'undefined') {

        return false;
    }

    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/ExecutionEnvironment.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

"use strict";

var canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/Object.assign.js":[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/emptyFunction.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"/Users/Ben/course-notes/web/react-test/node_modules/browserify/node_modules/process/browser.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/warning.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warning
 */

"use strict";

var emptyFunction = require("./emptyFunction");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== process.env.NODE_ENV) {
  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
      console.warn(message);
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"./emptyFunction":"/Users/Ben/course-notes/web/react-test/node_modules/react/lib/emptyFunction.js","_process":"/Users/Ben/course-notes/web/react-test/node_modules/browserify/node_modules/process/browser.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/superagent/lib/client.js":[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? this
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(err || new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = function(e){
        e.percent = e.loaded / e.total * 100;
        self.emit('progress', e);
      };
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":"/Users/Ben/course-notes/web/react-test/node_modules/superagent/node_modules/component-emitter/index.js","reduce":"/Users/Ben/course-notes/web/react-test/node_modules/superagent/node_modules/reduce-component/index.js"}],"/Users/Ben/course-notes/web/react-test/node_modules/superagent/node_modules/component-emitter/index.js":[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],"/Users/Ben/course-notes/web/react-test/node_modules/superagent/node_modules/reduce-component/index.js":[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}]},{},["./app/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvbWFpbi5qcyIsImFwcC9Ob3RlQ29udGFpbmVyLmpzIiwiYXBwL05vdGVMaXN0LmpzIiwiYXBwL1NpZGViYXIuanMiLCJhcHAvU2lnbkluRm9ybS5qcyIsImFwcC9TaWduSW5QYWdlLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL0NhbmNlbGxhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL0hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9NYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL05hdmlnYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9QYXRoVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9Qcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9SZWRpcmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvU2Nyb2xsSGlzdG9yeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL1N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvYmVoYXZpb3JzL0ltaXRhdGVCcm93c2VyQmVoYXZpb3IuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9iZWhhdmlvcnMvU2Nyb2xsVG9Ub3BCZWhhdmlvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvQ29udGV4dFdyYXBwZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jb21wb25lbnRzL0RlZmF1bHRSb3V0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvTGluay5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvTm90Rm91bmRSb3V0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvUmVkaXJlY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jb21wb25lbnRzL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvY29tcG9uZW50cy9Sb3V0ZUhhbmRsZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVSb3V0ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2dldFdpbmRvd1Njcm9sbFBvc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9pc1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9sb2NhdGlvbnMvSGFzaExvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvbG9jYXRpb25zL0hpc3RvcnlMb2NhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9sb2NhdGlvbnMvU3RhdGljTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9sb2NhdGlvbnMvVGVzdExvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvcnVuUm91dGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvc3VwcG9ydHNIaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3FzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCAgICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgICAgICAgID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgTm90ZUNvbnRhaW5lciA9IHJlcXVpcmUoJy4vTm90ZUNvbnRhaW5lci5qcycpO1xudmFyIFNpZGViYXIgICAgICAgPSByZXF1aXJlKCcuL1NpZGViYXIuanMnKTtcbnZhciBTaWduSW5Gb3JtICAgID0gcmVxdWlyZSgnLi9TaWduSW5Gb3JtLmpzJyk7XG52YXIgU2lnbkluUGFnZSAgICA9IHJlcXVpcmUoJy4vU2lnbkluUGFnZS5qcycpO1xuXG52YXIgRGVmYXVsdFJvdXRlICA9IFJvdXRlci5EZWZhdWx0Um91dGU7XG52YXIgTGluayAgICAgICAgICA9IFJvdXRlci5MaW5rO1xudmFyIFJvdXRlICAgICAgICAgPSBSb3V0ZXIuUm91dGU7XG52YXIgUm91dGVIYW5kbGVyICA9IFJvdXRlci5Sb3V0ZUhhbmRsZXI7XG5cbi8qKlxuICogQXBwIG1haW4gZW50cnkgcG9pbnRcbiAqL1xudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOb3RlQ29udGFpbmVyLCBudWxsKSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZWJhciwgbnVsbCksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlSGFuZGxlciwgbnVsbClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxuLyoqXG4gKiBEZWZpbmUgcm91dGVzXG4gKi9cbnZhciByb3V0ZXMgPSAoXG4gIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtuYW1lOiBcImFwcFwiLCBwYXRoOiBcIi9cIiwgaGFuZGxlcjogQXBwfVxuICApXG4pO1xuXG4vKipcbiAqIFN0YXJ0IHRoZSBSb3V0ZXJcbiAqL1xuUm91dGVyLnJ1bihyb3V0ZXMsIGZ1bmN0aW9uKEhhbmRsZXIpIHtcbiAgUmVhY3QucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGFuZGxlciwgbnVsbCksIGRvY3VtZW50LmJvZHkpO1xufSk7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBOb3RlQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk5vdGVDb250YWluZXJcIixcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiejEgYWJzb2x1dGUgdG9wLTAgbGVmdC0wIGJvdHRvbS0wIHJpZ2h0LW9mZnNldFwifVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdGVDb250YWluZXI7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBOb3RlTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJOb3RlTGlzdFwiLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwibWwyIG1yMiBtdDIgYnRsXCJ9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJsZWZ0XCJ9LCBcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwge2NsYXNzTmFtZTogXCJtMCBweTIgc21hbGwtY2FwcyBidGRcIn0sIFwiWW91ciBOb3Rlc1wiKVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJyaWdodFwifSwgXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg1XCIsIHtjbGFzc05hbWU6IFwibTAgcHkyIHNtYWxsLWNhcHMgbGlnaHQgbGlnaHQtZ3JheVwifSwgXCJIZWxwXCIpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RlTGlzdDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xudmFyIFJlYWN0ICAgICAgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFNpZ25JblBhZ2UgPSByZXF1aXJlKCcuL1NpZ25JblBhZ2UuanMnKTtcbnZhciBOb3RlTGlzdCAgID0gcmVxdWlyZSgnLi9Ob3RlTGlzdC5qcycpO1xuXG52YXIgU2lkZWJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTaWRlYmFyXCIsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInoxIGFic29sdXRlIHNpZGViYXIgdG9wLTAgYm90dG9tLTAgcmlnaHQtMCBiZy1zaWx2ZXIgYmxsXCJ9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWduSW5QYWdlLCB7dXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvbG9naW5cIn0pLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOb3RlTGlzdCwgbnVsbClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWRlYmFyOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vKipcbiAqIFNpZ24gaW4gZm9ybVxuICovXG52YXIgU2lnbkluRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTaWduSW5Gb3JtXCIsXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgZW1haWwgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZW1haWwpLnZhbHVlLnRyaW0oKTtcbiAgICB2YXIgcGFzc3dvcmQgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMucGFzc3dvcmQpLnZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgIHVzZXJuYW1lOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgIH0pO1xuICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5lbWFpbCkudmFsdWUgPSAnJztcbiAgICBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMucGFzc3dvcmQpLnZhbHVlID0gJyc7XG4gICAgcmV0dXJuO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ01vdW50ZWQgU2lnbkluRm9ybScpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7Y2xhc3NOYW1lOiBcInNpZ25JbkZvcm0gZmllbGRzZXQtcmVzZXRcIiwgb25TdWJtaXQ6IHRoaXMuaGFuZGxlU3VibWl0LCBhY3Rpb246IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9sb2dpblwiLCBtZXRob2Q6IFwicG9zdFwifSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7Y2xhc3NOYW1lOiBcImJsb2NrIGZ1bGwtd2lkdGhcIiwgdHlwZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJFbWFpbFwiLCByZWY6IFwiZW1haWxcIn0pLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtjbGFzc05hbWU6IFwiYmxvY2sgZnVsbC13aWR0aFwiLCB0eXBlOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIsIHJlZjogXCJwYXNzd29yZFwifSksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge2NsYXNzTmFtZTogXCJidXR0b24gZnVsbC13aWR0aCBiZy1zaWx2ZXIgc21hbGwtY2FwcyBsaWdodCBibHVlIGNlbnRlclwiLCB0eXBlOiBcInN1Ym1pdFwiLCB2YWx1ZTogXCJTaWduIEluXCJ9KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25JbkZvcm07IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKTtcbnZhciBTaWduSW5Gb3JtID0gcmVxdWlyZSgnLi9TaWduSW5Gb3JtLmpzJyk7XG4vKipcbiAqIFNpZ24gaW4gcGFnZVxuICovXG52YXIgU2lnbkluUGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTaWduSW5QYWdlXCIsXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnTW91bnRlZCBTaWduSW5QYWdlJyk7XG4gIH0sXG4gIGhhbmRsZVNpZ25JbjogZnVuY3Rpb24odXNlckluZm8pIHtcbiAgICByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLnByb3BzLnVybClcbiAgICAgIC5zZW5kKHVzZXJJbmZvKVxuICAgICAgLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlcy5ib2R5LnRva2VuKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPaCBubyEgZXJyb3IgJyArIHJlcy50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3QgZmlyZWQnKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInNpZ25JblBhZ2UgbWwyIG1yMiBtdDIgYnRsXCJ9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJsZWZ0XCJ9LCBcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwge2NsYXNzTmFtZTogXCJtMCBweTIgc21hbGwtY2FwcyBidGRcIn0sIFwiU2lnbiBpbiB0byBTdHVkeVBpZ2d5XCIpXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInJpZ2h0XCJ9LCBcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwge2NsYXNzTmFtZTogXCJtMCBweTIgc21hbGwtY2FwcyBsaWdodCBsaWdodC1ncmF5XCJ9LCBcIkZvcmdvdCBwYXNzd29yZD9cIilcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJjZlwifSksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZ25JbkZvcm0sIHtvblN1Ym1pdDogdGhpcy5oYW5kbGVTaWduSW59KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25JblBhZ2U7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuTXV0YXRpb25PYnNlcnZlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgdmFyIHF1ZXVlID0gW107XG5cbiAgICBpZiAoY2FuTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgICB2YXIgaGlkZGVuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXVlTGlzdCA9IHF1ZXVlLnNsaWNlKCk7XG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcXVldWVMaXN0LmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhpZGRlbkRpdiwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5EaXYuc2V0QXR0cmlidXRlKCd5ZXMnLCAnbm8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjYW5jZWxsYXRpb24gY2F1c2VkIGJ5IG5hdmlnYXRpbmcgYXdheVxuICogYmVmb3JlIHRoZSBwcmV2aW91cyB0cmFuc2l0aW9uIGhhcyBmdWxseSByZXNvbHZlZC5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsbGF0aW9uKCkge31cblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxsYXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKFwicmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50XCIpLmNhblVzZURPTTtcblxudmFyIEhpc3RvcnkgPSB7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG51bWJlciBvZiBlbnRyaWVzIGluIHRoZSBoaXN0b3J5LlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIHByb3BlcnR5IGlzIHJlYWQtb25seS5cbiAgICovXG4gIGxlbmd0aDogMSxcblxuICAvKipcbiAgICogU2VuZHMgdGhlIGJyb3dzZXIgYmFjayBvbmUgZW50cnkgaW4gdGhlIGhpc3RvcnkuXG4gICAqL1xuICBiYWNrOiBmdW5jdGlvbiBiYWNrKCkge1xuICAgIGludmFyaWFudChjYW5Vc2VET00sIFwiQ2Fubm90IHVzZSBIaXN0b3J5LmJhY2sgd2l0aG91dCBhIERPTVwiKTtcblxuICAgIC8vIERvIHRoaXMgZmlyc3Qgc28gdGhhdCBIaXN0b3J5Lmxlbmd0aCB3aWxsXG4gICAgLy8gYmUgYWNjdXJhdGUgaW4gbG9jYXRpb24gY2hhbmdlIGxpc3RlbmVycy5cbiAgICBIaXN0b3J5Lmxlbmd0aCAtPSAxO1xuXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGlzdG9yeTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbi8qIGpzaGludCAtVzA4NCAqL1xudmFyIFBhdGhVdGlscyA9IHJlcXVpcmUoXCIuL1BhdGhVdGlsc1wiKTtcblxuZnVuY3Rpb24gZGVlcFNlYXJjaChyb3V0ZSwgcGF0aG5hbWUsIHF1ZXJ5KSB7XG4gIC8vIENoZWNrIHRoZSBzdWJ0cmVlIGZpcnN0IHRvIGZpbmQgdGhlIG1vc3QgZGVlcGx5LW5lc3RlZCBtYXRjaC5cbiAgdmFyIGNoaWxkUm91dGVzID0gcm91dGUuY2hpbGRSb3V0ZXM7XG4gIGlmIChjaGlsZFJvdXRlcykge1xuICAgIHZhciBtYXRjaCwgY2hpbGRSb3V0ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2hpbGRSb3V0ZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNoaWxkUm91dGUgPSBjaGlsZFJvdXRlc1tpXTtcblxuICAgICAgaWYgKGNoaWxkUm91dGUuaXNEZWZhdWx0IHx8IGNoaWxkUm91dGUuaXNOb3RGb3VuZCkgY29udGludWU7IC8vIENoZWNrIHRoZXNlIGluIG9yZGVyIGxhdGVyLlxuXG4gICAgICBpZiAobWF0Y2ggPSBkZWVwU2VhcmNoKGNoaWxkUm91dGUsIHBhdGhuYW1lLCBxdWVyeSkpIHtcbiAgICAgICAgLy8gQSByb3V0ZSBpbiB0aGUgc3VidHJlZSBtYXRjaGVkISBBZGQgdGhpcyByb3V0ZSBhbmQgd2UncmUgZG9uZS5cbiAgICAgICAgbWF0Y2gucm91dGVzLnVuc2hpZnQocm91dGUpO1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm8gY2hpbGQgcm91dGVzIG1hdGNoZWQ7IHRyeSB0aGUgZGVmYXVsdCByb3V0ZS5cbiAgdmFyIGRlZmF1bHRSb3V0ZSA9IHJvdXRlLmRlZmF1bHRSb3V0ZTtcbiAgaWYgKGRlZmF1bHRSb3V0ZSAmJiAocGFyYW1zID0gUGF0aFV0aWxzLmV4dHJhY3RQYXJhbXMoZGVmYXVsdFJvdXRlLnBhdGgsIHBhdGhuYW1lKSkpIHtcbiAgICByZXR1cm4gbmV3IE1hdGNoKHBhdGhuYW1lLCBwYXJhbXMsIHF1ZXJ5LCBbcm91dGUsIGRlZmF1bHRSb3V0ZV0pO1xuICB9IC8vIERvZXMgdGhlIFwibm90IGZvdW5kXCIgcm91dGUgbWF0Y2g/XG4gIHZhciBub3RGb3VuZFJvdXRlID0gcm91dGUubm90Rm91bmRSb3V0ZTtcbiAgaWYgKG5vdEZvdW5kUm91dGUgJiYgKHBhcmFtcyA9IFBhdGhVdGlscy5leHRyYWN0UGFyYW1zKG5vdEZvdW5kUm91dGUucGF0aCwgcGF0aG5hbWUpKSkge1xuICAgIHJldHVybiBuZXcgTWF0Y2gocGF0aG5hbWUsIHBhcmFtcywgcXVlcnksIFtyb3V0ZSwgbm90Rm91bmRSb3V0ZV0pO1xuICB9IC8vIExhc3QgYXR0ZW1wdDogY2hlY2sgdGhpcyByb3V0ZS5cbiAgdmFyIHBhcmFtcyA9IFBhdGhVdGlscy5leHRyYWN0UGFyYW1zKHJvdXRlLnBhdGgsIHBhdGhuYW1lKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIHJldHVybiBuZXcgTWF0Y2gocGF0aG5hbWUsIHBhcmFtcywgcXVlcnksIFtyb3V0ZV0pO1xuICB9cmV0dXJuIG51bGw7XG59XG5cbnZhciBNYXRjaCA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1hdGNoKHBhdGhuYW1lLCBwYXJhbXMsIHF1ZXJ5LCByb3V0ZXMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWF0Y2gpO1xuXG4gICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNYXRjaCwgbnVsbCwge1xuICAgIGZpbmRNYXRjaDoge1xuXG4gICAgICAvKipcbiAgICAgICAqIEF0dGVtcHRzIHRvIG1hdGNoIGRlcHRoLWZpcnN0IGEgcm91dGUgaW4gdGhlIGdpdmVuIHJvdXRlJ3NcbiAgICAgICAqIHN1YnRyZWUgYWdhaW5zdCB0aGUgZ2l2ZW4gcGF0aCBhbmQgcmV0dXJucyB0aGUgbWF0Y2ggaWYgaXRcbiAgICAgICAqIHN1Y2NlZWRzLCBudWxsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmaW5kTWF0Y2gocm91dGVzLCBwYXRoKSB7XG4gICAgICAgIHZhciBwYXRobmFtZSA9IFBhdGhVdGlscy53aXRob3V0UXVlcnkocGF0aCk7XG4gICAgICAgIHZhciBxdWVyeSA9IFBhdGhVdGlscy5leHRyYWN0UXVlcnkocGF0aCk7XG4gICAgICAgIHZhciBtYXRjaCA9IG51bGw7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJvdXRlcy5sZW5ndGg7IG1hdGNoID09IG51bGwgJiYgaSA8IGxlbjsgKytpKSBtYXRjaCA9IGRlZXBTZWFyY2gocm91dGVzW2ldLCBwYXRobmFtZSwgcXVlcnkpO1xuXG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBNYXRjaDtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWF0Y2g7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZShcInJlYWN0L2xpYi93YXJuaW5nXCIpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoXCIuL1Byb3BUeXBlc1wiKTtcblxuZnVuY3Rpb24gZGVwcmVjYXRlZE1ldGhvZChyb3V0ZXJNZXRob2ROYW1lLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHdhcm5pbmcoZmFsc2UsIFwiUm91dGVyLk5hdmlnYXRpb24gaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0aGlzLmNvbnRleHQucm91dGVyLlwiICsgcm91dGVyTWV0aG9kTmFtZSArIFwiKCkgaW5zdGVhZFwiKTtcblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEEgbWl4aW4gZm9yIGNvbXBvbmVudHMgdGhhdCBtb2RpZnkgdGhlIFVSTC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBtaXhpbnM6IFsgUm91dGVyLk5hdmlnYXRpb24gXSxcbiAqICAgICBoYW5kbGVDbGljayhldmVudCkge1xuICogICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAqICAgICAgIHRoaXMudHJhbnNpdGlvblRvKCdhUm91dGUnLCB7IHRoZTogJ3BhcmFtcycgfSwgeyB0aGU6ICdxdWVyeScgfSk7XG4gKiAgICAgfSxcbiAqICAgICByZW5kZXIoKSB7XG4gKiAgICAgICByZXR1cm4gKFxuICogICAgICAgICA8YSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5DbGljayBtZSE8L2E+XG4gKiAgICAgICApO1xuICogICAgIH1cbiAqICAgfSk7XG4gKi9cbnZhciBOYXZpZ2F0aW9uID0ge1xuXG4gIGNvbnRleHRUeXBlczoge1xuICAgIHJvdXRlcjogUHJvcFR5cGVzLnJvdXRlci5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYWJzb2x1dGUgVVJMIHBhdGggY3JlYXRlZCBmcm9tIHRoZSBnaXZlbiByb3V0ZVxuICAgKiBuYW1lLCBVUkwgcGFyYW1ldGVycywgYW5kIHF1ZXJ5IHZhbHVlcy5cbiAgICovXG4gIG1ha2VQYXRoOiBkZXByZWNhdGVkTWV0aG9kKFwibWFrZVBhdGhcIiwgZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIubWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuICB9KSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyB0aGF0IG1heSBzYWZlbHkgYmUgdXNlZCBhcyB0aGUgaHJlZiBvZiBhXG4gICAqIGxpbmsgdG8gdGhlIHJvdXRlIHdpdGggdGhlIGdpdmVuIG5hbWUuXG4gICAqL1xuICBtYWtlSHJlZjogZGVwcmVjYXRlZE1ldGhvZChcIm1ha2VIcmVmXCIsIGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLm1ha2VIcmVmKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSksXG5cbiAgLyoqXG4gICAqIFRyYW5zaXRpb25zIHRvIHRoZSBVUkwgc3BlY2lmaWVkIGluIHRoZSBhcmd1bWVudHMgYnkgcHVzaGluZ1xuICAgKiBhIG5ldyBVUkwgb250byB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIHRyYW5zaXRpb25UbzogZGVwcmVjYXRlZE1ldGhvZChcInRyYW5zaXRpb25Ub1wiLCBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubyh0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0pLFxuXG4gIC8qKlxuICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHJlcGxhY2luZ1xuICAgKiB0aGUgY3VycmVudCBVUkwgaW4gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAqL1xuICByZXBsYWNlV2l0aDogZGVwcmVjYXRlZE1ldGhvZChcInJlcGxhY2VXaXRoXCIsIGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZVdpdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuICB9KSxcblxuICAvKipcbiAgICogVHJhbnNpdGlvbnMgdG8gdGhlIHByZXZpb3VzIFVSTC5cbiAgICovXG4gIGdvQmFjazogZGVwcmVjYXRlZE1ldGhvZChcImdvQmFja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCk7XG4gIH0pXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoXCJvYmplY3QtYXNzaWduXCIpO1xudmFyIHFzID0gcmVxdWlyZShcInFzXCIpO1xuXG52YXIgcGFyYW1Db21waWxlTWF0Y2hlciA9IC86KFthLXpBLVpfJF1bYS16QS1aMC05XyRdKil8WyouKClcXFtcXF1cXFxcK3x7fV4kXS9nO1xudmFyIHBhcmFtSW5qZWN0TWF0Y2hlciA9IC86KFthLXpBLVpfJF1bYS16QS1aMC05XyQ/XSpbP10/KXxbKl0vZztcbnZhciBwYXJhbUluamVjdFRyYWlsaW5nU2xhc2hNYXRjaGVyID0gL1xcL1xcL1xcP3xcXC9cXD9cXC98XFwvXFw/L2c7XG52YXIgcXVlcnlNYXRjaGVyID0gL1xcPyguKikkLztcblxudmFyIF9jb21waWxlZFBhdHRlcm5zID0ge307XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgaWYgKCEocGF0dGVybiBpbiBfY29tcGlsZWRQYXR0ZXJucykpIHtcbiAgICB2YXIgcGFyYW1OYW1lcyA9IFtdO1xuICAgIHZhciBzb3VyY2UgPSBwYXR0ZXJuLnJlcGxhY2UocGFyYW1Db21waWxlTWF0Y2hlciwgZnVuY3Rpb24gKG1hdGNoLCBwYXJhbU5hbWUpIHtcbiAgICAgIGlmIChwYXJhbU5hbWUpIHtcbiAgICAgICAgcGFyYW1OYW1lcy5wdXNoKHBhcmFtTmFtZSk7XG4gICAgICAgIHJldHVybiBcIihbXi8/I10rKVwiO1xuICAgICAgfSBlbHNlIGlmIChtYXRjaCA9PT0gXCIqXCIpIHtcbiAgICAgICAgcGFyYW1OYW1lcy5wdXNoKFwic3BsYXRcIik7XG4gICAgICAgIHJldHVybiBcIiguKj8pXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJcXFxcXCIgKyBtYXRjaDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF9jb21waWxlZFBhdHRlcm5zW3BhdHRlcm5dID0ge1xuICAgICAgbWF0Y2hlcjogbmV3IFJlZ0V4cChcIl5cIiArIHNvdXJjZSArIFwiJFwiLCBcImlcIiksXG4gICAgICBwYXJhbU5hbWVzOiBwYXJhbU5hbWVzXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29tcGlsZWRQYXR0ZXJuc1twYXR0ZXJuXTtcbn1cblxudmFyIFBhdGhVdGlscyA9IHtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBwYXRoIGlzIGFic29sdXRlLlxuICAgKi9cbiAgaXNBYnNvbHV0ZTogZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSBcIi9cIjtcbiAgfSxcblxuICAvKipcbiAgICogSm9pbnMgdHdvIFVSTCBwYXRocyB0b2dldGhlci5cbiAgICovXG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oYSwgYikge1xuICAgIHJldHVybiBhLnJlcGxhY2UoL1xcLyokLywgXCIvXCIpICsgYjtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgbmFtZXMgb2YgYWxsIHBhcmFtZXRlcnMgaW4gdGhlIGdpdmVuIHBhdHRlcm4uXG4gICAqL1xuICBleHRyYWN0UGFyYW1OYW1lczogZnVuY3Rpb24gZXh0cmFjdFBhcmFtTmFtZXMocGF0dGVybikge1xuICAgIHJldHVybiBjb21waWxlUGF0dGVybihwYXR0ZXJuKS5wYXJhbU5hbWVzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFeHRyYWN0cyB0aGUgcG9ydGlvbnMgb2YgdGhlIGdpdmVuIFVSTCBwYXRoIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIHBhdHRlcm5cbiAgICogYW5kIHJldHVybnMgYW4gb2JqZWN0IG9mIHBhcmFtIG5hbWUgPT4gdmFsdWUgcGFpcnMuIFJldHVybnMgbnVsbCBpZiB0aGVcbiAgICogcGF0dGVybiBkb2VzIG5vdCBtYXRjaCB0aGUgZ2l2ZW4gcGF0aC5cbiAgICovXG4gIGV4dHJhY3RQYXJhbXM6IGZ1bmN0aW9uIGV4dHJhY3RQYXJhbXMocGF0dGVybiwgcGF0aCkge1xuICAgIHZhciBfY29tcGlsZVBhdHRlcm4gPSBjb21waWxlUGF0dGVybihwYXR0ZXJuKTtcblxuICAgIHZhciBtYXRjaGVyID0gX2NvbXBpbGVQYXR0ZXJuLm1hdGNoZXI7XG4gICAgdmFyIHBhcmFtTmFtZXMgPSBfY29tcGlsZVBhdHRlcm4ucGFyYW1OYW1lcztcblxuICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2gobWF0Y2hlcik7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9dmFyIHBhcmFtcyA9IHt9O1xuXG4gICAgcGFyYW1OYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbU5hbWUsIGluZGV4KSB7XG4gICAgICBwYXJhbXNbcGFyYW1OYW1lXSA9IG1hdGNoW2luZGV4ICsgMV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcm91dGUgcGF0aCB3aXRoIHBhcmFtcyBpbnRlcnBvbGF0ZWQuIFRocm93c1xuICAgKiBpZiB0aGVyZSBpcyBhIGR5bmFtaWMgc2VnbWVudCBvZiB0aGUgcm91dGUgcGF0aCBmb3Igd2hpY2ggdGhlcmUgaXMgbm8gcGFyYW0uXG4gICAqL1xuICBpbmplY3RQYXJhbXM6IGZ1bmN0aW9uIGluamVjdFBhcmFtcyhwYXR0ZXJuLCBwYXJhbXMpIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICB2YXIgc3BsYXRJbmRleCA9IDA7XG5cbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKHBhcmFtSW5qZWN0TWF0Y2hlciwgZnVuY3Rpb24gKG1hdGNoLCBwYXJhbU5hbWUpIHtcbiAgICAgIHBhcmFtTmFtZSA9IHBhcmFtTmFtZSB8fCBcInNwbGF0XCI7XG5cbiAgICAgIC8vIElmIHBhcmFtIGlzIG9wdGlvbmFsIGRvbid0IGNoZWNrIGZvciBleGlzdGVuY2VcbiAgICAgIGlmIChwYXJhbU5hbWUuc2xpY2UoLTEpID09PSBcIj9cIikge1xuICAgICAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWUuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAgIGlmIChwYXJhbXNbcGFyYW1OYW1lXSA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludmFyaWFudChwYXJhbXNbcGFyYW1OYW1lXSAhPSBudWxsLCBcIk1pc3NpbmcgXFxcIiVzXFxcIiBwYXJhbWV0ZXIgZm9yIHBhdGggXFxcIiVzXFxcIlwiLCBwYXJhbU5hbWUsIHBhdHRlcm4pO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VnbWVudDtcbiAgICAgIGlmIChwYXJhbU5hbWUgPT09IFwic3BsYXRcIiAmJiBBcnJheS5pc0FycmF5KHBhcmFtc1twYXJhbU5hbWVdKSkge1xuICAgICAgICBzZWdtZW50ID0gcGFyYW1zW3BhcmFtTmFtZV1bc3BsYXRJbmRleCsrXTtcblxuICAgICAgICBpbnZhcmlhbnQoc2VnbWVudCAhPSBudWxsLCBcIk1pc3Npbmcgc3BsYXQgIyAlcyBmb3IgcGF0aCBcXFwiJXNcXFwiXCIsIHNwbGF0SW5kZXgsIHBhdHRlcm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VnbWVudCA9IHBhcmFtc1twYXJhbU5hbWVdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VnbWVudDtcbiAgICB9KS5yZXBsYWNlKHBhcmFtSW5qZWN0VHJhaWxpbmdTbGFzaE1hdGNoZXIsIFwiL1wiKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBpcyB0aGUgcmVzdWx0IG9mIHBhcnNpbmcgYW55IHF1ZXJ5IHN0cmluZyBjb250YWluZWRcbiAgICogaW4gdGhlIGdpdmVuIHBhdGgsIG51bGwgaWYgdGhlIHBhdGggY29udGFpbnMgbm8gcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgZXh0cmFjdFF1ZXJ5OiBmdW5jdGlvbiBleHRyYWN0UXVlcnkocGF0aCkge1xuICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2gocXVlcnlNYXRjaGVyKTtcbiAgICByZXR1cm4gbWF0Y2ggJiYgcXMucGFyc2UobWF0Y2hbMV0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcGF0aCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICB3aXRob3V0UXVlcnk6IGZ1bmN0aW9uIHdpdGhvdXRRdWVyeShwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGgucmVwbGFjZShxdWVyeU1hdGNoZXIsIFwiXCIpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSBnaXZlblxuICAgKiBxdWVyeSBtZXJnZWQgaW50byB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgd2l0aFF1ZXJ5OiBmdW5jdGlvbiB3aXRoUXVlcnkocGF0aCwgcXVlcnkpIHtcbiAgICB2YXIgZXhpc3RpbmdRdWVyeSA9IFBhdGhVdGlscy5leHRyYWN0UXVlcnkocGF0aCk7XG5cbiAgICBpZiAoZXhpc3RpbmdRdWVyeSkgcXVlcnkgPSBxdWVyeSA/IG9iamVjdEFzc2lnbihleGlzdGluZ1F1ZXJ5LCBxdWVyeSkgOiBleGlzdGluZ1F1ZXJ5O1xuXG4gICAgdmFyIHF1ZXJ5U3RyaW5nID0gcXMuc3RyaW5naWZ5KHF1ZXJ5LCB7IGFycmF5Rm9ybWF0OiBcImJyYWNrZXRzXCIgfSk7XG5cbiAgICBpZiAocXVlcnlTdHJpbmcpIHtcbiAgICAgIHJldHVybiBQYXRoVXRpbHMud2l0aG91dFF1ZXJ5KHBhdGgpICsgXCI/XCIgKyBxdWVyeVN0cmluZztcbiAgICB9cmV0dXJuIFBhdGhVdGlscy53aXRob3V0UXVlcnkocGF0aCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXRoVXRpbHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKFwicmVhY3QvbGliL09iamVjdC5hc3NpZ25cIik7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKFwicmVhY3RcIikuUHJvcFR5cGVzO1xudmFyIFJvdXRlID0gcmVxdWlyZShcIi4vUm91dGVcIik7XG5cbnZhciBQcm9wVHlwZXMgPSBhc3NpZ24oe30sIFJlYWN0UHJvcFR5cGVzLCB7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGEgcHJvcCBzaG91bGQgYmUgZmFsc3kuXG4gICAqL1xuICBmYWxzeTogZnVuY3Rpb24gZmFsc3kocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIjxcIiArIGNvbXBvbmVudE5hbWUgKyBcIj4gbWF5IG5vdCBoYXZlIGEgXFxcIlwiICsgcHJvcE5hbWUgKyBcIlxcXCIgcHJvcFwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGEgcHJvcCBzaG91bGQgYmUgYSBSb3V0ZSBvYmplY3QuXG4gICAqL1xuICByb3V0ZTogUmVhY3RQcm9wVHlwZXMuaW5zdGFuY2VPZihSb3V0ZSksXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGEgcHJvcCBzaG91bGQgYmUgYSBSb3V0ZXIgb2JqZWN0LlxuICAgKi9cbiAgLy9yb3V0ZXI6IFJlYWN0UHJvcFR5cGVzLmluc3RhbmNlT2YoUm91dGVyKSAvLyBUT0RPXG4gIHJvdXRlcjogUmVhY3RQcm9wVHlwZXMuZnVuY1xuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9wVHlwZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGEgcmVkaXJlY3QgdG8gdGhlIGdpdmVuIHJvdXRlLlxuICovXG5mdW5jdGlvbiBSZWRpcmVjdCh0bywgcGFyYW1zLCBxdWVyeSkge1xuICB0aGlzLnRvID0gdG87XG4gIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVkaXJlY3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIga2V5IGluIHByb3BzKSB7IHZhciBwcm9wID0gcHJvcHNba2V5XTsgcHJvcC5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7IH0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgYXNzaWduID0gcmVxdWlyZShcInJlYWN0L2xpYi9PYmplY3QuYXNzaWduXCIpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKFwicmVhY3QvbGliL3dhcm5pbmdcIik7XG52YXIgUGF0aFV0aWxzID0gcmVxdWlyZShcIi4vUGF0aFV0aWxzXCIpO1xuXG52YXIgX2N1cnJlbnRSb3V0ZTtcblxudmFyIFJvdXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUm91dGUobmFtZSwgcGF0aCwgaWdub3JlU2Nyb2xsQmVoYXZpb3IsIGlzRGVmYXVsdCwgaXNOb3RGb3VuZCwgb25FbnRlciwgb25MZWF2ZSwgaGFuZGxlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSb3V0ZSk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5wYXJhbU5hbWVzID0gUGF0aFV0aWxzLmV4dHJhY3RQYXJhbU5hbWVzKHRoaXMucGF0aCk7XG4gICAgdGhpcy5pZ25vcmVTY3JvbGxCZWhhdmlvciA9ICEhaWdub3JlU2Nyb2xsQmVoYXZpb3I7XG4gICAgdGhpcy5pc0RlZmF1bHQgPSAhIWlzRGVmYXVsdDtcbiAgICB0aGlzLmlzTm90Rm91bmQgPSAhIWlzTm90Rm91bmQ7XG4gICAgdGhpcy5vbkVudGVyID0gb25FbnRlcjtcbiAgICB0aGlzLm9uTGVhdmUgPSBvbkxlYXZlO1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUm91dGUsIHtcbiAgICBhcHBlbmRDaGlsZDoge1xuXG4gICAgICAvKipcbiAgICAgICAqIEFwcGVuZHMgdGhlIGdpdmVuIHJvdXRlIHRvIHRoaXMgcm91dGUncyBjaGlsZCByb3V0ZXMuXG4gICAgICAgKi9cblxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFwcGVuZENoaWxkKHJvdXRlKSB7XG4gICAgICAgIGludmFyaWFudChyb3V0ZSBpbnN0YW5jZW9mIFJvdXRlLCBcInJvdXRlLmFwcGVuZENoaWxkIG11c3QgdXNlIGEgdmFsaWQgUm91dGVcIik7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkUm91dGVzKSB0aGlzLmNoaWxkUm91dGVzID0gW107XG5cbiAgICAgICAgdGhpcy5jaGlsZFJvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvU3RyaW5nOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHZhciBzdHJpbmcgPSBcIjxSb3V0ZVwiO1xuXG4gICAgICAgIGlmICh0aGlzLm5hbWUpIHN0cmluZyArPSBcIiBuYW1lPVxcXCJcIiArIHRoaXMubmFtZSArIFwiXFxcIlwiO1xuXG4gICAgICAgIHN0cmluZyArPSBcIiBwYXRoPVxcXCJcIiArIHRoaXMucGF0aCArIFwiXFxcIj5cIjtcblxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGNyZWF0ZVJvdXRlOiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyByb3V0ZS4gT3B0aW9ucyBtYXkgYmUgYSBVUkwgcGF0aG5hbWUgc3RyaW5nXG4gICAgICAgKiB3aXRoIHBsYWNlaG9sZGVycyBmb3IgbmFtZWQgcGFyYW1zIG9yIGFuIG9iamVjdCB3aXRoIGFueSBvZiB0aGUgZm9sbG93aW5nXG4gICAgICAgKiBwcm9wZXJ0aWVzOlxuICAgICAgICpcbiAgICAgICAqIC0gbmFtZSAgICAgICAgICAgICAgICAgICAgIFRoZSBuYW1lIG9mIHRoZSByb3V0ZS4gVGhpcyBpcyB1c2VkIHRvIGxvb2t1cCBhXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSByZWxhdGl2ZSB0byBpdHMgcGFyZW50IHJvdXRlIGFuZCBzaG91bGQgYmVcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZSBhbW9uZyBhbGwgY2hpbGQgcm91dGVzIG9mIHRoZSBzYW1lIHBhcmVudFxuICAgICAgICogLSBwYXRoICAgICAgICAgICAgICAgICAgICAgQSBVUkwgcGF0aG5hbWUgc3RyaW5nIHdpdGggb3B0aW9uYWwgcGxhY2Vob2xkZXJzXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IHNwZWNpZnkgdGhlIG5hbWVzIG9mIHBhcmFtcyB0byBleHRyYWN0IGZyb21cbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBVUkwgd2hlbiB0aGUgcGF0aCBtYXRjaGVzLiBEZWZhdWx0cyB0byBgLyR7bmFtZX1gXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuIHRoZXJlIGlzIGEgbmFtZSBnaXZlbiwgb3IgdGhlIHBhdGggb2YgdGhlIHBhcmVudFxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUsIG9yIC9cbiAgICAgICAqIC0gaWdub3JlU2Nyb2xsQmVoYXZpb3IgICAgIFRydWUgdG8gbWFrZSB0aGlzIHJvdXRlIChhbmQgYWxsIGRlc2NlbmRhbnRzKSBpZ25vcmVcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBzY3JvbGwgYmVoYXZpb3Igb2YgdGhlIHJvdXRlclxuICAgICAgICogLSBpc0RlZmF1bHQgICAgICAgICAgICAgICAgVHJ1ZSB0byBtYWtlIHRoaXMgcm91dGUgdGhlIGRlZmF1bHQgcm91dGUgYW1vbmcgYWxsXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdHMgc2libGluZ3NcbiAgICAgICAqIC0gaXNOb3RGb3VuZCAgICAgICAgICAgICAgIFRydWUgdG8gbWFrZSB0aGlzIHJvdXRlIHRoZSBcIm5vdCBmb3VuZFwiIHJvdXRlIGFtb25nXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGwgaXRzIHNpYmxpbmdzXG4gICAgICAgKiAtIG9uRW50ZXIgICAgICAgICAgICAgICAgICBBIHRyYW5zaXRpb24gaG9vayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXIgaXMgZ29pbmcgdG8gZW50ZXIgdGhpcyByb3V0ZVxuICAgICAgICogLSBvbkxlYXZlICAgICAgICAgICAgICAgICAgQSB0cmFuc2l0aW9uIGhvb2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyIGlzIGdvaW5nIHRvIGxlYXZlIHRoaXMgcm91dGVcbiAgICAgICAqIC0gaGFuZGxlciAgICAgICAgICAgICAgICAgIEEgUmVhY3QgY29tcG9uZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCB3aGVuXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHJvdXRlIGlzIGFjdGl2ZVxuICAgICAgICogLSBwYXJlbnRSb3V0ZSAgICAgICAgICAgICAgVGhlIHBhcmVudCByb3V0ZSB0byB1c2UgZm9yIHRoaXMgcm91dGUuIFRoaXMgb3B0aW9uXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhdXRvbWF0aWNhbGx5IHN1cHBsaWVkIHdoZW4gY3JlYXRpbmcgcm91dGVzIGluc2lkZVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGNhbGxiYWNrIHRvIGFub3RoZXIgaW52b2NhdGlvbiBvZiBjcmVhdGVSb3V0ZS4gWW91XG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmx5IGV2ZXIgbmVlZCB0byB1c2UgdGhpcyB3aGVuIGRlY2xhcmluZyByb3V0ZXNcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGVwZW5kZW50bHkgb2Ygb25lIGFub3RoZXIgdG8gbWFudWFsbHkgcGllY2UgdG9nZXRoZXJcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByb3V0ZSBoaWVyYXJjaHlcbiAgICAgICAqXG4gICAgICAgKiBUaGUgY2FsbGJhY2sgbWF5IGJlIHVzZWQgdG8gc3RydWN0dXJlIHlvdXIgcm91dGUgaGllcmFyY2h5LiBBbnkgY2FsbCB0b1xuICAgICAgICogY3JlYXRlUm91dGUsIGNyZWF0ZURlZmF1bHRSb3V0ZSwgY3JlYXRlTm90Rm91bmRSb3V0ZSwgb3IgY3JlYXRlUmVkaXJlY3RcbiAgICAgICAqIGluc2lkZSB0aGUgY2FsbGJhY2sgYXV0b21hdGljYWxseSB1c2VzIHRoaXMgcm91dGUgYXMgaXRzIHBhcmVudC5cbiAgICAgICAqL1xuXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlUm91dGUob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSBvcHRpb25zID0geyBwYXRoOiBvcHRpb25zIH07XG5cbiAgICAgICAgdmFyIHBhcmVudFJvdXRlID0gX2N1cnJlbnRSb3V0ZTtcblxuICAgICAgICBpZiAocGFyZW50Um91dGUpIHtcbiAgICAgICAgICB3YXJuaW5nKG9wdGlvbnMucGFyZW50Um91dGUgPT0gbnVsbCB8fCBvcHRpb25zLnBhcmVudFJvdXRlID09PSBwYXJlbnRSb3V0ZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgcGFyZW50Um91dGUgd2l0aCBjcmVhdGVSb3V0ZSBpbnNpZGUgYW5vdGhlciByb3V0ZSdzIGNoaWxkIGNhbGxiYWNrOyBpdCBpcyBpZ25vcmVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudFJvdXRlID0gb3B0aW9ucy5wYXJlbnRSb3V0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICB2YXIgcGF0aCA9IG9wdGlvbnMucGF0aCB8fCBuYW1lO1xuXG4gICAgICAgIGlmIChwYXRoICYmICEob3B0aW9ucy5pc0RlZmF1bHQgfHwgb3B0aW9ucy5pc05vdEZvdW5kKSkge1xuICAgICAgICAgIGlmIChQYXRoVXRpbHMuaXNBYnNvbHV0ZShwYXRoKSkge1xuICAgICAgICAgICAgaWYgKHBhcmVudFJvdXRlKSB7XG4gICAgICAgICAgICAgIGludmFyaWFudChwYXRoID09PSBwYXJlbnRSb3V0ZS5wYXRoIHx8IHBhcmVudFJvdXRlLnBhcmFtTmFtZXMubGVuZ3RoID09PSAwLCBcIllvdSBjYW5ub3QgbmVzdCBwYXRoIFxcXCIlc1xcXCIgaW5zaWRlIFxcXCIlc1xcXCI7IHRoZSBwYXJlbnQgcmVxdWlyZXMgVVJMIHBhcmFtZXRlcnNcIiwgcGF0aCwgcGFyZW50Um91dGUucGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnRSb3V0ZSkge1xuICAgICAgICAgICAgLy8gUmVsYXRpdmUgcGF0aHMgZXh0ZW5kIHRoZWlyIHBhcmVudC5cbiAgICAgICAgICAgIHBhdGggPSBQYXRoVXRpbHMuam9pbihwYXJlbnRSb3V0ZS5wYXRoLCBwYXRoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFwiL1wiICsgcGF0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aCA9IHBhcmVudFJvdXRlID8gcGFyZW50Um91dGUucGF0aCA6IFwiL1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNOb3RGb3VuZCAmJiAhL1xcKiQvLnRlc3QocGF0aCkpIHBhdGggKz0gXCIqXCI7IC8vIEF1dG8tYXBwZW5kICogdG8gdGhlIHBhdGggb2Ygbm90IGZvdW5kIHJvdXRlcy5cblxuICAgICAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUobmFtZSwgcGF0aCwgb3B0aW9ucy5pZ25vcmVTY3JvbGxCZWhhdmlvciwgb3B0aW9ucy5pc0RlZmF1bHQsIG9wdGlvbnMuaXNOb3RGb3VuZCwgb3B0aW9ucy5vbkVudGVyLCBvcHRpb25zLm9uTGVhdmUsIG9wdGlvbnMuaGFuZGxlcik7XG5cbiAgICAgICAgaWYgKHBhcmVudFJvdXRlKSB7XG4gICAgICAgICAgaWYgKHJvdXRlLmlzRGVmYXVsdCkge1xuICAgICAgICAgICAgaW52YXJpYW50KHBhcmVudFJvdXRlLmRlZmF1bHRSb3V0ZSA9PSBudWxsLCBcIiVzIG1heSBub3QgaGF2ZSBtb3JlIHRoYW4gb25lIGRlZmF1bHQgcm91dGVcIiwgcGFyZW50Um91dGUpO1xuXG4gICAgICAgICAgICBwYXJlbnRSb3V0ZS5kZWZhdWx0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLmlzTm90Rm91bmQpIHtcbiAgICAgICAgICAgIGludmFyaWFudChwYXJlbnRSb3V0ZS5ub3RGb3VuZFJvdXRlID09IG51bGwsIFwiJXMgbWF5IG5vdCBoYXZlIG1vcmUgdGhhbiBvbmUgbm90IGZvdW5kIHJvdXRlXCIsIHBhcmVudFJvdXRlKTtcblxuICAgICAgICAgICAgcGFyZW50Um91dGUubm90Rm91bmRSb3V0ZSA9IHJvdXRlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcmVudFJvdXRlLmFwcGVuZENoaWxkKHJvdXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFueSByb3V0ZXMgY3JlYXRlZCBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgLy8gdXNlIHRoaXMgcm91dGUgYXMgdGhlaXIgcGFyZW50LlxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB2YXIgY3VycmVudFJvdXRlID0gX2N1cnJlbnRSb3V0ZTtcbiAgICAgICAgICBfY3VycmVudFJvdXRlID0gcm91dGU7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbChyb3V0ZSwgcm91dGUpO1xuICAgICAgICAgIF9jdXJyZW50Um91dGUgPSBjdXJyZW50Um91dGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm91dGU7XG4gICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVEZWZhdWx0Um91dGU6IHtcblxuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgcm91dGUgdGhhdCBpcyByZW5kZXJlZCB3aGVuIGl0cyBwYXJlbnQgbWF0Y2hlc1xuICAgICAgICogdGhlIGN1cnJlbnQgVVJMLlxuICAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVEZWZhdWx0Um91dGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gUm91dGUuY3JlYXRlUm91dGUoYXNzaWduKHt9LCBvcHRpb25zLCB7IGlzRGVmYXVsdDogdHJ1ZSB9KSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVOb3RGb3VuZFJvdXRlOiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHJvdXRlIHRoYXQgaXMgcmVuZGVyZWQgd2hlbiBpdHMgcGFyZW50IG1hdGNoZXNcbiAgICAgICAqIHRoZSBjdXJyZW50IFVSTCBidXQgbm9uZSBvZiBpdHMgc2libGluZ3MgZG8uXG4gICAgICAgKi9cblxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZU5vdEZvdW5kUm91dGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gUm91dGUuY3JlYXRlUm91dGUoYXNzaWduKHt9LCBvcHRpb25zLCB7IGlzTm90Rm91bmQ6IHRydWUgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlUmVkaXJlY3Q6IHtcblxuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgcm91dGUgdGhhdCBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0cyB0aGUgdHJhbnNpdGlvblxuICAgICAgICogdG8gYW5vdGhlciByb3V0ZS4gSW4gYWRkaXRpb24gdG8gdGhlIG5vcm1hbCBvcHRpb25zIHRvIGNyZWF0ZVJvdXRlLCB0aGlzXG4gICAgICAgKiBmdW5jdGlvbiBhY2NlcHRzIHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAgICAgICAqXG4gICAgICAgKiAtIGZyb20gICAgICAgICBBbiBhbGlhcyBmb3IgdGhlIGBwYXRoYCBvcHRpb24uIERlZmF1bHRzIHRvICpcbiAgICAgICAqIC0gdG8gICAgICAgICAgIFRoZSBwYXRoL3JvdXRlL3JvdXRlIG5hbWUgdG8gcmVkaXJlY3QgdG9cbiAgICAgICAqIC0gcGFyYW1zICAgICAgIFRoZSBwYXJhbXMgdG8gdXNlIGluIHRoZSByZWRpcmVjdCBVUkwuIERlZmF1bHRzXG4gICAgICAgKiAgICAgICAgICAgICAgICB0byB1c2luZyB0aGUgY3VycmVudCBwYXJhbXNcbiAgICAgICAqIC0gcXVlcnkgICAgICAgIFRoZSBxdWVyeSB0byB1c2UgaW4gdGhlIHJlZGlyZWN0IFVSTC4gRGVmYXVsdHNcbiAgICAgICAqICAgICAgICAgICAgICAgIHRvIHVzaW5nIHRoZSBjdXJyZW50IHF1ZXJ5XG4gICAgICAgKi9cblxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVJlZGlyZWN0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIFJvdXRlLmNyZWF0ZVJvdXRlKGFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCB8fCBvcHRpb25zLmZyb20gfHwgXCIqXCIsXG4gICAgICAgICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcih0cmFuc2l0aW9uLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJlZGlyZWN0KG9wdGlvbnMudG8sIG9wdGlvbnMucGFyYW1zIHx8IHBhcmFtcywgb3B0aW9ucy5xdWVyeSB8fCBxdWVyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUm91dGU7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcInJlYWN0L2xpYi9pbnZhcmlhbnRcIik7XG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZShcInJlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudFwiKS5jYW5Vc2VET007XG52YXIgZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24gPSByZXF1aXJlKFwiLi9nZXRXaW5kb3dTY3JvbGxQb3NpdGlvblwiKTtcblxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlU2Nyb2xsKHN0YXRlLCBwcmV2U3RhdGUpIHtcbiAgaWYgKCFwcmV2U3RhdGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBEb24ndCB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIHdoZW4gb25seSB0aGUgcXVlcnkgaGFzIGNoYW5nZWQuXG4gIGlmIChzdGF0ZS5wYXRobmFtZSA9PT0gcHJldlN0YXRlLnBhdGhuYW1lKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9dmFyIHJvdXRlcyA9IHN0YXRlLnJvdXRlcztcbiAgdmFyIHByZXZSb3V0ZXMgPSBwcmV2U3RhdGUucm91dGVzO1xuXG4gIHZhciBzaGFyZWRBbmNlc3RvclJvdXRlcyA9IHJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgcmV0dXJuIHByZXZSb3V0ZXMuaW5kZXhPZihyb3V0ZSkgIT09IC0xO1xuICB9KTtcblxuICByZXR1cm4gIXNoYXJlZEFuY2VzdG9yUm91dGVzLnNvbWUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgcmV0dXJuIHJvdXRlLmlnbm9yZVNjcm9sbEJlaGF2aW9yO1xuICB9KTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgcm91dGVyIHdpdGggdGhlIGFiaWxpdHkgdG8gbWFuYWdlIHdpbmRvdyBzY3JvbGwgcG9zaXRpb25cbiAqIGFjY29yZGluZyB0byBpdHMgc2Nyb2xsIGJlaGF2aW9yLlxuICovXG52YXIgU2Nyb2xsSGlzdG9yeSA9IHtcblxuICBzdGF0aWNzOiB7XG5cbiAgICAvKipcbiAgICAgKiBSZWNvcmRzIGN1cmVudCBzY3JvbGwgcG9zaXRpb24gYXMgdGhlIGxhc3Qga25vd24gcG9zaXRpb24gZm9yIHRoZSBnaXZlbiBVUkwgcGF0aC5cbiAgICAgKi9cbiAgICByZWNvcmRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gcmVjb3JkU2Nyb2xsUG9zaXRpb24ocGF0aCkge1xuICAgICAgaWYgKCF0aGlzLnNjcm9sbEhpc3RvcnkpIHRoaXMuc2Nyb2xsSGlzdG9yeSA9IHt9O1xuXG4gICAgICB0aGlzLnNjcm9sbEhpc3RvcnlbcGF0aF0gPSBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbigpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IGtub3duIHNjcm9sbCBwb3NpdGlvbiBmb3IgdGhlIGdpdmVuIFVSTCBwYXRoLlxuICAgICAqL1xuICAgIGdldFNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbihwYXRoKSB7XG4gICAgICBpZiAoIXRoaXMuc2Nyb2xsSGlzdG9yeSkgdGhpcy5zY3JvbGxIaXN0b3J5ID0ge307XG5cbiAgICAgIHJldHVybiB0aGlzLnNjcm9sbEhpc3RvcnlbcGF0aF0gfHwgbnVsbDtcbiAgICB9XG5cbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpbnZhcmlhbnQodGhpcy5jb25zdHJ1Y3Rvci5nZXRTY3JvbGxCZWhhdmlvcigpID09IG51bGwgfHwgY2FuVXNlRE9NLCBcIkNhbm5vdCB1c2Ugc2Nyb2xsIGJlaGF2aW9yIHdpdGhvdXQgYSBET01cIik7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbCgpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgdGhpcy5fdXBkYXRlU2Nyb2xsKHByZXZTdGF0ZSk7XG4gIH0sXG5cbiAgX3VwZGF0ZVNjcm9sbDogZnVuY3Rpb24gX3VwZGF0ZVNjcm9sbChwcmV2U3RhdGUpIHtcbiAgICBpZiAoIXNob3VsZFVwZGF0ZVNjcm9sbCh0aGlzLnN0YXRlLCBwcmV2U3RhdGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfXZhciBzY3JvbGxCZWhhdmlvciA9IHRoaXMuY29uc3RydWN0b3IuZ2V0U2Nyb2xsQmVoYXZpb3IoKTtcblxuICAgIGlmIChzY3JvbGxCZWhhdmlvcikgc2Nyb2xsQmVoYXZpb3IudXBkYXRlU2Nyb2xsUG9zaXRpb24odGhpcy5jb25zdHJ1Y3Rvci5nZXRTY3JvbGxQb3NpdGlvbih0aGlzLnN0YXRlLnBhdGgpLCB0aGlzLnN0YXRlLmFjdGlvbik7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxIaXN0b3J5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoXCJyZWFjdC9saWIvd2FybmluZ1wiKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi9Qcm9wVHlwZXNcIik7XG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZWRNZXRob2Qocm91dGVyTWV0aG9kTmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB3YXJuaW5nKGZhbHNlLCBcIlJvdXRlci5TdGF0ZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRoaXMuY29udGV4dC5yb3V0ZXIuXCIgKyByb3V0ZXJNZXRob2ROYW1lICsgXCIoKSBpbnN0ZWFkXCIpO1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQSBtaXhpbiBmb3IgY29tcG9uZW50cyB0aGF0IG5lZWQgdG8ga25vdyB0aGUgcGF0aCwgcm91dGVzLCBVUkxcbiAqIHBhcmFtcyBhbmQgcXVlcnkgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgdmFyIEFib3V0TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBtaXhpbnM6IFsgUm91dGVyLlN0YXRlIF0sXG4gKiAgICAgcmVuZGVyKCkge1xuICogICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICogICBcbiAqICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCdhYm91dCcpKVxuICogICAgICAgICBjbGFzc05hbWUgKz0gJyBpcy1hY3RpdmUnO1xuICogICBcbiAqICAgICAgIHJldHVybiBSZWFjdC5ET00uYSh7IGNsYXNzTmFtZTogY2xhc3NOYW1lIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICogICAgIH1cbiAqICAgfSk7XG4gKi9cbnZhciBTdGF0ZSA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICByb3V0ZXI6IFByb3BUeXBlcy5yb3V0ZXIuaXNSZXF1aXJlZFxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoLlxuICAgKi9cbiAgZ2V0UGF0aDogZGVwcmVjYXRlZE1ldGhvZChcImdldEN1cnJlbnRQYXRoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlci5nZXRDdXJyZW50UGF0aCgpO1xuICB9KSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICBnZXRQYXRobmFtZTogZGVwcmVjYXRlZE1ldGhvZChcImdldEN1cnJlbnRQYXRobmFtZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIuZ2V0Q3VycmVudFBhdGhuYW1lKCk7XG4gIH0pLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUgVVJMIHBhcmFtcyB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICAgKi9cbiAgZ2V0UGFyYW1zOiBkZXByZWNhdGVkTWV0aG9kKFwiZ2V0Q3VycmVudFBhcmFtc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIuZ2V0Q3VycmVudFBhcmFtcygpO1xuICB9KSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIHF1ZXJ5IHBhcmFtcyB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICAgKi9cbiAgZ2V0UXVlcnk6IGRlcHJlY2F0ZWRNZXRob2QoXCJnZXRDdXJyZW50UXVlcnlcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLmdldEN1cnJlbnRRdWVyeSgpO1xuICB9KSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgcm91dGVzIHRoYXQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXG4gICAqL1xuICBnZXRSb3V0ZXM6IGRlcHJlY2F0ZWRNZXRob2QoXCJnZXRDdXJyZW50Um91dGVzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlci5nZXRDdXJyZW50Um91dGVzKCk7XG4gIH0pLFxuXG4gIC8qKlxuICAgKiBBIGhlbHBlciBtZXRob2QgdG8gZGV0ZXJtaW5lIGlmIGEgZ2l2ZW4gcm91dGUsIHBhcmFtcywgYW5kIHF1ZXJ5XG4gICAqIGFyZSBhY3RpdmUuXG4gICAqL1xuICBpc0FjdGl2ZTogZGVwcmVjYXRlZE1ldGhvZChcImlzQWN0aXZlXCIsIGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSlcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoganNoaW50IC1XMDU4ICovXG5cbnZhciBDYW5jZWxsYXRpb24gPSByZXF1aXJlKFwiLi9DYW5jZWxsYXRpb25cIik7XG52YXIgUmVkaXJlY3QgPSByZXF1aXJlKFwiLi9SZWRpcmVjdFwiKTtcblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYSB0cmFuc2l0aW9uIHRvIGEgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBUaGUgd2lsbFRyYW5zaXRpb25UbyBhbmQgd2lsbFRyYW5zaXRpb25Gcm9tIGhhbmRsZXJzIHJlY2VpdmVcbiAqIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgYXMgdGhlaXIgZmlyc3QgYXJndW1lbnQuXG4gKi9cbmZ1bmN0aW9uIFRyYW5zaXRpb24ocGF0aCwgcmV0cnkpIHtcbiAgdGhpcy5wYXRoID0gcGF0aDtcbiAgdGhpcy5hYm9ydFJlYXNvbiA9IG51bGw7XG4gIC8vIFRPRE86IENoYW5nZSB0aGlzIHRvIHJvdXRlci5yZXRyeVRyYW5zaXRpb24odHJhbnNpdGlvbilcbiAgdGhpcy5yZXRyeSA9IHJldHJ5LmJpbmQodGhpcyk7XG59XG5cblRyYW5zaXRpb24ucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICBpZiAodGhpcy5hYm9ydFJlYXNvbiA9PSBudWxsKSB0aGlzLmFib3J0UmVhc29uID0gcmVhc29uIHx8IFwiQUJPUlRcIjtcbn07XG5cblRyYW5zaXRpb24ucHJvdG90eXBlLnJlZGlyZWN0ID0gZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gIHRoaXMuYWJvcnQobmV3IFJlZGlyZWN0KHRvLCBwYXJhbXMsIHF1ZXJ5KSk7XG59O1xuXG5UcmFuc2l0aW9uLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWJvcnQobmV3IENhbmNlbGxhdGlvbigpKTtcbn07XG5cblRyYW5zaXRpb24uZnJvbSA9IGZ1bmN0aW9uICh0cmFuc2l0aW9uLCByb3V0ZXMsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gIHJvdXRlcy5yZWR1Y2UoZnVuY3Rpb24gKGNhbGxiYWNrLCByb3V0ZSwgaW5kZXgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgfHwgdHJhbnNpdGlvbi5hYm9ydFJlYXNvbikge1xuICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHJvdXRlLm9uTGVhdmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByb3V0ZS5vbkxlYXZlKHRyYW5zaXRpb24sIGNvbXBvbmVudHNbaW5kZXhdLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBjYWxsYmFjayBpbiB0aGUgYXJndW1lbnQgbGlzdCwgY2FsbCBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgIGlmIChyb3V0ZS5vbkxlYXZlLmxlbmd0aCA8IDMpIGNhbGxiYWNrKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBjYWxsYmFjaykoKTtcbn07XG5cblRyYW5zaXRpb24udG8gPSBmdW5jdGlvbiAodHJhbnNpdGlvbiwgcm91dGVzLCBwYXJhbXMsIHF1ZXJ5LCBjYWxsYmFjaykge1xuICByb3V0ZXMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNhbGxiYWNrLCByb3V0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciB8fCB0cmFuc2l0aW9uLmFib3J0UmVhc29uKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH0gZWxzZSBpZiAocm91dGUub25FbnRlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJvdXRlLm9uRW50ZXIodHJhbnNpdGlvbiwgcGFyYW1zLCBxdWVyeSwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY2FsbGJhY2sgaW4gdGhlIGFyZ3VtZW50IGxpc3QsIGNhbGwgaXQgYXV0b21hdGljYWxseS5cbiAgICAgICAgICBpZiAocm91dGUub25FbnRlci5sZW5ndGggPCA0KSBjYWxsYmFjaygpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgY2FsbGJhY2spKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQWN0aW9ucyB0aGF0IG1vZGlmeSB0aGUgVVJMLlxuICovXG52YXIgTG9jYXRpb25BY3Rpb25zID0ge1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgYSBuZXcgbG9jYXRpb24gaXMgYmVpbmcgcHVzaGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgUFVTSDogXCJwdXNoXCIsXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGUgY3VycmVudCBsb2NhdGlvbiBzaG91bGQgYmUgcmVwbGFjZWQuXG4gICAqL1xuICBSRVBMQUNFOiBcInJlcGxhY2VcIixcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSBtb3N0IHJlY2VudCBlbnRyeSBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgUE9QOiBcInBvcFwiXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTG9jYXRpb25BY3Rpb25zOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zXCIpO1xuXG4vKipcbiAqIEEgc2Nyb2xsIGJlaGF2aW9yIHRoYXQgYXR0ZW1wdHMgdG8gaW1pdGF0ZSB0aGUgZGVmYXVsdCBiZWhhdmlvclxuICogb2YgbW9kZXJuIGJyb3dzZXJzLlxuICovXG52YXIgSW1pdGF0ZUJyb3dzZXJCZWhhdmlvciA9IHtcblxuICB1cGRhdGVTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsUG9zaXRpb24ocG9zaXRpb24sIGFjdGlvblR5cGUpIHtcbiAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgTG9jYXRpb25BY3Rpb25zLlBVU0g6XG4gICAgICBjYXNlIExvY2F0aW9uQWN0aW9ucy5SRVBMQUNFOlxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2NhdGlvbkFjdGlvbnMuUE9QOlxuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltaXRhdGVCcm93c2VyQmVoYXZpb3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQSBzY3JvbGwgYmVoYXZpb3IgdGhhdCBhbHdheXMgc2Nyb2xscyB0byB0aGUgdG9wIG9mIHRoZSBwYWdlXG4gKiBhZnRlciBhIHRyYW5zaXRpb24uXG4gKi9cbnZhciBTY3JvbGxUb1RvcEJlaGF2aW9yID0ge1xuXG4gIHVwZGF0ZVNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbiB1cGRhdGVTY3JvbGxQb3NpdGlvbigpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxUb1RvcEJlaGF2aW9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGlzIG5lY2Vzc2FyeSB0byBnZXQgYXJvdW5kIGEgY29udGV4dCB3YXJuaW5nXG4gKiBwcmVzZW50IGluIFJlYWN0IDAuMTMuMC4gSXQgc292bGVzIHRoaXMgYnkgcHJvdmlkaW5nIGEgc2VwYXJhdGlvblxuICogYmV0d2VlbiB0aGUgXCJvd25lclwiIGFuZCBcInBhcmVudFwiIGNvbnRleHRzLlxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIENvbnRleHRXcmFwcGVyID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIGZ1bmN0aW9uIENvbnRleHRXcmFwcGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb250ZXh0V3JhcHBlcik7XG5cbiAgICBpZiAoX1JlYWN0JENvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgX2luaGVyaXRzKENvbnRleHRXcmFwcGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBfY3JlYXRlQ2xhc3MoQ29udGV4dFdyYXBwZXIsIHtcbiAgICByZW5kZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIENvbnRleHRXcmFwcGVyO1xufSkoUmVhY3QuQ29tcG9uZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0V3JhcHBlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi4vUHJvcFR5cGVzXCIpO1xudmFyIFJvdXRlSGFuZGxlciA9IHJlcXVpcmUoXCIuL1JvdXRlSGFuZGxlclwiKTtcbnZhciBSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpO1xuXG4vKipcbiAqIEEgPERlZmF1bHRSb3V0ZT4gY29tcG9uZW50IGlzIGEgc3BlY2lhbCBraW5kIG9mIDxSb3V0ZT4gdGhhdFxuICogcmVuZGVycyB3aGVuIGl0cyBwYXJlbnQgbWF0Y2hlcyBidXQgbm9uZSBvZiBpdHMgc2libGluZ3MgZG8uXG4gKiBPbmx5IG9uZSBzdWNoIHJvdXRlIG1heSBiZSB1c2VkIGF0IGFueSBnaXZlbiBsZXZlbCBpbiB0aGVcbiAqIHJvdXRlIGhpZXJhcmNoeS5cbiAqL1xuXG52YXIgRGVmYXVsdFJvdXRlID0gKGZ1bmN0aW9uIChfUm91dGUpIHtcbiAgZnVuY3Rpb24gRGVmYXVsdFJvdXRlKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEZWZhdWx0Um91dGUpO1xuXG4gICAgaWYgKF9Sb3V0ZSAhPSBudWxsKSB7XG4gICAgICBfUm91dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBfaW5oZXJpdHMoRGVmYXVsdFJvdXRlLCBfUm91dGUpO1xuXG4gIHJldHVybiBEZWZhdWx0Um91dGU7XG59KShSb3V0ZSk7XG5cbi8vIFRPRE86IEluY2x1ZGUgdGhlc2UgaW4gdGhlIGFib3ZlIGNsYXNzIGRlZmluaXRpb25cbi8vIG9uY2Ugd2UgY2FuIHVzZSBFUzcgcHJvcGVydHkgaW5pdGlhbGl6ZXJzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy82MTlcblxuRGVmYXVsdFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGF0aDogUHJvcFR5cGVzLmZhbHN5LFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmZhbHN5LFxuICBoYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5EZWZhdWx0Um91dGUuZGVmYXVsdFByb3BzID0ge1xuICBoYW5kbGVyOiBSb3V0ZUhhbmRsZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGVmYXVsdFJvdXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgYXNzaWduID0gcmVxdWlyZShcInJlYWN0L2xpYi9PYmplY3QuYXNzaWduXCIpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoXCIuLi9Qcm9wVHlwZXNcIik7XG5cbmZ1bmN0aW9uIGlzTGVmdENsaWNrRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAhIShldmVudC5tZXRhS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KTtcbn1cblxuLyoqXG4gKiA8TGluaz4gY29tcG9uZW50cyBhcmUgdXNlZCB0byBjcmVhdGUgYW4gPGE+IGVsZW1lbnQgdGhhdCBsaW5rcyB0byBhIHJvdXRlLlxuICogV2hlbiB0aGF0IHJvdXRlIGlzIGFjdGl2ZSwgdGhlIGxpbmsgZ2V0cyBhbiBcImFjdGl2ZVwiIGNsYXNzIG5hbWUgKG9yIHRoZVxuICogdmFsdWUgb2YgaXRzIGBhY3RpdmVDbGFzc05hbWVgIHByb3ApLlxuICpcbiAqIEZvciBleGFtcGxlLCBhc3N1bWluZyB5b3UgaGF2ZSB0aGUgZm9sbG93aW5nIHJvdXRlOlxuICpcbiAqICAgPFJvdXRlIG5hbWU9XCJzaG93UG9zdFwiIHBhdGg9XCIvcG9zdHMvOnBvc3RJRFwiIGhhbmRsZXI9e1Bvc3R9Lz5cbiAqXG4gKiBZb3UgY291bGQgdXNlIHRoZSBmb2xsb3dpbmcgY29tcG9uZW50IHRvIGxpbmsgdG8gdGhhdCByb3V0ZTpcbiAqXG4gKiAgIDxMaW5rIHRvPVwic2hvd1Bvc3RcIiBwYXJhbXM9e3sgcG9zdElEOiBcIjEyM1wiIH19IC8+XG4gKlxuICogSW4gYWRkaXRpb24gdG8gcGFyYW1zLCBsaW5rcyBtYXkgcGFzcyBhbG9uZyBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyc1xuICogdXNpbmcgdGhlIGBxdWVyeWAgcHJvcC5cbiAqXG4gKiAgIDxMaW5rIHRvPVwic2hvd1Bvc3RcIiBwYXJhbXM9e3sgcG9zdElEOiBcIjEyM1wiIH19IHF1ZXJ5PXt7IHNob3c6dHJ1ZSB9fS8+XG4gKi9cblxudmFyIExpbmsgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgZnVuY3Rpb24gTGluaygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGluayk7XG5cbiAgICBpZiAoX1JlYWN0JENvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgX2luaGVyaXRzKExpbmssIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIF9jcmVhdGVDbGFzcyhMaW5rLCB7XG4gICAgaGFuZGxlQ2xpY2s6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGljayhldmVudCkge1xuICAgICAgICB2YXIgYWxsb3dUcmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNsaWNrUmVzdWx0O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIGNsaWNrUmVzdWx0ID0gdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcblxuICAgICAgICBpZiAoaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB8fCAhaXNMZWZ0Q2xpY2tFdmVudChldmVudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1pZiAoY2xpY2tSZXN1bHQgPT09IGZhbHNlIHx8IGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIGFsbG93VHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGFsbG93VHJhbnNpdGlvbikgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8odGhpcy5wcm9wcy50bywgdGhpcy5wcm9wcy5wYXJhbXMsIHRoaXMucHJvcHMucXVlcnkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SHJlZjoge1xuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBcImhyZWZcIiBhdHRyaWJ1dGUgdG8gdXNlIG9uIHRoZSBET00gZWxlbWVudC5cbiAgICAgICAqL1xuXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SHJlZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIubWFrZUhyZWYodGhpcy5wcm9wcy50bywgdGhpcy5wcm9wcy5wYXJhbXMsIHRoaXMucHJvcHMucXVlcnkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0Q2xhc3NOYW1lOiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIFwiY2xhc3NcIiBhdHRyaWJ1dGUgdG8gdXNlIG9uIHRoZSBET00gZWxlbWVudCwgd2hpY2ggY29udGFpbnNcbiAgICAgICAqIHRoZSB2YWx1ZSBvZiB0aGUgYWN0aXZlQ2xhc3NOYW1lIHByb3BlcnR5IHdoZW4gdGhpcyA8TGluaz4gaXMgYWN0aXZlLlxuICAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcblxuICAgICAgICBpZiAodGhpcy5nZXRBY3RpdmVTdGF0ZSgpKSBjbGFzc05hbWUgKz0gXCIgXCIgKyB0aGlzLnByb3BzLmFjdGl2ZUNsYXNzTmFtZTtcblxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QWN0aXZlU3RhdGU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBY3RpdmVTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIuaXNBY3RpdmUodGhpcy5wcm9wcy50bywgdGhpcy5wcm9wcy5wYXJhbXMsIHRoaXMucHJvcHMucXVlcnkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcHJvcHMgPSBhc3NpZ24oe30sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgICBocmVmOiB0aGlzLmdldEhyZWYoKSxcbiAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3NOYW1lKCksXG4gICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwcm9wcy5hY3RpdmVTdHlsZSAmJiB0aGlzLmdldEFjdGl2ZVN0YXRlKCkpIHByb3BzLnN0eWxlID0gcHJvcHMuYWN0aXZlU3R5bGU7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5hKHByb3BzLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBMaW5rO1xufSkoUmVhY3QuQ29tcG9uZW50KTtcblxuLy8gVE9ETzogSW5jbHVkZSB0aGVzZSBpbiB0aGUgYWJvdmUgY2xhc3MgZGVmaW5pdGlvblxuLy8gb25jZSB3ZSBjYW4gdXNlIEVTNyBwcm9wZXJ0eSBpbml0aWFsaXplcnMuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzYxOVxuXG5MaW5rLmNvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMucm91dGVyLmlzUmVxdWlyZWRcbn07XG5cbkxpbmsucHJvcFR5cGVzID0ge1xuICBhY3RpdmVDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdG86IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5yb3V0ZV0pLmlzUmVxdWlyZWQsXG4gIHBhcmFtczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcXVlcnk6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuTGluay5kZWZhdWx0UHJvcHMgPSB7XG4gIGFjdGl2ZUNsYXNzTmFtZTogXCJhY3RpdmVcIixcbiAgY2xhc3NOYW1lOiBcIlwiXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbms7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZShcIi4uL1Byb3BUeXBlc1wiKTtcbnZhciBSb3V0ZUhhbmRsZXIgPSByZXF1aXJlKFwiLi9Sb3V0ZUhhbmRsZXJcIik7XG52YXIgUm91dGUgPSByZXF1aXJlKFwiLi9Sb3V0ZVwiKTtcblxuLyoqXG4gKiBBIDxOb3RGb3VuZFJvdXRlPiBpcyBhIHNwZWNpYWwga2luZCBvZiA8Um91dGU+IHRoYXRcbiAqIHJlbmRlcnMgd2hlbiB0aGUgYmVnaW5uaW5nIG9mIGl0cyBwYXJlbnQncyBwYXRoIG1hdGNoZXNcbiAqIGJ1dCBub25lIG9mIGl0cyBzaWJsaW5ncyBkbywgaW5jbHVkaW5nIGFueSA8RGVmYXVsdFJvdXRlPi5cbiAqIE9ubHkgb25lIHN1Y2ggcm91dGUgbWF5IGJlIHVzZWQgYXQgYW55IGdpdmVuIGxldmVsIGluIHRoZVxuICogcm91dGUgaGllcmFyY2h5LlxuICovXG5cbnZhciBOb3RGb3VuZFJvdXRlID0gKGZ1bmN0aW9uIChfUm91dGUpIHtcbiAgZnVuY3Rpb24gTm90Rm91bmRSb3V0ZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm90Rm91bmRSb3V0ZSk7XG5cbiAgICBpZiAoX1JvdXRlICE9IG51bGwpIHtcbiAgICAgIF9Sb3V0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIF9pbmhlcml0cyhOb3RGb3VuZFJvdXRlLCBfUm91dGUpO1xuXG4gIHJldHVybiBOb3RGb3VuZFJvdXRlO1xufSkoUm91dGUpO1xuXG4vLyBUT0RPOiBJbmNsdWRlIHRoZXNlIGluIHRoZSBhYm92ZSBjbGFzcyBkZWZpbml0aW9uXG4vLyBvbmNlIHdlIGNhbiB1c2UgRVM3IHByb3BlcnR5IGluaXRpYWxpemVycy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvNjE5XG5cbk5vdEZvdW5kUm91dGUucHJvcFR5cGVzID0ge1xuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwYXRoOiBQcm9wVHlwZXMuZmFsc3ksXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuZmFsc3ksXG4gIGhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbk5vdEZvdW5kUm91dGUuZGVmYXVsdFByb3BzID0ge1xuICBoYW5kbGVyOiBSb3V0ZUhhbmRsZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTm90Rm91bmRSb3V0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi4vUHJvcFR5cGVzXCIpO1xudmFyIFJvdXRlID0gcmVxdWlyZShcIi4vUm91dGVcIik7XG5cbi8qKlxuICogQSA8UmVkaXJlY3Q+IGNvbXBvbmVudCBpcyBhIHNwZWNpYWwga2luZCBvZiA8Um91dGU+IHRoYXQgYWx3YXlzXG4gKiByZWRpcmVjdHMgdG8gYW5vdGhlciByb3V0ZSB3aGVuIGl0IG1hdGNoZXMuXG4gKi9cblxudmFyIFJlZGlyZWN0ID0gKGZ1bmN0aW9uIChfUm91dGUpIHtcbiAgZnVuY3Rpb24gUmVkaXJlY3QoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlZGlyZWN0KTtcblxuICAgIGlmIChfUm91dGUgIT0gbnVsbCkge1xuICAgICAgX1JvdXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgX2luaGVyaXRzKFJlZGlyZWN0LCBfUm91dGUpO1xuXG4gIHJldHVybiBSZWRpcmVjdDtcbn0pKFJvdXRlKTtcblxuLy8gVE9ETzogSW5jbHVkZSB0aGVzZSBpbiB0aGUgYWJvdmUgY2xhc3MgZGVmaW5pdGlvblxuLy8gb25jZSB3ZSBjYW4gdXNlIEVTNyBwcm9wZXJ0eSBpbml0aWFsaXplcnMuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzYxOVxuXG5SZWRpcmVjdC5wcm9wVHlwZXMgPSB7XG4gIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZyb206IFByb3BUeXBlcy5zdHJpbmcsIC8vIEFsaWFzIGZvciBwYXRoLlxuICB0bzogUHJvcFR5cGVzLnN0cmluZyxcbiAgaGFuZGxlcjogUHJvcFR5cGVzLmZhbHN5XG59O1xuXG4vLyBSZWRpcmVjdHMgc2hvdWxkIG5vdCBoYXZlIGEgZGVmYXVsdCBoYW5kbGVyXG5SZWRpcmVjdC5kZWZhdWx0UHJvcHMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWRpcmVjdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoXCIuLi9Qcm9wVHlwZXNcIik7XG52YXIgUm91dGVIYW5kbGVyID0gcmVxdWlyZShcIi4vUm91dGVIYW5kbGVyXCIpO1xuXG4vKipcbiAqIDxSb3V0ZT4gY29tcG9uZW50cyBzcGVjaWZ5IGNvbXBvbmVudHMgdGhhdCBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2Ugd2hlbiB0aGVcbiAqIFVSTCBtYXRjaGVzIGEgZ2l2ZW4gcGF0dGVybi5cbiAqXG4gKiBSb3V0ZXMgYXJlIGFycmFuZ2VkIGluIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlLiBXaGVuIGEgbmV3IFVSTCBpcyByZXF1ZXN0ZWQsXG4gKiB0aGUgdHJlZSBpcyBzZWFyY2hlZCBkZXB0aC1maXJzdCB0byBmaW5kIGEgcm91dGUgd2hvc2UgcGF0aCBtYXRjaGVzIHRoZSBVUkwuXG4gKiBXaGVuIG9uZSBpcyBmb3VuZCwgYWxsIHJvdXRlcyBpbiB0aGUgdHJlZSB0aGF0IGxlYWQgdG8gaXQgYXJlIGNvbnNpZGVyZWRcbiAqIFwiYWN0aXZlXCIgYW5kIHRoZWlyIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIGludG8gdGhlIERPTSwgbmVzdGVkIGluIHRoZSBzYW1lXG4gKiBvcmRlciBhcyB0aGV5IGFyZSBpbiB0aGUgdHJlZS5cbiAqXG4gKiBUaGUgcHJlZmVycmVkIHdheSB0byBjb25maWd1cmUgYSByb3V0ZXIgaXMgdXNpbmcgSlNYLiBUaGUgWE1MLWxpa2Ugc3ludGF4IGlzXG4gKiBhIGdyZWF0IHdheSB0byB2aXN1YWxpemUgaG93IHJvdXRlcyBhcmUgbGFpZCBvdXQgaW4gYW4gYXBwbGljYXRpb24uXG4gKlxuICogICB2YXIgcm91dGVzID0gW1xuICogICAgIDxSb3V0ZSBoYW5kbGVyPXtBcHB9PlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJsb2dpblwiIGhhbmRsZXI9e0xvZ2lufS8+XG4gKiAgICAgICA8Um91dGUgbmFtZT1cImxvZ291dFwiIGhhbmRsZXI9e0xvZ291dH0vPlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJhYm91dFwiIGhhbmRsZXI9e0Fib3V0fS8+XG4gKiAgICAgPC9Sb3V0ZT5cbiAqICAgXTtcbiAqICAgXG4gKiAgIFJvdXRlci5ydW4ocm91dGVzLCBmdW5jdGlvbiAoSGFuZGxlcikge1xuICogICAgIFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5ib2R5KTtcbiAqICAgfSk7XG4gKlxuICogSGFuZGxlcnMgZm9yIFJvdXRlIGNvbXBvbmVudHMgdGhhdCBjb250YWluIGNoaWxkcmVuIGNhbiByZW5kZXIgdGhlaXIgYWN0aXZlXG4gKiBjaGlsZCByb3V0ZSB1c2luZyBhIDxSb3V0ZUhhbmRsZXI+IGVsZW1lbnQuXG4gKlxuICogICB2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICogICAgICAgcmV0dXJuIChcbiAqICAgICAgICAgPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uXCI+XG4gKiAgICAgICAgICAgPFJvdXRlSGFuZGxlci8+XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIElmIG5vIGhhbmRsZXIgaXMgcHJvdmlkZWQgZm9yIHRoZSByb3V0ZSwgaXQgd2lsbCByZW5kZXIgYSBtYXRjaGVkIGNoaWxkIHJvdXRlLlxuICovXG5cbnZhciBSb3V0ZSA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBmdW5jdGlvbiBSb3V0ZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGUpO1xuXG4gICAgaWYgKF9SZWFjdCRDb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIF9pbmhlcml0cyhSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgX2NyZWF0ZUNsYXNzKFJvdXRlLCB7XG4gICAgcmVuZGVyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICBpbnZhcmlhbnQoZmFsc2UsIFwiJXMgZWxlbWVudHMgYXJlIGZvciByb3V0ZXIgY29uZmlndXJhdGlvbiBvbmx5IGFuZCBzaG91bGQgbm90IGJlIHJlbmRlcmVkXCIsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUm91dGU7XG59KShSZWFjdC5Db21wb25lbnQpO1xuXG4vLyBUT0RPOiBJbmNsdWRlIHRoZXNlIGluIHRoZSBhYm92ZSBjbGFzcyBkZWZpbml0aW9uXG4vLyBvbmNlIHdlIGNhbiB1c2UgRVM3IHByb3BlcnR5IGluaXRpYWxpemVycy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvNjE5XG5cblJvdXRlLnByb3BUeXBlcyA9IHtcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGF0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgaGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGlnbm9yZVNjcm9sbEJlaGF2aW9yOiBQcm9wVHlwZXMuYm9vbFxufTtcblxuUm91dGUuZGVmYXVsdFByb3BzID0ge1xuICBoYW5kbGVyOiBSb3V0ZUhhbmRsZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIga2V5IGluIHByb3BzKSB7IHZhciBwcm9wID0gcHJvcHNba2V5XTsgcHJvcC5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7IH0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBDb250ZXh0V3JhcHBlciA9IHJlcXVpcmUoXCIuL0NvbnRleHRXcmFwcGVyXCIpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCJyZWFjdC9saWIvT2JqZWN0LmFzc2lnblwiKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi4vUHJvcFR5cGVzXCIpO1xuXG52YXIgUkVGX05BTUUgPSBcIl9fcm91dGVIYW5kbGVyX19cIjtcblxuLyoqXG4gKiBBIDxSb3V0ZUhhbmRsZXI+IGNvbXBvbmVudCByZW5kZXJzIHRoZSBhY3RpdmUgY2hpbGQgcm91dGUgaGFuZGxlclxuICogd2hlbiByb3V0ZXMgYXJlIG5lc3RlZC5cbiAqL1xuXG52YXIgUm91dGVIYW5kbGVyID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIGZ1bmN0aW9uIFJvdXRlSGFuZGxlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGVIYW5kbGVyKTtcblxuICAgIGlmIChfUmVhY3QkQ29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBfaW5oZXJpdHMoUm91dGVIYW5kbGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBfY3JlYXRlQ2xhc3MoUm91dGVIYW5kbGVyLCB7XG4gICAgZ2V0Q2hpbGRDb250ZXh0OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJvdXRlRGVwdGg6IHRoaXMuY29udGV4dC5yb3V0ZURlcHRoICsgMVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUm91dGVDb21wb25lbnQodGhpcy5yZWZzW1JFRl9OQU1FXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRVcGRhdGU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJvdXRlQ29tcG9uZW50KHRoaXMucmVmc1tSRUZfTkFNRV0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUm91dGVDb21wb25lbnQobnVsbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBfdXBkYXRlUm91dGVDb21wb25lbnQ6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlUm91dGVDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuc2V0Um91dGVDb21wb25lbnRBdERlcHRoKHRoaXMuZ2V0Um91dGVEZXB0aCgpLCBjb21wb25lbnQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0Um91dGVEZXB0aDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJvdXRlRGVwdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVEZXB0aDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZUNoaWxkUm91dGVIYW5kbGVyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQ2hpbGRSb3V0ZUhhbmRsZXIocHJvcHMpIHtcbiAgICAgICAgdmFyIHJvdXRlID0gdGhpcy5jb250ZXh0LnJvdXRlci5nZXRSb3V0ZUF0RGVwdGgodGhpcy5nZXRSb3V0ZURlcHRoKCkpO1xuICAgICAgICByZXR1cm4gcm91dGUgPyBSZWFjdC5jcmVhdGVFbGVtZW50KHJvdXRlLmhhbmRsZXIsIGFzc2lnbih7fSwgcHJvcHMgfHwgdGhpcy5wcm9wcywgeyByZWY6IFJFRl9OQU1FIH0pKSA6IG51bGw7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5jcmVhdGVDaGlsZFJvdXRlSGFuZGxlcigpO1xuICAgICAgICAvLyA8c2NyaXB0Lz4gZm9yIHRoaW5ncyBsaWtlIDxDU1NUcmFuc2l0aW9uR3JvdXAvPiB0aGF0IGRvbid0IGxpa2UgbnVsbFxuICAgICAgICByZXR1cm4gaGFuZGxlciA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgQ29udGV4dFdyYXBwZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBoYW5kbGVyXG4gICAgICAgICkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJvdXRlSGFuZGxlcjtcbn0pKFJlYWN0LkNvbXBvbmVudCk7XG5cbi8vIFRPRE86IEluY2x1ZGUgdGhlc2UgaW4gdGhlIGFib3ZlIGNsYXNzIGRlZmluaXRpb25cbi8vIG9uY2Ugd2UgY2FuIHVzZSBFUzcgcHJvcGVydHkgaW5pdGlhbGl6ZXJzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy82MTlcblxuUm91dGVIYW5kbGVyLmNvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVEZXB0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICByb3V0ZXI6IFByb3BUeXBlcy5yb3V0ZXIuaXNSZXF1aXJlZFxufTtcblxuUm91dGVIYW5kbGVyLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICByb3V0ZURlcHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVIYW5kbGVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBqc2hpbnQgLVcwNTggKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZShcInJlYWN0L2xpYi93YXJuaW5nXCIpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoXCJyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnRcIikuY2FuVXNlRE9NO1xudmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoXCIuL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zXCIpO1xudmFyIEltaXRhdGVCcm93c2VyQmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvcnMvSW1pdGF0ZUJyb3dzZXJCZWhhdmlvclwiKTtcbnZhciBIYXNoTG9jYXRpb24gPSByZXF1aXJlKFwiLi9sb2NhdGlvbnMvSGFzaExvY2F0aW9uXCIpO1xudmFyIEhpc3RvcnlMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9IaXN0b3J5TG9jYXRpb25cIik7XG52YXIgUmVmcmVzaExvY2F0aW9uID0gcmVxdWlyZShcIi4vbG9jYXRpb25zL1JlZnJlc2hMb2NhdGlvblwiKTtcbnZhciBTdGF0aWNMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9TdGF0aWNMb2NhdGlvblwiKTtcbnZhciBTY3JvbGxIaXN0b3J5ID0gcmVxdWlyZShcIi4vU2Nyb2xsSGlzdG9yeVwiKTtcbnZhciBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoXCIuL2NyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuXCIpO1xudmFyIGlzUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoXCIuL2lzUmVhY3RDaGlsZHJlblwiKTtcbnZhciBUcmFuc2l0aW9uID0gcmVxdWlyZShcIi4vVHJhbnNpdGlvblwiKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi9Qcm9wVHlwZXNcIik7XG52YXIgUmVkaXJlY3QgPSByZXF1aXJlKFwiLi9SZWRpcmVjdFwiKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZShcIi4vSGlzdG9yeVwiKTtcbnZhciBDYW5jZWxsYXRpb24gPSByZXF1aXJlKFwiLi9DYW5jZWxsYXRpb25cIik7XG52YXIgTWF0Y2ggPSByZXF1aXJlKFwiLi9NYXRjaFwiKTtcbnZhciBSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpO1xudmFyIHN1cHBvcnRzSGlzdG9yeSA9IHJlcXVpcmUoXCIuL3N1cHBvcnRzSGlzdG9yeVwiKTtcbnZhciBQYXRoVXRpbHMgPSByZXF1aXJlKFwiLi9QYXRoVXRpbHNcIik7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgbG9jYXRpb24gZm9yIG5ldyByb3V0ZXJzLlxuICovXG52YXIgREVGQVVMVF9MT0NBVElPTiA9IGNhblVzZURPTSA/IEhhc2hMb2NhdGlvbiA6IFwiL1wiO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHNjcm9sbCBiZWhhdmlvciBmb3IgbmV3IHJvdXRlcnMuXG4gKi9cbnZhciBERUZBVUxUX1NDUk9MTF9CRUhBVklPUiA9IGNhblVzZURPTSA/IEltaXRhdGVCcm93c2VyQmVoYXZpb3IgOiBudWxsO1xuXG5mdW5jdGlvbiBoYXNQcm9wZXJ0aWVzKG9iamVjdCwgcHJvcGVydGllcykge1xuICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiBvYmplY3RbcHJvcGVydHlOYW1lXSAhPT0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGhhc01hdGNoKHJvdXRlcywgcm91dGUsIHByZXZQYXJhbXMsIG5leHRQYXJhbXMsIHByZXZRdWVyeSwgbmV4dFF1ZXJ5KSB7XG4gIHJldHVybiByb3V0ZXMuc29tZShmdW5jdGlvbiAocikge1xuICAgIGlmIChyICE9PSByb3V0ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHBhcmFtTmFtZXMgPSByb3V0ZS5wYXJhbU5hbWVzO1xuICAgIHZhciBwYXJhbU5hbWU7XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBhbGwgcGFyYW1zIHRoZSByb3V0ZSBjYXJlcyBhYm91dCBkaWQgbm90IGNoYW5nZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFyYW1OYW1lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgcGFyYW1OYW1lID0gcGFyYW1OYW1lc1tpXTtcblxuICAgICAgaWYgKG5leHRQYXJhbXNbcGFyYW1OYW1lXSAhPT0gcHJldlBhcmFtc1twYXJhbU5hbWVdKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoZSBxdWVyeSBoYXNuJ3QgY2hhbmdlZC5cbiAgICByZXR1cm4gaGFzUHJvcGVydGllcyhwcmV2UXVlcnksIG5leHRRdWVyeSkgJiYgaGFzUHJvcGVydGllcyhuZXh0UXVlcnksIHByZXZRdWVyeSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRSb3V0ZXNUb05hbWVkUm91dGVzKHJvdXRlcywgbmFtZWRSb3V0ZXMpIHtcbiAgdmFyIHJvdXRlO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcm91dGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcm91dGUgPSByb3V0ZXNbaV07XG5cbiAgICBpZiAocm91dGUubmFtZSkge1xuICAgICAgaW52YXJpYW50KG5hbWVkUm91dGVzW3JvdXRlLm5hbWVdID09IG51bGwsIFwiWW91IG1heSBub3QgaGF2ZSBtb3JlIHRoYW4gb25lIHJvdXRlIG5hbWVkIFxcXCIlc1xcXCJcIiwgcm91dGUubmFtZSk7XG5cbiAgICAgIG5hbWVkUm91dGVzW3JvdXRlLm5hbWVdID0gcm91dGU7XG4gICAgfVxuXG4gICAgaWYgKHJvdXRlLmNoaWxkUm91dGVzKSBhZGRSb3V0ZXNUb05hbWVkUm91dGVzKHJvdXRlLmNoaWxkUm91dGVzLCBuYW1lZFJvdXRlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm91dGVJc0FjdGl2ZShhY3RpdmVSb3V0ZXMsIHJvdXRlTmFtZSkge1xuICByZXR1cm4gYWN0aXZlUm91dGVzLnNvbWUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgcmV0dXJuIHJvdXRlLm5hbWUgPT09IHJvdXRlTmFtZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcmFtc0FyZUFjdGl2ZShhY3RpdmVQYXJhbXMsIHBhcmFtcykge1xuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwYXJhbXMpIGlmIChTdHJpbmcoYWN0aXZlUGFyYW1zW3Byb3BlcnR5XSkgIT09IFN0cmluZyhwYXJhbXNbcHJvcGVydHldKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfXJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBxdWVyeUlzQWN0aXZlKGFjdGl2ZVF1ZXJ5LCBxdWVyeSkge1xuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBxdWVyeSkgaWYgKFN0cmluZyhhY3RpdmVRdWVyeVtwcm9wZXJ0eV0pICE9PSBTdHJpbmcocXVlcnlbcHJvcGVydHldKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfXJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgcm91dGVyIHVzaW5nIHRoZSBnaXZlbiBvcHRpb25zLiBBIHJvdXRlclxuICogaXMgYSBSZWFjdENvbXBvbmVudCBjbGFzcyB0aGF0IGtub3dzIGhvdyB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZVxuICogVVJMIGFuZCBrZWVwIHRoZSBjb250ZW50cyBvZiB0aGUgcGFnZSBpbiBzeW5jLlxuICpcbiAqIE9wdGlvbnMgbWF5IGJlIGFueSBvZiB0aGUgZm9sbG93aW5nOlxuICpcbiAqIC0gcm91dGVzICAgICAgICAgICAocmVxdWlyZWQpIFRoZSByb3V0ZSBjb25maWdcbiAqIC0gbG9jYXRpb24gICAgICAgICBUaGUgbG9jYXRpb24gdG8gdXNlLiBEZWZhdWx0cyB0byBIYXNoTG9jYXRpb24gd2hlblxuICogICAgICAgICAgICAgICAgICAgIHRoZSBET00gaXMgYXZhaWxhYmxlLCBcIi9cIiBvdGhlcndpc2VcbiAqIC0gc2Nyb2xsQmVoYXZpb3IgICBUaGUgc2Nyb2xsIGJlaGF2aW9yIHRvIHVzZS4gRGVmYXVsdHMgdG8gSW1pdGF0ZUJyb3dzZXJCZWhhdmlvclxuICogICAgICAgICAgICAgICAgICAgIHdoZW4gdGhlIERPTSBpcyBhdmFpbGFibGUsIG51bGwgb3RoZXJ3aXNlXG4gKiAtIG9uRXJyb3IgICAgICAgICAgQSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gaGFuZGxlIGVycm9yc1xuICogLSBvbkFib3J0ICAgICAgICAgIEEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGhhbmRsZSBhYm9ydGVkIHRyYW5zaXRpb25zXG4gKlxuICogV2hlbiByZW5kZXJpbmcgaW4gYSBzZXJ2ZXItc2lkZSBlbnZpcm9ubWVudCwgdGhlIGxvY2F0aW9uIHNob3VsZCBzaW1wbHlcbiAqIGJlIHRoZSBVUkwgcGF0aCB0aGF0IHdhcyB1c2VkIGluIHRoZSByZXF1ZXN0LCBpbmNsdWRpbmcgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUm91dGVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGlzUmVhY3RDaGlsZHJlbihvcHRpb25zKSkgb3B0aW9ucyA9IHsgcm91dGVzOiBvcHRpb25zIH07XG5cbiAgdmFyIG1vdW50ZWRDb21wb25lbnRzID0gW107XG4gIHZhciBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gfHwgREVGQVVMVF9MT0NBVElPTjtcbiAgdmFyIHNjcm9sbEJlaGF2aW9yID0gb3B0aW9ucy5zY3JvbGxCZWhhdmlvciB8fCBERUZBVUxUX1NDUk9MTF9CRUhBVklPUjtcbiAgdmFyIHN0YXRlID0ge307XG4gIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgdmFyIHBlbmRpbmdUcmFuc2l0aW9uID0gbnVsbDtcbiAgdmFyIGRpc3BhdGNoSGFuZGxlciA9IG51bGw7XG5cbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIikgbG9jYXRpb24gPSBuZXcgU3RhdGljTG9jYXRpb24obG9jYXRpb24pO1xuXG4gIGlmIChsb2NhdGlvbiBpbnN0YW5jZW9mIFN0YXRpY0xvY2F0aW9uKSB7XG4gICAgd2FybmluZyghY2FuVXNlRE9NIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIiwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgYSBzdGF0aWMgbG9jYXRpb24gaW4gYSBET00gZW52aXJvbm1lbnQgYmVjYXVzZSBcIiArIFwidGhlIHJvdXRlciB3aWxsIG5vdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgY3VycmVudCBVUkxcIik7XG4gIH0gZWxzZSB7XG4gICAgaW52YXJpYW50KGNhblVzZURPTSB8fCBsb2NhdGlvbi5uZWVkc0RPTSA9PT0gZmFsc2UsIFwiWW91IGNhbm5vdCB1c2UgJXMgd2l0aG91dCBhIERPTVwiLCBsb2NhdGlvbik7XG4gIH1cblxuICAvLyBBdXRvbWF0aWNhbGx5IGZhbGwgYmFjayB0byBmdWxsIHBhZ2UgcmVmcmVzaGVzIGluXG4gIC8vIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgSFRNTCBoaXN0b3J5IEFQSS5cbiAgaWYgKGxvY2F0aW9uID09PSBIaXN0b3J5TG9jYXRpb24gJiYgIXN1cHBvcnRzSGlzdG9yeSgpKSBsb2NhdGlvbiA9IFJlZnJlc2hMb2NhdGlvbjtcblxuICB2YXIgUm91dGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgZGlzcGxheU5hbWU6IFwiUm91dGVyXCIsXG5cbiAgICBzdGF0aWNzOiB7XG5cbiAgICAgIGlzUnVubmluZzogZmFsc2UsXG5cbiAgICAgIGNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uOiBmdW5jdGlvbiBjYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpIHtcbiAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24uY2FuY2VsKCk7XG4gICAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjbGVhckFsbFJvdXRlczogZnVuY3Rpb24gY2xlYXJBbGxSb3V0ZXMoKSB7XG4gICAgICAgIFJvdXRlci5jYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpO1xuICAgICAgICBSb3V0ZXIubmFtZWRSb3V0ZXMgPSB7fTtcbiAgICAgICAgUm91dGVyLnJvdXRlcyA9IFtdO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBBZGRzIHJvdXRlcyB0byB0aGlzIHJvdXRlciBmcm9tIHRoZSBnaXZlbiBjaGlsZHJlbiBvYmplY3QgKHNlZSBSZWFjdENoaWxkcmVuKS5cbiAgICAgICAqL1xuICAgICAgYWRkUm91dGVzOiBmdW5jdGlvbiBhZGRSb3V0ZXMocm91dGVzKSB7XG4gICAgICAgIGlmIChpc1JlYWN0Q2hpbGRyZW4ocm91dGVzKSkgcm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4ocm91dGVzKTtcblxuICAgICAgICBhZGRSb3V0ZXNUb05hbWVkUm91dGVzKHJvdXRlcywgUm91dGVyLm5hbWVkUm91dGVzKTtcblxuICAgICAgICBSb3V0ZXIucm91dGVzLnB1c2guYXBwbHkoUm91dGVyLnJvdXRlcywgcm91dGVzKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmVwbGFjZXMgcm91dGVzIG9mIHRoaXMgcm91dGVyIGZyb20gdGhlIGdpdmVuIGNoaWxkcmVuIG9iamVjdCAoc2VlIFJlYWN0Q2hpbGRyZW4pLlxuICAgICAgICovXG4gICAgICByZXBsYWNlUm91dGVzOiBmdW5jdGlvbiByZXBsYWNlUm91dGVzKHJvdXRlcykge1xuICAgICAgICBSb3V0ZXIuY2xlYXJBbGxSb3V0ZXMoKTtcbiAgICAgICAgUm91dGVyLmFkZFJvdXRlcyhyb3V0ZXMpO1xuICAgICAgICBSb3V0ZXIucmVmcmVzaCgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQZXJmb3JtcyBhIG1hdGNoIG9mIHRoZSBnaXZlbiBwYXRoIGFnYWluc3QgdGhpcyByb3V0ZXIgYW5kIHJldHVybnMgYW4gb2JqZWN0XG4gICAgICAgKiB3aXRoIHRoZSB7IHJvdXRlcywgcGFyYW1zLCBwYXRobmFtZSwgcXVlcnkgfSB0aGF0IG1hdGNoLiBSZXR1cm5zIG51bGwgaWYgbm9cbiAgICAgICAqIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgICAgICovXG4gICAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2gocGF0aCkge1xuICAgICAgICByZXR1cm4gTWF0Y2guZmluZE1hdGNoKFJvdXRlci5yb3V0ZXMsIHBhdGgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGFuIGFic29sdXRlIFVSTCBwYXRoIGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW4gcm91dGVcbiAgICAgICAqIG5hbWUsIFVSTCBwYXJhbWV0ZXJzLCBhbmQgcXVlcnkuXG4gICAgICAgKi9cbiAgICAgIG1ha2VQYXRoOiBmdW5jdGlvbiBtYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICB2YXIgcGF0aDtcbiAgICAgICAgaWYgKFBhdGhVdGlscy5pc0Fic29sdXRlKHRvKSkge1xuICAgICAgICAgIHBhdGggPSB0bztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcm91dGUgPSB0byBpbnN0YW5jZW9mIFJvdXRlID8gdG8gOiBSb3V0ZXIubmFtZWRSb3V0ZXNbdG9dO1xuXG4gICAgICAgICAgaW52YXJpYW50KHJvdXRlIGluc3RhbmNlb2YgUm91dGUsIFwiQ2Fubm90IGZpbmQgYSByb3V0ZSBuYW1lZCBcXFwiJXNcXFwiXCIsIHRvKTtcblxuICAgICAgICAgIHBhdGggPSByb3V0ZS5wYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBhdGhVdGlscy53aXRoUXVlcnkoUGF0aFV0aWxzLmluamVjdFBhcmFtcyhwYXRoLCBwYXJhbXMpLCBxdWVyeSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCBtYXkgc2FmZWx5IGJlIHVzZWQgYXMgdGhlIGhyZWYgb2YgYSBsaW5rXG4gICAgICAgKiB0byB0aGUgcm91dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgVVJMIHBhcmFtZXRlcnMsIGFuZCBxdWVyeS5cbiAgICAgICAqL1xuICAgICAgbWFrZUhyZWY6IGZ1bmN0aW9uIG1ha2VIcmVmKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBwYXRoID0gUm91dGVyLm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uID09PSBIYXNoTG9jYXRpb24gPyBcIiNcIiArIHBhdGggOiBwYXRoO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHB1c2hpbmdcbiAgICAgICAqIGEgbmV3IFVSTCBvbnRvIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgICAgICovXG4gICAgICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uIHRyYW5zaXRpb25Ubyh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICB2YXIgcGF0aCA9IFJvdXRlci5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSk7XG5cbiAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgLy8gUmVwbGFjZSBzbyBwZW5kaW5nIGxvY2F0aW9uIGRvZXMgbm90IHN0YXkgaW4gaGlzdG9yeS5cbiAgICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKHBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLnB1c2gocGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSByZXBsYWNpbmdcbiAgICAgICAqIHRoZSBjdXJyZW50IFVSTCBpbiB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICAgICAqL1xuICAgICAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uIHJlcGxhY2VXaXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIGxvY2F0aW9uLnJlcGxhY2UoUm91dGVyLm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRyYW5zaXRpb25zIHRvIHRoZSBwcmV2aW91cyBVUkwgaWYgb25lIGlzIGF2YWlsYWJsZS4gUmV0dXJucyB0cnVlIGlmIHRoZVxuICAgICAgICogcm91dGVyIHdhcyBhYmxlIHRvIGdvIGJhY2ssIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBOb3RlOiBUaGUgcm91dGVyIG9ubHkgdHJhY2tzIGhpc3RvcnkgZW50cmllcyBpbiB5b3VyIGFwcGxpY2F0aW9uLCBub3QgdGhlXG4gICAgICAgKiBjdXJyZW50IGJyb3dzZXIgc2Vzc2lvbiwgc28geW91IGNhbiBzYWZlbHkgY2FsbCB0aGlzIGZ1bmN0aW9uIHdpdGhvdXQgZ3VhcmRpbmdcbiAgICAgICAqIGFnYWluc3Qgc2VuZGluZyB0aGUgdXNlciBiYWNrIHRvIHNvbWUgb3RoZXIgc2l0ZS4gSG93ZXZlciwgd2hlbiB1c2luZ1xuICAgICAgICogUmVmcmVzaExvY2F0aW9uICh3aGljaCBpcyB0aGUgZmFsbGJhY2sgZm9yIEhpc3RvcnlMb2NhdGlvbiBpbiBicm93c2VycyB0aGF0XG4gICAgICAgKiBkb24ndCBzdXBwb3J0IEhUTUw1IGhpc3RvcnkpIHRoaXMgbWV0aG9kIHdpbGwgKmFsd2F5cyogc2VuZCB0aGUgY2xpZW50IGJhY2tcbiAgICAgICAqIGJlY2F1c2Ugd2UgY2Fubm90IHJlbGlhYmx5IHRyYWNrIGhpc3RvcnkgbGVuZ3RoLlxuICAgICAgICovXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICAgICAgaWYgKEhpc3RvcnkubGVuZ3RoID4gMSB8fCBsb2NhdGlvbiA9PT0gUmVmcmVzaExvY2F0aW9uKSB7XG4gICAgICAgICAgbG9jYXRpb24ucG9wKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB3YXJuaW5nKGZhbHNlLCBcImdvQmFjaygpIHdhcyBpZ25vcmVkIGJlY2F1c2UgdGhlcmUgaXMgbm8gcm91dGVyIGhpc3RvcnlcIik7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcblxuICAgICAgaGFuZGxlQWJvcnQ6IG9wdGlvbnMub25BYm9ydCB8fCBmdW5jdGlvbiAoYWJvcnRSZWFzb24pIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uIGluc3RhbmNlb2YgU3RhdGljTG9jYXRpb24pIHRocm93IG5ldyBFcnJvcihcIlVuaGFuZGxlZCBhYm9ydGVkIHRyYW5zaXRpb24hIFJlYXNvbjogXCIgKyBhYm9ydFJlYXNvbik7XG5cbiAgICAgICAgaWYgKGFib3J0UmVhc29uIGluc3RhbmNlb2YgQ2FuY2VsbGF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGFib3J0UmVhc29uIGluc3RhbmNlb2YgUmVkaXJlY3QpIHtcbiAgICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKFJvdXRlci5tYWtlUGF0aChhYm9ydFJlYXNvbi50bywgYWJvcnRSZWFzb24ucGFyYW1zLCBhYm9ydFJlYXNvbi5xdWVyeSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBoYW5kbGVFcnJvcjogb3B0aW9ucy5vbkVycm9yIHx8IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAvLyBUaHJvdyBzbyB3ZSBkb24ndCBzaWxlbnRseSBzd2FsbG93IGFzeW5jIGVycm9ycy5cbiAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFRoaXMgZXJyb3IgcHJvYmFibHkgb3JpZ2luYXRlZCBpbiBhIHRyYW5zaXRpb24gaG9vay5cbiAgICAgIH0sXG5cbiAgICAgIGhhbmRsZUxvY2F0aW9uQ2hhbmdlOiBmdW5jdGlvbiBoYW5kbGVMb2NhdGlvbkNoYW5nZShjaGFuZ2UpIHtcbiAgICAgICAgUm91dGVyLmRpc3BhdGNoKGNoYW5nZS5wYXRoLCBjaGFuZ2UudHlwZSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFBlcmZvcm1zIGEgdHJhbnNpdGlvbiB0byB0aGUgZ2l2ZW4gcGF0aCBhbmQgY2FsbHMgY2FsbGJhY2soZXJyb3IsIGFib3J0UmVhc29uKVxuICAgICAgICogd2hlbiB0aGUgdHJhbnNpdGlvbiBpcyBmaW5pc2hlZC4gSWYgYm90aCBhcmd1bWVudHMgYXJlIG51bGwgdGhlIHJvdXRlcidzIHN0YXRlXG4gICAgICAgKiB3YXMgdXBkYXRlZC4gT3RoZXJ3aXNlIHRoZSB0cmFuc2l0aW9uIGRpZCBub3QgY29tcGxldGUuXG4gICAgICAgKlxuICAgICAgICogSW4gYSB0cmFuc2l0aW9uLCBhIHJvdXRlciBmaXJzdCBkZXRlcm1pbmVzIHdoaWNoIHJvdXRlcyBhcmUgaW52b2x2ZWQgYnkgYmVnaW5uaW5nXG4gICAgICAgKiB3aXRoIHRoZSBjdXJyZW50IHJvdXRlLCB1cCB0aGUgcm91dGUgdHJlZSB0byB0aGUgZmlyc3QgcGFyZW50IHJvdXRlIHRoYXQgaXMgc2hhcmVkXG4gICAgICAgKiB3aXRoIHRoZSBkZXN0aW5hdGlvbiByb3V0ZSwgYW5kIGJhY2sgZG93biB0aGUgdHJlZSB0byB0aGUgZGVzdGluYXRpb24gcm91dGUuIFRoZVxuICAgICAgICogd2lsbFRyYW5zaXRpb25Gcm9tIGhvb2sgaXMgaW52b2tlZCBvbiBhbGwgcm91dGUgaGFuZGxlcnMgd2UncmUgdHJhbnNpdGlvbmluZyBhd2F5XG4gICAgICAgKiBmcm9tLCBpbiByZXZlcnNlIG5lc3Rpbmcgb3JkZXIuIExpa2V3aXNlLCB0aGUgd2lsbFRyYW5zaXRpb25UbyBob29rIGlzIGludm9rZWQgb25cbiAgICAgICAqIGFsbCByb3V0ZSBoYW5kbGVycyB3ZSdyZSB0cmFuc2l0aW9uaW5nIHRvLlxuICAgICAgICpcbiAgICAgICAqIEJvdGggd2lsbFRyYW5zaXRpb25Gcm9tIGFuZCB3aWxsVHJhbnNpdGlvblRvIGhvb2tzIG1heSBlaXRoZXIgYWJvcnQgb3IgcmVkaXJlY3QgdGhlXG4gICAgICAgKiB0cmFuc2l0aW9uLiBUbyByZXNvbHZlIGFzeW5jaHJvbm91c2x5LCB0aGV5IG1heSB1c2UgdGhlIGNhbGxiYWNrIGFyZ3VtZW50LiBJZiBub1xuICAgICAgICogaG9va3Mgd2FpdCwgdGhlIHRyYW5zaXRpb24gaXMgZnVsbHkgc3luY2hyb25vdXMuXG4gICAgICAgKi9cbiAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChwYXRoLCBhY3Rpb24pIHtcbiAgICAgICAgUm91dGVyLmNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgdmFyIHByZXZQYXRoID0gc3RhdGUucGF0aDtcbiAgICAgICAgdmFyIGlzUmVmcmVzaGluZyA9IGFjdGlvbiA9PSBudWxsO1xuXG4gICAgICAgIGlmIChwcmV2UGF0aCA9PT0gcGF0aCAmJiAhaXNSZWZyZXNoaW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIE5vdGhpbmcgdG8gZG8hXG5cbiAgICAgICAgLy8gUmVjb3JkIHRoZSBzY3JvbGwgcG9zaXRpb24gYXMgZWFybHkgYXMgcG9zc2libGUgdG9cbiAgICAgICAgLy8gZ2V0IGl0IGJlZm9yZSBicm93c2VycyB0cnkgdXBkYXRlIGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICAgIGlmIChwcmV2UGF0aCAmJiBhY3Rpb24gPT09IExvY2F0aW9uQWN0aW9ucy5QVVNIKSBSb3V0ZXIucmVjb3JkU2Nyb2xsUG9zaXRpb24ocHJldlBhdGgpO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IFJvdXRlci5tYXRjaChwYXRoKTtcblxuICAgICAgICB3YXJuaW5nKG1hdGNoICE9IG51bGwsIFwiTm8gcm91dGUgbWF0Y2hlcyBwYXRoIFxcXCIlc1xcXCIuIE1ha2Ugc3VyZSB5b3UgaGF2ZSA8Um91dGUgcGF0aD1cXFwiJXNcXFwiPiBzb21ld2hlcmUgaW4geW91ciByb3V0ZXNcIiwgcGF0aCwgcGF0aCk7XG5cbiAgICAgICAgaWYgKG1hdGNoID09IG51bGwpIG1hdGNoID0ge307XG5cbiAgICAgICAgdmFyIHByZXZSb3V0ZXMgPSBzdGF0ZS5yb3V0ZXMgfHwgW107XG4gICAgICAgIHZhciBwcmV2UGFyYW1zID0gc3RhdGUucGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgcHJldlF1ZXJ5ID0gc3RhdGUucXVlcnkgfHwge307XG5cbiAgICAgICAgdmFyIG5leHRSb3V0ZXMgPSBtYXRjaC5yb3V0ZXMgfHwgW107XG4gICAgICAgIHZhciBuZXh0UGFyYW1zID0gbWF0Y2gucGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgbmV4dFF1ZXJ5ID0gbWF0Y2gucXVlcnkgfHwge307XG5cbiAgICAgICAgdmFyIGZyb21Sb3V0ZXMsIHRvUm91dGVzO1xuICAgICAgICBpZiAocHJldlJvdXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICBmcm9tUm91dGVzID0gcHJldlJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gIWhhc01hdGNoKG5leHRSb3V0ZXMsIHJvdXRlLCBwcmV2UGFyYW1zLCBuZXh0UGFyYW1zLCBwcmV2UXVlcnksIG5leHRRdWVyeSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0b1JvdXRlcyA9IG5leHRSb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICFoYXNNYXRjaChwcmV2Um91dGVzLCByb3V0ZSwgcHJldlBhcmFtcywgbmV4dFBhcmFtcywgcHJldlF1ZXJ5LCBuZXh0UXVlcnkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZyb21Sb3V0ZXMgPSBbXTtcbiAgICAgICAgICB0b1JvdXRlcyA9IG5leHRSb3V0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IG5ldyBUcmFuc2l0aW9uKHBhdGgsIFJvdXRlci5yZXBsYWNlV2l0aC5iaW5kKFJvdXRlciwgcGF0aCkpO1xuICAgICAgICBwZW5kaW5nVHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG5cbiAgICAgICAgdmFyIGZyb21Db21wb25lbnRzID0gbW91bnRlZENvbXBvbmVudHMuc2xpY2UocHJldlJvdXRlcy5sZW5ndGggLSBmcm9tUm91dGVzLmxlbmd0aCk7XG5cbiAgICAgICAgVHJhbnNpdGlvbi5mcm9tKHRyYW5zaXRpb24sIGZyb21Sb3V0ZXMsIGZyb21Db21wb25lbnRzLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgfHwgdHJhbnNpdGlvbi5hYm9ydFJlYXNvbikgcmV0dXJuIGRpc3BhdGNoSGFuZGxlci5jYWxsKFJvdXRlciwgZXJyb3IsIHRyYW5zaXRpb24pOyAvLyBObyBuZWVkIHRvIGNvbnRpbnVlLlxuXG4gICAgICAgICAgVHJhbnNpdGlvbi50byh0cmFuc2l0aW9uLCB0b1JvdXRlcywgbmV4dFBhcmFtcywgbmV4dFF1ZXJ5LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoSGFuZGxlci5jYWxsKFJvdXRlciwgZXJyb3IsIHRyYW5zaXRpb24sIHtcbiAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICAgIHBhdGhuYW1lOiBtYXRjaC5wYXRobmFtZSxcbiAgICAgICAgICAgICAgcm91dGVzOiBuZXh0Um91dGVzLFxuICAgICAgICAgICAgICBwYXJhbXM6IG5leHRQYXJhbXMsXG4gICAgICAgICAgICAgIHF1ZXJ5OiBuZXh0UXVlcnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogU3RhcnRzIHRoaXMgcm91dGVyIGFuZCBjYWxscyBjYWxsYmFjayhyb3V0ZXIsIHN0YXRlKSB3aGVuIHRoZSByb3V0ZSBjaGFuZ2VzLlxuICAgICAgICpcbiAgICAgICAqIElmIHRoZSByb3V0ZXIncyBsb2NhdGlvbiBpcyBzdGF0aWMgKGkuZS4gYSBVUkwgcGF0aCBpbiBhIHNlcnZlciBlbnZpcm9ubWVudClcbiAgICAgICAqIHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgb25seSBvbmNlLiBPdGhlcndpc2UsIHRoZSBsb2NhdGlvbiBzaG91bGQgYmUgb25lIG9mIHRoZVxuICAgICAgICogUm91dGVyLipMb2NhdGlvbiBvYmplY3RzIChlLmcuIFJvdXRlci5IYXNoTG9jYXRpb24gb3IgUm91dGVyLkhpc3RvcnlMb2NhdGlvbikuXG4gICAgICAgKi9cbiAgICAgIHJ1bjogZnVuY3Rpb24gcnVuKGNhbGxiYWNrKSB7XG4gICAgICAgIGludmFyaWFudCghUm91dGVyLmlzUnVubmluZywgXCJSb3V0ZXIgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuXG4gICAgICAgIGRpc3BhdGNoSGFuZGxlciA9IGZ1bmN0aW9uIChlcnJvciwgdHJhbnNpdGlvbiwgbmV3U3RhdGUpIHtcbiAgICAgICAgICBpZiAoZXJyb3IpIFJvdXRlci5oYW5kbGVFcnJvcihlcnJvcik7XG5cbiAgICAgICAgICBpZiAocGVuZGluZ1RyYW5zaXRpb24gIT09IHRyYW5zaXRpb24pIHJldHVybjtcblxuICAgICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uID0gbnVsbDtcblxuICAgICAgICAgIGlmICh0cmFuc2l0aW9uLmFib3J0UmVhc29uKSB7XG4gICAgICAgICAgICBSb3V0ZXIuaGFuZGxlQWJvcnQodHJhbnNpdGlvbi5hYm9ydFJlYXNvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoUm91dGVyLCBSb3V0ZXIsIG5leHRTdGF0ZSA9IG5ld1N0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCEobG9jYXRpb24gaW5zdGFuY2VvZiBTdGF0aWNMb2NhdGlvbikpIHtcbiAgICAgICAgICBpZiAobG9jYXRpb24uYWRkQ2hhbmdlTGlzdGVuZXIpIGxvY2F0aW9uLmFkZENoYW5nZUxpc3RlbmVyKFJvdXRlci5oYW5kbGVMb2NhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgICBSb3V0ZXIuaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJvb3RzdHJhcCB1c2luZyB0aGUgY3VycmVudCBwYXRoLlxuICAgICAgICBSb3V0ZXIucmVmcmVzaCgpO1xuICAgICAgfSxcblxuICAgICAgcmVmcmVzaDogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgICAgUm91dGVyLmRpc3BhdGNoKGxvY2F0aW9uLmdldEN1cnJlbnRQYXRoKCksIG51bGwpO1xuICAgICAgfSxcblxuICAgICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgUm91dGVyLmNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKGxvY2F0aW9uLnJlbW92ZUNoYW5nZUxpc3RlbmVyKSBsb2NhdGlvbi5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihSb3V0ZXIuaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuXG4gICAgICAgIFJvdXRlci5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgIH0sXG5cbiAgICAgIGdldExvY2F0aW9uOiBmdW5jdGlvbiBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgfSxcblxuICAgICAgZ2V0U2Nyb2xsQmVoYXZpb3I6IGZ1bmN0aW9uIGdldFNjcm9sbEJlaGF2aW9yKCkge1xuICAgICAgICByZXR1cm4gc2Nyb2xsQmVoYXZpb3I7XG4gICAgICB9LFxuXG4gICAgICBnZXRSb3V0ZUF0RGVwdGg6IGZ1bmN0aW9uIGdldFJvdXRlQXREZXB0aChyb3V0ZURlcHRoKSB7XG4gICAgICAgIHZhciByb3V0ZXMgPSBzdGF0ZS5yb3V0ZXM7XG4gICAgICAgIHJldHVybiByb3V0ZXMgJiYgcm91dGVzW3JvdXRlRGVwdGhdO1xuICAgICAgfSxcblxuICAgICAgc2V0Um91dGVDb21wb25lbnRBdERlcHRoOiBmdW5jdGlvbiBzZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGgocm91dGVEZXB0aCwgY29tcG9uZW50KSB7XG4gICAgICAgIG1vdW50ZWRDb21wb25lbnRzW3JvdXRlRGVwdGhdID0gY29tcG9uZW50O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoICsgcXVlcnkgc3RyaW5nLlxuICAgICAgICovXG4gICAgICBnZXRDdXJyZW50UGF0aDogZnVuY3Rpb24gZ2V0Q3VycmVudFBhdGgoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5wYXRoO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoIHdpdGhvdXQgdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAqL1xuICAgICAgZ2V0Q3VycmVudFBhdGhuYW1lOiBmdW5jdGlvbiBnZXRDdXJyZW50UGF0aG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5wYXRobmFtZTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgVVJMIHBhcmFtZXRlcnMuXG4gICAgICAgKi9cbiAgICAgIGdldEN1cnJlbnRQYXJhbXM6IGZ1bmN0aW9uIGdldEN1cnJlbnRQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5wYXJhbXM7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICAgKi9cbiAgICAgIGdldEN1cnJlbnRRdWVyeTogZnVuY3Rpb24gZ2V0Q3VycmVudFF1ZXJ5KCkge1xuICAgICAgICByZXR1cm4gc3RhdGUucXVlcnk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgcm91dGVzLlxuICAgICAgICovXG4gICAgICBnZXRDdXJyZW50Um91dGVzOiBmdW5jdGlvbiBnZXRDdXJyZW50Um91dGVzKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUucm91dGVzO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHJvdXRlLCBwYXJhbXMsIGFuZCBxdWVyeSBhcmUgYWN0aXZlLlxuICAgICAgICovXG4gICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgaWYgKFBhdGhVdGlscy5pc0Fic29sdXRlKHRvKSkge1xuICAgICAgICAgIHJldHVybiB0byA9PT0gc3RhdGUucGF0aDtcbiAgICAgICAgfXJldHVybiByb3V0ZUlzQWN0aXZlKHN0YXRlLnJvdXRlcywgdG8pICYmIHBhcmFtc0FyZUFjdGl2ZShzdGF0ZS5wYXJhbXMsIHBhcmFtcykgJiYgKHF1ZXJ5ID09IG51bGwgfHwgcXVlcnlJc0FjdGl2ZShzdGF0ZS5xdWVyeSwgcXVlcnkpKTtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtaXhpbnM6IFtTY3JvbGxIaXN0b3J5XSxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5mYWxzeVxuICAgIH0sXG5cbiAgICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgICAgcm91dGVEZXB0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgcm91dGVyOiBQcm9wVHlwZXMucm91dGVyLmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0OiBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZURlcHRoOiAxLFxuICAgICAgICByb3V0ZXI6IFJvdXRlclxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICByZXR1cm4gc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0gbmV4dFN0YXRlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgUm91dGVyLnN0b3AoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgcm91dGUgPSBSb3V0ZXIuZ2V0Um91dGVBdERlcHRoKDApO1xuICAgICAgcmV0dXJuIHJvdXRlID8gUmVhY3QuY3JlYXRlRWxlbWVudChyb3V0ZS5oYW5kbGVyLCB0aGlzLnByb3BzKSA6IG51bGw7XG4gICAgfVxuXG4gIH0pO1xuXG4gIFJvdXRlci5jbGVhckFsbFJvdXRlcygpO1xuXG4gIGlmIChvcHRpb25zLnJvdXRlcykgUm91dGVyLmFkZFJvdXRlcyhvcHRpb25zLnJvdXRlcyk7XG5cbiAgcmV0dXJuIFJvdXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSb3V0ZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGpzaGludCAtVzA4NCAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCJyZWFjdC9saWIvT2JqZWN0LmFzc2lnblwiKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZShcInJlYWN0L2xpYi93YXJuaW5nXCIpO1xudmFyIERlZmF1bHRSb3V0ZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlXCIpO1xudmFyIE5vdEZvdW5kUm91dGUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL05vdEZvdW5kUm91dGVcIik7XG52YXIgUmVkaXJlY3QgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL1JlZGlyZWN0XCIpO1xudmFyIFJvdXRlID0gcmVxdWlyZShcIi4vUm91dGVcIik7XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKGNvbXBvbmVudE5hbWUsIHByb3BUeXBlcywgcHJvcHMpIHtcbiAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgXCJVbmtub3duQ29tcG9uZW50XCI7XG5cbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvciA9IHByb3BUeXBlc1twcm9wTmFtZV0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKTtcblxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHdhcm5pbmcoZmFsc2UsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZU9wdGlvbnMocHJvcHMpIHtcbiAgdmFyIG9wdGlvbnMgPSBhc3NpZ24oe30sIHByb3BzKTtcbiAgdmFyIGhhbmRsZXIgPSBvcHRpb25zLmhhbmRsZXI7XG5cbiAgaWYgKGhhbmRsZXIpIHtcbiAgICBvcHRpb25zLm9uRW50ZXIgPSBoYW5kbGVyLndpbGxUcmFuc2l0aW9uVG87XG4gICAgb3B0aW9ucy5vbkxlYXZlID0gaGFuZGxlci53aWxsVHJhbnNpdGlvbkZyb207XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSkge1xuICAgIHJldHVybjtcbiAgfXZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICB2YXIgcHJvcHMgPSBhc3NpZ24oe30sIHR5cGUuZGVmYXVsdFByb3BzLCBlbGVtZW50LnByb3BzKTtcblxuICBpZiAodHlwZS5wcm9wVHlwZXMpIGNoZWNrUHJvcFR5cGVzKHR5cGUuZGlzcGxheU5hbWUsIHR5cGUucHJvcFR5cGVzLCBwcm9wcyk7XG5cbiAgaWYgKHR5cGUgPT09IERlZmF1bHRSb3V0ZSkge1xuICAgIHJldHVybiBSb3V0ZS5jcmVhdGVEZWZhdWx0Um91dGUoY3JlYXRlUm91dGVPcHRpb25zKHByb3BzKSk7XG4gIH1pZiAodHlwZSA9PT0gTm90Rm91bmRSb3V0ZSkge1xuICAgIHJldHVybiBSb3V0ZS5jcmVhdGVOb3RGb3VuZFJvdXRlKGNyZWF0ZVJvdXRlT3B0aW9ucyhwcm9wcykpO1xuICB9aWYgKHR5cGUgPT09IFJlZGlyZWN0KSB7XG4gICAgcmV0dXJuIFJvdXRlLmNyZWF0ZVJlZGlyZWN0KGNyZWF0ZVJvdXRlT3B0aW9ucyhwcm9wcykpO1xuICB9cmV0dXJuIFJvdXRlLmNyZWF0ZVJvdXRlKGNyZWF0ZVJvdXRlT3B0aW9ucyhwcm9wcyksIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocHJvcHMuY2hpbGRyZW4pIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKHByb3BzLmNoaWxkcmVuKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiByb3V0ZXMgY3JlYXRlZCBmcm9tIHRoZSBnaXZlblxuICogUmVhY3RDaGlsZHJlbiwgYWxsIG9mIHdoaWNoIHNob3VsZCBiZSBvbmUgb2YgPFJvdXRlPiwgPERlZmF1bHRSb3V0ZT4sXG4gKiA8Tm90Rm91bmRSb3V0ZT4sIG9yIDxSZWRpcmVjdD4sIGUuZy46XG4gKlxuICogICB2YXIgeyBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbiwgUm91dGUsIFJlZGlyZWN0IH0gPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbiAqXG4gKiAgIHZhciByb3V0ZXMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihcbiAqICAgICA8Um91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtBcHB9PlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJ1c2VyXCIgcGF0aD1cIi91c2VyLzp1c2VySWRcIiBoYW5kbGVyPXtVc2VyfT5cbiAqICAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrXCIgcGF0aD1cInRhc2tzLzp0YXNrSWRcIiBoYW5kbGVyPXtUYXNrfS8+XG4gKiAgICAgICAgIDxSZWRpcmVjdCBmcm9tPVwidG9kb3MvOnRhc2tJZFwiIHRvPVwidGFza1wiLz5cbiAqICAgICAgIDwvUm91dGU+XG4gKiAgICAgPC9Sb3V0ZT5cbiAqICAgKTtcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgdmFyIHJvdXRlcyA9IFtdO1xuXG4gIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIGlmIChjaGlsZCA9IGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChjaGlsZCkpIHJvdXRlcy5wdXNoKGNoaWxkKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoXCJyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnRcIikuY2FuVXNlRE9NO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3cgYXMgeyB4LCB5IH0uXG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uKCkge1xuICBpbnZhcmlhbnQoY2FuVXNlRE9NLCBcIkNhbm5vdCBnZXQgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gd2l0aG91dCBhIERPTVwiKTtcblxuICByZXR1cm4ge1xuICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLkRlZmF1bHRSb3V0ZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlXCIpO1xuZXhwb3J0cy5MaW5rID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9MaW5rXCIpO1xuZXhwb3J0cy5Ob3RGb3VuZFJvdXRlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9Ob3RGb3VuZFJvdXRlXCIpO1xuZXhwb3J0cy5SZWRpcmVjdCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvUmVkaXJlY3RcIik7XG5leHBvcnRzLlJvdXRlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9Sb3V0ZVwiKTtcbmV4cG9ydHMuUm91dGVIYW5kbGVyID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9Sb3V0ZUhhbmRsZXJcIik7XG5cbmV4cG9ydHMuSGFzaExvY2F0aW9uID0gcmVxdWlyZShcIi4vbG9jYXRpb25zL0hhc2hMb2NhdGlvblwiKTtcbmV4cG9ydHMuSGlzdG9yeUxvY2F0aW9uID0gcmVxdWlyZShcIi4vbG9jYXRpb25zL0hpc3RvcnlMb2NhdGlvblwiKTtcbmV4cG9ydHMuUmVmcmVzaExvY2F0aW9uID0gcmVxdWlyZShcIi4vbG9jYXRpb25zL1JlZnJlc2hMb2NhdGlvblwiKTtcbmV4cG9ydHMuU3RhdGljTG9jYXRpb24gPSByZXF1aXJlKFwiLi9sb2NhdGlvbnMvU3RhdGljTG9jYXRpb25cIik7XG5leHBvcnRzLlRlc3RMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9UZXN0TG9jYXRpb25cIik7XG5cbmV4cG9ydHMuSW1pdGF0ZUJyb3dzZXJCZWhhdmlvciA9IHJlcXVpcmUoXCIuL2JlaGF2aW9ycy9JbWl0YXRlQnJvd3NlckJlaGF2aW9yXCIpO1xuZXhwb3J0cy5TY3JvbGxUb1RvcEJlaGF2aW9yID0gcmVxdWlyZShcIi4vYmVoYXZpb3JzL1Njcm9sbFRvVG9wQmVoYXZpb3JcIik7XG5cbmV4cG9ydHMuSGlzdG9yeSA9IHJlcXVpcmUoXCIuL0hpc3RvcnlcIik7XG5leHBvcnRzLk5hdmlnYXRpb24gPSByZXF1aXJlKFwiLi9OYXZpZ2F0aW9uXCIpO1xuZXhwb3J0cy5TdGF0ZSA9IHJlcXVpcmUoXCIuL1N0YXRlXCIpO1xuXG5leHBvcnRzLmNyZWF0ZVJvdXRlID0gcmVxdWlyZShcIi4vUm91dGVcIikuY3JlYXRlUm91dGU7XG5leHBvcnRzLmNyZWF0ZURlZmF1bHRSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpLmNyZWF0ZURlZmF1bHRSb3V0ZTtcbmV4cG9ydHMuY3JlYXRlTm90Rm91bmRSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpLmNyZWF0ZU5vdEZvdW5kUm91dGU7XG5leHBvcnRzLmNyZWF0ZVJlZGlyZWN0ID0gcmVxdWlyZShcIi4vUm91dGVcIikuY3JlYXRlUmVkaXJlY3Q7XG5leHBvcnRzLmNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuID0gcmVxdWlyZShcIi4vY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW5cIik7XG5leHBvcnRzLmNyZWF0ZSA9IHJlcXVpcmUoXCIuL2NyZWF0ZVJvdXRlclwiKTtcbmV4cG9ydHMucnVuID0gcmVxdWlyZShcIi4vcnVuUm91dGVyXCIpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbmZ1bmN0aW9uIGlzVmFsaWRDaGlsZChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsIHx8IFJlYWN0LmlzVmFsaWRFbGVtZW50KG9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGlzUmVhY3RDaGlsZHJlbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzVmFsaWRDaGlsZChvYmplY3QpIHx8IEFycmF5LmlzQXJyYXkob2JqZWN0KSAmJiBvYmplY3QuZXZlcnkoaXNWYWxpZENoaWxkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1JlYWN0Q2hpbGRyZW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9Mb2NhdGlvbkFjdGlvbnNcIik7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoXCIuLi9IaXN0b3J5XCIpO1xuXG52YXIgX2xpc3RlbmVycyA9IFtdO1xudmFyIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xudmFyIF9hY3Rpb25UeXBlO1xuXG5mdW5jdGlvbiBub3RpZnlDaGFuZ2UodHlwZSkge1xuICBpZiAodHlwZSA9PT0gTG9jYXRpb25BY3Rpb25zLlBVU0gpIEhpc3RvcnkubGVuZ3RoICs9IDE7XG5cbiAgdmFyIGNoYW5nZSA9IHtcbiAgICBwYXRoOiBIYXNoTG9jYXRpb24uZ2V0Q3VycmVudFBhdGgoKSxcbiAgICB0eXBlOiB0eXBlXG4gIH07XG5cbiAgX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIGxpc3RlbmVyLmNhbGwoSGFzaExvY2F0aW9uLCBjaGFuZ2UpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlU2xhc2goKSB7XG4gIHZhciBwYXRoID0gSGFzaExvY2F0aW9uLmdldEN1cnJlbnRQYXRoKCk7XG5cbiAgaWYgKHBhdGguY2hhckF0KDApID09PSBcIi9cIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9SGFzaExvY2F0aW9uLnJlcGxhY2UoXCIvXCIgKyBwYXRoKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9uSGFzaENoYW5nZSgpIHtcbiAgaWYgKGVuc3VyZVNsYXNoKCkpIHtcbiAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGFuIF9hY3Rpb25UeXBlIHRoZW4gYWxsIHdlIGtub3cgaXMgdGhlIGhhc2hcbiAgICAvLyBjaGFuZ2VkLiBJdCB3YXMgcHJvYmFibHkgY2F1c2VkIGJ5IHRoZSB1c2VyIGNsaWNraW5nIHRoZSBCYWNrXG4gICAgLy8gYnV0dG9uLCBidXQgbWF5IGhhdmUgYWxzbyBiZWVuIHRoZSBGb3J3YXJkIGJ1dHRvbiBvciBtYW51YWxcbiAgICAvLyBtYW5pcHVsYXRpb24uIFNvIGp1c3QgZ3Vlc3MgJ3BvcCcuXG4gICAgdmFyIGN1ckFjdGlvblR5cGUgPSBfYWN0aW9uVHlwZTtcbiAgICBfYWN0aW9uVHlwZSA9IG51bGw7XG4gICAgbm90aWZ5Q2hhbmdlKGN1ckFjdGlvblR5cGUgfHwgTG9jYXRpb25BY3Rpb25zLlBPUCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIExvY2F0aW9uIHRoYXQgdXNlcyBgd2luZG93LmxvY2F0aW9uLmhhc2hgLlxuICovXG52YXIgSGFzaExvY2F0aW9uID0ge1xuXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiBhZGRDaGFuZ2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgIF9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAvLyBEbyB0aGlzIEJFRk9SRSBsaXN0ZW5pbmcgZm9yIGhhc2hjaGFuZ2UuXG4gICAgZW5zdXJlU2xhc2goKTtcblxuICAgIGlmICghX2lzTGlzdGVuaW5nKSB7XG4gICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIG9uSGFzaENoYW5nZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25oYXNoY2hhbmdlXCIsIG9uSGFzaENoYW5nZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiByZW1vdmVDaGFuZ2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgIF9saXN0ZW5lcnMgPSBfbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGwgIT09IGxpc3RlbmVyO1xuICAgIH0pO1xuXG4gICAgaWYgKF9saXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIG9uSGFzaENoYW5nZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50KFwib25oYXNoY2hhbmdlXCIsIG9uSGFzaENoYW5nZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBwdXNoOiBmdW5jdGlvbiBwdXNoKHBhdGgpIHtcbiAgICBfYWN0aW9uVHlwZSA9IExvY2F0aW9uQWN0aW9ucy5QVVNIO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbiAgfSxcblxuICByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKHBhdGgpIHtcbiAgICBfYWN0aW9uVHlwZSA9IExvY2F0aW9uQWN0aW9ucy5SRVBMQUNFO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyBcIiNcIiArIHBhdGgpO1xuICB9LFxuXG4gIHBvcDogZnVuY3Rpb24gcG9wKCkge1xuICAgIF9hY3Rpb25UeXBlID0gTG9jYXRpb25BY3Rpb25zLlBPUDtcbiAgICBIaXN0b3J5LmJhY2soKTtcbiAgfSxcblxuICBnZXRDdXJyZW50UGF0aDogZnVuY3Rpb24gZ2V0Q3VycmVudFBhdGgoKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSShcbiAgICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gICAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIilbMV0gfHwgXCJcIik7XG4gIH0sXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBcIjxIYXNoTG9jYXRpb24+XCI7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoTG9jYXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9Mb2NhdGlvbkFjdGlvbnNcIik7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoXCIuLi9IaXN0b3J5XCIpO1xuXG52YXIgX2xpc3RlbmVycyA9IFtdO1xudmFyIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBub3RpZnlDaGFuZ2UodHlwZSkge1xuICB2YXIgY2hhbmdlID0ge1xuICAgIHBhdGg6IEhpc3RvcnlMb2NhdGlvbi5nZXRDdXJyZW50UGF0aCgpLFxuICAgIHR5cGU6IHR5cGVcbiAgfTtcblxuICBfbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgbGlzdGVuZXIuY2FsbChIaXN0b3J5TG9jYXRpb24sIGNoYW5nZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblBvcFN0YXRlKGV2ZW50KSB7XG4gIGlmIChldmVudC5zdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG5cbiAgbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5QT1ApO1xufVxuXG4vKipcbiAqIEEgTG9jYXRpb24gdGhhdCB1c2VzIEhUTUw1IGhpc3RvcnkuXG4gKi9cbnZhciBIaXN0b3J5TG9jYXRpb24gPSB7XG5cbiAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uIGFkZENoYW5nZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIGlmICghX2lzTGlzdGVuaW5nKSB7XG4gICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBvblBvcFN0YXRlLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnBvcHN0YXRlXCIsIG9uUG9wU3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlQ2hhbmdlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICBfbGlzdGVuZXJzID0gX2xpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcbiAgICAgIHJldHVybiBsICE9PSBsaXN0ZW5lcjtcbiAgICB9KTtcblxuICAgIGlmIChfbGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgb25Qb3BTdGF0ZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50KFwib25wb3BzdGF0ZVwiLCBvblBvcFN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgX2lzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHB1c2g6IGZ1bmN0aW9uIHB1c2gocGF0aCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IHBhdGg6IHBhdGggfSwgXCJcIiwgcGF0aCk7XG4gICAgSGlzdG9yeS5sZW5ndGggKz0gMTtcbiAgICBub3RpZnlDaGFuZ2UoTG9jYXRpb25BY3Rpb25zLlBVU0gpO1xuICB9LFxuXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UocGF0aCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IHBhdGg6IHBhdGggfSwgXCJcIiwgcGF0aCk7XG4gICAgbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5SRVBMQUNFKTtcbiAgfSxcblxuICBwb3A6IEhpc3RvcnkuYmFjayxcblxuICBnZXRDdXJyZW50UGF0aDogZnVuY3Rpb24gZ2V0Q3VycmVudFBhdGgoKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgfSxcblxuICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiPEhpc3RvcnlMb2NhdGlvbj5cIjtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpc3RvcnlMb2NhdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEhpc3RvcnlMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL0hpc3RvcnlMb2NhdGlvblwiKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZShcIi4uL0hpc3RvcnlcIik7XG5cbi8qKlxuICogQSBMb2NhdGlvbiB0aGF0IHVzZXMgZnVsbCBwYWdlIHJlZnJlc2hlcy4gVGhpcyBpcyB1c2VkIGFzXG4gKiB0aGUgZmFsbGJhY2sgZm9yIEhpc3RvcnlMb2NhdGlvbiBpbiBicm93c2VycyB0aGF0IGRvIG5vdFxuICogc3VwcG9ydCB0aGUgSFRNTDUgaGlzdG9yeSBBUEkuXG4gKi9cbnZhciBSZWZyZXNoTG9jYXRpb24gPSB7XG5cbiAgcHVzaDogZnVuY3Rpb24gcHVzaChwYXRoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uID0gcGF0aDtcbiAgfSxcblxuICByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKHBhdGgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwYXRoKTtcbiAgfSxcblxuICBwb3A6IEhpc3RvcnkuYmFjayxcblxuICBnZXRDdXJyZW50UGF0aDogSGlzdG9yeUxvY2F0aW9uLmdldEN1cnJlbnRQYXRoLFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCI8UmVmcmVzaExvY2F0aW9uPlwiO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVmcmVzaExvY2F0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xuXG5mdW5jdGlvbiB0aHJvd0Nhbm5vdE1vZGlmeSgpIHtcbiAgaW52YXJpYW50KGZhbHNlLCBcIllvdSBjYW5ub3QgbW9kaWZ5IGEgc3RhdGljIGxvY2F0aW9uXCIpO1xufVxuXG4vKipcbiAqIEEgbG9jYXRpb24gdGhhdCBvbmx5IGV2ZXIgY29udGFpbnMgYSBzaW5nbGUgcGF0aC4gVXNlZnVsIGluXG4gKiBzdGF0ZWxlc3MgZW52aXJvbm1lbnRzIGxpa2Ugc2VydmVycyB3aGVyZSB0aGVyZSBpcyBubyBwYXRoIGhpc3RvcnksXG4gKiBvbmx5IHRoZSBwYXRoIHRoYXQgd2FzIHVzZWQgaW4gdGhlIHJlcXVlc3QuXG4gKi9cblxudmFyIFN0YXRpY0xvY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RhdGljTG9jYXRpb24ocGF0aCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0aWNMb2NhdGlvbik7XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN0YXRpY0xvY2F0aW9uLCB7XG4gICAgZ2V0Q3VycmVudFBhdGg6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50UGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvU3RyaW5nOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBcIjxTdGF0aWNMb2NhdGlvbiBwYXRoPVxcXCJcIiArIHRoaXMucGF0aCArIFwiXFxcIj5cIjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTdGF0aWNMb2NhdGlvbjtcbn0pKCk7XG5cbi8vIFRPRE86IEluY2x1ZGUgdGhlc2UgaW4gdGhlIGFib3ZlIGNsYXNzIGRlZmluaXRpb25cbi8vIG9uY2Ugd2UgY2FuIHVzZSBFUzcgcHJvcGVydHkgaW5pdGlhbGl6ZXJzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy82MTlcblxuU3RhdGljTG9jYXRpb24ucHJvdG90eXBlLnB1c2ggPSB0aHJvd0Nhbm5vdE1vZGlmeTtcblN0YXRpY0xvY2F0aW9uLnByb3RvdHlwZS5yZXBsYWNlID0gdGhyb3dDYW5ub3RNb2RpZnk7XG5TdGF0aWNMb2NhdGlvbi5wcm90b3R5cGUucG9wID0gdGhyb3dDYW5ub3RNb2RpZnk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGljTG9jYXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIga2V5IGluIHByb3BzKSB7IHZhciBwcm9wID0gcHJvcHNba2V5XTsgcHJvcC5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7IH0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcInJlYWN0L2xpYi9pbnZhcmlhbnRcIik7XG52YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zXCIpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKFwiLi4vSGlzdG9yeVwiKTtcblxuLyoqXG4gKiBBIGxvY2F0aW9uIHRoYXQgaXMgY29udmVuaWVudCBmb3IgdGVzdGluZyBhbmQgZG9lcyBub3QgcmVxdWlyZSBhIERPTS5cbiAqL1xuXG52YXIgVGVzdExvY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVGVzdExvY2F0aW9uKGhpc3RvcnkpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGVzdExvY2F0aW9uKTtcblxuICAgIHRoaXMuaGlzdG9yeSA9IGhpc3RvcnkgfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLl91cGRhdGVIaXN0b3J5TGVuZ3RoKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGVzdExvY2F0aW9uLCB7XG4gICAgbmVlZHNET006IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBfdXBkYXRlSGlzdG9yeUxlbmd0aDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVIaXN0b3J5TGVuZ3RoKCkge1xuICAgICAgICBIaXN0b3J5Lmxlbmd0aCA9IHRoaXMuaGlzdG9yeS5sZW5ndGg7XG4gICAgICB9XG4gICAgfSxcbiAgICBfbm90aWZ5Q2hhbmdlOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gX25vdGlmeUNoYW5nZSh0eXBlKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSB7XG4gICAgICAgICAgcGF0aDogdGhpcy5nZXRDdXJyZW50UGF0aCgpLFxuICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHRoaXMubGlzdGVuZXJzW2ldLmNhbGwodGhpcywgY2hhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZENoYW5nZUxpc3RlbmVyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ2hhbmdlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUNoYW5nZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgcmV0dXJuIGwgIT09IGxpc3RlbmVyO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHB1c2g6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwdXNoKHBhdGgpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnB1c2gocGF0aCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhpc3RvcnlMZW5ndGgoKTtcbiAgICAgICAgdGhpcy5fbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5QVVNIKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlcGxhY2U6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXBsYWNlKHBhdGgpIHtcbiAgICAgICAgaW52YXJpYW50KHRoaXMuaGlzdG9yeS5sZW5ndGgsIFwiWW91IGNhbm5vdCByZXBsYWNlIHRoZSBjdXJyZW50IHBhdGggd2l0aCBubyBoaXN0b3J5XCIpO1xuXG4gICAgICAgIHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMV0gPSBwYXRoO1xuXG4gICAgICAgIHRoaXMuX25vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwb3A6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwb3AoKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5wb3AoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGlzdG9yeUxlbmd0aCgpO1xuICAgICAgICB0aGlzLl9ub3RpZnlDaGFuZ2UoTG9jYXRpb25BY3Rpb25zLlBPUCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UGF0aDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEN1cnJlbnRQYXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvU3RyaW5nOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBcIjxUZXN0TG9jYXRpb24+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVGVzdExvY2F0aW9uO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0TG9jYXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGVSb3V0ZXIgPSByZXF1aXJlKFwiLi9jcmVhdGVSb3V0ZXJcIik7XG5cbi8qKlxuICogQSBoaWdoLWxldmVsIGNvbnZlbmllbmNlIG1ldGhvZCB0aGF0IGNyZWF0ZXMsIGNvbmZpZ3VyZXMsIGFuZFxuICogcnVucyBhIHJvdXRlciBpbiBvbmUgc2hvdC4gVGhlIG1ldGhvZCBzaWduYXR1cmUgaXM6XG4gKlxuICogICBSb3V0ZXIucnVuKHJvdXRlc1ssIGxvY2F0aW9uIF0sIGNhbGxiYWNrKTtcbiAqXG4gKiBVc2luZyBgd2luZG93LmxvY2F0aW9uLmhhc2hgIHRvIG1hbmFnZSB0aGUgVVJMLCB5b3UgY291bGQgZG86XG4gKlxuICogICBSb3V0ZXIucnVuKHJvdXRlcywgZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIvPiwgZG9jdW1lbnQuYm9keSk7XG4gKiAgIH0pO1xuICogXG4gKiBVc2luZyBIVE1MNSBoaXN0b3J5IGFuZCBhIGN1c3RvbSBcImN1cnNvclwiIHByb3A6XG4gKiBcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXMsIFJvdXRlci5IaXN0b3J5TG9jYXRpb24sIGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgUmVhY3QucmVuZGVyKDxIYW5kbGVyIGN1cnNvcj17Y3Vyc29yfS8+LCBkb2N1bWVudC5ib2R5KTtcbiAqICAgfSk7XG4gKlxuICogUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCByb3V0ZXIuXG4gKlxuICogTm90ZTogSWYgeW91IG5lZWQgdG8gc3BlY2lmeSBmdXJ0aGVyIG9wdGlvbnMgZm9yIHlvdXIgcm91dGVyIHN1Y2hcbiAqIGFzIGVycm9yL2Fib3J0IGhhbmRsaW5nIG9yIGN1c3RvbSBzY3JvbGwgYmVoYXZpb3IsIHVzZSBSb3V0ZXIuY3JlYXRlXG4gKiBpbnN0ZWFkLlxuICpcbiAqICAgdmFyIHJvdXRlciA9IFJvdXRlci5jcmVhdGUob3B0aW9ucyk7XG4gKiAgIHJvdXRlci5ydW4oZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICAvLyAuLi5cbiAqICAgfSk7XG4gKi9cbmZ1bmN0aW9uIHJ1blJvdXRlcihyb3V0ZXMsIGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjYWxsYmFjayA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIHZhciByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoe1xuICAgIHJvdXRlczogcm91dGVzLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICB9KTtcblxuICByb3V0ZXIucnVuKGNhbGxiYWNrKTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1blJvdXRlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICAvKiEgdGFrZW4gZnJvbSBtb2Rlcm5penJcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICAgKiBjaGFuZ2VkIHRvIGF2b2lkIGZhbHNlIG5lZ2F0aXZlcyBmb3IgV2luZG93cyBQaG9uZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9yYWNrdC9yZWFjdC1yb3V0ZXIvaXNzdWVzLzU4NlxuICAgKi9cbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgaWYgKCh1YS5pbmRleE9mKFwiQW5kcm9pZCAyLlwiKSAhPT0gLTEgfHwgdWEuaW5kZXhPZihcIkFuZHJvaWQgNC4wXCIpICE9PSAtMSkgJiYgdWEuaW5kZXhPZihcIk1vYmlsZSBTYWZhcmlcIikgIT09IC0xICYmIHVhLmluZGV4T2YoXCJDaHJvbWVcIikgPT09IC0xICYmIHVhLmluZGV4T2YoXCJXaW5kb3dzIFBob25lXCIpID09PSAtMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gd2luZG93Lmhpc3RvcnkgJiYgXCJwdXNoU3RhdGVcIiBpbiB3aW5kb3cuaGlzdG9yeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0hpc3Rvcnk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBUb09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIGtleXM7XG5cdHZhciB0byA9IFRvT2JqZWN0KHRhcmdldCk7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gYXJndW1lbnRzW3NdO1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhPYmplY3QoZnJvbSkpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvJyk7XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgUGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHt9O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0cmluZ2lmeTogU3RyaW5naWZ5LFxuICAgIHBhcnNlOiBQYXJzZVxufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMFxufTtcblxuXG5pbnRlcm5hbHMucGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiAoc3RyLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gcGFydHMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuICAgICAgICB2YXIgcG9zID0gcGFydC5pbmRleE9mKCddPScpID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogcGFydC5pbmRleE9mKCddPScpICsgMTtcblxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgb2JqW1V0aWxzLmRlY29kZShwYXJ0KV0gPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBVdGlscy5kZWNvZGUocGFydC5zbGljZSgwLCBwb3MpKTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBVdGlscy5kZWNvZGUocGFydC5zbGljZShwb3MgKyAxKSk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBbXS5jb25jYXQob2JqW2tleV0pLmNvbmNhdCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcblxuICAgIGlmICghY2hhaW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSBjaGFpbi5zaGlmdCgpO1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgIG9iaiA9IFtdO1xuICAgICAgICBvYmogPSBvYmouY29uY2F0KGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsLCBvcHRpb25zKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgY2xlYW5Sb290ID0gcm9vdFswXSA9PT0gJ1snICYmIHJvb3Rbcm9vdC5sZW5ndGggLSAxXSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCByb290Lmxlbmd0aCAtIDEpIDogcm9vdDtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgIHZhciBpbmRleFN0cmluZyA9ICcnICsgaW5kZXg7XG4gICAgICAgIGlmICghaXNOYU4oaW5kZXgpICYmXG4gICAgICAgICAgICByb290ICE9PSBjbGVhblJvb3QgJiZcbiAgICAgICAgICAgIGluZGV4U3RyaW5nID09PSBjbGVhblJvb3QgJiZcbiAgICAgICAgICAgIGluZGV4ID49IDAgJiZcbiAgICAgICAgICAgIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdCkge1xuXG4gICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgIG9ialtpbmRleF0gPSBpbnRlcm5hbHMucGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmludGVybmFscy5wYXJzZUtleXMgPSBmdW5jdGlvbiAoa2V5LCB2YWwsIG9wdGlvbnMpIHtcblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgcGFyZW50ID0gL14oW15cXFtcXF1dKikvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15cXFtcXF1dKlxcXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IHBhcmVudC5leGVjKGtleSk7XG5cbiAgICAvLyBEb24ndCBhbGxvdyB0aGVtIHRvIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KHNlZ21lbnRbMV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAoc2VnbWVudFsxXSkge1xuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuXG4gICAgICAgICsraTtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KHNlZ21lbnRbMV0ucmVwbGFjZSgvXFxbfFxcXS9nLCAnJykpKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0aW9ucykge1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHxcbiAgICAgICAgc3RyID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCBVdGlscy5pc1JlZ0V4cChvcHRpb25zLmRlbGltaXRlcikgPyBvcHRpb25zLmRlbGltaXRlciA6IGludGVybmFscy5kZWxpbWl0ZXI7XG4gICAgb3B0aW9ucy5kZXB0aCA9IHR5cGVvZiBvcHRpb25zLmRlcHRoID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuZGVwdGggOiBpbnRlcm5hbHMuZGVwdGg7XG4gICAgb3B0aW9ucy5hcnJheUxpbWl0ID0gdHlwZW9mIG9wdGlvbnMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmFycmF5TGltaXQgOiBpbnRlcm5hbHMuYXJyYXlMaW1pdDtcbiAgICBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID0gdHlwZW9mIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA6IGludGVybmFscy5wYXJhbWV0ZXJMaW1pdDtcblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBpbnRlcm5hbHMucGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0ge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IGludGVybmFscy5wYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMpO1xuICAgICAgICBvYmogPSBVdGlscy5tZXJnZShvYmosIG5ld09iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgYXJyYXlQcmVmaXhHZW5lcmF0b3JzOiB7XG4gICAgICAgIGJyYWNrZXRzOiBmdW5jdGlvbiAocHJlZml4LCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgICAgICB9LFxuICAgICAgICBpbmRpY2VzOiBmdW5jdGlvbiAocHJlZml4LCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgICAgIH0sXG4gICAgICAgIHJlcGVhdDogZnVuY3Rpb24gKHByZWZpeCwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5pbnRlcm5hbHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgcHJlZml4LCBnZW5lcmF0ZUFycmF5UHJlZml4KSB7XG5cbiAgICBpZiAoVXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBvYmogPSBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBvYmoudG9JU09TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fFxuICAgICAgICB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicpIHtcblxuICAgICAgICByZXR1cm4gW2VuY29kZVVSSUNvbXBvbmVudChwcmVmaXgpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iaildO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvYmpLZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwgZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSksIGdlbmVyYXRlQXJyYXlQcmVmaXgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBnZW5lcmF0ZUFycmF5UHJlZml4KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMpIHtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gaW50ZXJuYWxzLmRlbGltaXRlciA6IG9wdGlvbnMuZGVsaW1pdGVyO1xuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBvYmogPT09IG51bGwpIHtcblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGludGVybmFscy5hcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmFycmF5Rm9ybWF0O1xuICAgIH1cbiAgICBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBpbnRlcm5hbHMuYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIHZhciBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvYmpLZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChpbnRlcm5hbHMuc3RyaW5naWZ5KG9ialtrZXldLCBrZXksIGdlbmVyYXRlQXJyYXlQcmVmaXgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cy5qb2luKGRlbGltaXRlcik7XG59O1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHt9O1xuXG5cbmV4cG9ydHMuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcblxuICAgIHZhciBvYmogPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRhcmdldCA9IFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiZcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXG4gICAgICAgIHRhcmdldCA9IGV4cG9ydHMuYXJyYXlUb09iamVjdCh0YXJnZXQpO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICBmb3IgKHZhciBrID0gMCwga2wgPSBrZXlzLmxlbmd0aDsgayA8IGtsOyArK2spIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNba107XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmICghdGFyZ2V0W2tleV0pIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IGV4cG9ydHMubWVyZ2UodGFyZ2V0W2tleV0sIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG5cbmV4cG9ydHMuY29tcGFjdCA9IGZ1bmN0aW9uIChvYmosIHJlZnMpIHtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBvYmogPT09IG51bGwpIHtcblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJlZnMgPSByZWZzIHx8IFtdO1xuICAgIHZhciBsb29rdXAgPSByZWZzLmluZGV4T2Yob2JqKTtcbiAgICBpZiAobG9va3VwICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gcmVmc1tsb29rdXBdO1xuICAgIH1cblxuICAgIHJlZnMucHVzaChvYmopO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb2JqLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcGFjdGVkO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgb2JqW2tleV0gPSBleHBvcnRzLmNvbXBhY3Qob2JqW2tleV0sIHJlZnMpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmV4cG9ydHMuaXNSZWdFeHAgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cblxuZXhwb3J0cy5pc0J1ZmZlciA9IGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGlmIChvYmogPT09IG51bGwgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJlxuICAgICAgICBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiZcbiAgICAgICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFeGVjdXRpb25FbnZpcm9ubWVudFxuICovXG5cbi8qanNsaW50IGV2aWw6IHRydWUgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYW5Vc2VET00gPSAhIShcbiAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudClcbik7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczpcbiAgICBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBlbXB0eUZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbihhcmcpIHsgcmV0dXJuIGFyZzsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSB3YXJuaW5nXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZShcIi4vZW1wdHlGdW5jdGlvblwiKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCApIHtmb3IgKHZhciBhcmdzPVtdLCRfXzA9MiwkX18xPWFyZ3VtZW50cy5sZW5ndGg7JF9fMDwkX18xOyRfXzArKykgYXJncy5wdXNoKGFyZ3VtZW50c1skX18wXSk7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgL15bc1xcV10qJC8udGVzdChmb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgd2FybmluZyBmb3JtYXQgc2hvdWxkIGJlIGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyAnICtcbiAgICAgICAgJ3dhcm5pbmcuIFBsZWFzZSwgdXNlIGEgbW9yZSBkZXNjcmlwdGl2ZSBmb3JtYXQgdGhhbjogJyArIGZvcm1hdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgIHtyZXR1cm4gYXJnc1thcmdJbmRleCsrXTt9KTtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgncmVkdWNlJyk7XG5cbi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3QgPSAndW5kZWZpbmVkJyA9PSB0eXBlb2Ygd2luZG93XG4gID8gdGhpc1xuICA6IHdpbmRvdztcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgaG9zdCBvYmplY3QsXG4gKiB3ZSBkb24ndCB3YW50IHRvIHNlcmlhbGl6ZSB0aGVzZSA6KVxuICpcbiAqIFRPRE86IGZ1dHVyZSBwcm9vZiwgbW92ZSB0byBjb21wb2VudCBsYW5kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSG9zdChvYmopIHtcbiAgdmFyIHN0ciA9IHt9LnRvU3RyaW5nLmNhbGwob2JqKTtcblxuICBzd2l0Y2ggKHN0cikge1xuICAgIGNhc2UgJ1tvYmplY3QgRmlsZV0nOlxuICAgIGNhc2UgJ1tvYmplY3QgQmxvYl0nOlxuICAgIGNhc2UgJ1tvYmplY3QgRm9ybURhdGFdJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gZnVuY3Rpb24gKCkge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICYmICgnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2wgfHwgIXJvb3QuQWN0aXZlWE9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICB9IGVsc2Uge1xuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChudWxsICE9IG9ialtrZXldKSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhcnRzO1xuICB2YXIgcGFpcjtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcGFydHMgPSBwYWlyLnNwbGl0KCc9Jyk7XG4gICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICdhcHBsaWNhdGlvbi94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHNlcmlhbGl6ZSxcbiAgICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnlcbiB9O1xuXG4gLyoqXG4gICogRGVmYXVsdCBwYXJzZXJzLlxuICAqXG4gICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAgKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gICogICAgIH07XG4gICpcbiAgKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2Vcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHIpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBmaWVsZHMgPSB7fTtcbiAgdmFyIGluZGV4O1xuICB2YXIgbGluZTtcbiAgdmFyIGZpZWxkO1xuICB2YXIgdmFsO1xuXG4gIGxpbmVzLnBvcCgpOyAvLyB0cmFpbGluZyBDUkxGXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHR5cGUoc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyYW1zKHN0cil7XG4gIHJldHVybiByZWR1Y2Uoc3RyLnNwbGl0KC8gKjsgKi8pLCBmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pXG4gICAgICAsIGtleSA9IHBhcnRzLnNoaWZ0KClcbiAgICAgICwgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICAgIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuICB0aGlzLnRleHQgPSAoKHRoaXMucmVxLm1ldGhvZCAhPSdIRUFEJyAmJiAodGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAnJyB8fCB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JykpIHx8IHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnKVxuICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dFxuICAgICA6IG51bGw7XG4gIHRoaXMuc3RhdHVzVGV4dCA9IHRoaXMucmVxLnhoci5zdGF0dXNUZXh0O1xuICB0aGlzLnNldFN0YXR1c1Byb3BlcnRpZXModGhpcy54aHIuc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLnNldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgPyB0aGlzLnBhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICA6IG51bGw7XG59XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKXtcbiAgLy8gY29udGVudC10eXBlXG4gIHZhciBjdCA9IHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgdGhpcy50eXBlID0gdHlwZShjdCk7XG5cbiAgLy8gcGFyYW1zXG4gIHZhciBvYmogPSBwYXJhbXMoY3QpO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB0aGlzW2tleV0gPSBvYmpba2V5XTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXG4gKlxuICogVXNlZCBmb3IgYXV0by1wYXJzaW5nIG9mIGJvZGllcy4gUGFyc2Vyc1xuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUucGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICByZXR1cm4gcGFyc2UgJiYgc3RyICYmIChzdHIubGVuZ3RoIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdClcbiAgICA/IHBhcnNlKHN0cilcbiAgICA6IG51bGw7XG59O1xuXG4vKipcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxuICpcbiAqIEZvciBleGFtcGxlIGEgMnh4IHJlc3BvbnNlIHdpbGwgZ2l2ZSB5b3UgYSBgLm9rYCBvZiBfX3RydWVfX1xuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxuICogYC5jbGllbnRFcnJvcmAgYW5kIGAuc2VydmVyRXJyb3JgIGFyZSBhbHNvIGF2YWlsYWJsZSB0byBiZSBtb3JlXG4gKiBzcGVjaWZpYywgYW5kIGAuc3RhdHVzVHlwZWAgaXMgdGhlIGNsYXNzIG9mIGVycm9yIHJhbmdpbmcgZnJvbSAxLi41XG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cbiAqXG4gKiBcInN1Z2FyXCIgcHJvcGVydGllcyBhcmUgYWxzbyBkZWZpbmVkIGZvciBjb21tb24gY2FzZXMuIEN1cnJlbnRseSBwcm92aWRpbmc6XG4gKlxuICogICAtIC5ub0NvbnRlbnRcbiAqICAgLSAuYmFkUmVxdWVzdFxuICogICAtIC51bmF1dGhvcml6ZWRcbiAqICAgLSAubm90QWNjZXB0YWJsZVxuICogICAtIC5ub3RGb3VuZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5zZXRTdGF0dXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24oc3RhdHVzKXtcbiAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gIC8vIHN0YXR1cyAvIGNsYXNzXG4gIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gIC8vIGJhc2ljc1xuICB0aGlzLmluZm8gPSAxID09IHR5cGU7XG4gIHRoaXMub2sgPSAyID09IHR5cGU7XG4gIHRoaXMuY2xpZW50RXJyb3IgPSA0ID09IHR5cGU7XG4gIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gIHRoaXMuZXJyb3IgPSAoNCA9PSB0eXBlIHx8IDUgPT0gdHlwZSlcbiAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgOiBmYWxzZTtcblxuICAvLyBzdWdhclxuICB0aGlzLmFjY2VwdGVkID0gMjAyID09IHN0YXR1cztcbiAgdGhpcy5ub0NvbnRlbnQgPSAyMDQgPT0gc3RhdHVzIHx8IDEyMjMgPT0gc3RhdHVzO1xuICB0aGlzLmJhZFJlcXVlc3QgPSA0MDAgPT0gc3RhdHVzO1xuICB0aGlzLnVuYXV0aG9yaXplZCA9IDQwMSA9PSBzdGF0dXM7XG4gIHRoaXMubm90QWNjZXB0YWJsZSA9IDQwNiA9PSBzdGF0dXM7XG4gIHRoaXMubm90Rm91bmQgPSA0MDQgPT0gc3RhdHVzO1xuICB0aGlzLmZvcmJpZGRlbiA9IDQwMyA9PSBzdGF0dXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBgRXJyb3JgIHJlcHJlc2VudGF0aXZlIG9mIHRoaXMgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybiB7RXJyb3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS50b0Vycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHJlcSA9IHRoaXMucmVxO1xuICB2YXIgbWV0aG9kID0gcmVxLm1ldGhvZDtcbiAgdmFyIHVybCA9IHJlcS51cmw7XG5cbiAgdmFyIG1zZyA9ICdjYW5ub3QgJyArIG1ldGhvZCArICcgJyArIHVybCArICcgKCcgKyB0aGlzLnN0YXR1cyArICcpJztcbiAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSBtZXRob2Q7XG4gIGVyci51cmwgPSB1cmw7XG5cbiAgcmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTtcbiAgdGhpcy5faGVhZGVyID0ge307XG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH1cblxuICAgIGlmIChyZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgfVxuXG4gICAgdmFyIG5ld19lcnIgPSBuZXcgRXJyb3IocmVzLnN0YXR1c1RleHQgfHwgJ1Vuc3VjY2Vzc2Z1bCBIVFRQIHJlc3BvbnNlJyk7XG4gICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICBuZXdfZXJyLnJlc3BvbnNlID0gcmVzO1xuICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcblxuICAgIHNlbGYuY2FsbGJhY2soZXJyIHx8IG5ld19lcnIsIHJlcyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24oZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIFNldCB0aW1lb3V0IHRvIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uKG1zKXtcbiAgdGhpcy5fdGltZW91dCA9IG1zO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5fdGltZW91dCA9IDA7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuYWJvcnRlZCkgcmV0dXJuO1xuICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhoci5hYm9ydCgpO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLnNldCgnWC1BUEktS2V5JywgJ2Zvb2JhcicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdYLUFQSS1LZXknOiAnZm9vYmFyJyB9KVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBoZWFkZXIgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmdldEhlYWRlciA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdDb250ZW50LVR5cGUnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IHBhc3NcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcyl7XG4gIHZhciBzdHIgPSBidG9hKHVzZXIgKyAnOicgKyBwYXNzKTtcbiAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHN0cik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4qIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4qXG4qIEV4YW1wbGVzOlxuKlxuKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuKiAgICAgLnF1ZXJ5KCdzaXplPTEwJylcbiogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbipcbiogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSB2YWxcbiogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4qIEBhcGkgcHVibGljXG4qL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHZhbCl7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB2YWwgPSBzZXJpYWxpemUodmFsKTtcbiAgaWYgKHZhbCkgdGhpcy5fcXVlcnkucHVzaCh2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAgZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXG4gKiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZX0gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIHRoaXMuX2Zvcm1EYXRhLmFwcGVuZChuYW1lLCB2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYGZpbGVuYW1lYC5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2gobmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIGZpbGVuYW1lKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB0aGlzLl9mb3JtRGF0YS5hcHBlbmQoZmllbGQsIGZpbGUsIGZpbGVuYW1lKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmQgYGRhdGFgLCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIHF1ZXJ5c3RyaW5nXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3NlYXJjaCcpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbXVsdGlwbGUgZGF0YSBcIndyaXRlc1wiXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3NlYXJjaCcpXG4gKiAgICAgICAgIC5zZW5kKHsgc2VhcmNoOiAncXVlcnknIH0pXG4gKiAgICAgICAgIC5zZW5kKHsgcmFuZ2U6ICcxLi41JyB9KVxuICogICAgICAgICAuc2VuZCh7IG9yZGVyOiAnZGVzYycgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICogICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAgKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gICogICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpe1xuICB2YXIgb2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIHZhciB0eXBlID0gdGhpcy5nZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIC8vIG1lcmdlXG4gIGlmIChvYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghb2JqIHx8IGlzSG9zdChkYXRhKSkgcmV0dXJuIHRoaXM7XG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ09yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcigndGltZW91dCBvZiAnICsgdGltZW91dCArICdtcyBleGNlZWRlZCcpO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxuICogd2l0aCBhbiBpbnN0YW5jZW9mIGBSZXNwb25zZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihmbil7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhociA9IHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKTtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIGlmICg0ICE9IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG5cbiAgICAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG4gICAgdmFyIHN0YXR1cztcbiAgICB0cnkgeyBzdGF0dXMgPSB4aHIuc3RhdHVzIH0gY2F0Y2goZSkgeyBzdGF0dXMgPSAwOyB9XG5cbiAgICBpZiAoMCA9PSBzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0KSByZXR1cm4gc2VsZi50aW1lb3V0RXJyb3IoKTtcbiAgICAgIGlmIChzZWxmLmFib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICB0cnkge1xuICAgIGlmICh4aHIudXBsb2FkICYmIHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wZXJjZW50ID0gZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwO1xuICAgICAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSBjYXRjaChlKSB7XG4gICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgIC8vIFJlcG9ydGVkIGhlcmU6XG4gICAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MzcyNDUveG1saHR0cHJlcXVlc3QtdXBsb2FkLXRocm93cy1pbnZhbGlkLWFyZ3VtZW50LXdoZW4tdXNlZC1mcm9tLXdlYi13b3JrZXItY29udGV4dFxuICB9XG5cbiAgLy8gdGltZW91dFxuICBpZiAodGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYudGltZWRvdXQgPSB0cnVlO1xuICAgICAgc2VsZi5hYm9ydCgpO1xuICAgIH0sIHRpbWVvdXQpO1xuICB9XG5cbiAgLy8gcXVlcnlzdHJpbmdcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdChxdWVyeSk7XG4gICAgdGhpcy51cmwgKz0gfnRoaXMudXJsLmluZGV4T2YoJz8nKVxuICAgICAgPyAnJicgKyBxdWVyeVxuICAgICAgOiAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCdHRVQnICE9IHRoaXMubWV0aG9kICYmICdIRUFEJyAhPSB0aGlzLm1ldGhvZCAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgZGF0YSAmJiAhaXNIb3N0KGRhdGEpKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgdmFyIHNlcmlhbGl6ZSA9IHJlcXVlc3Quc2VyaWFsaXplW3RoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKV07XG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAodmFyIGZpZWxkIGluIHRoaXMuaGVhZGVyKSB7XG4gICAgaWYgKG51bGwgPT0gdGhpcy5oZWFkZXJbZmllbGRdKSBjb250aW51ZTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihmaWVsZCwgdGhpcy5oZWFkZXJbZmllbGRdKTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG4gIHhoci5zZW5kKGRhdGEpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0YC5cbiAqL1xuXG5yZXF1ZXN0LlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIElzc3VlIGEgcmVxdWVzdDpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICByZXF1ZXN0KCdHRVQnLCAnL3VzZXJzJykuZW5kKGNhbGxiYWNrKVxuICogICAgcmVxdWVzdCgnL3VzZXJzJykuZW5kKGNhbGxiYWNrKVxuICogICAgcmVxdWVzdCgnL3VzZXJzJywgY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHVybCBvciBjYWxsYmFja1xuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVxdWVzdChtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QoJ0dFVCcsIG1ldGhvZCk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlcXVlc3QobWV0aG9kLCB1cmwpO1xufVxuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0dFVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmhlYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0hFQUQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZGVsID0gZnVuY3Rpb24odXJsLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdERUxFVEUnLCB1cmwpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQQVRDSCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQQVRDSCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wb3N0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucHV0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQVVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdDtcbiIsIlxuLyoqXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufTtcblxuLyoqXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSlcbiAgICAucHVzaChmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIGZ1bmN0aW9uIG9uKCkge1xuICAgIHNlbGYub2ZmKGV2ZW50LCBvbik7XG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIG9uLmZuID0gZm47XG4gIHRoaXMub24oZXZlbnQsIG9uKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgLy8gYWxsXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHNwZWNpZmljIGV2ZW50XG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG5cbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICB2YXIgY2I7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2IgPSBjYWxsYmFja3NbaV07XG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsIlxuLyoqXG4gKiBSZWR1Y2UgYGFycmAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TWl4ZWR9IGluaXRpYWxcbiAqXG4gKiBUT0RPOiBjb21iYXRpYmxlIGVycm9yIGhhbmRsaW5nP1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBmbiwgaW5pdGlhbCl7ICBcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgY3VyciA9IGFyZ3VtZW50cy5sZW5ndGggPT0gM1xuICAgID8gaW5pdGlhbFxuICAgIDogYXJyW2lkeCsrXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgY3VyciA9IGZuLmNhbGwobnVsbCwgY3VyciwgYXJyW2lkeF0sICsraWR4LCBhcnIpO1xuICB9XG4gIFxuICByZXR1cm4gY3Vycjtcbn07Il19
