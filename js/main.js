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
  });