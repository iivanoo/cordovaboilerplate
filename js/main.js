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
app={};
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
      // global var that instance singleton event object
       instance = Utils.PubSubEvent.getInstance();
 
        //chiamata per il singleton dello user management
        var instance1 = userManagement.getInstance();
        console.log(instance1, 'utente 1 local storage');
    }
  });
});
//user management
// set data to localstorage
localStorage.setItem('personalData', JSON.stringify({
    name: 'Lorenzo', 
    congome : "Di Cola",
    matricola : "219167",
    facolta : "informatica"
}
));
localStorage.setItem('logged', 'yes');
// singleton to read data in localstorage
var userManagement = (function () {
    var instance;
    function createInstance() {
        var logged = isLogged();
        var personalData = personalData();
      function isLogged(){
        var bool = localStorage.getItem('logged');
        return bool;
      } 
      function personalData(){
        var data = localStorage.getItem('personalData');
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