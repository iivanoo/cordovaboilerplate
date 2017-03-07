//     Utils.js 0.0.1

//     (c) 2013-2014 Ivano Malavolta
//     Utils may be freely distributed under the MIT license.
//     http://www.ivanomalavolta.com
define(function(require) {

  // Initial Setup
  // -------------

  // get references to Backbone and Handlebars libraries
  var Backbone = require("backbone");
  var Handlebars = require("handlebars");

  // the object representing the framework
  var Utils = {
    templates: {}
  };
  // This method substitutes Backbone's extend in order to allow developers to 
  // identify Backbone objects in the Chrome profiler
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // BEGIN customized section
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else if (_.has(protoProps, 'constructorName')) {
      eval("child = function " + protoProps.constructorName + "() { return parent.apply(this, arguments); };");
    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }
    // END customized section

    _.extend(child, parent, staticProps);
    var Surrogate = function() {
      this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    if (protoProps) _.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;
    return child;
  };

  Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = Backbone.History.extend = extend;

  // Templates
  // -------------
  
  // We expect the templates module as a Require object module with the following structure:
  //  - key: the name of the template as it must be referenced by the Backbone view
  //  - value: the path of the html file containing the HTML fragment of the template
  var Templates = require("../js/templates");

  // here we have to put the "text!" prefix to the path of each template
  for (var t in Templates) {
    Templates[t] = "text!" + Templates[t];
  }

  // here we say that Utils is a Backbone object so that it is able to send and receive events
  _.extend(Utils, Backbone.Events);

  // this method is called to load the templates and precompile them
  Utils.loadTemplates = function() {
    require(_.values(Templates), function() {
      var fragments = _.object(_.keys(Templates), arguments);
      // precompile all the fragments
      for (var t in fragments) {
        Utils.templates[t] = Handlebars.compile(fragments[t]);
      }
      // we notify the caller that all the templates have been loaded
      Utils.trigger("templatesLoaded");
    });
    // we return this so that the caller can simply call the once method in chain with the call to the loadTemplates method
    return this;
  };

  // Backbone's View enhancementes
  // -------------

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

  // function that will be called by the router every time a view must be removed from the DOM 
  Backbone.Router.prototype.changePage = function(page, effect, side) {
    //we have not effect selected
    console.log("effect"+" "+effect);
    console.log("side"+" "+side);
    if(effect === undefined){
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
    }    
    // effect fade selected
    if(effect === "fade"){
        //fade out effect
        var content = document.getElementById('content');
        function fadeOut(elem, speed){
            if(!elem.style.opacity){
                elem.style.opacity = 1;
            }
            var outInterval = setInterval(function() {
                elem.style.opacity -= 0.02;
                if (elem.style.opacity <= 0) {
                    clearInterval(outInterval);
                    var inInterval = setInterval(function() {
                        elem.style.opacity = Number(elem.style.opacity)+0.02;
                        if (elem.style.opacity >= 1)
                            clearInterval(inInterval);
                    }, speed/50 );
                } // end if
            }, speed/50 );
        }
        var that = this;
        if (this.currentView) {
            fadeOut(content, 800);
            setTimeout(function(){
                that.currentView.close();
            }, 800);
        }
        setTimeout(function(){
            // cache the new view
            that.currentView = page;
            // render the new view
            page.render();
            // put the new view into the DOM
            that.structureView.contentElement.appendChild(page.el);
            // notify the new view that it is now in the DOM
            that.currentView.trigger("inTheDOM");
        }, 800);
    }
    // effect slide selected
    if(effect === "slide"){
        var that = this;
        if (this.currentView) {
            var content = document.getElementById('content');
            if(side === "up"){
                $(content).addClass('hide-up');
               // alert("slide up hide");
            }
            if(side === "left"){
                $(content).addClass('hide-left');
               // alert("slide left hide");
            }
            setTimeout(function(){
                that.currentView.close();
            }, 800);
        }
        setTimeout(function(){
        // cache the new view
        that.currentView = page;
        // render the new view
        page.render();
        // put the new view into the DOM
        that.structureView.contentElement.appendChild(page.el);
        // notify the new view that it is now in the DOM
        that.currentView.trigger("inTheDOM");
        
        if(side === "up"){
            $(content).addClass('show-up');
            //alert("slide up show");
        }
        if(side === "left"){
            $(content).addClass('show-left');
           // alert("slide left show");
        }
        }, 800);
    }
    if(effect === "flip"){
        if(this.currentView){
            var content = document.getElementById('content');
            $(content).css("transition", "transform 1s");
           // $(content).removeClass("flipped");
           if(side === "left"){
                $(content).addClass("flipped-left");
                this.currentView.close();
           }
           if(side === "top"){
                $(content).addClass("flipped-top");
                this.currentView.close();
           }
           if(side === "rotate"){
                $(content).addClass("flipped-rotate");
                this.currentView.close();
           }
        }
        // cache the new view
        this.currentView = page;
        // render the new view
        page.render();
        // put the new view into the DOM
        this.structureView.contentElement.appendChild(page.el);
        setTimeout(function(){
            if(side === "left"){
                $(content).removeClass("flipped-left");
           }
           if(side === "top"){
                $(content).removeClass("flipped-top");
           }
        }, 600);
        setTimeout(function(){
           if(side === "rotate"){
                $(content).removeClass("flipped-rotate");
           }
        }, 1000);
        
        // notify the new view that it is now in the DOM
        this.currentView.trigger("inTheDOM");
    }
  };
  
  // Pages
  // -------------

  // Pages are special kinds of Backbone's views that take the whole screen of the mobile application
  // the router is in charge of dynamically navigating among pages by means of the changePage method
  Utils.Page = Backbone.View.extend({
    // here we will put all Page-specific code
  });

  // Utility methods
  // -------------

  // shows an arbitrary website in the inner browser
  Utils.showWebsite = function(url) {
    if (navigator.connection.type == Connection.NONE) {
      navigator.notification.alert('It looks like you have no Internet connection, please can you check it?', function() {}, "No Internet");
      return;
    }
    window.open(url, '_blank', 'location=yes,closebuttoncaption=close,EnableViewPortScale=yes');
  };

  // if we have a 404 error when loading an image, we put a transparent pixel in place of the ?? icon
  Utils.imgError = function(source) {
    empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
    source.src = "data:image/png;base64," + empty1x1png;
    source.onerror = "";
    return true;
  };

  // checks if the objects has no properties
  Utils.isObjectEmpty = function(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  };

  // equivalent to Java's String.startsWith
  String.prototype.startsWith = function (prefix){
    return this.indexOf(prefix) === 0;
  };

  // equivalent to Java's String.endsWith
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  // removes all XML (so also HTML) tags from the string
  String.prototype.strip = function() {
    return this.replace(/(<([^>]+)>)/ig, "").replace(/(&lt;([^&gt;]+)&gt;)/ig, "");
  };
  //singleton object for Publish and Subscribe events without direct reference 
  Utils.PubSubEvent = (function() {
    var INSTANCE;
    var SingletonObj = function() {
        if (!(this instanceof SingletonObj)) {
            return new SingletonObj();
        }
    };
    _.extend(SingletonObj.prototype, Backbone.Events, {
        test : function(data) {
            console.log(data);
        }
    });
    return {
        init: function () {
            if (!INSTANCE) {
                INSTANCE = SingletonObj.apply(null, arguments);
            }
            return INSTANCE;
        },
        getInstance: function () {
            return (!INSTANCE) ? this.init.apply(this, arguments) : INSTANCE;
        }
    };
}());

Utils.Cache = function(){
    this.store = {};
};
_.extend(Utils.Cache.prototype, Backbone.Events,{
    set: function(key, value) {
        this.trigger("set", key, value);
        this.store[key] = value;
    },
    has: function(key) {
        var isHas = !!this.store[key];
        this.trigger("has", key, isHas);
        return isHas;
    },
    get: function(key) {
        var value = this.store[key];
        this.trigger("get", key, value);
        return value;
    },
    remove: function(key) {
        var value = this.store[key];
        this.trigger("remove", key, value);
        delete this.store[key];
        return value;
    },
    clear: function() {
        this.trigger("clear");
        this.store = {};
    }
});
Utils.CachedModel = Backbone.Model.extend({  
    fetch: function(options) {
        // If the model has required info for cache
        if (this.cacheKey && this.cacheObject) {
            options = options || {};
            var cacheObject = this.cacheObject,
                cacheKey = this.cacheKey,
                success = options.success;

            // Checking whether the cache object already holds the required data
            if (cacheObject.has(cacheKey)) {
                var resp = cacheObject.get(cacheKey);

                // Do the same as the fetch method does when the data received
                this.set(this.parse(resp, options), options);
                if (success) success(this, resp, options);

                // Returns deferred as the original fetch
                return $.Deferred().resolve();
            } else {
                // The cache object doesn't hold the required data
                // Preparing success method that set the cache 
                options.success = function(entity, resp, options) {
                    cacheObject.set(cacheKey, resp);
                    if (success) success(entity, resp, options);
                };
                // Calling the original fetch
                return Backbone.Model.prototype.fetch.call(this, options);
            }
        } else {
            // No cache for this model, calling the original fetch
            return Backbone.Model.prototype.fetch.call(this, options);
        }
    }
});
globalCache = new Backbone.Cache();

var UserPermissions = Backbone.CachedModel.extend({  
    cacheObject: globalCache,
    initialize: function() {
        var userId = this.get('id');
        if (userId) {
            this.cacheKey = "UserPermissions_" + userId;
        }
    }
});

var user1Permissions = new UserPermissions({ id: 1 });  
user1Permissions.fetch();

var permissions = new UserPermissions({ id: 1 });  
permissions.fetch();

  // the Utils object is public
  return Utils;
});
