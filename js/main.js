// here we put the paths to all the libraries and framework we will use
require.config({
  paths: {
    jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery', 
    underscore: '../lib/underscore/underscore',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    spin: '../lib/spin/spin.min',
    preloader: '../lib/preloader/pre-loader',
    utils: '../lib/utils/utils'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'leaflet': {
      exports: 'L'
    }
  }
});

// We launch the App
require(['backbone', 'utils'], function(Backbone, Utils) {
  require(['preloader', 'router'], function(PreLoader, AppRouter) {

    //N.B. commentare la funzione run(); e decommentare deviceready quando si esegue il deploy su device
    run();
   // document.addEventListener("deviceready", run, false);

    function run() {

      // Here we precompile ALL the templates so that the app will be quickier when switching views
      // see utils.js
      Utils.loadTemplates().once("templatesLoaded", function() {

      var images = []; // here the developer can add the paths to the images that he would like to be preloaded

      if (images.length) {
          new PreLoader(images, {
            onComplete: startRouter
          });
        } else {
          // start the router directly if there are no images to be preloaded
          startRouter();
        }

        function startRouter() {
          // launch the router
          var router = new AppRouter();
          Backbone.history.start();
        }
      });
    }
  });
});
//user management
var userManagement = (function () {
    var instance;
 
    function createInstance() {
        var logged = isLogged();
        var personalData = personalData();
      function readCookie(nome){
        if (document.cookie.length > 0){
          var first = document.cookie.indexOf(nome + "=");
          if (first != -1){
            first = first + nome.length + 1;
            var end = document.cookie.indexOf(";",first);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(first,end));
          }else{
            return "";
          }
        }
        return "";
      }
      function isLogged(){
        var bool = readCookie('logged');
        if(bool){
            return "yes";
        } else {
            return "no";
        }
      } 
      function personalData(){
        var data = readCookie('personaldata');
        return data;
      }
      var object = {"is logged": logged, "personal data": personalData};
        return object;
    }
 
    return {
        getInstance: function () {
           if (!instance) {
                instance = createInstance();
            }
            return instance;
            
        }
    };
})();
 
/*$(document).ready(function() {
 
    var instance1 = userManagement.getInstance("mario");
    var instance2 = userManagement.getInstance("alessia"); 
    console.log(instance1);
    console.log(instance2);
});*/
