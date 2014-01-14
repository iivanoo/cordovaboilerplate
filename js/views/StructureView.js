define(["jquery", "underscore", "backbone", "handlebars",
    "text!templates/structure.html"
  ],
  function($, _, Backbone, Handlebars,
    template) {

    var StructureView = Backbone.View.extend({

      id: "main",

      events: {
        "touchend #nav1": "map",
        "touchend #nav2": "myView"
      },

      initialize: function(options) {
        // bind the back event to the goBack function
        //document.getElementById("back").addEventListener("back", this.goBack(), false);
      },

      template: Handlebars.compile(template),

      render: function() {
        // load the template
        this.el.innerHTML = this.template({});
        // cache a reference to the content element
        this.contentElement = this.$el.find('#content')[0];
        // if(device.platform == "iOS") {
        //   this.contentElement.parentNode.style.marginTop = "20px";
        //   this.contentElement.parentNode.style.height = "calc(100% - 20px)";
        // }
        return this;
      },

      // generic go-back function
      goBack: function() {
        //window.history.back();
      },

      map: function(event) {
        Backbone.history.navigate("map", {
          trigger: true
        });
      },

      myView: function(event) {
        Backbone.history.navigate("myview", {
          trigger: true
        });
      }
    });

    return StructureView;

  });