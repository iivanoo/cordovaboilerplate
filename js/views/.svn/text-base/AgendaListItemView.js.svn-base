define(["jquery", "underscore", "backbone", "models/Sponsor", "handlebars", "models/EnteEvento", "text!templates/agendalistitem.html"],
    function ($, _, Backbone, Sponsor, Handlebars, EnteEvento, template) {

    var AgendaListItemView = Backbone.View.extend({

        model: EnteEvento,

        tagName: "div",

        className: "simple_element_row_agenda",

        initialize: function() {
          this.moving = false;
        },

        events: {
          "touchend": "goToDetail",
          "touchmove": "touchMove",
          "touchstart": "touchStart"
        },

        touchMove: function() {
          this.moving = true;
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var agendaElement = this.model.toJSON();
          agendaElement.cid = this.model.get("__id");
          $(this.el).html(this.template(agendaElement));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        },

        goToDetail: function(event) {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var now = new Date().getMilliseconds();
          var self = this;
          if(this.lastTouch && (now - this.lastTouch <= 300)) {
            clearTimeout(this.timer);
            this.manageDoubleTap();
            this.lastTouch = undefined;
          } else {
            this.lastTouch = now;
            this.timer = setTimeout(function(){
               if(self.model.get("chisiamo")) {
                // è un ente
                var path = "enti/" + self.model.get("__id");
              } else {
                // è un evento
                var path = "eventi/" + self.model.get("__id");
              }
              Backbone.history.navigate(path, {trigger: true});
            },301);
          }
        },

        manageDoubleTap: function() {
          var self = this;
          navigator.notification.confirm(
                    'Sei sicuro di voler eliminare "' + this.model.get("titolo") + '" dalla tua agenda personale?',
                     function(buttonIndex) {
                        if(buttonIndex == 1) {
                          var preferiti = JSON.parse(localStorage.getItem("agenda"));
                          if(self.model.get("chisiamo")) {
                            // è un ente
                            delete preferiti.enti[self.model.get("__id")];
                          } else {
                            // è un evento
                            delete preferiti.eventi[self.model.get("__id")];
                          }
                          self.superView.preferiti = preferiti;
                          localStorage.setItem("agenda", JSON.stringify(preferiti));
                          self.remove();
                        }
                     }, 
                    'Conferma',
                    'Si,No');
        }
      });

    return AgendaListItemView;

  });