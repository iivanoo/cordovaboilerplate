// here we put the paths to all the libraries and framework we will use
require.config({
  paths: {
    jquery: '../lib/zepto/zepto.min', // ../lib/jquery/jquery-2.0.3.min', 
    underscore: '../lib/underscore/underscore',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars-v1.2.0',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    spin: '../lib/spin/spin.min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'leaflet': {
      exports: 'L'
    }
  }
});

// ideally this should be the only global object in the app, it can be used to store data about the user
// currently logged in, app global information, or functions used throughout the app.
var App = {};

// We launch the App
require(['underscore', 'backbone', 'utils', 'router'],
  function(_, Backbone, Utils, AppRouter) {

    document.addEventListener("deviceready", run, false);

    function run() {
      // launch the router
      var router = new AppRouter();
      Backbone.history.start();
    }
<<<<<<< HEAD
  });
=======

    //// UTILITIES
    function loadUtils() {

      // function that will be called by the router every time a view must be removed from the DOM 
      Backbone.View.prototype.close = function() {
        // notify the new view that it is being removed
        this.trigger("removing");
        // close also all its subviews
        if (this.subViews) {
          for (var i = 0; i < this.subViews.length; i++) {
            this.subViews[i].close();
          }
        }
        // delete all references to subViews
        this.subViews = null;
        // remove the view from the DOM
        this.remove();
        // remove references to the DOM element of the view (both jQuery and JS objects)
        this.$el = null;
        this.el = null;
      };

      // function that will be called by the router every time the app changes the page filling the screen of the device 
      Backbone.Router.prototype.changePage = function(page) {
        // close the current view
        if (this.currentView) {
          this.currentView.close();
        }

        // cache the new view
        this.currentView = page;

        // render the new view
        page.render();

        // put the new view into the DOM
        this.structureView.contentElement.appendChild(page.el);

        // notify the new view that it is now in the DOM
        this.currentView.trigger("inTheDOM");
      };

      // shows an arbitrary website in the inner browser
      function showWebsite(url) {
        if (navigator.connection.type == Connection.NONE) {
          navigator.notification.alert('It looks like you have no Internet connection, please can you check it?', function() {}, "No Internet");
          return;
        }
        window.open(url, '_blank', 'location=yes,closebuttoncaption=close,EnableViewPortScale=yes');
      }

      // if we have a 404 error when loading an image, we put a transparent pixel in place of the ?? icon
      function ImgError(source) {
        empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
        source.src = "data:image/png;base64," + empty1x1png;
        source.onerror = "";
        return true;
      }

      // checks if the objects has no properties
      var isEmpty = function(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
      };

      // equivalent to Java's String.endsWith
      String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };

      // removes all XML (so also HTML) tags from the string
      String.prototype.strip = function() {
        return this.replace(/(<([^>]+)>)/ig, "").replace(/(&lt;([^&gt;]+)&gt;)/ig, "");
      };
    }

  });
>>>>>>> 8ffc67b362d63fdb5e4a36ea0e25bcfc2486ca68
