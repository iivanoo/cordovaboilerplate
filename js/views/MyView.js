define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/mymodel");
  var Utils = require("utils");

  var MyView = Backbone.View.extend({

    constructorName: "MyView",

    model: MyModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.myview;
      // here we can register to inTheDOM or removing events
      //this.listenTo(this, "inTheDOM", functionName);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "myview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return MyView;

});