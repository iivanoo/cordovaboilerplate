define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var MyView = Utils.Page.extend({

    constructorName: "MyView",

    model: MyModel,

    initialize: function() {
      var that = this; 
      instance.on("dataReady", function(){
        // load the precompiled template if we have a data
        that.template = Utils.templates.myview;
        console.log("entro qui dentro");
      });
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.submyview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "myview",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap"
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