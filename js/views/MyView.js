define(["jquery", "underscore", "backbone", "handlebars",
    "models/MyModel",
    "text!templates/myview.html"
  ],
  function($, _, Backbone, Handlebars,
    MyModel,
    template) {

    var MyView = Backbone.View.extend({

      model: MyModel,

      initialize: function() {
        // here we can register to inTheDOM or removing events
        //this.listenTo(this, "inTheDOM", functionName);
        // this.listenTo(this, "removing", functionName);

        // by convention, all the inner views of a view must be stored in this.subViews
      },

      className: "content",

      template: Handlebars.compile(template),

      events: {
        "touchend #ricerca_button": "cerca"
      },

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }
    });

    return MyView;

  });