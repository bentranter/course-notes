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
 * Routing test shit
 */
var Test = React.createClass({displayName: "Test",
  render: function() {
    console.log('Test passed');
    return null;
  }
});

/**
 * Routing test shit
 */
var Speedread = React.createClass({displayName: "Speedread",
  render: function() {
    console.log('Speedreading some note');
    return null;
  }
});

/**
 * Define routes
 */
var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: App}, 
    React.createElement(Route, {name: "test", path: "/test", handler: Test}), 
    React.createElement(Route, {name: "speedread", path: "/speedread", handler: Speedread})
  )
);

/**
 * Start the Router
 */
Router.run(routes, function(Handler) {
  React.render(React.createElement(Handler, null), document.body);
});
},{"./NoteContainer.js":"/Users/Ben/course-notes/web/react-test/app/NoteContainer.js","./Sidebar.js":"/Users/Ben/course-notes/web/react-test/app/Sidebar.js","./SignInForm.js":"/Users/Ben/course-notes/web/react-test/app/SignInForm.js","./SignInPage.js":"/Users/Ben/course-notes/web/react-test/app/SignInPage.js","react":"react","react-router":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/index.js"}],"/Users/Ben/course-notes/web/react-test/app/EditorButtons.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var EditorButtons = React.createClass({displayName: "EditorButtons",
  render: function() {
    return (
      React.createElement("div", {className: "ml2 mr2 mt3 btl"}, 
        React.createElement("span", {className: "left"}, 
          React.createElement("h5", {className: "m0 py2 small-caps btd"}, "Editor")
        ), 
        React.createElement("span", {className: "right"}, 
          React.createElement("h5", {className: "m0 py2 small-caps light light-gray"}, "Hide")
        ), 
        React.createElement("div", {className: "cf"})
      )
    );
  }
});

module.exports = EditorButtons;
},{"react":"react"}],"/Users/Ben/course-notes/web/react-test/app/NoteContainer.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var NoteContainer = React.createClass({displayName: "NoteContainer",
  render: function() {
    return(
      React.createElement("div", {className: "z1 absolute top-0 left-0 bottom-0 right-offset overflow-auto"}
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
var React        = require('react');
var request      = require('superagent');
var NoteListItem = require('./NoteListItem.js');

var NoteList = React.createClass({displayName: "NoteList",
  render: function() {
    var noteNodes = this.props.data.map(function(note) {
      return (
        React.createElement(NoteListItem, {title: note.title, id: note.id, key: note.id})
      );
    });
    return (
      React.createElement("div", {className: "ml2 mr2 mt3 mb2 btl"}, 
        React.createElement("span", {className: "left"}, 
          React.createElement("h5", {className: "m0 py2 small-caps btd"}, "Your Notes")
        ), 
        React.createElement("span", {className: "right"}, 
          React.createElement("h5", {className: "inline-block m0 mr2 py2 small-caps light blue"}, "New"), 
          React.createElement("h5", {className: "inline-block m0 py2 small-caps light light-gray"}, "Hide")
        ), 
        React.createElement("div", {className: "cf"}), 
        React.createElement("ul", {className: "list-reset"}, 
          noteNodes
        )
      )
    );
  }
});

module.exports = NoteList;
},{"./NoteListItem.js":"/Users/Ben/course-notes/web/react-test/app/NoteListItem.js","react":"react","superagent":"/Users/Ben/course-notes/web/react-test/node_modules/superagent/lib/client.js"}],"/Users/Ben/course-notes/web/react-test/app/NoteListItem.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React  = require('react');
var Link = require('react-router').Link; 

/**
 * Sign in form
 */
var NoteListItem = React.createClass({displayName: "NoteListItem",
  render: function() {
    return (
      React.createElement("li", {className: "noteListItem mb2"}, 
        React.createElement(Link, {to: "speedread", className: "light-gray ml2"}, 
          React.createElement("svg", {width: "12px", height: "12px", viewBox: "0 0 32 32", className: "icon"}, React.createElement("path", {d: "M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 28 16 A12 12 0 0 1 16 28 A12 12 0 0 1 4 16 A12 12 0 0 1 16 4 M14 6 L14 17.25 L22 22 L24.25 18.5 L18 14.75 L18 6z "}))
        ), 
        React.createElement(Link, {to: "test", className: "h5 noteTitle ml2 light-gray light"}, 
          this.props.title
        )
      )
    );
  }
});

module.exports = NoteListItem;
},{"react":"react","react-router":"/Users/Ben/course-notes/web/react-test/node_modules/react-router/lib/index.js"}],"/Users/Ben/course-notes/web/react-test/app/Sidebar.js":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React         = require('react');
var request       = require('superagent');
var SignInPage    = require('./SignInPage.js');
var NoteList      = require('./NoteList.js');
var EditorButtons = require('./EditorButtons.js');

var Sidebar = React.createClass({displayName: "Sidebar",
  getInitialState: function() {
    return {data: []};
  },
  loadNotesFromServer: function() {
    // OH MY GOD
    var self = this;
    request
      .get('http://localhost:3000/api/notes')
      .set('X-Access-Token', window.localStorage.getItem('token'))
      .end(function(err, res) {
        if (res.ok) {
          self.setState({data: res.body});
        } else {
          console.log('Error' + res.text);
        }
      });
  },
  componentDidMount: function() {
    this.loadNotesFromServer();
  },
  render: function() {
    return(
      React.createElement("div", {className: "z1 absolute sidebar top-0 bottom-0 right-0 overflow-auto bg-silver bll"}, 
        React.createElement(SignInPage, {url: "http://localhost:3000/api/login"}), 
        React.createElement(NoteList, {data: this.state.data}), 
        React.createElement(EditorButtons, null)
      )
    );
  }
});

