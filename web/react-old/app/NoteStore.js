'use strict';

/**
 * Module dependencies
 */
var request = require('superagent');

/**
 * Constants
 */
var API              = 'http://localhost:3000/api/notes';
var _notes           = {};
var _changeListeners = [];
var _initCalled      = false;

var NoteStore = {

  init: function() {
    if (_initCalled) {
      return;
    }
    _initCalled = true;

    syncNotes(API, function(err, res) {
      res.forEach(function(note) {
        _notes[note.id] = note;
      });
      NoteStore.notifyChange();
    });
  },

  addNote: function(note, cb) {
    addNote(API, {
      note: note
    }, function(res) {
      _notes[res.note.id] = res.note;
      NoteStore.notifyChange();
      if (cb) {
        cb(res.note);
      }
    });
  },

  getNotes: function() {
    var array = [];
    for (var id in _notes) {
      array.push(_notes[id]);
    }
    return array;
  },

  getNote: function(id) {
    return _notes[id];
  },

  notifyChange: function() {
    _changeListeners.forEach(function(listener) {
      listener();
    });
  },

  addChangeListener: function(listener) {
    _changeListeners = _changeListeners.filter(function(l) {
      return listener !== l;
    });
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  }
};

module.exports = NoteStore;

function syncNotes(url, cb) {
  request
    .get(API)
    .set('X-Access-Token', window.localStorage.getItem('token'))
    .end(function(err, res) {
      if (res.ok) {
        cb(null, res.body);
      } else {
        cb(new Error('Not found'));
      }
    });
}

function addNote(url, obj, cb) {
  request
    .post(url)
    .set('X-Access-Token', window.localStorage.getItem('token'))
    .send(obj)
    .end(function(err, res) {
      if (res.ok) {
        cb(res.body);
      } else {
        new Error('Something went wrong');
      }
    });
}
