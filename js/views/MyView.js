define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/mymodel");
  var Utils = require("utils");

  var MyView = Backbone.View.extend({

    constructorName: "MyView",

    model: MyModel,

    // constructor: function MyView(attributes, options) {
    //   return Backbone.Model.apply(this, arguments);
    // },

    initialize: function() {
      // here we can register to inTheDOM or removing events
      //this.listenTo(this, "inTheDOM", functionName);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    className: "content",

    template: Utils.templates.myview,

    events: {
      // "touchend #node_id": "handler"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return MyView;

});