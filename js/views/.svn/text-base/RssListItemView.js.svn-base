define(["jquery", "underscore", "backbone", "models/Rss", "handlebars", "text!templates/rsslistitem.html"],
    function ($, _, Backbone, Rss, Handlebars, template) {

    var RssListItemView = Backbone.View.extend({

        model: Rss,

        tagName: "div",

        className: "row_wrapper",

        events: {
          "touchend": "openUrl",
          "touchmove": "touchMove"
        },

        initialize: function() {
          this.moving = false;
        },

        touchMove: function() {
          this.moving = true;
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var rss = this.model.toJSON();
          $(this.el).html(this.template(rss));
          return this;
        },

        openUrl: function (event) {
          if(this.moving) {
            this.moving = false;
            return;
          }
          if(navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('Questa funzionalità ha bisogno di una connessione ad Internet. Sembra che non sei connesso ad Internet, potresti riprovare più tardi?', function() {}, "Problema di connessione");
            return;
          } 
          window.open(this.model.get("link"), '_blank', 'location=yes,closebuttoncaption=chiudi,EnableViewPortScale=yes');
        }
      });

    return RssListItemView;

  });