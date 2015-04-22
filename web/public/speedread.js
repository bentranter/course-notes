var app = app || {};

(function() {
  'use strict';
  /**
   * Speedreads some text.
   *
   * @param {String} the DOM element that starts the reader (should be 
   *                 a `<button>`)
   * @param {String} the DOM element that stops the reader (should also
   *                 be a `<button>`)
   * @param {String} the DOM element where the speedreading happens
   * @param {String} the DOM element that controls the speed
   * @param {string} the DOM element containing the content you want to 
   *                 speedread
   */
  app.speedRead = function(startBtn, stopBtn, reader, speedCtrl, content) {

    // Get a reference to our DOM elements
    this.start  = document.getElementById(startBtn);
    this.stop   = document.getElementById(stopBtn);
    this.reader = document.getElementById(reader);
    this.speed  = parseInt(document.getElementById(speedCtrl).value);

    // Get the textContent from the content element instead of the HTML,
    // since this let's us avoid having to remove all the HTML tags
    // created by `contentEditable`. Sorry IE < 9 users
    this.text = document.getElementById(content).textContent;

    // Split the content on spaces and most punctuation so we can blast through the text as an
    // array of words
    this.readingArray = this.text.split(/[\s,.:;?!]+/);

    // Get the words per milisecond, to make it easier to set the 
    // words-per-minute that we want to speedread at
    this.wordsPerMs = 60000/this.speed;

    // Need event listeners for speed control changes

    this.updateValues = function() {
      var self = this;
      var i = 0;
      var intervalId = setInterval(function() {
        self.reader.textContent = self.readingArray[i];
        i++;
        if (i === self.readingArray.length) {
          clearInterval(intervalId);
        }
      }, self.wordsPerMs);
    };

    // Event Listeners
    var self = this;
    this.start.addEventListener('click', function() {
      self.updateValues();
    });
  };
})();