module.exports = Sidebar;
},{"./EditorButtons.js":"/Users/Ben/course-notes/web/react-test/app/EditorButtons.js","./NoteList.js":"/Users/Ben/course-notes/web/react-test/app/NoteList.js","./SignInPage.js":"/Users/Ben/course-notes/web/react-test/app/SignInPage.js","react":"react","superagent":"/Users/Ben/course-notes/web/react-test/node_modules/superagent/lib/client.js"}],"/Users/Ben/course-notes/web/react-test/app/SignInForm.js":[function(require,module,exports){
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
    //
  },
  render: function() {
    return (
      React.createElement("form", {className: "signInForm fieldset-reset", onSubmit: this.handleSubmit, action: "http://localhost:3000/api/login", method: "post"}, 
        React.createElement("input", {className: "block full-width", type: "email", placeholder: "Email", ref: "email"}), 
        React.createElement("input", {className: "block full-width", type: "password", placeholder: "Password", ref: "password"}), 
        React.createElement("input", {className: "button full-width bg-silver small-caps regular blue center", type: "submit", value: "Sign In"})
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
    //
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvbWFpbi5qcyIsImFwcC9FZGl0b3JCdXR0b25zLmpzIiwiYXBwL05vdGVDb250YWluZXIuanMiLCJhcHAvTm90ZUxpc3QuanMiLCJhcHAvTm90ZUxpc3RJdGVtLmpzIiwiYXBwL1NpZGViYXIuanMiLCJhcHAvU2lnbkluRm9ybS5qcyIsImFwcC9TaWduSW5QYWdlLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL0NhbmNlbGxhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL0hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9NYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL05hdmlnYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9QYXRoVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9Qcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9SZWRpcmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvU2Nyb2xsSGlzdG9yeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL1N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvYmVoYXZpb3JzL0ltaXRhdGVCcm93c2VyQmVoYXZpb3IuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9iZWhhdmlvcnMvU2Nyb2xsVG9Ub3BCZWhhdmlvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvQ29udGV4dFdyYXBwZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jb21wb25lbnRzL0RlZmF1bHRSb3V0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvTGluay5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvTm90Rm91bmRSb3V0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2NvbXBvbmVudHMvUmVkaXJlY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jb21wb25lbnRzL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvY29tcG9uZW50cy9Sb3V0ZUhhbmRsZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVSb3V0ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2dldFdpbmRvd1Njcm9sbFBvc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9pc1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9sb2NhdGlvbnMvSGFzaExvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvbG9jYXRpb25zL0hpc3RvcnlMb2NhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbGliL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9sb2NhdGlvbnMvU3RhdGljTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2xpYi9sb2NhdGlvbnMvVGVzdExvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvcnVuUm91dGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9saWIvc3VwcG9ydHNIaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3FzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCAgICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgICAgICAgID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgTm90ZUNvbnRhaW5lciA9IHJlcXVpcmUoJy4vTm90ZUNvbnRhaW5lci5qcycpO1xudmFyIFNpZGViYXIgICAgICAgPSByZXF1aXJlKCcuL1NpZGViYXIuanMnKTtcbnZhciBTaWduSW5Gb3JtICAgID0gcmVxdWlyZSgnLi9TaWduSW5Gb3JtLmpzJyk7XG52YXIgU2lnbkluUGFnZSAgICA9IHJlcXVpcmUoJy4vU2lnbkluUGFnZS5qcycpO1xuXG52YXIgRGVmYXVsdFJvdXRlICA9IFJvdXRlci5EZWZhdWx0Um91dGU7XG52YXIgTGluayAgICAgICAgICA9IFJvdXRlci5MaW5rO1xudmFyIFJvdXRlICAgICAgICAgPSBSb3V0ZXIuUm91dGU7XG52YXIgUm91dGVIYW5kbGVyICA9IFJvdXRlci5Sb3V0ZUhhbmRsZXI7XG5cbi8qKlxuICogQXBwIG1haW4gZW50cnkgcG9pbnRcbiAqL1xudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOb3RlQ29udGFpbmVyLCBudWxsKSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZWJhciwgbnVsbCksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlSGFuZGxlciwgbnVsbClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxuLyoqXG4gKiBSb3V0aW5nIHRlc3Qgc2hpdFxuICovXG52YXIgVGVzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUZXN0XCIsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1Rlc3QgcGFzc2VkJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJvdXRpbmcgdGVzdCBzaGl0XG4gKi9cbnZhciBTcGVlZHJlYWQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU3BlZWRyZWFkXCIsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ1NwZWVkcmVhZGluZyBzb21lIG5vdGUnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufSk7XG5cbi8qKlxuICogRGVmaW5lIHJvdXRlc1xuICovXG52YXIgcm91dGVzID0gKFxuICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7bmFtZTogXCJhcHBcIiwgcGF0aDogXCIvXCIsIGhhbmRsZXI6IEFwcH0sIFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtuYW1lOiBcInRlc3RcIiwgcGF0aDogXCIvdGVzdFwiLCBoYW5kbGVyOiBUZXN0fSksIFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtuYW1lOiBcInNwZWVkcmVhZFwiLCBwYXRoOiBcIi9zcGVlZHJlYWRcIiwgaGFuZGxlcjogU3BlZWRyZWFkfSlcbiAgKVxuKTtcblxuLyoqXG4gKiBTdGFydCB0aGUgUm91dGVyXG4gKi9cblJvdXRlci5ydW4ocm91dGVzLCBmdW5jdGlvbihIYW5kbGVyKSB7XG4gIFJlYWN0LnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KEhhbmRsZXIsIG51bGwpLCBkb2N1bWVudC5ib2R5KTtcbn0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgRWRpdG9yQnV0dG9ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJFZGl0b3JCdXR0b25zXCIsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtbDIgbXIyIG10MyBidGxcIn0sIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImxlZnRcIn0sIFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNVwiLCB7Y2xhc3NOYW1lOiBcIm0wIHB5MiBzbWFsbC1jYXBzIGJ0ZFwifSwgXCJFZGl0b3JcIilcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwicmlnaHRcIn0sIFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNVwiLCB7Y2xhc3NOYW1lOiBcIm0wIHB5MiBzbWFsbC1jYXBzIGxpZ2h0IGxpZ2h0LWdyYXlcIn0sIFwiSGlkZVwiKVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImNmXCJ9KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvckJ1dHRvbnM7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBOb3RlQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk5vdGVDb250YWluZXJcIixcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiejEgYWJzb2x1dGUgdG9wLTAgbGVmdC0wIGJvdHRvbS0wIHJpZ2h0LW9mZnNldCBvdmVyZmxvdy1hdXRvXCJ9XG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm90ZUNvbnRhaW5lcjsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xudmFyIFJlYWN0ICAgICAgICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgcmVxdWVzdCAgICAgID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpO1xudmFyIE5vdGVMaXN0SXRlbSA9IHJlcXVpcmUoJy4vTm90ZUxpc3RJdGVtLmpzJyk7XG5cbnZhciBOb3RlTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJOb3RlTGlzdFwiLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBub3RlTm9kZXMgPSB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uKG5vdGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90ZUxpc3RJdGVtLCB7dGl0bGU6IG5vdGUudGl0bGUsIGlkOiBub3RlLmlkLCBrZXk6IG5vdGUuaWR9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1sMiBtcjIgbXQzIG1iMiBidGxcIn0sIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImxlZnRcIn0sIFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNVwiLCB7Y2xhc3NOYW1lOiBcIm0wIHB5MiBzbWFsbC1jYXBzIGJ0ZFwifSwgXCJZb3VyIE5vdGVzXCIpXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInJpZ2h0XCJ9LCBcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwge2NsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgbTAgbXIyIHB5MiBzbWFsbC1jYXBzIGxpZ2h0IGJsdWVcIn0sIFwiTmV3XCIpLCBcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDVcIiwge2NsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgbTAgcHkyIHNtYWxsLWNhcHMgbGlnaHQgbGlnaHQtZ3JheVwifSwgXCJIaWRlXCIpXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiY2ZcIn0pLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtjbGFzc05hbWU6IFwibGlzdC1yZXNldFwifSwgXG4gICAgICAgICAgbm90ZU5vZGVzXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RlTGlzdDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xudmFyIFJlYWN0ICA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTGluayA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpLkxpbms7IFxuXG4vKipcbiAqIFNpZ24gaW4gZm9ybVxuICovXG52YXIgTm90ZUxpc3RJdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk5vdGVMaXN0SXRlbVwiLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge2NsYXNzTmFtZTogXCJub3RlTGlzdEl0ZW0gbWIyXCJ9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7dG86IFwic3BlZWRyZWFkXCIsIGNsYXNzTmFtZTogXCJsaWdodC1ncmF5IG1sMlwifSwgXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7d2lkdGg6IFwiMTJweFwiLCBoZWlnaHQ6IFwiMTJweFwiLCB2aWV3Qm94OiBcIjAgMCAzMiAzMlwiLCBjbGFzc05hbWU6IFwiaWNvblwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge2Q6IFwiTTE2IDAgQTE2IDE2IDAgMCAwIDAgMTYgQTE2IDE2IDAgMCAwIDE2IDMyIEExNiAxNiAwIDAgMCAzMiAxNiBBMTYgMTYgMCAwIDAgMTYgMCBNMTYgNCBBMTIgMTIgMCAwIDEgMjggMTYgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSA0IDE2IEExMiAxMiAwIDAgMSAxNiA0IE0xNCA2IEwxNCAxNy4yNSBMMjIgMjIgTDI0LjI1IDE4LjUgTDE4IDE0Ljc1IEwxOCA2eiBcIn0pKVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCB7dG86IFwidGVzdFwiLCBjbGFzc05hbWU6IFwiaDUgbm90ZVRpdGxlIG1sMiBsaWdodC1ncmF5IGxpZ2h0XCJ9LCBcbiAgICAgICAgICB0aGlzLnByb3BzLnRpdGxlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RlTGlzdEl0ZW07IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCAgICAgICAgID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciByZXF1ZXN0ICAgICAgID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpO1xudmFyIFNpZ25JblBhZ2UgICAgPSByZXF1aXJlKCcuL1NpZ25JblBhZ2UuanMnKTtcbnZhciBOb3RlTGlzdCAgICAgID0gcmVxdWlyZSgnLi9Ob3RlTGlzdC5qcycpO1xudmFyIEVkaXRvckJ1dHRvbnMgPSByZXF1aXJlKCcuL0VkaXRvckJ1dHRvbnMuanMnKTtcblxudmFyIFNpZGViYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2lkZWJhclwiLFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7ZGF0YTogW119O1xuICB9LFxuICBsb2FkTm90ZXNGcm9tU2VydmVyOiBmdW5jdGlvbigpIHtcbiAgICAvLyBPSCBNWSBHT0RcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmVxdWVzdFxuICAgICAgLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9ub3RlcycpXG4gICAgICAuc2V0KCdYLUFjY2Vzcy1Ub2tlbicsIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSlcbiAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2RhdGE6IHJlcy5ib2R5fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJyArIHJlcy50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxvYWROb3Rlc0Zyb21TZXJ2ZXIoKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiejEgYWJzb2x1dGUgc2lkZWJhciB0b3AtMCBib3R0b20tMCByaWdodC0wIG92ZXJmbG93LWF1dG8gYmctc2lsdmVyIGJsbFwifSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lnbkluUGFnZSwge3VybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2xvZ2luXCJ9KSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90ZUxpc3QsIHtkYXRhOiB0aGlzLnN0YXRlLmRhdGF9KSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRWRpdG9yQnV0dG9ucywgbnVsbClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWRlYmFyOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vKipcbiAqIFNpZ24gaW4gZm9ybVxuICovXG52YXIgU2lnbkluRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTaWduSW5Gb3JtXCIsXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgZW1haWwgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZW1haWwpLnZhbHVlLnRyaW0oKTtcbiAgICB2YXIgcGFzc3dvcmQgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMucGFzc3dvcmQpLnZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU3VibWl0KHtcbiAgICAgIHVzZXJuYW1lOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgIH0pO1xuICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5lbWFpbCkudmFsdWUgPSAnJztcbiAgICBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMucGFzc3dvcmQpLnZhbHVlID0gJyc7XG4gICAgcmV0dXJuO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgLy9cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge2NsYXNzTmFtZTogXCJzaWduSW5Gb3JtIGZpZWxkc2V0LXJlc2V0XCIsIG9uU3VibWl0OiB0aGlzLmhhbmRsZVN1Ym1pdCwgYWN0aW9uOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvbG9naW5cIiwgbWV0aG9kOiBcInBvc3RcIn0sIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge2NsYXNzTmFtZTogXCJibG9jayBmdWxsLXdpZHRoXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiRW1haWxcIiwgcmVmOiBcImVtYWlsXCJ9KSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7Y2xhc3NOYW1lOiBcImJsb2NrIGZ1bGwtd2lkdGhcIiwgdHlwZTogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiLCByZWY6IFwicGFzc3dvcmRcIn0pLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtjbGFzc05hbWU6IFwiYnV0dG9uIGZ1bGwtd2lkdGggYmctc2lsdmVyIHNtYWxsLWNhcHMgcmVndWxhciBibHVlIGNlbnRlclwiLCB0eXBlOiBcInN1Ym1pdFwiLCB2YWx1ZTogXCJTaWduIEluXCJ9KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25JbkZvcm07IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKTtcbnZhciBTaWduSW5Gb3JtID0gcmVxdWlyZSgnLi9TaWduSW5Gb3JtLmpzJyk7XG4vKipcbiAqIFNpZ24gaW4gcGFnZVxuICovXG52YXIgU2lnbkluUGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTaWduSW5QYWdlXCIsXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvL1xuICB9LFxuICBoYW5kbGVTaWduSW46IGZ1bmN0aW9uKHVzZXJJbmZvKSB7XG4gICAgcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5wcm9wcy51cmwpXG4gICAgICAuc2VuZCh1c2VySW5mbylcbiAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCByZXMuYm9keS50b2tlbik7XG4gICAgICAgICAgY29uc29sZS5sb2cod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnT2ggbm8hIGVycm9yICcgKyByZXMudGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IGZpcmVkJyk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzaWduSW5QYWdlIG1sMiBtcjIgbXQyIGJ0bFwifSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwibGVmdFwifSwgXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg1XCIsIHtjbGFzc05hbWU6IFwibTAgcHkyIHNtYWxsLWNhcHMgYnRkXCJ9LCBcIlNpZ24gaW4gdG8gU3R1ZHlQaWdneVwiKVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJyaWdodFwifSwgXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg1XCIsIHtjbGFzc05hbWU6IFwibTAgcHkyIHNtYWxsLWNhcHMgbGlnaHQgbGlnaHQtZ3JheVwifSwgXCJGb3Jnb3QgcGFzc3dvcmQ/XCIpXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiY2ZcIn0pLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWduSW5Gb3JtLCB7b25TdWJtaXQ6IHRoaXMuaGFuZGxlU2lnbklufSlcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduSW5QYWdlOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhbk11dGF0aW9uT2JzZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IFtdO1xuXG4gICAgaWYgKGNhbk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIGhpZGRlbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWV1ZUxpc3QgPSBxdWV1ZS5zbGljZSgpO1xuICAgICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHF1ZXVlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoaWRkZW5EaXYsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuRGl2LnNldEF0dHJpYnV0ZSgneWVzJywgJ25vJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2FuY2VsbGF0aW9uIGNhdXNlZCBieSBuYXZpZ2F0aW5nIGF3YXlcbiAqIGJlZm9yZSB0aGUgcHJldmlvdXMgdHJhbnNpdGlvbiBoYXMgZnVsbHkgcmVzb2x2ZWQuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGxhdGlvbigpIHt9XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsbGF0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcInJlYWN0L2xpYi9pbnZhcmlhbnRcIik7XG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZShcInJlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudFwiKS5jYW5Vc2VET007XG5cbnZhciBIaXN0b3J5ID0ge1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBudW1iZXIgb2YgZW50cmllcyBpbiB0aGUgaGlzdG9yeS5cbiAgICpcbiAgICogTm90ZTogVGhpcyBwcm9wZXJ0eSBpcyByZWFkLW9ubHkuXG4gICAqL1xuICBsZW5ndGg6IDEsXG5cbiAgLyoqXG4gICAqIFNlbmRzIHRoZSBicm93c2VyIGJhY2sgb25lIGVudHJ5IGluIHRoZSBoaXN0b3J5LlxuICAgKi9cbiAgYmFjazogZnVuY3Rpb24gYmFjaygpIHtcbiAgICBpbnZhcmlhbnQoY2FuVXNlRE9NLCBcIkNhbm5vdCB1c2UgSGlzdG9yeS5iYWNrIHdpdGhvdXQgYSBET01cIik7XG5cbiAgICAvLyBEbyB0aGlzIGZpcnN0IHNvIHRoYXQgSGlzdG9yeS5sZW5ndGggd2lsbFxuICAgIC8vIGJlIGFjY3VyYXRlIGluIGxvY2F0aW9uIGNoYW5nZSBsaXN0ZW5lcnMuXG4gICAgSGlzdG9yeS5sZW5ndGggLT0gMTtcblxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpc3Rvcnk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIga2V5IGluIHByb3BzKSB7IHZhciBwcm9wID0gcHJvcHNba2V5XTsgcHJvcC5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7IH0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG4vKiBqc2hpbnQgLVcwODQgKi9cbnZhciBQYXRoVXRpbHMgPSByZXF1aXJlKFwiLi9QYXRoVXRpbHNcIik7XG5cbmZ1bmN0aW9uIGRlZXBTZWFyY2gocm91dGUsIHBhdGhuYW1lLCBxdWVyeSkge1xuICAvLyBDaGVjayB0aGUgc3VidHJlZSBmaXJzdCB0byBmaW5kIHRoZSBtb3N0IGRlZXBseS1uZXN0ZWQgbWF0Y2guXG4gIHZhciBjaGlsZFJvdXRlcyA9IHJvdXRlLmNoaWxkUm91dGVzO1xuICBpZiAoY2hpbGRSb3V0ZXMpIHtcbiAgICB2YXIgbWF0Y2gsIGNoaWxkUm91dGU7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoaWxkUm91dGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjaGlsZFJvdXRlID0gY2hpbGRSb3V0ZXNbaV07XG5cbiAgICAgIGlmIChjaGlsZFJvdXRlLmlzRGVmYXVsdCB8fCBjaGlsZFJvdXRlLmlzTm90Rm91bmQpIGNvbnRpbnVlOyAvLyBDaGVjayB0aGVzZSBpbiBvcmRlciBsYXRlci5cblxuICAgICAgaWYgKG1hdGNoID0gZGVlcFNlYXJjaChjaGlsZFJvdXRlLCBwYXRobmFtZSwgcXVlcnkpKSB7XG4gICAgICAgIC8vIEEgcm91dGUgaW4gdGhlIHN1YnRyZWUgbWF0Y2hlZCEgQWRkIHRoaXMgcm91dGUgYW5kIHdlJ3JlIGRvbmUuXG4gICAgICAgIG1hdGNoLnJvdXRlcy51bnNoaWZ0KHJvdXRlKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE5vIGNoaWxkIHJvdXRlcyBtYXRjaGVkOyB0cnkgdGhlIGRlZmF1bHQgcm91dGUuXG4gIHZhciBkZWZhdWx0Um91dGUgPSByb3V0ZS5kZWZhdWx0Um91dGU7XG4gIGlmIChkZWZhdWx0Um91dGUgJiYgKHBhcmFtcyA9IFBhdGhVdGlscy5leHRyYWN0UGFyYW1zKGRlZmF1bHRSb3V0ZS5wYXRoLCBwYXRobmFtZSkpKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRjaChwYXRobmFtZSwgcGFyYW1zLCBxdWVyeSwgW3JvdXRlLCBkZWZhdWx0Um91dGVdKTtcbiAgfSAvLyBEb2VzIHRoZSBcIm5vdCBmb3VuZFwiIHJvdXRlIG1hdGNoP1xuICB2YXIgbm90Rm91bmRSb3V0ZSA9IHJvdXRlLm5vdEZvdW5kUm91dGU7XG4gIGlmIChub3RGb3VuZFJvdXRlICYmIChwYXJhbXMgPSBQYXRoVXRpbHMuZXh0cmFjdFBhcmFtcyhub3RGb3VuZFJvdXRlLnBhdGgsIHBhdGhuYW1lKSkpIHtcbiAgICByZXR1cm4gbmV3IE1hdGNoKHBhdGhuYW1lLCBwYXJhbXMsIHF1ZXJ5LCBbcm91dGUsIG5vdEZvdW5kUm91dGVdKTtcbiAgfSAvLyBMYXN0IGF0dGVtcHQ6IGNoZWNrIHRoaXMgcm91dGUuXG4gIHZhciBwYXJhbXMgPSBQYXRoVXRpbHMuZXh0cmFjdFBhcmFtcyhyb3V0ZS5wYXRoLCBwYXRobmFtZSk7XG4gIGlmIChwYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IE1hdGNoKHBhdGhuYW1lLCBwYXJhbXMsIHF1ZXJ5LCBbcm91dGVdKTtcbiAgfXJldHVybiBudWxsO1xufVxuXG52YXIgTWF0Y2ggPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNYXRjaChwYXRobmFtZSwgcGFyYW1zLCBxdWVyeSwgcm91dGVzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1hdGNoKTtcblxuICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWF0Y2gsIG51bGwsIHtcbiAgICBmaW5kTWF0Y2g6IHtcblxuICAgICAgLyoqXG4gICAgICAgKiBBdHRlbXB0cyB0byBtYXRjaCBkZXB0aC1maXJzdCBhIHJvdXRlIGluIHRoZSBnaXZlbiByb3V0ZSdzXG4gICAgICAgKiBzdWJ0cmVlIGFnYWluc3QgdGhlIGdpdmVuIHBhdGggYW5kIHJldHVybnMgdGhlIG1hdGNoIGlmIGl0XG4gICAgICAgKiBzdWNjZWVkcywgbnVsbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICAgICAqL1xuXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZmluZE1hdGNoKHJvdXRlcywgcGF0aCkge1xuICAgICAgICB2YXIgcGF0aG5hbWUgPSBQYXRoVXRpbHMud2l0aG91dFF1ZXJ5KHBhdGgpO1xuICAgICAgICB2YXIgcXVlcnkgPSBQYXRoVXRpbHMuZXh0cmFjdFF1ZXJ5KHBhdGgpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByb3V0ZXMubGVuZ3RoOyBtYXRjaCA9PSBudWxsICYmIGkgPCBsZW47ICsraSkgbWF0Y2ggPSBkZWVwU2VhcmNoKHJvdXRlc1tpXSwgcGF0aG5hbWUsIHF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gTWF0Y2g7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGNoOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoXCJyZWFjdC9saWIvd2FybmluZ1wiKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi9Qcm9wVHlwZXNcIik7XG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZWRNZXRob2Qocm91dGVyTWV0aG9kTmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB3YXJuaW5nKGZhbHNlLCBcIlJvdXRlci5OYXZpZ2F0aW9uIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdGhpcy5jb250ZXh0LnJvdXRlci5cIiArIHJvdXRlck1ldGhvZE5hbWUgKyBcIigpIGluc3RlYWRcIik7XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIG1peGluIGZvciBjb21wb25lbnRzIHRoYXQgbW9kaWZ5IHRoZSBVUkwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgbWl4aW5zOiBbIFJvdXRlci5OYXZpZ2F0aW9uIF0sXG4gKiAgICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAqICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gKiAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnYVJvdXRlJywgeyB0aGU6ICdwYXJhbXMnIH0sIHsgdGhlOiAncXVlcnknIH0pO1xuICogICAgIH0sXG4gKiAgICAgcmVuZGVyKCkge1xuICogICAgICAgcmV0dXJuIChcbiAqICAgICAgICAgPGEgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgbWUhPC9hPlxuICogICAgICAgKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICovXG52YXIgTmF2aWdhdGlvbiA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICByb3V0ZXI6IFByb3BUeXBlcy5yb3V0ZXIuaXNSZXF1aXJlZFxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFic29sdXRlIFVSTCBwYXRoIGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW4gcm91dGVcbiAgICogbmFtZSwgVVJMIHBhcmFtZXRlcnMsIGFuZCBxdWVyeSB2YWx1ZXMuXG4gICAqL1xuICBtYWtlUGF0aDogZGVwcmVjYXRlZE1ldGhvZChcIm1ha2VQYXRoXCIsIGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSksXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCBtYXkgc2FmZWx5IGJlIHVzZWQgYXMgdGhlIGhyZWYgb2YgYVxuICAgKiBsaW5rIHRvIHRoZSByb3V0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgbWFrZUhyZWY6IGRlcHJlY2F0ZWRNZXRob2QoXCJtYWtlSHJlZlwiLCBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlci5tYWtlSHJlZih0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0pLFxuXG4gIC8qKlxuICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHB1c2hpbmdcbiAgICogYSBuZXcgVVJMIG9udG8gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAqL1xuICB0cmFuc2l0aW9uVG86IGRlcHJlY2F0ZWRNZXRob2QoXCJ0cmFuc2l0aW9uVG9cIiwgZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8odG8sIHBhcmFtcywgcXVlcnkpO1xuICB9KSxcblxuICAvKipcbiAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSByZXBsYWNpbmdcbiAgICogdGhlIGN1cnJlbnQgVVJMIGluIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgcmVwbGFjZVdpdGg6IGRlcHJlY2F0ZWRNZXRob2QoXCJyZXBsYWNlV2l0aFwiLCBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2VXaXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSksXG5cbiAgLyoqXG4gICAqIFRyYW5zaXRpb25zIHRvIHRoZSBwcmV2aW91cyBVUkwuXG4gICAqL1xuICBnb0JhY2s6IGRlcHJlY2F0ZWRNZXRob2QoXCJnb0JhY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpO1xuICB9KVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKFwib2JqZWN0LWFzc2lnblwiKTtcbnZhciBxcyA9IHJlcXVpcmUoXCJxc1wiKTtcblxudmFyIHBhcmFtQ29tcGlsZU1hdGNoZXIgPSAvOihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopfFsqLigpXFxbXFxdXFxcXCt8e31eJF0vZztcbnZhciBwYXJhbUluamVjdE1hdGNoZXIgPSAvOihbYS16QS1aXyRdW2EtekEtWjAtOV8kP10qWz9dPyl8WypdL2c7XG52YXIgcGFyYW1JbmplY3RUcmFpbGluZ1NsYXNoTWF0Y2hlciA9IC9cXC9cXC9cXD98XFwvXFw/XFwvfFxcL1xcPy9nO1xudmFyIHF1ZXJ5TWF0Y2hlciA9IC9cXD8oLiopJC87XG5cbnZhciBfY29tcGlsZWRQYXR0ZXJucyA9IHt9O1xuXG5mdW5jdGlvbiBjb21waWxlUGF0dGVybihwYXR0ZXJuKSB7XG4gIGlmICghKHBhdHRlcm4gaW4gX2NvbXBpbGVkUGF0dGVybnMpKSB7XG4gICAgdmFyIHBhcmFtTmFtZXMgPSBbXTtcbiAgICB2YXIgc291cmNlID0gcGF0dGVybi5yZXBsYWNlKHBhcmFtQ29tcGlsZU1hdGNoZXIsIGZ1bmN0aW9uIChtYXRjaCwgcGFyYW1OYW1lKSB7XG4gICAgICBpZiAocGFyYW1OYW1lKSB7XG4gICAgICAgIHBhcmFtTmFtZXMucHVzaChwYXJhbU5hbWUpO1xuICAgICAgICByZXR1cm4gXCIoW14vPyNdKylcIjtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2ggPT09IFwiKlwiKSB7XG4gICAgICAgIHBhcmFtTmFtZXMucHVzaChcInNwbGF0XCIpO1xuICAgICAgICByZXR1cm4gXCIoLio/KVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiXFxcXFwiICsgbWF0Y2g7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBfY29tcGlsZWRQYXR0ZXJuc1twYXR0ZXJuXSA9IHtcbiAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAoXCJeXCIgKyBzb3VyY2UgKyBcIiRcIiwgXCJpXCIpLFxuICAgICAgcGFyYW1OYW1lczogcGFyYW1OYW1lc1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2NvbXBpbGVkUGF0dGVybnNbcGF0dGVybl07XG59XG5cbnZhciBQYXRoVXRpbHMgPSB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gcGF0aCBpcyBhYnNvbHV0ZS5cbiAgICovXG4gIGlzQWJzb2x1dGU6IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkge1xuICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gXCIvXCI7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEpvaW5zIHR3byBVUkwgcGF0aHMgdG9nZXRoZXIuXG4gICAqL1xuICBqb2luOiBmdW5jdGlvbiBqb2luKGEsIGIpIHtcbiAgICByZXR1cm4gYS5yZXBsYWNlKC9cXC8qJC8sIFwiL1wiKSArIGI7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIG5hbWVzIG9mIGFsbCBwYXJhbWV0ZXJzIGluIHRoZSBnaXZlbiBwYXR0ZXJuLlxuICAgKi9cbiAgZXh0cmFjdFBhcmFtTmFtZXM6IGZ1bmN0aW9uIGV4dHJhY3RQYXJhbU5hbWVzKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gY29tcGlsZVBhdHRlcm4ocGF0dGVybikucGFyYW1OYW1lcztcbiAgfSxcblxuICAvKipcbiAgICogRXh0cmFjdHMgdGhlIHBvcnRpb25zIG9mIHRoZSBnaXZlbiBVUkwgcGF0aCB0aGF0IG1hdGNoIHRoZSBnaXZlbiBwYXR0ZXJuXG4gICAqIGFuZCByZXR1cm5zIGFuIG9iamVjdCBvZiBwYXJhbSBuYW1lID0+IHZhbHVlIHBhaXJzLiBSZXR1cm5zIG51bGwgaWYgdGhlXG4gICAqIHBhdHRlcm4gZG9lcyBub3QgbWF0Y2ggdGhlIGdpdmVuIHBhdGguXG4gICAqL1xuICBleHRyYWN0UGFyYW1zOiBmdW5jdGlvbiBleHRyYWN0UGFyYW1zKHBhdHRlcm4sIHBhdGgpIHtcbiAgICB2YXIgX2NvbXBpbGVQYXR0ZXJuID0gY29tcGlsZVBhdHRlcm4ocGF0dGVybik7XG5cbiAgICB2YXIgbWF0Y2hlciA9IF9jb21waWxlUGF0dGVybi5tYXRjaGVyO1xuICAgIHZhciBwYXJhbU5hbWVzID0gX2NvbXBpbGVQYXR0ZXJuLnBhcmFtTmFtZXM7XG5cbiAgICB2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKG1hdGNoZXIpO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfXZhciBwYXJhbXMgPSB7fTtcblxuICAgIHBhcmFtTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW1OYW1lLCBpbmRleCkge1xuICAgICAgcGFyYW1zW3BhcmFtTmFtZV0gPSBtYXRjaFtpbmRleCArIDFdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHJvdXRlIHBhdGggd2l0aCBwYXJhbXMgaW50ZXJwb2xhdGVkLiBUaHJvd3NcbiAgICogaWYgdGhlcmUgaXMgYSBkeW5hbWljIHNlZ21lbnQgb2YgdGhlIHJvdXRlIHBhdGggZm9yIHdoaWNoIHRoZXJlIGlzIG5vIHBhcmFtLlxuICAgKi9cbiAgaW5qZWN0UGFyYW1zOiBmdW5jdGlvbiBpbmplY3RQYXJhbXMocGF0dGVybiwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXG4gICAgdmFyIHNwbGF0SW5kZXggPSAwO1xuXG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZShwYXJhbUluamVjdE1hdGNoZXIsIGZ1bmN0aW9uIChtYXRjaCwgcGFyYW1OYW1lKSB7XG4gICAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWUgfHwgXCJzcGxhdFwiO1xuXG4gICAgICAvLyBJZiBwYXJhbSBpcyBvcHRpb25hbCBkb24ndCBjaGVjayBmb3IgZXhpc3RlbmNlXG4gICAgICBpZiAocGFyYW1OYW1lLnNsaWNlKC0xKSA9PT0gXCI/XCIpIHtcbiAgICAgICAgcGFyYW1OYW1lID0gcGFyYW1OYW1lLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICBpZiAocGFyYW1zW3BhcmFtTmFtZV0gPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnZhcmlhbnQocGFyYW1zW3BhcmFtTmFtZV0gIT0gbnVsbCwgXCJNaXNzaW5nIFxcXCIlc1xcXCIgcGFyYW1ldGVyIGZvciBwYXRoIFxcXCIlc1xcXCJcIiwgcGFyYW1OYW1lLCBwYXR0ZXJuKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlZ21lbnQ7XG4gICAgICBpZiAocGFyYW1OYW1lID09PSBcInNwbGF0XCIgJiYgQXJyYXkuaXNBcnJheShwYXJhbXNbcGFyYW1OYW1lXSkpIHtcbiAgICAgICAgc2VnbWVudCA9IHBhcmFtc1twYXJhbU5hbWVdW3NwbGF0SW5kZXgrK107XG5cbiAgICAgICAgaW52YXJpYW50KHNlZ21lbnQgIT0gbnVsbCwgXCJNaXNzaW5nIHNwbGF0ICMgJXMgZm9yIHBhdGggXFxcIiVzXFxcIlwiLCBzcGxhdEluZGV4LCBwYXR0ZXJuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlZ21lbnQgPSBwYXJhbXNbcGFyYW1OYW1lXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgfSkucmVwbGFjZShwYXJhbUluamVjdFRyYWlsaW5nU2xhc2hNYXRjaGVyLCBcIi9cIik7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgaXMgdGhlIHJlc3VsdCBvZiBwYXJzaW5nIGFueSBxdWVyeSBzdHJpbmcgY29udGFpbmVkXG4gICAqIGluIHRoZSBnaXZlbiBwYXRoLCBudWxsIGlmIHRoZSBwYXRoIGNvbnRhaW5zIG5vIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIGV4dHJhY3RRdWVyeTogZnVuY3Rpb24gZXh0cmFjdFF1ZXJ5KHBhdGgpIHtcbiAgICB2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKHF1ZXJ5TWF0Y2hlcik7XG4gICAgcmV0dXJuIG1hdGNoICYmIHFzLnBhcnNlKG1hdGNoWzFdKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHBhdGggd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgd2l0aG91dFF1ZXJ5OiBmdW5jdGlvbiB3aXRob3V0UXVlcnkocGF0aCkge1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UocXVlcnlNYXRjaGVyLCBcIlwiKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHBhdGggd2l0aCB0aGUgcGFyYW1ldGVycyBpbiB0aGUgZ2l2ZW5cbiAgICogcXVlcnkgbWVyZ2VkIGludG8gdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIHdpdGhRdWVyeTogZnVuY3Rpb24gd2l0aFF1ZXJ5KHBhdGgsIHF1ZXJ5KSB7XG4gICAgdmFyIGV4aXN0aW5nUXVlcnkgPSBQYXRoVXRpbHMuZXh0cmFjdFF1ZXJ5KHBhdGgpO1xuXG4gICAgaWYgKGV4aXN0aW5nUXVlcnkpIHF1ZXJ5ID0gcXVlcnkgPyBvYmplY3RBc3NpZ24oZXhpc3RpbmdRdWVyeSwgcXVlcnkpIDogZXhpc3RpbmdRdWVyeTtcblxuICAgIHZhciBxdWVyeVN0cmluZyA9IHFzLnN0cmluZ2lmeShxdWVyeSwgeyBhcnJheUZvcm1hdDogXCJicmFja2V0c1wiIH0pO1xuXG4gICAgaWYgKHF1ZXJ5U3RyaW5nKSB7XG4gICAgICByZXR1cm4gUGF0aFV0aWxzLndpdGhvdXRRdWVyeShwYXRoKSArIFwiP1wiICsgcXVlcnlTdHJpbmc7XG4gICAgfXJldHVybiBQYXRoVXRpbHMud2l0aG91dFF1ZXJ5KHBhdGgpO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGF0aFV0aWxzOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZShcInJlYWN0L2xpYi9PYmplY3QuYXNzaWduXCIpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gcmVxdWlyZShcInJlYWN0XCIpLlByb3BUeXBlcztcbnZhciBSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpO1xuXG52YXIgUHJvcFR5cGVzID0gYXNzaWduKHt9LCBSZWFjdFByb3BUeXBlcywge1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCBhIHByb3Agc2hvdWxkIGJlIGZhbHN5LlxuICAgKi9cbiAgZmFsc3k6IGZ1bmN0aW9uIGZhbHN5KHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgIGlmIChwcm9wc1twcm9wTmFtZV0pIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCI8XCIgKyBjb21wb25lbnROYW1lICsgXCI+IG1heSBub3QgaGF2ZSBhIFxcXCJcIiArIHByb3BOYW1lICsgXCJcXFwiIHByb3BcIik7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCBhIHByb3Agc2hvdWxkIGJlIGEgUm91dGUgb2JqZWN0LlxuICAgKi9cbiAgcm91dGU6IFJlYWN0UHJvcFR5cGVzLmluc3RhbmNlT2YoUm91dGUpLFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCBhIHByb3Agc2hvdWxkIGJlIGEgUm91dGVyIG9iamVjdC5cbiAgICovXG4gIC8vcm91dGVyOiBSZWFjdFByb3BUeXBlcy5pbnN0YW5jZU9mKFJvdXRlcikgLy8gVE9ET1xuICByb3V0ZXI6IFJlYWN0UHJvcFR5cGVzLmZ1bmNcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvcFR5cGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhIHJlZGlyZWN0IHRvIHRoZSBnaXZlbiByb3V0ZS5cbiAqL1xuZnVuY3Rpb24gUmVkaXJlY3QodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgdGhpcy50byA9IHRvO1xuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZGlyZWN0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCJyZWFjdC9saWIvT2JqZWN0LmFzc2lnblwiKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZShcInJlYWN0L2xpYi93YXJuaW5nXCIpO1xudmFyIFBhdGhVdGlscyA9IHJlcXVpcmUoXCIuL1BhdGhVdGlsc1wiKTtcblxudmFyIF9jdXJyZW50Um91dGU7XG5cbnZhciBSb3V0ZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFJvdXRlKG5hbWUsIHBhdGgsIGlnbm9yZVNjcm9sbEJlaGF2aW9yLCBpc0RlZmF1bHQsIGlzTm90Rm91bmQsIG9uRW50ZXIsIG9uTGVhdmUsIGhhbmRsZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGUpO1xuXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMucGFyYW1OYW1lcyA9IFBhdGhVdGlscy5leHRyYWN0UGFyYW1OYW1lcyh0aGlzLnBhdGgpO1xuICAgIHRoaXMuaWdub3JlU2Nyb2xsQmVoYXZpb3IgPSAhIWlnbm9yZVNjcm9sbEJlaGF2aW9yO1xuICAgIHRoaXMuaXNEZWZhdWx0ID0gISFpc0RlZmF1bHQ7XG4gICAgdGhpcy5pc05vdEZvdW5kID0gISFpc05vdEZvdW5kO1xuICAgIHRoaXMub25FbnRlciA9IG9uRW50ZXI7XG4gICAgdGhpcy5vbkxlYXZlID0gb25MZWF2ZTtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFJvdXRlLCB7XG4gICAgYXBwZW5kQ2hpbGQ6IHtcblxuICAgICAgLyoqXG4gICAgICAgKiBBcHBlbmRzIHRoZSBnaXZlbiByb3V0ZSB0byB0aGlzIHJvdXRlJ3MgY2hpbGQgcm91dGVzLlxuICAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBlbmRDaGlsZChyb3V0ZSkge1xuICAgICAgICBpbnZhcmlhbnQocm91dGUgaW5zdGFuY2VvZiBSb3V0ZSwgXCJyb3V0ZS5hcHBlbmRDaGlsZCBtdXN0IHVzZSBhIHZhbGlkIFJvdXRlXCIpO1xuXG4gICAgICAgIGlmICghdGhpcy5jaGlsZFJvdXRlcykgdGhpcy5jaGlsZFJvdXRlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuY2hpbGRSb3V0ZXMucHVzaChyb3V0ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0b1N0cmluZzoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICB2YXIgc3RyaW5nID0gXCI8Um91dGVcIjtcblxuICAgICAgICBpZiAodGhpcy5uYW1lKSBzdHJpbmcgKz0gXCIgbmFtZT1cXFwiXCIgKyB0aGlzLm5hbWUgKyBcIlxcXCJcIjtcblxuICAgICAgICBzdHJpbmcgKz0gXCIgcGF0aD1cXFwiXCIgKyB0aGlzLnBhdGggKyBcIlxcXCI+XCI7XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBjcmVhdGVSb3V0ZToge1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgcm91dGUuIE9wdGlvbnMgbWF5IGJlIGEgVVJMIHBhdGhuYW1lIHN0cmluZ1xuICAgICAgICogd2l0aCBwbGFjZWhvbGRlcnMgZm9yIG5hbWVkIHBhcmFtcyBvciBhbiBvYmplY3Qgd2l0aCBhbnkgb2YgdGhlIGZvbGxvd2luZ1xuICAgICAgICogcHJvcGVydGllczpcbiAgICAgICAqXG4gICAgICAgKiAtIG5hbWUgICAgICAgICAgICAgICAgICAgICBUaGUgbmFtZSBvZiB0aGUgcm91dGUuIFRoaXMgaXMgdXNlZCB0byBsb29rdXAgYVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgcmVsYXRpdmUgdG8gaXRzIHBhcmVudCByb3V0ZSBhbmQgc2hvdWxkIGJlXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWUgYW1vbmcgYWxsIGNoaWxkIHJvdXRlcyBvZiB0aGUgc2FtZSBwYXJlbnRcbiAgICAgICAqIC0gcGF0aCAgICAgICAgICAgICAgICAgICAgIEEgVVJMIHBhdGhuYW1lIHN0cmluZyB3aXRoIG9wdGlvbmFsIHBsYWNlaG9sZGVyc1xuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCBzcGVjaWZ5IHRoZSBuYW1lcyBvZiBwYXJhbXMgdG8gZXh0cmFjdCBmcm9tXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgVVJMIHdoZW4gdGhlIHBhdGggbWF0Y2hlcy4gRGVmYXVsdHMgdG8gYC8ke25hbWV9YFxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiB0aGVyZSBpcyBhIG5hbWUgZ2l2ZW4sIG9yIHRoZSBwYXRoIG9mIHRoZSBwYXJlbnRcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLCBvciAvXG4gICAgICAgKiAtIGlnbm9yZVNjcm9sbEJlaGF2aW9yICAgICBUcnVlIHRvIG1ha2UgdGhpcyByb3V0ZSAoYW5kIGFsbCBkZXNjZW5kYW50cykgaWdub3JlXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgc2Nyb2xsIGJlaGF2aW9yIG9mIHRoZSByb3V0ZXJcbiAgICAgICAqIC0gaXNEZWZhdWx0ICAgICAgICAgICAgICAgIFRydWUgdG8gbWFrZSB0aGlzIHJvdXRlIHRoZSBkZWZhdWx0IHJvdXRlIGFtb25nIGFsbFxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRzIHNpYmxpbmdzXG4gICAgICAgKiAtIGlzTm90Rm91bmQgICAgICAgICAgICAgICBUcnVlIHRvIG1ha2UgdGhpcyByb3V0ZSB0aGUgXCJub3QgZm91bmRcIiByb3V0ZSBhbW9uZ1xuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsIGl0cyBzaWJsaW5nc1xuICAgICAgICogLSBvbkVudGVyICAgICAgICAgICAgICAgICAgQSB0cmFuc2l0aW9uIGhvb2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyIGlzIGdvaW5nIHRvIGVudGVyIHRoaXMgcm91dGVcbiAgICAgICAqIC0gb25MZWF2ZSAgICAgICAgICAgICAgICAgIEEgdHJhbnNpdGlvbiBob29rIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGVcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlciBpcyBnb2luZyB0byBsZWF2ZSB0aGlzIHJvdXRlXG4gICAgICAgKiAtIGhhbmRsZXIgICAgICAgICAgICAgICAgICBBIFJlYWN0IGNvbXBvbmVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgd2hlblxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyByb3V0ZSBpcyBhY3RpdmVcbiAgICAgICAqIC0gcGFyZW50Um91dGUgICAgICAgICAgICAgIFRoZSBwYXJlbnQgcm91dGUgdG8gdXNlIGZvciB0aGlzIHJvdXRlLiBUaGlzIG9wdGlvblxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgYXV0b21hdGljYWxseSBzdXBwbGllZCB3aGVuIGNyZWF0aW5nIHJvdXRlcyBpbnNpZGVcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBjYWxsYmFjayB0byBhbm90aGVyIGludm9jYXRpb24gb2YgY3JlYXRlUm91dGUuIFlvdVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgb25seSBldmVyIG5lZWQgdG8gdXNlIHRoaXMgd2hlbiBkZWNsYXJpbmcgcm91dGVzXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRlcGVuZGVudGx5IG9mIG9uZSBhbm90aGVyIHRvIG1hbnVhbGx5IHBpZWNlIHRvZ2V0aGVyXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgcm91dGUgaGllcmFyY2h5XG4gICAgICAgKlxuICAgICAgICogVGhlIGNhbGxiYWNrIG1heSBiZSB1c2VkIHRvIHN0cnVjdHVyZSB5b3VyIHJvdXRlIGhpZXJhcmNoeS4gQW55IGNhbGwgdG9cbiAgICAgICAqIGNyZWF0ZVJvdXRlLCBjcmVhdGVEZWZhdWx0Um91dGUsIGNyZWF0ZU5vdEZvdW5kUm91dGUsIG9yIGNyZWF0ZVJlZGlyZWN0XG4gICAgICAgKiBpbnNpZGUgdGhlIGNhbGxiYWNrIGF1dG9tYXRpY2FsbHkgdXNlcyB0aGlzIHJvdXRlIGFzIGl0cyBwYXJlbnQuXG4gICAgICAgKi9cblxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikgb3B0aW9ucyA9IHsgcGF0aDogb3B0aW9ucyB9O1xuXG4gICAgICAgIHZhciBwYXJlbnRSb3V0ZSA9IF9jdXJyZW50Um91dGU7XG5cbiAgICAgICAgaWYgKHBhcmVudFJvdXRlKSB7XG4gICAgICAgICAgd2FybmluZyhvcHRpb25zLnBhcmVudFJvdXRlID09IG51bGwgfHwgb3B0aW9ucy5wYXJlbnRSb3V0ZSA9PT0gcGFyZW50Um91dGUsIFwiWW91IHNob3VsZCBub3QgdXNlIHBhcmVudFJvdXRlIHdpdGggY3JlYXRlUm91dGUgaW5zaWRlIGFub3RoZXIgcm91dGUncyBjaGlsZCBjYWxsYmFjazsgaXQgaXMgaWdub3JlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJlbnRSb3V0ZSA9IG9wdGlvbnMucGFyZW50Um91dGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgdmFyIHBhdGggPSBvcHRpb25zLnBhdGggfHwgbmFtZTtcblxuICAgICAgICBpZiAocGF0aCAmJiAhKG9wdGlvbnMuaXNEZWZhdWx0IHx8IG9wdGlvbnMuaXNOb3RGb3VuZCkpIHtcbiAgICAgICAgICBpZiAoUGF0aFV0aWxzLmlzQWJzb2x1dGUocGF0aCkpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnRSb3V0ZSkge1xuICAgICAgICAgICAgICBpbnZhcmlhbnQocGF0aCA9PT0gcGFyZW50Um91dGUucGF0aCB8fCBwYXJlbnRSb3V0ZS5wYXJhbU5hbWVzLmxlbmd0aCA9PT0gMCwgXCJZb3UgY2Fubm90IG5lc3QgcGF0aCBcXFwiJXNcXFwiIGluc2lkZSBcXFwiJXNcXFwiOyB0aGUgcGFyZW50IHJlcXVpcmVzIFVSTCBwYXJhbWV0ZXJzXCIsIHBhdGgsIHBhcmVudFJvdXRlLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50Um91dGUpIHtcbiAgICAgICAgICAgIC8vIFJlbGF0aXZlIHBhdGhzIGV4dGVuZCB0aGVpciBwYXJlbnQuXG4gICAgICAgICAgICBwYXRoID0gUGF0aFV0aWxzLmpvaW4ocGFyZW50Um91dGUucGF0aCwgcGF0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBcIi9cIiArIHBhdGg7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGggPSBwYXJlbnRSb3V0ZSA/IHBhcmVudFJvdXRlLnBhdGggOiBcIi9cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzTm90Rm91bmQgJiYgIS9cXCokLy50ZXN0KHBhdGgpKSBwYXRoICs9IFwiKlwiOyAvLyBBdXRvLWFwcGVuZCAqIHRvIHRoZSBwYXRoIG9mIG5vdCBmb3VuZCByb3V0ZXMuXG5cbiAgICAgICAgdmFyIHJvdXRlID0gbmV3IFJvdXRlKG5hbWUsIHBhdGgsIG9wdGlvbnMuaWdub3JlU2Nyb2xsQmVoYXZpb3IsIG9wdGlvbnMuaXNEZWZhdWx0LCBvcHRpb25zLmlzTm90Rm91bmQsIG9wdGlvbnMub25FbnRlciwgb3B0aW9ucy5vbkxlYXZlLCBvcHRpb25zLmhhbmRsZXIpO1xuXG4gICAgICAgIGlmIChwYXJlbnRSb3V0ZSkge1xuICAgICAgICAgIGlmIChyb3V0ZS5pc0RlZmF1bHQpIHtcbiAgICAgICAgICAgIGludmFyaWFudChwYXJlbnRSb3V0ZS5kZWZhdWx0Um91dGUgPT0gbnVsbCwgXCIlcyBtYXkgbm90IGhhdmUgbW9yZSB0aGFuIG9uZSBkZWZhdWx0IHJvdXRlXCIsIHBhcmVudFJvdXRlKTtcblxuICAgICAgICAgICAgcGFyZW50Um91dGUuZGVmYXVsdFJvdXRlID0gcm91dGU7XG4gICAgICAgICAgfSBlbHNlIGlmIChyb3V0ZS5pc05vdEZvdW5kKSB7XG4gICAgICAgICAgICBpbnZhcmlhbnQocGFyZW50Um91dGUubm90Rm91bmRSb3V0ZSA9PSBudWxsLCBcIiVzIG1heSBub3QgaGF2ZSBtb3JlIHRoYW4gb25lIG5vdCBmb3VuZCByb3V0ZVwiLCBwYXJlbnRSb3V0ZSk7XG5cbiAgICAgICAgICAgIHBhcmVudFJvdXRlLm5vdEZvdW5kUm91dGUgPSByb3V0ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJlbnRSb3V0ZS5hcHBlbmRDaGlsZChyb3V0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbnkgcm91dGVzIGNyZWF0ZWQgaW4gdGhlIGNhbGxiYWNrXG4gICAgICAgIC8vIHVzZSB0aGlzIHJvdXRlIGFzIHRoZWlyIHBhcmVudC5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnRSb3V0ZSA9IF9jdXJyZW50Um91dGU7XG4gICAgICAgICAgX2N1cnJlbnRSb3V0ZSA9IHJvdXRlO1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwocm91dGUsIHJvdXRlKTtcbiAgICAgICAgICBfY3VycmVudFJvdXRlID0gY3VycmVudFJvdXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlRGVmYXVsdFJvdXRlOiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHJvdXRlIHRoYXQgaXMgcmVuZGVyZWQgd2hlbiBpdHMgcGFyZW50IG1hdGNoZXNcbiAgICAgICAqIHRoZSBjdXJyZW50IFVSTC5cbiAgICAgICAqL1xuXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFJvdXRlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIFJvdXRlLmNyZWF0ZVJvdXRlKGFzc2lnbih7fSwgb3B0aW9ucywgeyBpc0RlZmF1bHQ6IHRydWUgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlTm90Rm91bmRSb3V0ZToge1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSByb3V0ZSB0aGF0IGlzIHJlbmRlcmVkIHdoZW4gaXRzIHBhcmVudCBtYXRjaGVzXG4gICAgICAgKiB0aGUgY3VycmVudCBVUkwgYnV0IG5vbmUgb2YgaXRzIHNpYmxpbmdzIGRvLlxuICAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVOb3RGb3VuZFJvdXRlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIFJvdXRlLmNyZWF0ZVJvdXRlKGFzc2lnbih7fSwgb3B0aW9ucywgeyBpc05vdEZvdW5kOiB0cnVlIH0pKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZVJlZGlyZWN0OiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHJvdXRlIHRoYXQgYXV0b21hdGljYWxseSByZWRpcmVjdHMgdGhlIHRyYW5zaXRpb25cbiAgICAgICAqIHRvIGFub3RoZXIgcm91dGUuIEluIGFkZGl0aW9uIHRvIHRoZSBub3JtYWwgb3B0aW9ucyB0byBjcmVhdGVSb3V0ZSwgdGhpc1xuICAgICAgICogZnVuY3Rpb24gYWNjZXB0cyB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gICAgICAgKlxuICAgICAgICogLSBmcm9tICAgICAgICAgQW4gYWxpYXMgZm9yIHRoZSBgcGF0aGAgb3B0aW9uLiBEZWZhdWx0cyB0byAqXG4gICAgICAgKiAtIHRvICAgICAgICAgICBUaGUgcGF0aC9yb3V0ZS9yb3V0ZSBuYW1lIHRvIHJlZGlyZWN0IHRvXG4gICAgICAgKiAtIHBhcmFtcyAgICAgICBUaGUgcGFyYW1zIHRvIHVzZSBpbiB0aGUgcmVkaXJlY3QgVVJMLiBEZWZhdWx0c1xuICAgICAgICogICAgICAgICAgICAgICAgdG8gdXNpbmcgdGhlIGN1cnJlbnQgcGFyYW1zXG4gICAgICAgKiAtIHF1ZXJ5ICAgICAgICBUaGUgcXVlcnkgdG8gdXNlIGluIHRoZSByZWRpcmVjdCBVUkwuIERlZmF1bHRzXG4gICAgICAgKiAgICAgICAgICAgICAgICB0byB1c2luZyB0aGUgY3VycmVudCBxdWVyeVxuICAgICAgICovXG5cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVSZWRpcmVjdChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBSb3V0ZS5jcmVhdGVSb3V0ZShhc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGggfHwgb3B0aW9ucy5mcm9tIHx8IFwiKlwiLFxuICAgICAgICAgIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIodHJhbnNpdGlvbiwgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yZWRpcmVjdChvcHRpb25zLnRvLCBvcHRpb25zLnBhcmFtcyB8fCBwYXJhbXMsIG9wdGlvbnMucXVlcnkgfHwgcXVlcnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJvdXRlO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoXCJyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnRcIikuY2FuVXNlRE9NO1xudmFyIGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uID0gcmVxdWlyZShcIi4vZ2V0V2luZG93U2Nyb2xsUG9zaXRpb25cIik7XG5cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVNjcm9sbChzdGF0ZSwgcHJldlN0YXRlKSB7XG4gIGlmICghcHJldlN0YXRlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gRG9uJ3QgdXBkYXRlIHNjcm9sbCBwb3NpdGlvbiB3aGVuIG9ubHkgdGhlIHF1ZXJ5IGhhcyBjaGFuZ2VkLlxuICBpZiAoc3RhdGUucGF0aG5hbWUgPT09IHByZXZTdGF0ZS5wYXRobmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfXZhciByb3V0ZXMgPSBzdGF0ZS5yb3V0ZXM7XG4gIHZhciBwcmV2Um91dGVzID0gcHJldlN0YXRlLnJvdXRlcztcblxuICB2YXIgc2hhcmVkQW5jZXN0b3JSb3V0ZXMgPSByb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHJldHVybiBwcmV2Um91dGVzLmluZGV4T2Yocm91dGUpICE9PSAtMTtcbiAgfSk7XG5cbiAgcmV0dXJuICFzaGFyZWRBbmNlc3RvclJvdXRlcy5zb21lKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHJldHVybiByb3V0ZS5pZ25vcmVTY3JvbGxCZWhhdmlvcjtcbiAgfSk7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHJvdXRlciB3aXRoIHRoZSBhYmlsaXR5IHRvIG1hbmFnZSB3aW5kb3cgc2Nyb2xsIHBvc2l0aW9uXG4gKiBhY2NvcmRpbmcgdG8gaXRzIHNjcm9sbCBiZWhhdmlvci5cbiAqL1xudmFyIFNjcm9sbEhpc3RvcnkgPSB7XG5cbiAgc3RhdGljczoge1xuXG4gICAgLyoqXG4gICAgICogUmVjb3JkcyBjdXJlbnQgc2Nyb2xsIHBvc2l0aW9uIGFzIHRoZSBsYXN0IGtub3duIHBvc2l0aW9uIGZvciB0aGUgZ2l2ZW4gVVJMIHBhdGguXG4gICAgICovXG4gICAgcmVjb3JkU2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uIHJlY29yZFNjcm9sbFBvc2l0aW9uKHBhdGgpIHtcbiAgICAgIGlmICghdGhpcy5zY3JvbGxIaXN0b3J5KSB0aGlzLnNjcm9sbEhpc3RvcnkgPSB7fTtcblxuICAgICAgdGhpcy5zY3JvbGxIaXN0b3J5W3BhdGhdID0gZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFzdCBrbm93biBzY3JvbGwgcG9zaXRpb24gZm9yIHRoZSBnaXZlbiBVUkwgcGF0aC5cbiAgICAgKi9cbiAgICBnZXRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24ocGF0aCkge1xuICAgICAgaWYgKCF0aGlzLnNjcm9sbEhpc3RvcnkpIHRoaXMuc2Nyb2xsSGlzdG9yeSA9IHt9O1xuXG4gICAgICByZXR1cm4gdGhpcy5zY3JvbGxIaXN0b3J5W3BhdGhdIHx8IG51bGw7XG4gICAgfVxuXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaW52YXJpYW50KHRoaXMuY29uc3RydWN0b3IuZ2V0U2Nyb2xsQmVoYXZpb3IoKSA9PSBudWxsIHx8IGNhblVzZURPTSwgXCJDYW5ub3QgdXNlIHNjcm9sbCBiZWhhdmlvciB3aXRob3V0IGEgRE9NXCIpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl91cGRhdGVTY3JvbGwoKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbChwcmV2U3RhdGUpO1xuICB9LFxuXG4gIF91cGRhdGVTY3JvbGw6IGZ1bmN0aW9uIF91cGRhdGVTY3JvbGwocHJldlN0YXRlKSB7XG4gICAgaWYgKCFzaG91bGRVcGRhdGVTY3JvbGwodGhpcy5zdGF0ZSwgcHJldlN0YXRlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH12YXIgc2Nyb2xsQmVoYXZpb3IgPSB0aGlzLmNvbnN0cnVjdG9yLmdldFNjcm9sbEJlaGF2aW9yKCk7XG5cbiAgICBpZiAoc2Nyb2xsQmVoYXZpb3IpIHNjcm9sbEJlaGF2aW9yLnVwZGF0ZVNjcm9sbFBvc2l0aW9uKHRoaXMuY29uc3RydWN0b3IuZ2V0U2Nyb2xsUG9zaXRpb24odGhpcy5zdGF0ZS5wYXRoKSwgdGhpcy5zdGF0ZS5hY3Rpb24pO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsSGlzdG9yeTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKFwicmVhY3QvbGliL3dhcm5pbmdcIik7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZShcIi4vUHJvcFR5cGVzXCIpO1xuXG5mdW5jdGlvbiBkZXByZWNhdGVkTWV0aG9kKHJvdXRlck1ldGhvZE5hbWUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgd2FybmluZyhmYWxzZSwgXCJSb3V0ZXIuU3RhdGUgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0aGlzLmNvbnRleHQucm91dGVyLlwiICsgcm91dGVyTWV0aG9kTmFtZSArIFwiKCkgaW5zdGVhZFwiKTtcblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEEgbWl4aW4gZm9yIGNvbXBvbmVudHMgdGhhdCBuZWVkIHRvIGtub3cgdGhlIHBhdGgsIHJvdXRlcywgVVJMXG4gKiBwYXJhbXMgYW5kIHF1ZXJ5IHRoYXQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIHZhciBBYm91dExpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgbWl4aW5zOiBbIFJvdXRlci5TdGF0ZSBdLFxuICogICAgIHJlbmRlcigpIHtcbiAqICAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcbiAqICAgXG4gKiAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSgnYWJvdXQnKSlcbiAqICAgICAgICAgY2xhc3NOYW1lICs9ICcgaXMtYWN0aXZlJztcbiAqICAgXG4gKiAgICAgICByZXR1cm4gUmVhY3QuRE9NLmEoeyBjbGFzc05hbWU6IGNsYXNzTmFtZSB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICovXG52YXIgU3RhdGUgPSB7XG5cbiAgY29udGV4dFR5cGVzOiB7XG4gICAgcm91dGVyOiBQcm9wVHlwZXMucm91dGVyLmlzUmVxdWlyZWRcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aC5cbiAgICovXG4gIGdldFBhdGg6IGRlcHJlY2F0ZWRNZXRob2QoXCJnZXRDdXJyZW50UGF0aFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIuZ2V0Q3VycmVudFBhdGgoKTtcbiAgfSksXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGggd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgZ2V0UGF0aG5hbWU6IGRlcHJlY2F0ZWRNZXRob2QoXCJnZXRDdXJyZW50UGF0aG5hbWVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLmdldEN1cnJlbnRQYXRobmFtZSgpO1xuICB9KSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIFVSTCBwYXJhbXMgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIGdldFBhcmFtczogZGVwcmVjYXRlZE1ldGhvZChcImdldEN1cnJlbnRQYXJhbXNcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLmdldEN1cnJlbnRQYXJhbXMoKTtcbiAgfSksXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBxdWVyeSBwYXJhbXMgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIGdldFF1ZXJ5OiBkZXByZWNhdGVkTWV0aG9kKFwiZ2V0Q3VycmVudFF1ZXJ5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlci5nZXRDdXJyZW50UXVlcnkoKTtcbiAgfSksXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJvdXRlcyB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICAgKi9cbiAgZ2V0Um91dGVzOiBkZXByZWNhdGVkTWV0aG9kKFwiZ2V0Q3VycmVudFJvdXRlc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZXIuZ2V0Q3VycmVudFJvdXRlcygpO1xuICB9KSxcblxuICAvKipcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGRldGVybWluZSBpZiBhIGdpdmVuIHJvdXRlLCBwYXJhbXMsIGFuZCBxdWVyeVxuICAgKiBhcmUgYWN0aXZlLlxuICAgKi9cbiAgaXNBY3RpdmU6IGRlcHJlY2F0ZWRNZXRob2QoXCJpc0FjdGl2ZVwiLCBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZSh0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0pXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGpzaGludCAtVzA1OCAqL1xuXG52YXIgQ2FuY2VsbGF0aW9uID0gcmVxdWlyZShcIi4vQ2FuY2VsbGF0aW9uXCIpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZShcIi4vUmVkaXJlY3RcIik7XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGEgdHJhbnNpdGlvbiB0byBhIGdpdmVuIHBhdGguXG4gKlxuICogVGhlIHdpbGxUcmFuc2l0aW9uVG8gYW5kIHdpbGxUcmFuc2l0aW9uRnJvbSBoYW5kbGVycyByZWNlaXZlXG4gKiBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGFzIHRoZWlyIGZpcnN0IGFyZ3VtZW50LlxuICovXG5mdW5jdGlvbiBUcmFuc2l0aW9uKHBhdGgsIHJldHJ5KSB7XG4gIHRoaXMucGF0aCA9IHBhdGg7XG4gIHRoaXMuYWJvcnRSZWFzb24gPSBudWxsO1xuICAvLyBUT0RPOiBDaGFuZ2UgdGhpcyB0byByb3V0ZXIucmV0cnlUcmFuc2l0aW9uKHRyYW5zaXRpb24pXG4gIHRoaXMucmV0cnkgPSByZXRyeS5iaW5kKHRoaXMpO1xufVxuXG5UcmFuc2l0aW9uLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgaWYgKHRoaXMuYWJvcnRSZWFzb24gPT0gbnVsbCkgdGhpcy5hYm9ydFJlYXNvbiA9IHJlYXNvbiB8fCBcIkFCT1JUXCI7XG59O1xuXG5UcmFuc2l0aW9uLnByb3RvdHlwZS5yZWRpcmVjdCA9IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICB0aGlzLmFib3J0KG5ldyBSZWRpcmVjdCh0bywgcGFyYW1zLCBxdWVyeSkpO1xufTtcblxuVHJhbnNpdGlvbi5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFib3J0KG5ldyBDYW5jZWxsYXRpb24oKSk7XG59O1xuXG5UcmFuc2l0aW9uLmZyb20gPSBmdW5jdGlvbiAodHJhbnNpdGlvbiwgcm91dGVzLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICByb3V0ZXMucmVkdWNlKGZ1bmN0aW9uIChjYWxsYmFjaywgcm91dGUsIGluZGV4KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yIHx8IHRyYW5zaXRpb24uYWJvcnRSZWFzb24pIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChyb3V0ZS5vbkxlYXZlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcm91dGUub25MZWF2ZSh0cmFuc2l0aW9uLCBjb21wb25lbnRzW2luZGV4XSwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY2FsbGJhY2sgaW4gdGhlIGFyZ3VtZW50IGxpc3QsIGNhbGwgaXQgYXV0b21hdGljYWxseS5cbiAgICAgICAgICBpZiAocm91dGUub25MZWF2ZS5sZW5ndGggPCAzKSBjYWxsYmFjaygpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgY2FsbGJhY2spKCk7XG59O1xuXG5UcmFuc2l0aW9uLnRvID0gZnVuY3Rpb24gKHRyYW5zaXRpb24sIHJvdXRlcywgcGFyYW1zLCBxdWVyeSwgY2FsbGJhY2spIHtcbiAgcm91dGVzLnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChjYWxsYmFjaywgcm91dGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgfHwgdHJhbnNpdGlvbi5hYm9ydFJlYXNvbikge1xuICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHJvdXRlLm9uRW50ZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByb3V0ZS5vbkVudGVyKHRyYW5zaXRpb24sIHBhcmFtcywgcXVlcnksIGNhbGxiYWNrKTtcblxuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhbGxiYWNrIGluIHRoZSBhcmd1bWVudCBsaXN0LCBjYWxsIGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICAgICAgaWYgKHJvdXRlLm9uRW50ZXIubGVuZ3RoIDwgNCkgY2FsbGJhY2soKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIGNhbGxiYWNrKSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEFjdGlvbnMgdGhhdCBtb2RpZnkgdGhlIFVSTC5cbiAqL1xudmFyIExvY2F0aW9uQWN0aW9ucyA9IHtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGEgbmV3IGxvY2F0aW9uIGlzIGJlaW5nIHB1c2hlZCB0byB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIFBVU0g6IFwicHVzaFwiLFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgbG9jYXRpb24gc2hvdWxkIGJlIHJlcGxhY2VkLlxuICAgKi9cbiAgUkVQTEFDRTogXCJyZXBsYWNlXCIsXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGUgbW9zdCByZWNlbnQgZW50cnkgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIFBPUDogXCJwb3BcIlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2F0aW9uQWN0aW9uczsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9uc1wiKTtcblxuLyoqXG4gKiBBIHNjcm9sbCBiZWhhdmlvciB0aGF0IGF0dGVtcHRzIHRvIGltaXRhdGUgdGhlIGRlZmF1bHQgYmVoYXZpb3JcbiAqIG9mIG1vZGVybiBicm93c2Vycy5cbiAqL1xudmFyIEltaXRhdGVCcm93c2VyQmVoYXZpb3IgPSB7XG5cbiAgdXBkYXRlU2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKHBvc2l0aW9uLCBhY3Rpb25UeXBlKSB7XG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICBjYXNlIExvY2F0aW9uQWN0aW9ucy5QVVNIOlxuICAgICAgY2FzZSBMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRTpcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9jYXRpb25BY3Rpb25zLlBPUDpcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbWl0YXRlQnJvd3NlckJlaGF2aW9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEEgc2Nyb2xsIGJlaGF2aW9yIHRoYXQgYWx3YXlzIHNjcm9sbHMgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZVxuICogYWZ0ZXIgYSB0cmFuc2l0aW9uLlxuICovXG52YXIgU2Nyb2xsVG9Ub3BCZWhhdmlvciA9IHtcblxuICB1cGRhdGVTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsUG9zaXRpb24oKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsVG9Ub3BCZWhhdmlvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBuZWNlc3NhcnkgdG8gZ2V0IGFyb3VuZCBhIGNvbnRleHQgd2FybmluZ1xuICogcHJlc2VudCBpbiBSZWFjdCAwLjEzLjAuIEl0IHNvdmxlcyB0aGlzIGJ5IHByb3ZpZGluZyBhIHNlcGFyYXRpb25cbiAqIGJldHdlZW4gdGhlIFwib3duZXJcIiBhbmQgXCJwYXJlbnRcIiBjb250ZXh0cy5cbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBDb250ZXh0V3JhcHBlciA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBmdW5jdGlvbiBDb250ZXh0V3JhcHBlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29udGV4dFdyYXBwZXIpO1xuXG4gICAgaWYgKF9SZWFjdCRDb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIF9pbmhlcml0cyhDb250ZXh0V3JhcHBlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgX2NyZWF0ZUNsYXNzKENvbnRleHRXcmFwcGVyLCB7XG4gICAgcmVuZGVyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBDb250ZXh0V3JhcHBlcjtcbn0pKFJlYWN0LkNvbXBvbmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dFdyYXBwZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZShcIi4uL1Byb3BUeXBlc1wiKTtcbnZhciBSb3V0ZUhhbmRsZXIgPSByZXF1aXJlKFwiLi9Sb3V0ZUhhbmRsZXJcIik7XG52YXIgUm91dGUgPSByZXF1aXJlKFwiLi9Sb3V0ZVwiKTtcblxuLyoqXG4gKiBBIDxEZWZhdWx0Um91dGU+IGNvbXBvbmVudCBpcyBhIHNwZWNpYWwga2luZCBvZiA8Um91dGU+IHRoYXRcbiAqIHJlbmRlcnMgd2hlbiBpdHMgcGFyZW50IG1hdGNoZXMgYnV0IG5vbmUgb2YgaXRzIHNpYmxpbmdzIGRvLlxuICogT25seSBvbmUgc3VjaCByb3V0ZSBtYXkgYmUgdXNlZCBhdCBhbnkgZ2l2ZW4gbGV2ZWwgaW4gdGhlXG4gKiByb3V0ZSBoaWVyYXJjaHkuXG4gKi9cblxudmFyIERlZmF1bHRSb3V0ZSA9IChmdW5jdGlvbiAoX1JvdXRlKSB7XG4gIGZ1bmN0aW9uIERlZmF1bHRSb3V0ZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGVmYXVsdFJvdXRlKTtcblxuICAgIGlmIChfUm91dGUgIT0gbnVsbCkge1xuICAgICAgX1JvdXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgX2luaGVyaXRzKERlZmF1bHRSb3V0ZSwgX1JvdXRlKTtcblxuICByZXR1cm4gRGVmYXVsdFJvdXRlO1xufSkoUm91dGUpO1xuXG4vLyBUT0RPOiBJbmNsdWRlIHRoZXNlIGluIHRoZSBhYm92ZSBjbGFzcyBkZWZpbml0aW9uXG4vLyBvbmNlIHdlIGNhbiB1c2UgRVM3IHByb3BlcnR5IGluaXRpYWxpemVycy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvNjE5XG5cbkRlZmF1bHRSb3V0ZS5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhdGg6IFByb3BUeXBlcy5mYWxzeSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5mYWxzeSxcbiAgaGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuRGVmYXVsdFJvdXRlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGFuZGxlcjogUm91dGVIYW5kbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlZmF1bHRSb3V0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCJyZWFjdC9saWIvT2JqZWN0LmFzc2lnblwiKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi4vUHJvcFR5cGVzXCIpO1xuXG5mdW5jdGlvbiBpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5idXR0b24gPT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59XG5cbi8qKlxuICogPExpbms+IGNvbXBvbmVudHMgYXJlIHVzZWQgdG8gY3JlYXRlIGFuIDxhPiBlbGVtZW50IHRoYXQgbGlua3MgdG8gYSByb3V0ZS5cbiAqIFdoZW4gdGhhdCByb3V0ZSBpcyBhY3RpdmUsIHRoZSBsaW5rIGdldHMgYW4gXCJhY3RpdmVcIiBjbGFzcyBuYW1lIChvciB0aGVcbiAqIHZhbHVlIG9mIGl0cyBgYWN0aXZlQ2xhc3NOYW1lYCBwcm9wKS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgYXNzdW1pbmcgeW91IGhhdmUgdGhlIGZvbGxvd2luZyByb3V0ZTpcbiAqXG4gKiAgIDxSb3V0ZSBuYW1lPVwic2hvd1Bvc3RcIiBwYXRoPVwiL3Bvc3RzLzpwb3N0SURcIiBoYW5kbGVyPXtQb3N0fS8+XG4gKlxuICogWW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvbXBvbmVudCB0byBsaW5rIHRvIHRoYXQgcm91dGU6XG4gKlxuICogICA8TGluayB0bz1cInNob3dQb3N0XCIgcGFyYW1zPXt7IHBvc3RJRDogXCIxMjNcIiB9fSAvPlxuICpcbiAqIEluIGFkZGl0aW9uIHRvIHBhcmFtcywgbGlua3MgbWF5IHBhc3MgYWxvbmcgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAqIHVzaW5nIHRoZSBgcXVlcnlgIHByb3AuXG4gKlxuICogICA8TGluayB0bz1cInNob3dQb3N0XCIgcGFyYW1zPXt7IHBvc3RJRDogXCIxMjNcIiB9fSBxdWVyeT17eyBzaG93OnRydWUgfX0vPlxuICovXG5cbnZhciBMaW5rID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIGZ1bmN0aW9uIExpbmsoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExpbmspO1xuXG4gICAgaWYgKF9SZWFjdCRDb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIF9pbmhlcml0cyhMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBfY3JlYXRlQ2xhc3MoTGluaywge1xuICAgIGhhbmRsZUNsaWNrOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdmFyIGFsbG93VHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBjbGlja1Jlc3VsdDtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSBjbGlja1Jlc3VsdCA9IHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG5cbiAgICAgICAgaWYgKGlzTW9kaWZpZWRFdmVudChldmVudCkgfHwgIWlzTGVmdENsaWNrRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9aWYgKGNsaWNrUmVzdWx0ID09PSBmYWxzZSB8fCBldmVudC5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlKSBhbGxvd1RyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChhbGxvd1RyYW5zaXRpb24pIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKHRoaXMucHJvcHMudG8sIHRoaXMucHJvcHMucGFyYW1zLCB0aGlzLnByb3BzLnF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEhyZWY6IHtcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgXCJocmVmXCIgYXR0cmlidXRlIHRvIHVzZSBvbiB0aGUgRE9NIGVsZW1lbnQuXG4gICAgICAgKi9cblxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEhyZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLm1ha2VIcmVmKHRoaXMucHJvcHMudG8sIHRoaXMucHJvcHMucGFyYW1zLCB0aGlzLnByb3BzLnF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldENsYXNzTmFtZToge1xuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBcImNsYXNzXCIgYXR0cmlidXRlIHRvIHVzZSBvbiB0aGUgRE9NIGVsZW1lbnQsIHdoaWNoIGNvbnRhaW5zXG4gICAgICAgKiB0aGUgdmFsdWUgb2YgdGhlIGFjdGl2ZUNsYXNzTmFtZSBwcm9wZXJ0eSB3aGVuIHRoaXMgPExpbms+IGlzIGFjdGl2ZS5cbiAgICAgICAqL1xuXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0QWN0aXZlU3RhdGUoKSkgY2xhc3NOYW1lICs9IFwiIFwiICsgdGhpcy5wcm9wcy5hY3RpdmVDbGFzc05hbWU7XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEFjdGl2ZVN0YXRlOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWN0aXZlU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKHRoaXMucHJvcHMudG8sIHRoaXMucHJvcHMucGFyYW1zLCB0aGlzLnByb3BzLnF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHByb3BzID0gYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgICAgaHJlZjogdGhpcy5nZXRIcmVmKCksXG4gICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzTmFtZSgpLFxuICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocHJvcHMuYWN0aXZlU3R5bGUgJiYgdGhpcy5nZXRBY3RpdmVTdGF0ZSgpKSBwcm9wcy5zdHlsZSA9IHByb3BzLmFjdGl2ZVN0eWxlO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5ET00uYShwcm9wcywgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gTGluaztcbn0pKFJlYWN0LkNvbXBvbmVudCk7XG5cbi8vIFRPRE86IEluY2x1ZGUgdGhlc2UgaW4gdGhlIGFib3ZlIGNsYXNzIGRlZmluaXRpb25cbi8vIG9uY2Ugd2UgY2FuIHVzZSBFUzcgcHJvcGVydHkgaW5pdGlhbGl6ZXJzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy82MTlcblxuTGluay5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnJvdXRlci5pc1JlcXVpcmVkXG59O1xuXG5MaW5rLnByb3BUeXBlcyA9IHtcbiAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRvOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMucm91dGVdKS5pc1JlcXVpcmVkLFxuICBwYXJhbXM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHF1ZXJ5OiBQcm9wVHlwZXMub2JqZWN0LFxuICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbkxpbmsuZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmVDbGFzc05hbWU6IFwiYWN0aXZlXCIsXG4gIGNsYXNzTmFtZTogXCJcIlxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5rOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoXCIuLi9Qcm9wVHlwZXNcIik7XG52YXIgUm91dGVIYW5kbGVyID0gcmVxdWlyZShcIi4vUm91dGVIYW5kbGVyXCIpO1xudmFyIFJvdXRlID0gcmVxdWlyZShcIi4vUm91dGVcIik7XG5cbi8qKlxuICogQSA8Tm90Rm91bmRSb3V0ZT4gaXMgYSBzcGVjaWFsIGtpbmQgb2YgPFJvdXRlPiB0aGF0XG4gKiByZW5kZXJzIHdoZW4gdGhlIGJlZ2lubmluZyBvZiBpdHMgcGFyZW50J3MgcGF0aCBtYXRjaGVzXG4gKiBidXQgbm9uZSBvZiBpdHMgc2libGluZ3MgZG8sIGluY2x1ZGluZyBhbnkgPERlZmF1bHRSb3V0ZT4uXG4gKiBPbmx5IG9uZSBzdWNoIHJvdXRlIG1heSBiZSB1c2VkIGF0IGFueSBnaXZlbiBsZXZlbCBpbiB0aGVcbiAqIHJvdXRlIGhpZXJhcmNoeS5cbiAqL1xuXG52YXIgTm90Rm91bmRSb3V0ZSA9IChmdW5jdGlvbiAoX1JvdXRlKSB7XG4gIGZ1bmN0aW9uIE5vdEZvdW5kUm91dGUoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vdEZvdW5kUm91dGUpO1xuXG4gICAgaWYgKF9Sb3V0ZSAhPSBudWxsKSB7XG4gICAgICBfUm91dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBfaW5oZXJpdHMoTm90Rm91bmRSb3V0ZSwgX1JvdXRlKTtcblxuICByZXR1cm4gTm90Rm91bmRSb3V0ZTtcbn0pKFJvdXRlKTtcblxuLy8gVE9ETzogSW5jbHVkZSB0aGVzZSBpbiB0aGUgYWJvdmUgY2xhc3MgZGVmaW5pdGlvblxuLy8gb25jZSB3ZSBjYW4gdXNlIEVTNyBwcm9wZXJ0eSBpbml0aWFsaXplcnMuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzYxOVxuXG5Ob3RGb3VuZFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGF0aDogUHJvcFR5cGVzLmZhbHN5LFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmZhbHN5LFxuICBoYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5Ob3RGb3VuZFJvdXRlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGFuZGxlcjogUm91dGVIYW5kbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdEZvdW5kUm91dGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZShcIi4uL1Byb3BUeXBlc1wiKTtcbnZhciBSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpO1xuXG4vKipcbiAqIEEgPFJlZGlyZWN0PiBjb21wb25lbnQgaXMgYSBzcGVjaWFsIGtpbmQgb2YgPFJvdXRlPiB0aGF0IGFsd2F5c1xuICogcmVkaXJlY3RzIHRvIGFub3RoZXIgcm91dGUgd2hlbiBpdCBtYXRjaGVzLlxuICovXG5cbnZhciBSZWRpcmVjdCA9IChmdW5jdGlvbiAoX1JvdXRlKSB7XG4gIGZ1bmN0aW9uIFJlZGlyZWN0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWRpcmVjdCk7XG5cbiAgICBpZiAoX1JvdXRlICE9IG51bGwpIHtcbiAgICAgIF9Sb3V0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIF9pbmhlcml0cyhSZWRpcmVjdCwgX1JvdXRlKTtcblxuICByZXR1cm4gUmVkaXJlY3Q7XG59KShSb3V0ZSk7XG5cbi8vIFRPRE86IEluY2x1ZGUgdGhlc2UgaW4gdGhlIGFib3ZlIGNsYXNzIGRlZmluaXRpb25cbi8vIG9uY2Ugd2UgY2FuIHVzZSBFUzcgcHJvcGVydHkgaW5pdGlhbGl6ZXJzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy82MTlcblxuUmVkaXJlY3QucHJvcFR5cGVzID0ge1xuICBwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmcm9tOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBBbGlhcyBmb3IgcGF0aC5cbiAgdG86IFByb3BUeXBlcy5zdHJpbmcsXG4gIGhhbmRsZXI6IFByb3BUeXBlcy5mYWxzeVxufTtcblxuLy8gUmVkaXJlY3RzIHNob3VsZCBub3QgaGF2ZSBhIGRlZmF1bHQgaGFuZGxlclxuUmVkaXJlY3QuZGVmYXVsdFByb3BzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gUmVkaXJlY3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIga2V5IGluIHByb3BzKSB7IHZhciBwcm9wID0gcHJvcHNba2V5XTsgcHJvcC5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7IH0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKFwiLi4vUHJvcFR5cGVzXCIpO1xudmFyIFJvdXRlSGFuZGxlciA9IHJlcXVpcmUoXCIuL1JvdXRlSGFuZGxlclwiKTtcblxuLyoqXG4gKiA8Um91dGU+IGNvbXBvbmVudHMgc3BlY2lmeSBjb21wb25lbnRzIHRoYXQgYXJlIHJlbmRlcmVkIHRvIHRoZSBwYWdlIHdoZW4gdGhlXG4gKiBVUkwgbWF0Y2hlcyBhIGdpdmVuIHBhdHRlcm4uXG4gKlxuICogUm91dGVzIGFyZSBhcnJhbmdlZCBpbiBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZS4gV2hlbiBhIG5ldyBVUkwgaXMgcmVxdWVzdGVkLFxuICogdGhlIHRyZWUgaXMgc2VhcmNoZWQgZGVwdGgtZmlyc3QgdG8gZmluZCBhIHJvdXRlIHdob3NlIHBhdGggbWF0Y2hlcyB0aGUgVVJMLlxuICogV2hlbiBvbmUgaXMgZm91bmQsIGFsbCByb3V0ZXMgaW4gdGhlIHRyZWUgdGhhdCBsZWFkIHRvIGl0IGFyZSBjb25zaWRlcmVkXG4gKiBcImFjdGl2ZVwiIGFuZCB0aGVpciBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBpbnRvIHRoZSBET00sIG5lc3RlZCBpbiB0aGUgc2FtZVxuICogb3JkZXIgYXMgdGhleSBhcmUgaW4gdGhlIHRyZWUuXG4gKlxuICogVGhlIHByZWZlcnJlZCB3YXkgdG8gY29uZmlndXJlIGEgcm91dGVyIGlzIHVzaW5nIEpTWC4gVGhlIFhNTC1saWtlIHN5bnRheCBpc1xuICogYSBncmVhdCB3YXkgdG8gdmlzdWFsaXplIGhvdyByb3V0ZXMgYXJlIGxhaWQgb3V0IGluIGFuIGFwcGxpY2F0aW9uLlxuICpcbiAqICAgdmFyIHJvdXRlcyA9IFtcbiAqICAgICA8Um91dGUgaGFuZGxlcj17QXBwfT5cbiAqICAgICAgIDxSb3V0ZSBuYW1lPVwibG9naW5cIiBoYW5kbGVyPXtMb2dpbn0vPlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJsb2dvdXRcIiBoYW5kbGVyPXtMb2dvdXR9Lz5cbiAqICAgICAgIDxSb3V0ZSBuYW1lPVwiYWJvdXRcIiBoYW5kbGVyPXtBYm91dH0vPlxuICogICAgIDwvUm91dGU+XG4gKiAgIF07XG4gKiAgIFxuICogICBSb3V0ZXIucnVuKHJvdXRlcywgZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIvPiwgZG9jdW1lbnQuYm9keSk7XG4gKiAgIH0pO1xuICpcbiAqIEhhbmRsZXJzIGZvciBSb3V0ZSBjb21wb25lbnRzIHRoYXQgY29udGFpbiBjaGlsZHJlbiBjYW4gcmVuZGVyIHRoZWlyIGFjdGl2ZVxuICogY2hpbGQgcm91dGUgdXNpbmcgYSA8Um91dGVIYW5kbGVyPiBlbGVtZW50LlxuICpcbiAqICAgdmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHJldHVybiAoXG4gKiAgICAgICAgIDxkaXYgY2xhc3M9XCJhcHBsaWNhdGlvblwiPlxuICogICAgICAgICAgIDxSb3V0ZUhhbmRsZXIvPlxuICogICAgICAgICA8L2Rpdj5cbiAqICAgICAgICk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBJZiBubyBoYW5kbGVyIGlzIHByb3ZpZGVkIGZvciB0aGUgcm91dGUsIGl0IHdpbGwgcmVuZGVyIGEgbWF0Y2hlZCBjaGlsZCByb3V0ZS5cbiAqL1xuXG52YXIgUm91dGUgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlKTtcblxuICAgIGlmIChfUmVhY3QkQ29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBfaW5oZXJpdHMoUm91dGUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIF9jcmVhdGVDbGFzcyhSb3V0ZSwge1xuICAgIHJlbmRlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgaW52YXJpYW50KGZhbHNlLCBcIiVzIGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZFwiLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFJvdXRlO1xufSkoUmVhY3QuQ29tcG9uZW50KTtcblxuLy8gVE9ETzogSW5jbHVkZSB0aGVzZSBpbiB0aGUgYWJvdmUgY2xhc3MgZGVmaW5pdGlvblxuLy8gb25jZSB3ZSBjYW4gdXNlIEVTNyBwcm9wZXJ0eSBpbml0aWFsaXplcnMuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzYxOVxuXG5Sb3V0ZS5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxuICBpZ25vcmVTY3JvbGxCZWhhdmlvcjogUHJvcFR5cGVzLmJvb2xcbn07XG5cblJvdXRlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGFuZGxlcjogUm91dGVIYW5kbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgQ29udGV4dFdyYXBwZXIgPSByZXF1aXJlKFwiLi9Db250ZXh0V3JhcHBlclwiKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwicmVhY3QvbGliL09iamVjdC5hc3NpZ25cIik7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZShcIi4uL1Byb3BUeXBlc1wiKTtcblxudmFyIFJFRl9OQU1FID0gXCJfX3JvdXRlSGFuZGxlcl9fXCI7XG5cbi8qKlxuICogQSA8Um91dGVIYW5kbGVyPiBjb21wb25lbnQgcmVuZGVycyB0aGUgYWN0aXZlIGNoaWxkIHJvdXRlIGhhbmRsZXJcbiAqIHdoZW4gcm91dGVzIGFyZSBuZXN0ZWQuXG4gKi9cblxudmFyIFJvdXRlSGFuZGxlciA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBmdW5jdGlvbiBSb3V0ZUhhbmRsZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlSGFuZGxlcik7XG5cbiAgICBpZiAoX1JlYWN0JENvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgX2luaGVyaXRzKFJvdXRlSGFuZGxlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgX2NyZWF0ZUNsYXNzKFJvdXRlSGFuZGxlciwge1xuICAgIGdldENoaWxkQ29udGV4dDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByb3V0ZURlcHRoOiB0aGlzLmNvbnRleHQucm91dGVEZXB0aCArIDFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJvdXRlQ29tcG9uZW50KHRoaXMucmVmc1tSRUZfTkFNRV0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVSb3V0ZUNvbXBvbmVudCh0aGlzLnJlZnNbUkVGX05BTUVdKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJvdXRlQ29tcG9uZW50KG51bGwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgX3VwZGF0ZVJvdXRlQ29tcG9uZW50OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVJvdXRlQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnNldFJvdXRlQ29tcG9uZW50QXREZXB0aCh0aGlzLmdldFJvdXRlRGVwdGgoKSwgY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldFJvdXRlRGVwdGg6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSb3V0ZURlcHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlRGVwdGg7XG4gICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVDaGlsZFJvdXRlSGFuZGxlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUNoaWxkUm91dGVIYW5kbGVyKHByb3BzKSB7XG4gICAgICAgIHZhciByb3V0ZSA9IHRoaXMuY29udGV4dC5yb3V0ZXIuZ2V0Um91dGVBdERlcHRoKHRoaXMuZ2V0Um91dGVEZXB0aCgpKTtcbiAgICAgICAgcmV0dXJuIHJvdXRlID8gUmVhY3QuY3JlYXRlRWxlbWVudChyb3V0ZS5oYW5kbGVyLCBhc3NpZ24oe30sIHByb3BzIHx8IHRoaXMucHJvcHMsIHsgcmVmOiBSRUZfTkFNRSB9KSkgOiBudWxsO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuY3JlYXRlQ2hpbGRSb3V0ZUhhbmRsZXIoKTtcbiAgICAgICAgLy8gPHNjcmlwdC8+IGZvciB0aGluZ3MgbGlrZSA8Q1NTVHJhbnNpdGlvbkdyb3VwLz4gdGhhdCBkb24ndCBsaWtlIG51bGxcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIENvbnRleHRXcmFwcGVyLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgaGFuZGxlclxuICAgICAgICApIDogUmVhY3QuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBSb3V0ZUhhbmRsZXI7XG59KShSZWFjdC5Db21wb25lbnQpO1xuXG4vLyBUT0RPOiBJbmNsdWRlIHRoZXNlIGluIHRoZSBhYm92ZSBjbGFzcyBkZWZpbml0aW9uXG4vLyBvbmNlIHdlIGNhbiB1c2UgRVM3IHByb3BlcnR5IGluaXRpYWxpemVycy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvNjE5XG5cblJvdXRlSGFuZGxlci5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlRGVwdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcm91dGVyOiBQcm9wVHlwZXMucm91dGVyLmlzUmVxdWlyZWRcbn07XG5cblJvdXRlSGFuZGxlci5jaGlsZENvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVEZXB0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlSGFuZGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoganNoaW50IC1XMDU4ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoXCJyZWFjdC9saWIvd2FybmluZ1wiKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKFwicmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50XCIpLmNhblVzZURPTTtcbnZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKFwiLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9uc1wiKTtcbnZhciBJbWl0YXRlQnJvd3NlckJlaGF2aW9yID0gcmVxdWlyZShcIi4vYmVoYXZpb3JzL0ltaXRhdGVCcm93c2VyQmVoYXZpb3JcIik7XG52YXIgSGFzaExvY2F0aW9uID0gcmVxdWlyZShcIi4vbG9jYXRpb25zL0hhc2hMb2NhdGlvblwiKTtcbnZhciBIaXN0b3J5TG9jYXRpb24gPSByZXF1aXJlKFwiLi9sb2NhdGlvbnMvSGlzdG9yeUxvY2F0aW9uXCIpO1xudmFyIFJlZnJlc2hMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb25cIik7XG52YXIgU3RhdGljTG9jYXRpb24gPSByZXF1aXJlKFwiLi9sb2NhdGlvbnMvU3RhdGljTG9jYXRpb25cIik7XG52YXIgU2Nyb2xsSGlzdG9yeSA9IHJlcXVpcmUoXCIuL1Njcm9sbEhpc3RvcnlcIik7XG52YXIgY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKFwiLi9jcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlblwiKTtcbnZhciBpc1JlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKFwiLi9pc1JlYWN0Q2hpbGRyZW5cIik7XG52YXIgVHJhbnNpdGlvbiA9IHJlcXVpcmUoXCIuL1RyYW5zaXRpb25cIik7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZShcIi4vUHJvcFR5cGVzXCIpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZShcIi4vUmVkaXJlY3RcIik7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoXCIuL0hpc3RvcnlcIik7XG52YXIgQ2FuY2VsbGF0aW9uID0gcmVxdWlyZShcIi4vQ2FuY2VsbGF0aW9uXCIpO1xudmFyIE1hdGNoID0gcmVxdWlyZShcIi4vTWF0Y2hcIik7XG52YXIgUm91dGUgPSByZXF1aXJlKFwiLi9Sb3V0ZVwiKTtcbnZhciBzdXBwb3J0c0hpc3RvcnkgPSByZXF1aXJlKFwiLi9zdXBwb3J0c0hpc3RvcnlcIik7XG52YXIgUGF0aFV0aWxzID0gcmVxdWlyZShcIi4vUGF0aFV0aWxzXCIpO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGxvY2F0aW9uIGZvciBuZXcgcm91dGVycy5cbiAqL1xudmFyIERFRkFVTFRfTE9DQVRJT04gPSBjYW5Vc2VET00gPyBIYXNoTG9jYXRpb24gOiBcIi9cIjtcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzY3JvbGwgYmVoYXZpb3IgZm9yIG5ldyByb3V0ZXJzLlxuICovXG52YXIgREVGQVVMVF9TQ1JPTExfQkVIQVZJT1IgPSBjYW5Vc2VET00gPyBJbWl0YXRlQnJvd3NlckJlaGF2aW9yIDogbnVsbDtcblxuZnVuY3Rpb24gaGFzUHJvcGVydGllcyhvYmplY3QsIHByb3BlcnRpZXMpIHtcbiAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiYgb2JqZWN0W3Byb3BlcnR5TmFtZV0gIT09IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfXJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBoYXNNYXRjaChyb3V0ZXMsIHJvdXRlLCBwcmV2UGFyYW1zLCBuZXh0UGFyYW1zLCBwcmV2UXVlcnksIG5leHRRdWVyeSkge1xuICByZXR1cm4gcm91dGVzLnNvbWUoZnVuY3Rpb24gKHIpIHtcbiAgICBpZiAociAhPT0gcm91dGUpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBwYXJhbU5hbWVzID0gcm91dGUucGFyYW1OYW1lcztcbiAgICB2YXIgcGFyYW1OYW1lO1xuXG4gICAgLy8gRW5zdXJlIHRoYXQgYWxsIHBhcmFtcyB0aGUgcm91dGUgY2FyZXMgYWJvdXQgZGlkIG5vdCBjaGFuZ2UuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhcmFtTmFtZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHBhcmFtTmFtZSA9IHBhcmFtTmFtZXNbaV07XG5cbiAgICAgIGlmIChuZXh0UGFyYW1zW3BhcmFtTmFtZV0gIT09IHByZXZQYXJhbXNbcGFyYW1OYW1lXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGUgcXVlcnkgaGFzbid0IGNoYW5nZWQuXG4gICAgcmV0dXJuIGhhc1Byb3BlcnRpZXMocHJldlF1ZXJ5LCBuZXh0UXVlcnkpICYmIGhhc1Byb3BlcnRpZXMobmV4dFF1ZXJ5LCBwcmV2UXVlcnkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkUm91dGVzVG9OYW1lZFJvdXRlcyhyb3V0ZXMsIG5hbWVkUm91dGVzKSB7XG4gIHZhciByb3V0ZTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJvdXRlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHJvdXRlID0gcm91dGVzW2ldO1xuXG4gICAgaWYgKHJvdXRlLm5hbWUpIHtcbiAgICAgIGludmFyaWFudChuYW1lZFJvdXRlc1tyb3V0ZS5uYW1lXSA9PSBudWxsLCBcIllvdSBtYXkgbm90IGhhdmUgbW9yZSB0aGFuIG9uZSByb3V0ZSBuYW1lZCBcXFwiJXNcXFwiXCIsIHJvdXRlLm5hbWUpO1xuXG4gICAgICBuYW1lZFJvdXRlc1tyb3V0ZS5uYW1lXSA9IHJvdXRlO1xuICAgIH1cblxuICAgIGlmIChyb3V0ZS5jaGlsZFJvdXRlcykgYWRkUm91dGVzVG9OYW1lZFJvdXRlcyhyb3V0ZS5jaGlsZFJvdXRlcywgbmFtZWRSb3V0ZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJvdXRlSXNBY3RpdmUoYWN0aXZlUm91dGVzLCByb3V0ZU5hbWUpIHtcbiAgcmV0dXJuIGFjdGl2ZVJvdXRlcy5zb21lKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHJldHVybiByb3V0ZS5uYW1lID09PSByb3V0ZU5hbWU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJhbXNBcmVBY3RpdmUoYWN0aXZlUGFyYW1zLCBwYXJhbXMpIHtcbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gcGFyYW1zKSBpZiAoU3RyaW5nKGFjdGl2ZVBhcmFtc1twcm9wZXJ0eV0pICE9PSBTdHJpbmcocGFyYW1zW3Byb3BlcnR5XSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1yZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcXVlcnlJc0FjdGl2ZShhY3RpdmVRdWVyeSwgcXVlcnkpIHtcbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gcXVlcnkpIGlmIChTdHJpbmcoYWN0aXZlUXVlcnlbcHJvcGVydHldKSAhPT0gU3RyaW5nKHF1ZXJ5W3Byb3BlcnR5XSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1yZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IHJvdXRlciB1c2luZyB0aGUgZ2l2ZW4gb3B0aW9ucy4gQSByb3V0ZXJcbiAqIGlzIGEgUmVhY3RDb21wb25lbnQgY2xhc3MgdGhhdCBrbm93cyBob3cgdG8gcmVhY3QgdG8gY2hhbmdlcyBpbiB0aGVcbiAqIFVSTCBhbmQga2VlcCB0aGUgY29udGVudHMgb2YgdGhlIHBhZ2UgaW4gc3luYy5cbiAqXG4gKiBPcHRpb25zIG1heSBiZSBhbnkgb2YgdGhlIGZvbGxvd2luZzpcbiAqXG4gKiAtIHJvdXRlcyAgICAgICAgICAgKHJlcXVpcmVkKSBUaGUgcm91dGUgY29uZmlnXG4gKiAtIGxvY2F0aW9uICAgICAgICAgVGhlIGxvY2F0aW9uIHRvIHVzZS4gRGVmYXVsdHMgdG8gSGFzaExvY2F0aW9uIHdoZW5cbiAqICAgICAgICAgICAgICAgICAgICB0aGUgRE9NIGlzIGF2YWlsYWJsZSwgXCIvXCIgb3RoZXJ3aXNlXG4gKiAtIHNjcm9sbEJlaGF2aW9yICAgVGhlIHNjcm9sbCBiZWhhdmlvciB0byB1c2UuIERlZmF1bHRzIHRvIEltaXRhdGVCcm93c2VyQmVoYXZpb3JcbiAqICAgICAgICAgICAgICAgICAgICB3aGVuIHRoZSBET00gaXMgYXZhaWxhYmxlLCBudWxsIG90aGVyd2lzZVxuICogLSBvbkVycm9yICAgICAgICAgIEEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGhhbmRsZSBlcnJvcnNcbiAqIC0gb25BYm9ydCAgICAgICAgICBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBoYW5kbGUgYWJvcnRlZCB0cmFuc2l0aW9uc1xuICpcbiAqIFdoZW4gcmVuZGVyaW5nIGluIGEgc2VydmVyLXNpZGUgZW52aXJvbm1lbnQsIHRoZSBsb2NhdGlvbiBzaG91bGQgc2ltcGx5XG4gKiBiZSB0aGUgVVJMIHBhdGggdGhhdCB3YXMgdXNlZCBpbiB0aGUgcmVxdWVzdCwgaW5jbHVkaW5nIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmIChpc1JlYWN0Q2hpbGRyZW4ob3B0aW9ucykpIG9wdGlvbnMgPSB7IHJvdXRlczogb3B0aW9ucyB9O1xuXG4gIHZhciBtb3VudGVkQ29tcG9uZW50cyA9IFtdO1xuICB2YXIgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IERFRkFVTFRfTE9DQVRJT047XG4gIHZhciBzY3JvbGxCZWhhdmlvciA9IG9wdGlvbnMuc2Nyb2xsQmVoYXZpb3IgfHwgREVGQVVMVF9TQ1JPTExfQkVIQVZJT1I7XG4gIHZhciBzdGF0ZSA9IHt9O1xuICB2YXIgbmV4dFN0YXRlID0ge307XG4gIHZhciBwZW5kaW5nVHJhbnNpdGlvbiA9IG51bGw7XG4gIHZhciBkaXNwYXRjaEhhbmRsZXIgPSBudWxsO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gPT09IFwic3RyaW5nXCIpIGxvY2F0aW9uID0gbmV3IFN0YXRpY0xvY2F0aW9uKGxvY2F0aW9uKTtcblxuICBpZiAobG9jYXRpb24gaW5zdGFuY2VvZiBTdGF0aWNMb2NhdGlvbikge1xuICAgIHdhcm5pbmcoIWNhblVzZURPTSB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJ0ZXN0XCIsIFwiWW91IHNob3VsZCBub3QgdXNlIGEgc3RhdGljIGxvY2F0aW9uIGluIGEgRE9NIGVudmlyb25tZW50IGJlY2F1c2UgXCIgKyBcInRoZSByb3V0ZXIgd2lsbCBub3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIGN1cnJlbnQgVVJMXCIpO1xuICB9IGVsc2Uge1xuICAgIGludmFyaWFudChjYW5Vc2VET00gfHwgbG9jYXRpb24ubmVlZHNET00gPT09IGZhbHNlLCBcIllvdSBjYW5ub3QgdXNlICVzIHdpdGhvdXQgYSBET01cIiwgbG9jYXRpb24pO1xuICB9XG5cbiAgLy8gQXV0b21hdGljYWxseSBmYWxsIGJhY2sgdG8gZnVsbCBwYWdlIHJlZnJlc2hlcyBpblxuICAvLyBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgdGhlIEhUTUwgaGlzdG9yeSBBUEkuXG4gIGlmIChsb2NhdGlvbiA9PT0gSGlzdG9yeUxvY2F0aW9uICYmICFzdXBwb3J0c0hpc3RvcnkoKSkgbG9jYXRpb24gPSBSZWZyZXNoTG9jYXRpb247XG5cbiAgdmFyIFJvdXRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIGRpc3BsYXlOYW1lOiBcIlJvdXRlclwiLFxuXG4gICAgc3RhdGljczoge1xuXG4gICAgICBpc1J1bm5pbmc6IGZhbHNlLFxuXG4gICAgICBjYW5jZWxQZW5kaW5nVHJhbnNpdGlvbjogZnVuY3Rpb24gY2FuY2VsUGVuZGluZ1RyYW5zaXRpb24oKSB7XG4gICAgICAgIGlmIChwZW5kaW5nVHJhbnNpdGlvbikge1xuICAgICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uLmNhbmNlbCgpO1xuICAgICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgY2xlYXJBbGxSb3V0ZXM6IGZ1bmN0aW9uIGNsZWFyQWxsUm91dGVzKCkge1xuICAgICAgICBSb3V0ZXIuY2FuY2VsUGVuZGluZ1RyYW5zaXRpb24oKTtcbiAgICAgICAgUm91dGVyLm5hbWVkUm91dGVzID0ge307XG4gICAgICAgIFJvdXRlci5yb3V0ZXMgPSBbXTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkcyByb3V0ZXMgdG8gdGhpcyByb3V0ZXIgZnJvbSB0aGUgZ2l2ZW4gY2hpbGRyZW4gb2JqZWN0IChzZWUgUmVhY3RDaGlsZHJlbikuXG4gICAgICAgKi9cbiAgICAgIGFkZFJvdXRlczogZnVuY3Rpb24gYWRkUm91dGVzKHJvdXRlcykge1xuICAgICAgICBpZiAoaXNSZWFjdENoaWxkcmVuKHJvdXRlcykpIHJvdXRlcyA9IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKHJvdXRlcyk7XG5cbiAgICAgICAgYWRkUm91dGVzVG9OYW1lZFJvdXRlcyhyb3V0ZXMsIFJvdXRlci5uYW1lZFJvdXRlcyk7XG5cbiAgICAgICAgUm91dGVyLnJvdXRlcy5wdXNoLmFwcGx5KFJvdXRlci5yb3V0ZXMsIHJvdXRlcyk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJlcGxhY2VzIHJvdXRlcyBvZiB0aGlzIHJvdXRlciBmcm9tIHRoZSBnaXZlbiBjaGlsZHJlbiBvYmplY3QgKHNlZSBSZWFjdENoaWxkcmVuKS5cbiAgICAgICAqL1xuICAgICAgcmVwbGFjZVJvdXRlczogZnVuY3Rpb24gcmVwbGFjZVJvdXRlcyhyb3V0ZXMpIHtcbiAgICAgICAgUm91dGVyLmNsZWFyQWxsUm91dGVzKCk7XG4gICAgICAgIFJvdXRlci5hZGRSb3V0ZXMocm91dGVzKTtcbiAgICAgICAgUm91dGVyLnJlZnJlc2goKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUGVyZm9ybXMgYSBtYXRjaCBvZiB0aGUgZ2l2ZW4gcGF0aCBhZ2FpbnN0IHRoaXMgcm91dGVyIGFuZCByZXR1cm5zIGFuIG9iamVjdFxuICAgICAgICogd2l0aCB0aGUgeyByb3V0ZXMsIHBhcmFtcywgcGF0aG5hbWUsIHF1ZXJ5IH0gdGhhdCBtYXRjaC4gUmV0dXJucyBudWxsIGlmIG5vXG4gICAgICAgKiBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICAgICAqL1xuICAgICAgbWF0Y2g6IGZ1bmN0aW9uIG1hdGNoKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGNoLmZpbmRNYXRjaChSb3V0ZXIucm91dGVzLCBwYXRoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyBhbiBhYnNvbHV0ZSBVUkwgcGF0aCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHJvdXRlXG4gICAgICAgKiBuYW1lLCBVUkwgcGFyYW1ldGVycywgYW5kIHF1ZXJ5LlxuICAgICAgICovXG4gICAgICBtYWtlUGF0aDogZnVuY3Rpb24gbWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgdmFyIHBhdGg7XG4gICAgICAgIGlmIChQYXRoVXRpbHMuaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAgICAgICBwYXRoID0gdG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJvdXRlID0gdG8gaW5zdGFuY2VvZiBSb3V0ZSA/IHRvIDogUm91dGVyLm5hbWVkUm91dGVzW3RvXTtcblxuICAgICAgICAgIGludmFyaWFudChyb3V0ZSBpbnN0YW5jZW9mIFJvdXRlLCBcIkNhbm5vdCBmaW5kIGEgcm91dGUgbmFtZWQgXFxcIiVzXFxcIlwiLCB0byk7XG5cbiAgICAgICAgICBwYXRoID0gcm91dGUucGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQYXRoVXRpbHMud2l0aFF1ZXJ5KFBhdGhVdGlscy5pbmplY3RQYXJhbXMocGF0aCwgcGFyYW1zKSwgcXVlcnkpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgbWF5IHNhZmVseSBiZSB1c2VkIGFzIHRoZSBocmVmIG9mIGEgbGlua1xuICAgICAgICogdG8gdGhlIHJvdXRlIHdpdGggdGhlIGdpdmVuIG5hbWUsIFVSTCBwYXJhbWV0ZXJzLCBhbmQgcXVlcnkuXG4gICAgICAgKi9cbiAgICAgIG1ha2VIcmVmOiBmdW5jdGlvbiBtYWtlSHJlZih0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICB2YXIgcGF0aCA9IFJvdXRlci5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbiA9PT0gSGFzaExvY2F0aW9uID8gXCIjXCIgKyBwYXRoIDogcGF0aDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSBwdXNoaW5nXG4gICAgICAgKiBhIG5ldyBVUkwgb250byB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICAgICAqL1xuICAgICAgdHJhbnNpdGlvblRvOiBmdW5jdGlvbiB0cmFuc2l0aW9uVG8odG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgdmFyIHBhdGggPSBSb3V0ZXIubWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuXG4gICAgICAgIGlmIChwZW5kaW5nVHJhbnNpdGlvbikge1xuICAgICAgICAgIC8vIFJlcGxhY2Ugc28gcGVuZGluZyBsb2NhdGlvbiBkb2VzIG5vdCBzdGF5IGluIGhpc3RvcnkuXG4gICAgICAgICAgbG9jYXRpb24ucmVwbGFjZShwYXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbi5wdXNoKHBhdGgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRyYW5zaXRpb25zIHRvIHRoZSBVUkwgc3BlY2lmaWVkIGluIHRoZSBhcmd1bWVudHMgYnkgcmVwbGFjaW5nXG4gICAgICAgKiB0aGUgY3VycmVudCBVUkwgaW4gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAgICAgKi9cbiAgICAgIHJlcGxhY2VXaXRoOiBmdW5jdGlvbiByZXBsYWNlV2l0aCh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKFJvdXRlci5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSkpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgcHJldmlvdXMgVVJMIGlmIG9uZSBpcyBhdmFpbGFibGUuIFJldHVybnMgdHJ1ZSBpZiB0aGVcbiAgICAgICAqIHJvdXRlciB3YXMgYWJsZSB0byBnbyBiYWNrLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogTm90ZTogVGhlIHJvdXRlciBvbmx5IHRyYWNrcyBoaXN0b3J5IGVudHJpZXMgaW4geW91ciBhcHBsaWNhdGlvbiwgbm90IHRoZVxuICAgICAgICogY3VycmVudCBicm93c2VyIHNlc3Npb24sIHNvIHlvdSBjYW4gc2FmZWx5IGNhbGwgdGhpcyBmdW5jdGlvbiB3aXRob3V0IGd1YXJkaW5nXG4gICAgICAgKiBhZ2FpbnN0IHNlbmRpbmcgdGhlIHVzZXIgYmFjayB0byBzb21lIG90aGVyIHNpdGUuIEhvd2V2ZXIsIHdoZW4gdXNpbmdcbiAgICAgICAqIFJlZnJlc2hMb2NhdGlvbiAod2hpY2ggaXMgdGhlIGZhbGxiYWNrIGZvciBIaXN0b3J5TG9jYXRpb24gaW4gYnJvd3NlcnMgdGhhdFxuICAgICAgICogZG9uJ3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5KSB0aGlzIG1ldGhvZCB3aWxsICphbHdheXMqIHNlbmQgdGhlIGNsaWVudCBiYWNrXG4gICAgICAgKiBiZWNhdXNlIHdlIGNhbm5vdCByZWxpYWJseSB0cmFjayBoaXN0b3J5IGxlbmd0aC5cbiAgICAgICAqL1xuICAgICAgZ29CYWNrOiBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgICAgIGlmIChIaXN0b3J5Lmxlbmd0aCA+IDEgfHwgbG9jYXRpb24gPT09IFJlZnJlc2hMb2NhdGlvbikge1xuICAgICAgICAgIGxvY2F0aW9uLnBvcCgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgd2FybmluZyhmYWxzZSwgXCJnb0JhY2soKSB3YXMgaWdub3JlZCBiZWNhdXNlIHRoZXJlIGlzIG5vIHJvdXRlciBoaXN0b3J5XCIpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG5cbiAgICAgIGhhbmRsZUFib3J0OiBvcHRpb25zLm9uQWJvcnQgfHwgZnVuY3Rpb24gKGFib3J0UmVhc29uKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbiBpbnN0YW5jZW9mIFN0YXRpY0xvY2F0aW9uKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmhhbmRsZWQgYWJvcnRlZCB0cmFuc2l0aW9uISBSZWFzb246IFwiICsgYWJvcnRSZWFzb24pO1xuXG4gICAgICAgIGlmIChhYm9ydFJlYXNvbiBpbnN0YW5jZW9mIENhbmNlbGxhdGlvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChhYm9ydFJlYXNvbiBpbnN0YW5jZW9mIFJlZGlyZWN0KSB7XG4gICAgICAgICAgbG9jYXRpb24ucmVwbGFjZShSb3V0ZXIubWFrZVBhdGgoYWJvcnRSZWFzb24udG8sIGFib3J0UmVhc29uLnBhcmFtcywgYWJvcnRSZWFzb24ucXVlcnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbi5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgaGFuZGxlRXJyb3I6IG9wdGlvbnMub25FcnJvciB8fCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgLy8gVGhyb3cgc28gd2UgZG9uJ3Qgc2lsZW50bHkgc3dhbGxvdyBhc3luYyBlcnJvcnMuXG4gICAgICAgIHRocm93IGVycm9yOyAvLyBUaGlzIGVycm9yIHByb2JhYmx5IG9yaWdpbmF0ZWQgaW4gYSB0cmFuc2l0aW9uIGhvb2suXG4gICAgICB9LFxuXG4gICAgICBoYW5kbGVMb2NhdGlvbkNoYW5nZTogZnVuY3Rpb24gaGFuZGxlTG9jYXRpb25DaGFuZ2UoY2hhbmdlKSB7XG4gICAgICAgIFJvdXRlci5kaXNwYXRjaChjaGFuZ2UucGF0aCwgY2hhbmdlLnR5cGUpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQZXJmb3JtcyBhIHRyYW5zaXRpb24gdG8gdGhlIGdpdmVuIHBhdGggYW5kIGNhbGxzIGNhbGxiYWNrKGVycm9yLCBhYm9ydFJlYXNvbilcbiAgICAgICAqIHdoZW4gdGhlIHRyYW5zaXRpb24gaXMgZmluaXNoZWQuIElmIGJvdGggYXJndW1lbnRzIGFyZSBudWxsIHRoZSByb3V0ZXIncyBzdGF0ZVxuICAgICAgICogd2FzIHVwZGF0ZWQuIE90aGVyd2lzZSB0aGUgdHJhbnNpdGlvbiBkaWQgbm90IGNvbXBsZXRlLlxuICAgICAgICpcbiAgICAgICAqIEluIGEgdHJhbnNpdGlvbiwgYSByb3V0ZXIgZmlyc3QgZGV0ZXJtaW5lcyB3aGljaCByb3V0ZXMgYXJlIGludm9sdmVkIGJ5IGJlZ2lubmluZ1xuICAgICAgICogd2l0aCB0aGUgY3VycmVudCByb3V0ZSwgdXAgdGhlIHJvdXRlIHRyZWUgdG8gdGhlIGZpcnN0IHBhcmVudCByb3V0ZSB0aGF0IGlzIHNoYXJlZFxuICAgICAgICogd2l0aCB0aGUgZGVzdGluYXRpb24gcm91dGUsIGFuZCBiYWNrIGRvd24gdGhlIHRyZWUgdG8gdGhlIGRlc3RpbmF0aW9uIHJvdXRlLiBUaGVcbiAgICAgICAqIHdpbGxUcmFuc2l0aW9uRnJvbSBob29rIGlzIGludm9rZWQgb24gYWxsIHJvdXRlIGhhbmRsZXJzIHdlJ3JlIHRyYW5zaXRpb25pbmcgYXdheVxuICAgICAgICogZnJvbSwgaW4gcmV2ZXJzZSBuZXN0aW5nIG9yZGVyLiBMaWtld2lzZSwgdGhlIHdpbGxUcmFuc2l0aW9uVG8gaG9vayBpcyBpbnZva2VkIG9uXG4gICAgICAgKiBhbGwgcm91dGUgaGFuZGxlcnMgd2UncmUgdHJhbnNpdGlvbmluZyB0by5cbiAgICAgICAqXG4gICAgICAgKiBCb3RoIHdpbGxUcmFuc2l0aW9uRnJvbSBhbmQgd2lsbFRyYW5zaXRpb25UbyBob29rcyBtYXkgZWl0aGVyIGFib3J0IG9yIHJlZGlyZWN0IHRoZVxuICAgICAgICogdHJhbnNpdGlvbi4gVG8gcmVzb2x2ZSBhc3luY2hyb25vdXNseSwgdGhleSBtYXkgdXNlIHRoZSBjYWxsYmFjayBhcmd1bWVudC4gSWYgbm9cbiAgICAgICAqIGhvb2tzIHdhaXQsIHRoZSB0cmFuc2l0aW9uIGlzIGZ1bGx5IHN5bmNocm9ub3VzLlxuICAgICAgICovXG4gICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2gocGF0aCwgYWN0aW9uKSB7XG4gICAgICAgIFJvdXRlci5jYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpO1xuXG4gICAgICAgIHZhciBwcmV2UGF0aCA9IHN0YXRlLnBhdGg7XG4gICAgICAgIHZhciBpc1JlZnJlc2hpbmcgPSBhY3Rpb24gPT0gbnVsbDtcblxuICAgICAgICBpZiAocHJldlBhdGggPT09IHBhdGggJiYgIWlzUmVmcmVzaGluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBOb3RoaW5nIHRvIGRvIVxuXG4gICAgICAgIC8vIFJlY29yZCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGVhcmx5IGFzIHBvc3NpYmxlIHRvXG4gICAgICAgIC8vIGdldCBpdCBiZWZvcmUgYnJvd3NlcnMgdHJ5IHVwZGF0ZSBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICBpZiAocHJldlBhdGggJiYgYWN0aW9uID09PSBMb2NhdGlvbkFjdGlvbnMuUFVTSCkgUm91dGVyLnJlY29yZFNjcm9sbFBvc2l0aW9uKHByZXZQYXRoKTtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBSb3V0ZXIubWF0Y2gocGF0aCk7XG5cbiAgICAgICAgd2FybmluZyhtYXRjaCAhPSBudWxsLCBcIk5vIHJvdXRlIG1hdGNoZXMgcGF0aCBcXFwiJXNcXFwiLiBNYWtlIHN1cmUgeW91IGhhdmUgPFJvdXRlIHBhdGg9XFxcIiVzXFxcIj4gc29tZXdoZXJlIGluIHlvdXIgcm91dGVzXCIsIHBhdGgsIHBhdGgpO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKSBtYXRjaCA9IHt9O1xuXG4gICAgICAgIHZhciBwcmV2Um91dGVzID0gc3RhdGUucm91dGVzIHx8IFtdO1xuICAgICAgICB2YXIgcHJldlBhcmFtcyA9IHN0YXRlLnBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIHByZXZRdWVyeSA9IHN0YXRlLnF1ZXJ5IHx8IHt9O1xuXG4gICAgICAgIHZhciBuZXh0Um91dGVzID0gbWF0Y2gucm91dGVzIHx8IFtdO1xuICAgICAgICB2YXIgbmV4dFBhcmFtcyA9IG1hdGNoLnBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIG5leHRRdWVyeSA9IG1hdGNoLnF1ZXJ5IHx8IHt9O1xuXG4gICAgICAgIHZhciBmcm9tUm91dGVzLCB0b1JvdXRlcztcbiAgICAgICAgaWYgKHByZXZSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZnJvbVJvdXRlcyA9IHByZXZSb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICFoYXNNYXRjaChuZXh0Um91dGVzLCByb3V0ZSwgcHJldlBhcmFtcywgbmV4dFBhcmFtcywgcHJldlF1ZXJ5LCBuZXh0UXVlcnkpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdG9Sb3V0ZXMgPSBuZXh0Um91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgIHJldHVybiAhaGFzTWF0Y2gocHJldlJvdXRlcywgcm91dGUsIHByZXZQYXJhbXMsIG5leHRQYXJhbXMsIHByZXZRdWVyeSwgbmV4dFF1ZXJ5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9tUm91dGVzID0gW107XG4gICAgICAgICAgdG9Sb3V0ZXMgPSBuZXh0Um91dGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBuZXcgVHJhbnNpdGlvbihwYXRoLCBSb3V0ZXIucmVwbGFjZVdpdGguYmluZChSb3V0ZXIsIHBhdGgpKTtcbiAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuXG4gICAgICAgIHZhciBmcm9tQ29tcG9uZW50cyA9IG1vdW50ZWRDb21wb25lbnRzLnNsaWNlKHByZXZSb3V0ZXMubGVuZ3RoIC0gZnJvbVJvdXRlcy5sZW5ndGgpO1xuXG4gICAgICAgIFRyYW5zaXRpb24uZnJvbSh0cmFuc2l0aW9uLCBmcm9tUm91dGVzLCBmcm9tQ29tcG9uZW50cywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIHx8IHRyYW5zaXRpb24uYWJvcnRSZWFzb24pIHJldHVybiBkaXNwYXRjaEhhbmRsZXIuY2FsbChSb3V0ZXIsIGVycm9yLCB0cmFuc2l0aW9uKTsgLy8gTm8gbmVlZCB0byBjb250aW51ZS5cblxuICAgICAgICAgIFRyYW5zaXRpb24udG8odHJhbnNpdGlvbiwgdG9Sb3V0ZXMsIG5leHRQYXJhbXMsIG5leHRRdWVyeSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBkaXNwYXRjaEhhbmRsZXIuY2FsbChSb3V0ZXIsIGVycm9yLCB0cmFuc2l0aW9uLCB7XG4gICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgICBwYXRobmFtZTogbWF0Y2gucGF0aG5hbWUsXG4gICAgICAgICAgICAgIHJvdXRlczogbmV4dFJvdXRlcyxcbiAgICAgICAgICAgICAgcGFyYW1zOiBuZXh0UGFyYW1zLFxuICAgICAgICAgICAgICBxdWVyeTogbmV4dFF1ZXJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFN0YXJ0cyB0aGlzIHJvdXRlciBhbmQgY2FsbHMgY2FsbGJhY2socm91dGVyLCBzdGF0ZSkgd2hlbiB0aGUgcm91dGUgY2hhbmdlcy5cbiAgICAgICAqXG4gICAgICAgKiBJZiB0aGUgcm91dGVyJ3MgbG9jYXRpb24gaXMgc3RhdGljIChpLmUuIGEgVVJMIHBhdGggaW4gYSBzZXJ2ZXIgZW52aXJvbm1lbnQpXG4gICAgICAgKiB0aGUgY2FsbGJhY2sgaXMgY2FsbGVkIG9ubHkgb25jZS4gT3RoZXJ3aXNlLCB0aGUgbG9jYXRpb24gc2hvdWxkIGJlIG9uZSBvZiB0aGVcbiAgICAgICAqIFJvdXRlci4qTG9jYXRpb24gb2JqZWN0cyAoZS5nLiBSb3V0ZXIuSGFzaExvY2F0aW9uIG9yIFJvdXRlci5IaXN0b3J5TG9jYXRpb24pLlxuICAgICAgICovXG4gICAgICBydW46IGZ1bmN0aW9uIHJ1bihjYWxsYmFjaykge1xuICAgICAgICBpbnZhcmlhbnQoIVJvdXRlci5pc1J1bm5pbmcsIFwiUm91dGVyIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcblxuICAgICAgICBkaXNwYXRjaEhhbmRsZXIgPSBmdW5jdGlvbiAoZXJyb3IsIHRyYW5zaXRpb24sIG5ld1N0YXRlKSB7XG4gICAgICAgICAgaWYgKGVycm9yKSBSb3V0ZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2l0aW9uICE9PSB0cmFuc2l0aW9uKSByZXR1cm47XG5cbiAgICAgICAgICBwZW5kaW5nVHJhbnNpdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbi5hYm9ydFJlYXNvbikge1xuICAgICAgICAgICAgUm91dGVyLmhhbmRsZUFib3J0KHRyYW5zaXRpb24uYWJvcnRSZWFzb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKFJvdXRlciwgUm91dGVyLCBuZXh0U3RhdGUgPSBuZXdTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghKGxvY2F0aW9uIGluc3RhbmNlb2YgU3RhdGljTG9jYXRpb24pKSB7XG4gICAgICAgICAgaWYgKGxvY2F0aW9uLmFkZENoYW5nZUxpc3RlbmVyKSBsb2NhdGlvbi5hZGRDaGFuZ2VMaXN0ZW5lcihSb3V0ZXIuaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuXG4gICAgICAgICAgUm91dGVyLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCb290c3RyYXAgdXNpbmcgdGhlIGN1cnJlbnQgcGF0aC5cbiAgICAgICAgUm91dGVyLnJlZnJlc2goKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgICAgIFJvdXRlci5kaXNwYXRjaChsb2NhdGlvbi5nZXRDdXJyZW50UGF0aCgpLCBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIFJvdXRlci5jYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpO1xuXG4gICAgICAgIGlmIChsb2NhdGlvbi5yZW1vdmVDaGFuZ2VMaXN0ZW5lcikgbG9jYXRpb24ucmVtb3ZlQ2hhbmdlTGlzdGVuZXIoUm91dGVyLmhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcblxuICAgICAgICBSb3V0ZXIuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9LFxuXG4gICAgICBnZXRMb2NhdGlvbjogZnVuY3Rpb24gZ2V0TG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgIH0sXG5cbiAgICAgIGdldFNjcm9sbEJlaGF2aW9yOiBmdW5jdGlvbiBnZXRTY3JvbGxCZWhhdmlvcigpIHtcbiAgICAgICAgcmV0dXJuIHNjcm9sbEJlaGF2aW9yO1xuICAgICAgfSxcblxuICAgICAgZ2V0Um91dGVBdERlcHRoOiBmdW5jdGlvbiBnZXRSb3V0ZUF0RGVwdGgocm91dGVEZXB0aCkge1xuICAgICAgICB2YXIgcm91dGVzID0gc3RhdGUucm91dGVzO1xuICAgICAgICByZXR1cm4gcm91dGVzICYmIHJvdXRlc1tyb3V0ZURlcHRoXTtcbiAgICAgIH0sXG5cbiAgICAgIHNldFJvdXRlQ29tcG9uZW50QXREZXB0aDogZnVuY3Rpb24gc2V0Um91dGVDb21wb25lbnRBdERlcHRoKHJvdXRlRGVwdGgsIGNvbXBvbmVudCkge1xuICAgICAgICBtb3VudGVkQ29tcG9uZW50c1tyb3V0ZURlcHRoXSA9IGNvbXBvbmVudDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCArIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAqL1xuICAgICAgZ2V0Q3VycmVudFBhdGg6IGZ1bmN0aW9uIGdldEN1cnJlbnRQYXRoKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUucGF0aDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmcuXG4gICAgICAgKi9cbiAgICAgIGdldEN1cnJlbnRQYXRobmFtZTogZnVuY3Rpb24gZ2V0Q3VycmVudFBhdGhuYW1lKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUucGF0aG5hbWU7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIFVSTCBwYXJhbWV0ZXJzLlxuICAgICAgICovXG4gICAgICBnZXRDdXJyZW50UGFyYW1zOiBmdW5jdGlvbiBnZXRDdXJyZW50UGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUucGFyYW1zO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgICAgICovXG4gICAgICBnZXRDdXJyZW50UXVlcnk6IGZ1bmN0aW9uIGdldEN1cnJlbnRRdWVyeSgpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnF1ZXJ5O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHJvdXRlcy5cbiAgICAgICAqL1xuICAgICAgZ2V0Q3VycmVudFJvdXRlczogZnVuY3Rpb24gZ2V0Q3VycmVudFJvdXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnJvdXRlcztcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiByb3V0ZSwgcGFyYW1zLCBhbmQgcXVlcnkgYXJlIGFjdGl2ZS5cbiAgICAgICAqL1xuICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIGlmIChQYXRoVXRpbHMuaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAgICAgICByZXR1cm4gdG8gPT09IHN0YXRlLnBhdGg7XG4gICAgICAgIH1yZXR1cm4gcm91dGVJc0FjdGl2ZShzdGF0ZS5yb3V0ZXMsIHRvKSAmJiBwYXJhbXNBcmVBY3RpdmUoc3RhdGUucGFyYW1zLCBwYXJhbXMpICYmIChxdWVyeSA9PSBudWxsIHx8IHF1ZXJ5SXNBY3RpdmUoc3RhdGUucXVlcnksIHF1ZXJ5KSk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbU2Nyb2xsSGlzdG9yeV0sXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZmFsc3lcbiAgICB9LFxuXG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICAgIHJvdXRlRGVwdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIHJvdXRlcjogUHJvcFR5cGVzLnJvdXRlci5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm91dGVEZXB0aDogMSxcbiAgICAgICAgcm91dGVyOiBSb3V0ZXJcbiAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgcmV0dXJuIHN0YXRlID0gbmV4dFN0YXRlO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9IG5leHRTdGF0ZSk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIFJvdXRlci5zdG9wKCk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIHJvdXRlID0gUm91dGVyLmdldFJvdXRlQXREZXB0aCgwKTtcbiAgICAgIHJldHVybiByb3V0ZSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQocm91dGUuaGFuZGxlciwgdGhpcy5wcm9wcykgOiBudWxsO1xuICAgIH1cblxuICB9KTtcblxuICBSb3V0ZXIuY2xlYXJBbGxSb3V0ZXMoKTtcblxuICBpZiAob3B0aW9ucy5yb3V0ZXMpIFJvdXRlci5hZGRSb3V0ZXMob3B0aW9ucy5yb3V0ZXMpO1xuXG4gIHJldHVybiBSb3V0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUm91dGVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBqc2hpbnQgLVcwODQgKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwicmVhY3QvbGliL09iamVjdC5hc3NpZ25cIik7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoXCJyZWFjdC9saWIvd2FybmluZ1wiKTtcbnZhciBEZWZhdWx0Um91dGUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL0RlZmF1bHRSb3V0ZVwiKTtcbnZhciBOb3RGb3VuZFJvdXRlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9Ob3RGb3VuZFJvdXRlXCIpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9SZWRpcmVjdFwiKTtcbnZhciBSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpO1xuXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyhjb21wb25lbnROYW1lLCBwcm9wVHlwZXMsIHByb3BzKSB7XG4gIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IFwiVW5rbm93bkNvbXBvbmVudFwiO1xuXG4gIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9wVHlwZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICB2YXIgZXJyb3IgPSBwcm9wVHlwZXNbcHJvcE5hbWVdKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSk7XG5cbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB3YXJuaW5nKGZhbHNlLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUm91dGVPcHRpb25zKHByb3BzKSB7XG4gIHZhciBvcHRpb25zID0gYXNzaWduKHt9LCBwcm9wcyk7XG4gIHZhciBoYW5kbGVyID0gb3B0aW9ucy5oYW5kbGVyO1xuXG4gIGlmIChoYW5kbGVyKSB7XG4gICAgb3B0aW9ucy5vbkVudGVyID0gaGFuZGxlci53aWxsVHJhbnNpdGlvblRvO1xuICAgIG9wdGlvbnMub25MZWF2ZSA9IGhhbmRsZXIud2lsbFRyYW5zaXRpb25Gcm9tO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICByZXR1cm47XG4gIH12YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIHByb3BzID0gYXNzaWduKHt9LCB0eXBlLmRlZmF1bHRQcm9wcywgZWxlbWVudC5wcm9wcyk7XG5cbiAgaWYgKHR5cGUucHJvcFR5cGVzKSBjaGVja1Byb3BUeXBlcyh0eXBlLmRpc3BsYXlOYW1lLCB0eXBlLnByb3BUeXBlcywgcHJvcHMpO1xuXG4gIGlmICh0eXBlID09PSBEZWZhdWx0Um91dGUpIHtcbiAgICByZXR1cm4gUm91dGUuY3JlYXRlRGVmYXVsdFJvdXRlKGNyZWF0ZVJvdXRlT3B0aW9ucyhwcm9wcykpO1xuICB9aWYgKHR5cGUgPT09IE5vdEZvdW5kUm91dGUpIHtcbiAgICByZXR1cm4gUm91dGUuY3JlYXRlTm90Rm91bmRSb3V0ZShjcmVhdGVSb3V0ZU9wdGlvbnMocHJvcHMpKTtcbiAgfWlmICh0eXBlID09PSBSZWRpcmVjdCkge1xuICAgIHJldHVybiBSb3V0ZS5jcmVhdGVSZWRpcmVjdChjcmVhdGVSb3V0ZU9wdGlvbnMocHJvcHMpKTtcbiAgfXJldHVybiBSb3V0ZS5jcmVhdGVSb3V0ZShjcmVhdGVSb3V0ZU9wdGlvbnMocHJvcHMpLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHByb3BzLmNoaWxkcmVuKSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihwcm9wcy5jaGlsZHJlbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygcm91dGVzIGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW5cbiAqIFJlYWN0Q2hpbGRyZW4sIGFsbCBvZiB3aGljaCBzaG91bGQgYmUgb25lIG9mIDxSb3V0ZT4sIDxEZWZhdWx0Um91dGU+LFxuICogPE5vdEZvdW5kUm91dGU+LCBvciA8UmVkaXJlY3Q+LCBlLmcuOlxuICpcbiAqICAgdmFyIHsgY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4sIFJvdXRlLCBSZWRpcmVjdCB9ID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG4gKlxuICogICB2YXIgcm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4oXG4gKiAgICAgPFJvdXRlIHBhdGg9XCIvXCIgaGFuZGxlcj17QXBwfT5cbiAqICAgICAgIDxSb3V0ZSBuYW1lPVwidXNlclwiIHBhdGg9XCIvdXNlci86dXNlcklkXCIgaGFuZGxlcj17VXNlcn0+XG4gKiAgICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza1wiIHBhdGg9XCJ0YXNrcy86dGFza0lkXCIgaGFuZGxlcj17VGFza30vPlxuICogICAgICAgICA8UmVkaXJlY3QgZnJvbT1cInRvZG9zLzp0YXNrSWRcIiB0bz1cInRhc2tcIi8+XG4gKiAgICAgICA8L1JvdXRlPlxuICogICAgIDwvUm91dGU+XG4gKiAgICk7XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIHZhciByb3V0ZXMgPSBbXTtcblxuICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgPSBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQoY2hpbGQpKSByb3V0ZXMucHVzaChjaGlsZCk7XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKFwicmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50XCIpLmNhblVzZURPTTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgd2luZG93IGFzIHsgeCwgeSB9LlxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbigpIHtcbiAgaW52YXJpYW50KGNhblVzZURPTSwgXCJDYW5ub3QgZ2V0IGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIHdpdGhvdXQgYSBET01cIik7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5EZWZhdWx0Um91dGUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL0RlZmF1bHRSb3V0ZVwiKTtcbmV4cG9ydHMuTGluayA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvTGlua1wiKTtcbmV4cG9ydHMuTm90Rm91bmRSb3V0ZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvTm90Rm91bmRSb3V0ZVwiKTtcbmV4cG9ydHMuUmVkaXJlY3QgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL1JlZGlyZWN0XCIpO1xuZXhwb3J0cy5Sb3V0ZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvUm91dGVcIik7XG5leHBvcnRzLlJvdXRlSGFuZGxlciA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvUm91dGVIYW5kbGVyXCIpO1xuXG5leHBvcnRzLkhhc2hMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9IYXNoTG9jYXRpb25cIik7XG5leHBvcnRzLkhpc3RvcnlMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9IaXN0b3J5TG9jYXRpb25cIik7XG5leHBvcnRzLlJlZnJlc2hMb2NhdGlvbiA9IHJlcXVpcmUoXCIuL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb25cIik7XG5leHBvcnRzLlN0YXRpY0xvY2F0aW9uID0gcmVxdWlyZShcIi4vbG9jYXRpb25zL1N0YXRpY0xvY2F0aW9uXCIpO1xuZXhwb3J0cy5UZXN0TG9jYXRpb24gPSByZXF1aXJlKFwiLi9sb2NhdGlvbnMvVGVzdExvY2F0aW9uXCIpO1xuXG5leHBvcnRzLkltaXRhdGVCcm93c2VyQmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvcnMvSW1pdGF0ZUJyb3dzZXJCZWhhdmlvclwiKTtcbmV4cG9ydHMuU2Nyb2xsVG9Ub3BCZWhhdmlvciA9IHJlcXVpcmUoXCIuL2JlaGF2aW9ycy9TY3JvbGxUb1RvcEJlaGF2aW9yXCIpO1xuXG5leHBvcnRzLkhpc3RvcnkgPSByZXF1aXJlKFwiLi9IaXN0b3J5XCIpO1xuZXhwb3J0cy5OYXZpZ2F0aW9uID0gcmVxdWlyZShcIi4vTmF2aWdhdGlvblwiKTtcbmV4cG9ydHMuU3RhdGUgPSByZXF1aXJlKFwiLi9TdGF0ZVwiKTtcblxuZXhwb3J0cy5jcmVhdGVSb3V0ZSA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpLmNyZWF0ZVJvdXRlO1xuZXhwb3J0cy5jcmVhdGVEZWZhdWx0Um91dGUgPSByZXF1aXJlKFwiLi9Sb3V0ZVwiKS5jcmVhdGVEZWZhdWx0Um91dGU7XG5leHBvcnRzLmNyZWF0ZU5vdEZvdW5kUm91dGUgPSByZXF1aXJlKFwiLi9Sb3V0ZVwiKS5jcmVhdGVOb3RGb3VuZFJvdXRlO1xuZXhwb3J0cy5jcmVhdGVSZWRpcmVjdCA9IHJlcXVpcmUoXCIuL1JvdXRlXCIpLmNyZWF0ZVJlZGlyZWN0O1xuZXhwb3J0cy5jcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoXCIuL2NyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuXCIpO1xuZXhwb3J0cy5jcmVhdGUgPSByZXF1aXJlKFwiLi9jcmVhdGVSb3V0ZXJcIik7XG5leHBvcnRzLnJ1biA9IHJlcXVpcmUoXCIuL3J1blJvdXRlclwiKTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2hpbGQob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCB8fCBSZWFjdC5pc1ZhbGlkRWxlbWVudChvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBpc1JlYWN0Q2hpbGRyZW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc1ZhbGlkQ2hpbGQob2JqZWN0KSB8fCBBcnJheS5pc0FycmF5KG9iamVjdCkgJiYgb2JqZWN0LmV2ZXJ5KGlzVmFsaWRDaGlsZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNSZWFjdENoaWxkcmVuOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zXCIpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKFwiLi4vSGlzdG9yeVwiKTtcblxudmFyIF9saXN0ZW5lcnMgPSBbXTtcbnZhciBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcbnZhciBfYWN0aW9uVHlwZTtcblxuZnVuY3Rpb24gbm90aWZ5Q2hhbmdlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09IExvY2F0aW9uQWN0aW9ucy5QVVNIKSBIaXN0b3J5Lmxlbmd0aCArPSAxO1xuXG4gIHZhciBjaGFuZ2UgPSB7XG4gICAgcGF0aDogSGFzaExvY2F0aW9uLmdldEN1cnJlbnRQYXRoKCksXG4gICAgdHlwZTogdHlwZVxuICB9O1xuXG4gIF9saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICBsaXN0ZW5lci5jYWxsKEhhc2hMb2NhdGlvbiwgY2hhbmdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVNsYXNoKCkge1xuICB2YXIgcGF0aCA9IEhhc2hMb2NhdGlvbi5nZXRDdXJyZW50UGF0aCgpO1xuXG4gIGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gXCIvXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfUhhc2hMb2NhdGlvbi5yZXBsYWNlKFwiL1wiICsgcGF0aCk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbkhhc2hDaGFuZ2UoKSB7XG4gIGlmIChlbnN1cmVTbGFzaCgpKSB7XG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhbiBfYWN0aW9uVHlwZSB0aGVuIGFsbCB3ZSBrbm93IGlzIHRoZSBoYXNoXG4gICAgLy8gY2hhbmdlZC4gSXQgd2FzIHByb2JhYmx5IGNhdXNlZCBieSB0aGUgdXNlciBjbGlja2luZyB0aGUgQmFja1xuICAgIC8vIGJ1dHRvbiwgYnV0IG1heSBoYXZlIGFsc28gYmVlbiB0aGUgRm9yd2FyZCBidXR0b24gb3IgbWFudWFsXG4gICAgLy8gbWFuaXB1bGF0aW9uLiBTbyBqdXN0IGd1ZXNzICdwb3AnLlxuICAgIHZhciBjdXJBY3Rpb25UeXBlID0gX2FjdGlvblR5cGU7XG4gICAgX2FjdGlvblR5cGUgPSBudWxsO1xuICAgIG5vdGlmeUNoYW5nZShjdXJBY3Rpb25UeXBlIHx8IExvY2F0aW9uQWN0aW9ucy5QT1ApO1xuICB9XG59XG5cbi8qKlxuICogQSBMb2NhdGlvbiB0aGF0IHVzZXMgYHdpbmRvdy5sb2NhdGlvbi5oYXNoYC5cbiAqL1xudmFyIEhhc2hMb2NhdGlvbiA9IHtcblxuICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gYWRkQ2hhbmdlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICBfbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgLy8gRG8gdGhpcyBCRUZPUkUgbGlzdGVuaW5nIGZvciBoYXNoY2hhbmdlLlxuICAgIGVuc3VyZVNsYXNoKCk7XG5cbiAgICBpZiAoIV9pc0xpc3RlbmluZykge1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBvbkhhc2hDaGFuZ2UsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uaGFzaGNoYW5nZVwiLCBvbkhhc2hDaGFuZ2UpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlQ2hhbmdlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICBfbGlzdGVuZXJzID0gX2xpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcbiAgICAgIHJldHVybiBsICE9PSBsaXN0ZW5lcjtcbiAgICB9KTtcblxuICAgIGlmIChfbGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBvbkhhc2hDaGFuZ2UsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudChcIm9uaGFzaGNoYW5nZVwiLCBvbkhhc2hDaGFuZ2UpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgcHVzaDogZnVuY3Rpb24gcHVzaChwYXRoKSB7XG4gICAgX2FjdGlvblR5cGUgPSBMb2NhdGlvbkFjdGlvbnMuUFVTSDtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG4gIH0sXG5cbiAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShwYXRoKSB7XG4gICAgX2FjdGlvblR5cGUgPSBMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgXCIjXCIgKyBwYXRoKTtcbiAgfSxcblxuICBwb3A6IGZ1bmN0aW9uIHBvcCgpIHtcbiAgICBfYWN0aW9uVHlwZSA9IExvY2F0aW9uQWN0aW9ucy5QT1A7XG4gICAgSGlzdG9yeS5iYWNrKCk7XG4gIH0sXG5cbiAgZ2V0Q3VycmVudFBhdGg6IGZ1bmN0aW9uIGdldEN1cnJlbnRQYXRoKCkge1xuICAgIHJldHVybiBkZWNvZGVVUkkoXG4gICAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAgIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzFdIHx8IFwiXCIpO1xuICB9LFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCI8SGFzaExvY2F0aW9uPlwiO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGFzaExvY2F0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zXCIpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKFwiLi4vSGlzdG9yeVwiKTtcblxudmFyIF9saXN0ZW5lcnMgPSBbXTtcbnZhciBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gbm90aWZ5Q2hhbmdlKHR5cGUpIHtcbiAgdmFyIGNoYW5nZSA9IHtcbiAgICBwYXRoOiBIaXN0b3J5TG9jYXRpb24uZ2V0Q3VycmVudFBhdGgoKSxcbiAgICB0eXBlOiB0eXBlXG4gIH07XG5cbiAgX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIGxpc3RlbmVyLmNhbGwoSGlzdG9yeUxvY2F0aW9uLCBjaGFuZ2UpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb25Qb3BTdGF0ZShldmVudCkge1xuICBpZiAoZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBJZ25vcmUgZXh0cmFuZW91cyBwb3BzdGF0ZSBldmVudHMgaW4gV2ViS2l0LlxuXG4gIG5vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUE9QKTtcbn1cblxuLyoqXG4gKiBBIExvY2F0aW9uIHRoYXQgdXNlcyBIVE1MNSBoaXN0b3J5LlxuICovXG52YXIgSGlzdG9yeUxvY2F0aW9uID0ge1xuXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiBhZGRDaGFuZ2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgIF9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICBpZiAoIV9pc0xpc3RlbmluZykge1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgb25Qb3BTdGF0ZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25wb3BzdGF0ZVwiLCBvblBvcFN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgX2lzTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUNoYW5nZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgX2xpc3RlbmVycyA9IF9saXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gbCAhPT0gbGlzdGVuZXI7XG4gICAgfSk7XG5cbiAgICBpZiAoX2xpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIG9uUG9wU3RhdGUsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudChcIm9ucG9wc3RhdGVcIiwgb25Qb3BTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBwdXNoOiBmdW5jdGlvbiBwdXNoKHBhdGgpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBwYXRoOiBwYXRoIH0sIFwiXCIsIHBhdGgpO1xuICAgIEhpc3RvcnkubGVuZ3RoICs9IDE7XG4gICAgbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5QVVNIKTtcbiAgfSxcblxuICByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKHBhdGgpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBwYXRoOiBwYXRoIH0sIFwiXCIsIHBhdGgpO1xuICAgIG5vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRSk7XG4gIH0sXG5cbiAgcG9wOiBIaXN0b3J5LmJhY2ssXG5cbiAgZ2V0Q3VycmVudFBhdGg6IGZ1bmN0aW9uIGdldEN1cnJlbnRQYXRoKCkge1xuICAgIHJldHVybiBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIH0sXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBcIjxIaXN0b3J5TG9jYXRpb24+XCI7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIaXN0b3J5TG9jYXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBIaXN0b3J5TG9jYXRpb24gPSByZXF1aXJlKFwiLi9IaXN0b3J5TG9jYXRpb25cIik7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoXCIuLi9IaXN0b3J5XCIpO1xuXG4vKipcbiAqIEEgTG9jYXRpb24gdGhhdCB1c2VzIGZ1bGwgcGFnZSByZWZyZXNoZXMuIFRoaXMgaXMgdXNlZCBhc1xuICogdGhlIGZhbGxiYWNrIGZvciBIaXN0b3J5TG9jYXRpb24gaW4gYnJvd3NlcnMgdGhhdCBkbyBub3RcbiAqIHN1cHBvcnQgdGhlIEhUTUw1IGhpc3RvcnkgQVBJLlxuICovXG52YXIgUmVmcmVzaExvY2F0aW9uID0ge1xuXG4gIHB1c2g6IGZ1bmN0aW9uIHB1c2gocGF0aCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHBhdGg7XG4gIH0sXG5cbiAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShwYXRoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UocGF0aCk7XG4gIH0sXG5cbiAgcG9wOiBIaXN0b3J5LmJhY2ssXG5cbiAgZ2V0Q3VycmVudFBhdGg6IEhpc3RvcnlMb2NhdGlvbi5nZXRDdXJyZW50UGF0aCxcblxuICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiPFJlZnJlc2hMb2NhdGlvbj5cIjtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZnJlc2hMb2NhdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcblxuZnVuY3Rpb24gdGhyb3dDYW5ub3RNb2RpZnkoKSB7XG4gIGludmFyaWFudChmYWxzZSwgXCJZb3UgY2Fubm90IG1vZGlmeSBhIHN0YXRpYyBsb2NhdGlvblwiKTtcbn1cblxuLyoqXG4gKiBBIGxvY2F0aW9uIHRoYXQgb25seSBldmVyIGNvbnRhaW5zIGEgc2luZ2xlIHBhdGguIFVzZWZ1bCBpblxuICogc3RhdGVsZXNzIGVudmlyb25tZW50cyBsaWtlIHNlcnZlcnMgd2hlcmUgdGhlcmUgaXMgbm8gcGF0aCBoaXN0b3J5LFxuICogb25seSB0aGUgcGF0aCB0aGF0IHdhcyB1c2VkIGluIHRoZSByZXF1ZXN0LlxuICovXG5cbnZhciBTdGF0aWNMb2NhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0YXRpY0xvY2F0aW9uKHBhdGgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RhdGljTG9jYXRpb24pO1xuXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdGF0aWNMb2NhdGlvbiwge1xuICAgIGdldEN1cnJlbnRQYXRoOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q3VycmVudFBhdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XG4gICAgICB9XG4gICAgfSxcbiAgICB0b1N0cmluZzoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gXCI8U3RhdGljTG9jYXRpb24gcGF0aD1cXFwiXCIgKyB0aGlzLnBhdGggKyBcIlxcXCI+XCI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU3RhdGljTG9jYXRpb247XG59KSgpO1xuXG4vLyBUT0RPOiBJbmNsdWRlIHRoZXNlIGluIHRoZSBhYm92ZSBjbGFzcyBkZWZpbml0aW9uXG4vLyBvbmNlIHdlIGNhbiB1c2UgRVM3IHByb3BlcnR5IGluaXRpYWxpemVycy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvNjE5XG5cblN0YXRpY0xvY2F0aW9uLnByb3RvdHlwZS5wdXNoID0gdGhyb3dDYW5ub3RNb2RpZnk7XG5TdGF0aWNMb2NhdGlvbi5wcm90b3R5cGUucmVwbGFjZSA9IHRocm93Q2Fubm90TW9kaWZ5O1xuU3RhdGljTG9jYXRpb24ucHJvdG90eXBlLnBvcCA9IHRocm93Q2Fubm90TW9kaWZ5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRpY0xvY2F0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCJyZWFjdC9saWIvaW52YXJpYW50XCIpO1xudmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9uc1wiKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZShcIi4uL0hpc3RvcnlcIik7XG5cbi8qKlxuICogQSBsb2NhdGlvbiB0aGF0IGlzIGNvbnZlbmllbnQgZm9yIHRlc3RpbmcgYW5kIGRvZXMgbm90IHJlcXVpcmUgYSBET00uXG4gKi9cblxudmFyIFRlc3RMb2NhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRlc3RMb2NhdGlvbihoaXN0b3J5KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRlc3RMb2NhdGlvbik7XG5cbiAgICB0aGlzLmhpc3RvcnkgPSBoaXN0b3J5IHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5fdXBkYXRlSGlzdG9yeUxlbmd0aCgpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRlc3RMb2NhdGlvbiwge1xuICAgIG5lZWRzRE9NOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgX3VwZGF0ZUhpc3RvcnlMZW5ndGg6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlSGlzdG9yeUxlbmd0aCgpIHtcbiAgICAgICAgSGlzdG9yeS5sZW5ndGggPSB0aGlzLmhpc3RvcnkubGVuZ3RoO1xuICAgICAgfVxuICAgIH0sXG4gICAgX25vdGlmeUNoYW5nZToge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9ub3RpZnlDaGFuZ2UodHlwZSkge1xuICAgICAgICB2YXIgY2hhbmdlID0ge1xuICAgICAgICAgIHBhdGg6IHRoaXMuZ2V0Q3VycmVudFBhdGgoKSxcbiAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB0aGlzLmxpc3RlbmVyc1tpXS5jYWxsKHRoaXMsIGNoYW5nZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRDaGFuZ2VMaXN0ZW5lcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZENoYW5nZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVDaGFuZ2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgICAgIHJldHVybiBsICE9PSBsaXN0ZW5lcjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwdXNoOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcHVzaChwYXRoKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5wdXNoKHBhdGgpO1xuICAgICAgICB0aGlzLl91cGRhdGVIaXN0b3J5TGVuZ3RoKCk7XG4gICAgICAgIHRoaXMuX25vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUFVTSCk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXBsYWNlOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVwbGFjZShwYXRoKSB7XG4gICAgICAgIGludmFyaWFudCh0aGlzLmhpc3RvcnkubGVuZ3RoLCBcIllvdSBjYW5ub3QgcmVwbGFjZSB0aGUgY3VycmVudCBwYXRoIHdpdGggbm8gaGlzdG9yeVwiKTtcblxuICAgICAgICB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDFdID0gcGF0aDtcblxuICAgICAgICB0aGlzLl9ub3RpZnlDaGFuZ2UoTG9jYXRpb25BY3Rpb25zLlJFUExBQ0UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcG9wOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcG9wKCkge1xuICAgICAgICB0aGlzLmhpc3RvcnkucG9wKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhpc3RvcnlMZW5ndGgoKTtcbiAgICAgICAgdGhpcy5fbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5QT1ApO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0Q3VycmVudFBhdGg6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50UGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMV07XG4gICAgICB9XG4gICAgfSxcbiAgICB0b1N0cmluZzoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gXCI8VGVzdExvY2F0aW9uPlwiO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRlc3RMb2NhdGlvbjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGVzdExvY2F0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlUm91dGVyID0gcmVxdWlyZShcIi4vY3JlYXRlUm91dGVyXCIpO1xuXG4vKipcbiAqIEEgaGlnaC1sZXZlbCBjb252ZW5pZW5jZSBtZXRob2QgdGhhdCBjcmVhdGVzLCBjb25maWd1cmVzLCBhbmRcbiAqIHJ1bnMgYSByb3V0ZXIgaW4gb25lIHNob3QuIFRoZSBtZXRob2Qgc2lnbmF0dXJlIGlzOlxuICpcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXNbLCBsb2NhdGlvbiBdLCBjYWxsYmFjayk7XG4gKlxuICogVXNpbmcgYHdpbmRvdy5sb2NhdGlvbi5oYXNoYCB0byBtYW5hZ2UgdGhlIFVSTCwgeW91IGNvdWxkIGRvOlxuICpcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXMsIGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgUmVhY3QucmVuZGVyKDxIYW5kbGVyLz4sIGRvY3VtZW50LmJvZHkpO1xuICogICB9KTtcbiAqIFxuICogVXNpbmcgSFRNTDUgaGlzdG9yeSBhbmQgYSBjdXN0b20gXCJjdXJzb3JcIiBwcm9wOlxuICogXG4gKiAgIFJvdXRlci5ydW4ocm91dGVzLCBSb3V0ZXIuSGlzdG9yeUxvY2F0aW9uLCBmdW5jdGlvbiAoSGFuZGxlcikge1xuICogICAgIFJlYWN0LnJlbmRlcig8SGFuZGxlciBjdXJzb3I9e2N1cnNvcn0vPiwgZG9jdW1lbnQuYm9keSk7XG4gKiAgIH0pO1xuICpcbiAqIFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgcm91dGVyLlxuICpcbiAqIE5vdGU6IElmIHlvdSBuZWVkIHRvIHNwZWNpZnkgZnVydGhlciBvcHRpb25zIGZvciB5b3VyIHJvdXRlciBzdWNoXG4gKiBhcyBlcnJvci9hYm9ydCBoYW5kbGluZyBvciBjdXN0b20gc2Nyb2xsIGJlaGF2aW9yLCB1c2UgUm91dGVyLmNyZWF0ZVxuICogaW5zdGVhZC5cbiAqXG4gKiAgIHZhciByb3V0ZXIgPSBSb3V0ZXIuY3JlYXRlKG9wdGlvbnMpO1xuICogICByb3V0ZXIucnVuKGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgLy8gLi4uXG4gKiAgIH0pO1xuICovXG5mdW5jdGlvbiBydW5Sb3V0ZXIocm91dGVzLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY2FsbGJhY2sgPSBsb2NhdGlvbjtcbiAgICBsb2NhdGlvbiA9IG51bGw7XG4gIH1cblxuICB2YXIgcm91dGVyID0gY3JlYXRlUm91dGVyKHtcbiAgICByb3V0ZXM6IHJvdXRlcyxcbiAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgfSk7XG5cbiAgcm91dGVyLnJ1bihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBydW5Sb3V0ZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpIHtcbiAgLyohIHRha2VuIGZyb20gbW9kZXJuaXpyXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAgICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmFja3QvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAgICovXG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZihcIkFuZHJvaWQgMi5cIikgIT09IC0xIHx8IHVhLmluZGV4T2YoXCJBbmRyb2lkIDQuMFwiKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoXCJNb2JpbGUgU2FmYXJpXCIpICE9PSAtMSAmJiB1YS5pbmRleE9mKFwiQ2hyb21lXCIpID09PSAtMSAmJiB1YS5pbmRleE9mKFwiV2luZG93cyBQaG9uZVwiKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmIFwicHVzaFN0YXRlXCIgaW4gd2luZG93Lmhpc3Rvcnk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VwcG9ydHNIaXN0b3J5OyIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gVG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciBrZXlzO1xuXHR2YXIgdG8gPSBUb09iamVjdCh0YXJnZXQpO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IGFyZ3VtZW50c1tzXTtcblx0XHRrZXlzID0gT2JqZWN0LmtleXMoT2JqZWN0KGZyb20pKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dG9ba2V5c1tpXV0gPSBmcm9tW2tleXNbaV1dO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliLycpO1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cbnZhciBTdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIFBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7fTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHJpbmdpZnk6IFN0cmluZ2lmeSxcbiAgICBwYXJzZTogUGFyc2Vcbn07XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDBcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlVmFsdWVzID0gZnVuY3Rpb24gKHN0ciwgb3B0aW9ucykge1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0KTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgICAgdmFyIHBvcyA9IHBhcnQuaW5kZXhPZignXT0nKSA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IHBhcnQuaW5kZXhPZignXT0nKSArIDE7XG5cbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIG9ialtVdGlscy5kZWNvZGUocGFydCldID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gVXRpbHMuZGVjb2RlKHBhcnQuc2xpY2UoMCwgcG9zKSk7XG4gICAgICAgICAgICB2YXIgdmFsID0gVXRpbHMuZGVjb2RlKHBhcnQuc2xpY2UocG9zICsgMSkpO1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gW10uY29uY2F0KG9ialtrZXldKS5jb25jYXQodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmludGVybmFscy5wYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoIWNoYWluLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIHZhciByb290ID0gY2hhaW4uc2hpZnQoKTtcblxuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZiAocm9vdCA9PT0gJ1tdJykge1xuICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgb2JqID0gb2JqLmNvbmNhdChpbnRlcm5hbHMucGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3RbMF0gPT09ICdbJyAmJiByb290W3Jvb3QubGVuZ3RoIC0gMV0gPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgcm9vdC5sZW5ndGggLSAxKSA6IHJvb3Q7XG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICB2YXIgaW5kZXhTdHJpbmcgPSAnJyArIGluZGV4O1xuICAgICAgICBpZiAoIWlzTmFOKGluZGV4KSAmJlxuICAgICAgICAgICAgcm9vdCAhPT0gY2xlYW5Sb290ICYmXG4gICAgICAgICAgICBpbmRleFN0cmluZyA9PT0gY2xlYW5Sb290ICYmXG4gICAgICAgICAgICBpbmRleCA+PSAwICYmXG4gICAgICAgICAgICBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpIHtcblxuICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICBvYmpbaW5kZXhdID0gaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGNoYWluLCB2YWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBpbnRlcm5hbHMucGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5pbnRlcm5hbHMucGFyc2VLZXlzID0gZnVuY3Rpb24gKGtleSwgdmFsLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIHBhcmVudCA9IC9eKFteXFxbXFxdXSopLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teXFxbXFxdXSpcXF0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBwYXJlbnQuZXhlYyhrZXkpO1xuXG4gICAgLy8gRG9uJ3QgYWxsb3cgdGhlbSB0byBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShzZWdtZW50WzFdKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHNlZ21lbnRbMV0pIHtcbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcblxuICAgICAgICArK2k7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShzZWdtZW50WzFdLnJlcGxhY2UoL1xcW3xcXF0vZywgJycpKSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVybmFscy5wYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8XG4gICAgICAgIHN0ciA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgVXRpbHMuaXNSZWdFeHAob3B0aW9ucy5kZWxpbWl0ZXIpID8gb3B0aW9ucy5kZWxpbWl0ZXIgOiBpbnRlcm5hbHMuZGVsaW1pdGVyO1xuICAgIG9wdGlvbnMuZGVwdGggPSB0eXBlb2Ygb3B0aW9ucy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmRlcHRoIDogaW50ZXJuYWxzLmRlcHRoO1xuICAgIG9wdGlvbnMuYXJyYXlMaW1pdCA9IHR5cGVvZiBvcHRpb25zLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5hcnJheUxpbWl0IDogaW50ZXJuYWxzLmFycmF5TGltaXQ7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9IHR5cGVvZiBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgOiBpbnRlcm5hbHMucGFyYW1ldGVyTGltaXQ7XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gaW50ZXJuYWxzLnBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBpbnRlcm5hbHMucGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gVXRpbHMubWVyZ2Uob2JqLCBuZXdPYmopO1xuICAgIH1cblxuICAgIHJldHVybiBVdGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuXG4vLyBEZWNsYXJlIGludGVybmFsc1xuXG52YXIgaW50ZXJuYWxzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGFycmF5UHJlZml4R2VuZXJhdG9yczoge1xuICAgICAgICBicmFja2V0czogZnVuY3Rpb24gKHByZWZpeCwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICAgICAgfSxcbiAgICAgICAgaW5kaWNlczogZnVuY3Rpb24gKHByZWZpeCwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgICAgICB9LFxuICAgICAgICByZXBlYXQ6IGZ1bmN0aW9uIChwcmVmaXgsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblxuaW50ZXJuYWxzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIHByZWZpeCwgZ2VuZXJhdGVBcnJheVByZWZpeCkge1xuXG4gICAgaWYgKFV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgb2JqID0gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgcmV0dXJuIFtlbmNvZGVVUklDb21wb25lbnQocHJlZml4KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmopXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb2JqS2V5cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGludGVybmFscy5zdHJpbmdpZnkob2JqW2tleV0sIGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpLCBnZW5lcmF0ZUFycmF5UHJlZml4KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGludGVybmFscy5zdHJpbmdpZnkob2JqW2tleV0sIHByZWZpeCArICdbJyArIGtleSArICddJywgZ2VuZXJhdGVBcnJheVByZWZpeCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGludGVybmFscy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgb2JqID09PSBudWxsKSB7XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0aW9ucy5hcnJheUZvcm1hdCBpbiBpbnRlcm5hbHMuYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5hcnJheUZvcm1hdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoJ2luZGljZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gaW50ZXJuYWxzLmFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICB2YXIgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb2JqS2V5cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwga2V5LCBnZW5lcmF0ZUFycmF5UHJlZml4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleXMuam9pbihkZWxpbWl0ZXIpO1xufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7fTtcblxuXG5leHBvcnRzLmFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiAoc291cmNlKSB7XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc291cmNlLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblxuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0YXJnZXQgPSBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmXG4gICAgICAgICFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcblxuICAgICAgICB0YXJnZXQgPSBleHBvcnRzLmFycmF5VG9PYmplY3QodGFyZ2V0KTtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgayA9IDAsIGtsID0ga2V5cy5sZW5ndGg7IGsgPCBrbDsgKytrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2tdO1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoIXRhcmdldFtrZXldKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBleHBvcnRzLm1lcmdlKHRhcmdldFtrZXldLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxuXG5leHBvcnRzLmNvbXBhY3QgPSBmdW5jdGlvbiAob2JqLCByZWZzKSB7XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgb2JqID09PSBudWxsKSB7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZWZzID0gcmVmcyB8fCBbXTtcbiAgICB2YXIgbG9va3VwID0gcmVmcy5pbmRleE9mKG9iaik7XG4gICAgaWYgKGxvb2t1cCAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHJlZnNbbG9va3VwXTtcbiAgICB9XG5cbiAgICByZWZzLnB1c2gob2JqKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9iai5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBhY3RlZDtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yIChpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIG9ialtrZXldID0gZXhwb3J0cy5jb21wYWN0KG9ialtrZXldLCByZWZzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5leHBvcnRzLmlzUmVnRXhwID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG5cbmV4cG9ydHMuaXNCdWZmZXIgPSBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICBpZiAob2JqID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiZcbiAgICAgICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmXG4gICAgICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXhlY3V0aW9uRW52aXJvbm1lbnRcbiAqL1xuXG4vKmpzbGludCBldmlsOiB0cnVlICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FuVXNlRE9NID0gISEoXG4gICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpXG4pO1xuXG4vKipcbiAqIFNpbXBsZSwgbGlnaHR3ZWlnaHQgbW9kdWxlIGFzc2lzdGluZyB3aXRoIHRoZSBkZXRlY3Rpb24gYW5kIGNvbnRleHQgb2ZcbiAqIFdvcmtlci4gSGVscHMgYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFuZCBhbGxvd3MgY29kZSB0byByZWFzb24gYWJvdXRcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGluIGEgV29ya2VyLCBldmVuIGlmIHRoZXkgbmV2ZXIgaW5jbHVkZSB0aGUgbWFpblxuICogYFJlYWN0V29ya2VyYCBkZXBlbmRlbmN5LlxuICovXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cbiAgY2FuVXNlRE9NOiBjYW5Vc2VET00sXG5cbiAgY2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cbiAgY2FuVXNlRXZlbnRMaXN0ZW5lcnM6XG4gICAgY2FuVXNlRE9NICYmICEhKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8IHdpbmRvdy5hdHRhY2hFdmVudCksXG5cbiAgY2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW4sXG5cbiAgaXNJbldvcmtlcjogIWNhblVzZURPTSAvLyBGb3Igbm93LCB0aGlzIGlzIHRydWUgLSBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGVjdXRpb25FbnZpcm9ubWVudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZW1wdHlGdW5jdGlvblxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24oYXJnKSB7IHJldHVybiBhcmc7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgd2FybmluZ1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoXCIuL2VtcHR5RnVuY3Rpb25cIik7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQgKSB7Zm9yICh2YXIgYXJncz1bXSwkX18wPTIsJF9fMT1hcmd1bWVudHMubGVuZ3RoOyRfXzA8JF9fMTskX18wKyspIGFyZ3MucHVzaChhcmd1bWVudHNbJF9fMF0pO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA8IDEwIHx8IC9eW3NcXFddKiQvLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHdhcm5pbmcgZm9ybWF0IHNob3VsZCBiZSBhYmxlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgJyArXG4gICAgICAgICd3YXJuaW5nLiBQbGVhc2UsIHVzZSBhIG1vcmUgZGVzY3JpcHRpdmUgZm9ybWF0IHRoYW46ICcgKyBmb3JtYXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpICB7cmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107fSk7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCh4KSB7fVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnZW1pdHRlcicpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ3JlZHVjZScpO1xuXG4vKipcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxuICovXG5cbnZhciByb290ID0gJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIHdpbmRvd1xuICA/IHRoaXNcbiAgOiB3aW5kb3c7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBUT0RPOiBmdXR1cmUgcHJvb2YsIG1vdmUgdG8gY29tcG9lbnQgbGFuZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0hvc3Qob2JqKSB7XG4gIHZhciBzdHIgPSB7fS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgc3dpdGNoIChzdHIpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZpbGVdJzpcbiAgICBjYXNlICdbb2JqZWN0IEJsb2JdJzpcbiAgICBjYXNlICdbb2JqZWN0IEZvcm1EYXRhXSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAmJiAoJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgdHJpbSA9ICcnLnRyaW1cbiAgPyBmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7IH07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAobnVsbCAhPSBvYmpba2V5XSkge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICAgICArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QgPSBzZXJpYWxpemU7XG5cbiAvKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG4gIHZhciBwYXJ0cztcbiAgdmFyIHBhaXI7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBhcnRzID0gcGFpci5zcGxpdCgnPScpO1xuICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1sxXSk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAnYXBwbGljYXRpb24veG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZSA9IHtcbiAgICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG4gfTtcblxuIC8qKlxuICAqIERlZmF1bHQgcGFyc2Vycy5cbiAgKlxuICAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xuICAqICAgICB9O1xuICAqXG4gICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlXG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcHBlZCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgZmllbGRzID0ge307XG4gIHZhciBpbmRleDtcbiAgdmFyIGxpbmU7XG4gIHZhciBmaWVsZDtcbiAgdmFyIHZhbDtcblxuICBsaW5lcy5wb3AoKTsgLy8gdHJhaWxpbmcgQ1JMRlxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGZpZWxkID0gbGluZS5zbGljZSgwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB0cmltKGxpbmUuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgZmllbGRzW2ZpZWxkXSA9IHZhbDtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB0eXBlKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcmFtcyhzdHIpe1xuICByZXR1cm4gcmVkdWNlKHN0ci5zcGxpdCgvICo7ICovKSwgZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKVxuICAgICAgLCBrZXkgPSBwYXJ0cy5zaGlmdCgpXG4gICAgICAsIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdGhpcy5zZXRTdGF0dXNQcm9wZXJ0aWVzKHRoaXMueGhyLnN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5zZXRIZWFkZXJQcm9wZXJ0aWVzKHRoaXMuaGVhZGVyKTtcbiAgdGhpcy5ib2R5ID0gdGhpcy5yZXEubWV0aG9kICE9ICdIRUFEJ1xuICAgID8gdGhpcy5wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpXG4gICAgOiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gIC8vIGNvbnRlbnQtdHlwZVxuICB2YXIgY3QgPSB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHR5cGUoY3QpO1xuXG4gIC8vIHBhcmFtc1xuICB2YXIgb2JqID0gcGFyYW1zKGN0KTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikgdGhpc1trZXldID0gb2JqW2tleV07XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnBhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cil7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAvLyBzdGF0dXMgLyBjbGFzc1xuICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgIDogZmFsc2U7XG5cbiAgLy8gc3VnYXJcbiAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cyB8fCAxMjIzID09IHN0YXR1cztcbiAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbiAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgRW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307XG4gIHRoaXMuX2hlYWRlciA9IHt9O1xuICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcignUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2UnKTtcbiAgICAgIGVyci5wYXJzZSA9IHRydWU7XG4gICAgICBlcnIub3JpZ2luYWwgPSBlO1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICB9XG5cbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH1cblxuICAgIHZhciBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG5cbiAgICBzZWxmLmNhbGxiYWNrKGVyciB8fCBuZXdfZXJyLCByZXMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNaXhpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBTZXQgdGltZW91dCB0byBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbihtcyl7XG4gIHRoaXMuX3RpbWVvdXQgPSBtcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3RpbWVvdXQgPSAwO1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLmFib3J0ZWQpIHJldHVybjtcbiAgdGhpcy5hYm9ydGVkID0gdHJ1ZTtcbiAgdGhpcy54aHIuYWJvcnQoKTtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oZmllbGQsIHZhbCl7XG4gIGlmIChpc09iamVjdChmaWVsZCkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZmllbGQpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5nZXRIZWFkZXIgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3Mpe1xuICB2YXIgc3RyID0gYnRvYSh1c2VyICsgJzonICsgcGFzcyk7XG4gIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBzdHIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuKlxuKiBFeGFtcGxlczpcbipcbiogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4qICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4qXG4qIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4qIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuKiBAYXBpIHB1YmxpY1xuKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICogcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB0aGlzLl9mb3JtRGF0YS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBmaWxlbmFtZWAuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgdGhpcy5fZm9ybURhdGEuYXBwZW5kKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBxdWVyeXN0cmluZ1xuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG11bHRpcGxlIGRhdGEgXCJ3cml0ZXNcIlxuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuc2VuZCh7IHNlYXJjaDogJ3F1ZXJ5JyB9KVxuICogICAgICAgICAuc2VuZCh7IHJhbmdlOiAnMS4uNScgfSlcbiAqICAgICAgICAgLnNlbmQoeyBvcmRlcjogJ2Rlc2MnIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcblxuICAvLyBtZXJnZVxuICBpZiAob2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIW9iaiB8fCBpc0hvc3QoZGF0YSkpIHJldHVybiB0aGlzO1xuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0RXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgb2YgJyArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSB0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCk7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAoNCAhPSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKDAgPT0gc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCkgcmV0dXJuIHNlbGYudGltZW91dEVycm9yKCk7XG4gICAgICBpZiAoc2VsZi5hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdHJ5IHtcbiAgICBpZiAoeGhyLnVwbG9hZCAmJiB0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICAgICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgfVxuXG4gIC8vIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICgnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIWlzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVt0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyldO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuICB4aHIuc2VuZChkYXRhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdGAuXG4gKi9cblxucmVxdWVzdC5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBJc3N1ZSBhIHJlcXVlc3Q6XG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgcmVxdWVzdCgnR0VUJywgJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycsIGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB1cmwgb3IgY2FsbGJhY2tcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmRlbCA9IGZ1bmN0aW9uKHVybCwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICBmdW5jdGlvbiBvbigpIHtcbiAgICBzZWxmLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCJcbi8qKlxuICogUmVkdWNlIGBhcnJgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge01peGVkfSBpbml0aWFsXG4gKlxuICogVE9ETzogY29tYmF0aWJsZSBlcnJvciBoYW5kbGluZz9cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgZm4sIGluaXRpYWwpeyAgXG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGN1cnIgPSBhcmd1bWVudHMubGVuZ3RoID09IDNcbiAgICA/IGluaXRpYWxcbiAgICA6IGFycltpZHgrK107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGN1cnIgPSBmbi5jYWxsKG51bGwsIGN1cnIsIGFycltpZHhdLCArK2lkeCwgYXJyKTtcbiAgfVxuICBcbiAgcmV0dXJuIGN1cnI7XG59OyJdfQ==
