Cordova Boilerplate
==================

An extremely simple [Cordova](http://cordova.apache.org/) app that can be used as boilerplate for apps developed with modularity and performance in mind.

The proposed boilerplate has been developed with **MODULARITY** and **PERFORMANCE** in mind, it should be totally memory leaks free and ready-to-be-used in production. 

As a reference, give a look at the main.js file in '''www/js/main.js''', it contains:
* configuration map for keeping all the used libraries organized and easily interchangeable
* a *close* method for closing each view and managing all its inner views and bound events
* a *changePage* method for the Backbone Router that manages to switch between mobile app pages in a generic and reusable manner
* generic function to show a web page within a Cordova application and checking if the user has an Internet connection
* other useful functions are spread within the boilerplate, such as mobile-friendly CSS3 stylesheet, organization of the project in semantic directories (like: templates, js, img), etc.

Please, if you find some bugs or aspects to be enhanced, drop be a line!

Used frameworks
--------------

* [Cordova 3.3.0](http://cordova.apache.org/): the platform for building native mobile applications using HTML, CSS and JavaScript
* [Backbone 1.1.0](http://backbonejs.org/): a JavaScript MVC framework for giving structure to (mobile) web apps
* [RequireJS 2.1.9](http://requirejs.org/): a JavaScript file and module loader for keeping your Javascript codebase modular and well organized
* [Handlebars 1.2.0](http://handlebarsjs.com/): a minimal templating engine based on Mustache
* [Zepto 1.1.2](http://zeptojs.com/): minimalist JavaScript library for DOM traversing, event handling, animations, etc.
* [Leaflet 0.7.1](http://leafletjs.com): a Javascript library for embedding maps in your own web pages.

App description
---------------

Basically, the web app is composed of two simple views (represented as different Handlebars templates), backed by a JavaScript module defined using Require JS. Zepto (or jQuery) is used as a convenience library.

The web app is purposefully super-simple, it shows:

* a structural view containing the two basic views (it is supposed to be used as navigation hub)
* the first view contains a string that can be filled dynamically by the Backbone model behind it
* the second view shows a Leaflet map centered on L'Aquila, the city I currently live in 
