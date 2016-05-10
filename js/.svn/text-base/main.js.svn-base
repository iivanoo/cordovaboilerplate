require.config({
  paths: {
    jquery: '../lib/jquery/jquery-1.9.1.min', //'../lib/jquery/zepto',
    underscore: '../lib/underscore/underscore-min',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    datamanager: 'datamanager',
    spin: '../lib/spin/spin'
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

var db = openDatabase("data", "1", "data", 2048*2048);

function ImgError(source){
  empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
  source.src = "data:image/png;base64," + empty1x1png;
  source.onerror = "";
  return true;
}

var isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
      };

// We launch the App
require(['underscore', 'backbone', 'spin', 'router', 'datamanager'],
    function (_, Backbone, Spinner, AppRouter, Data) {

      String.prototype.endsWith = function(suffix) {
          return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };

      String.prototype.strip = function() {
          return this.replace(/(<([^>]+)>)/ig,"").replace(/(&lt;([^&gt;]+)&gt;)/ig,"");
      };

      document.addEventListener("deviceready", run, false);

      function run() {    
        Data.initialize();
        var router = new AppRouter();
        // var b = document.getElementsByTagName("body")[0];
        // if(localStorage.getItem("language")) {
        //   setTimeout(function(){Data.spinner.spin(b);}, 20);
        //   setTimeout(function(){Data.startupData();}, 100);  
        //   Data.on("dataReady", function() {
        //     Data.spinner.stop();
        //     Backbone.history.start();
        //     // Backbone.history.navigate("frascatiscienza", {trigger: true});
        //   });
        // } else {
        //   Backbone.history.start();
        // }
        Backbone.history.start(); 

/*
        if(!localStorage.getItem("dataLoaded")) {
          Data.loadLocalData();
        } else {
          Data.loadDbData();
        }*/

        //Data.loadLocalData();
        // qui controlliamo se ci sono dati nuovi
/*        if(navigator.connection.type == Connection.NONE) {
          //if(!Data.newDataChecked && Data.newDataAvailable()) {
          //  Data.checkNewData();
          //}
          Data.loadLocalData();
        } else {
          Data.downloadNewData();
        }*/
      }
  });
