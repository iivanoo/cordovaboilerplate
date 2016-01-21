define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "text!templates/evento.html"],
    function ($, _, Backbone, Evento, Handlebars, template) {

    var EventoView = Backbone.View.extend({

        model: Evento,

        className: "default_wrapper",

        initialize: function() {
          var date = new Date(this.model.get("timestamp") * 1000);
          var gg, mm, aaaa, hours, mins;
          gg = date.getDate() + "/";
          mm = date.getMonth() + 1 + "/";
          aaaa = date.getFullYear();
          hours = date.getHours();
          mins = date.getMinutes();
          this.title = gg + mm + aaaa + " - " + hours + ":" + mins;
          localStorage.setItem("lastVisitedEventTimestamp", this.model.get("timestamp"));
          this.on("removed", function(e) {
            localStorage.removeItem("lastVisitedEventTimestamp");
          });
          this.on("inTheDom", this.attachListener);
        },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          this.model.set("descrizione", this.model.get("descrizione").strip());
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "mappa") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "legenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "aggiungiAgenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },
        
        attachListener: function() {
          var self  = this;
          if(document.getElementById("video")) {
            document.getElementById("video").addEventListener("click", function(e) {
              if(self.playing) {
                self.playing = false;
                this.pause();
              } else {
                self.playing = true;
                this.play();
              }
            }, false);
          }
        },

        addAgenda: function (event) {
          var agenda = JSON.parse(localStorage.getItem("agenda"));
          agenda.eventi[this.model.get("__id")] = this.model.toJSON();
          localStorage.setItem("agenda", JSON.stringify(agenda));
          navigator.notification.alert('"' + this.model.get("titolo") + '" è stato salvato in agenda', function() {}, "Agenda");
        }
      });

    return EventoView;

  });