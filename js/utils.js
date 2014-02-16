//// UTILITIES
define(function(require) {

  var Backbone = require("backbone");
  var Handlebars = require("handlebars");
  var templates = {};
  templates["structure"] = Handlebars.compile(require("text!templates/structure.html"));
  templates["map"] = Handlebars.compile(require("text!templates/map.html"));
  templates["myview"] = Handlebars.compile(require("text!templates/myview.html"));

  var Utils = {
    templates: templates,
    // compileTemplate: function (templateName, templatePath) {
    //     var template = require(templatePath);
    //     Handlebars.compile(template);
    // },
    load: function() {
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


      // shows an arbitrary website in the inner browser
      App.showWebsite = function(url) {
        if (navigator.connection.type == Connection.NONE) {
          navigator.notification.alert('It looks like you have no Internet connection, please can you check it?', function() {}, "No Internet");
          return;
        }
        window.open(url, '_blank', 'location=yes,closebuttoncaption=close,EnableViewPortScale=yes');
      };

      // if we have a 404 error when loading an image, we put a transparent pixel in place of the ?? icon
      App.imgError = function(source) {
        empty1x1png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
        source.src = "data:image/png;base64," + empty1x1png;
        source.onerror = "";
        return true;
      };

      // checks if the objects has no properties
      App.isObjectEmpty = function(obj) {
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
  };

  Utils.load();
  return Utils;
});