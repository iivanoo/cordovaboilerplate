define(["jquery", "underscore", "backbone", "models/Ente", "handlebars", "text!templates/sezioneente.html"],
    function ($, _, Backbone, Ente, Handlebars, template) {

    var SezioneEnteView = Backbone.View.extend({

        model: Ente,

        className: "default_wrapper",

        initialize: function() {
            this.title = this.model.get("titolo");
            this.on("inTheDom", this.attachListener);
          },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          
          var tipo = this.model.get("tipo");
          var tipoText = "";
          switch (tipo) {
            case "chisiamo":
              tipoText = "Chi siamo e per cosa lavoriamo";
              break;
            case "storia":
              tipoText = "La nostra storia";
              break;
            case "miglioriamo":
              tipoText = "Per te";
          }
          var context = {titolo: tipoText, testo: this.model.get(tipo).testo};
          if(this.model.get(tipo).video) {
            context.video = this.model.get(tipo).video;
          } else {
            if(this.model.get(tipo).immagine) {
              context.immagine = this.model.get(tipo).immagine;
            }
          }
          $(this.el).html(this.template(context));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "www") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "mappa") {
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
          agenda.enti[this.model.get("__id")] = this.model.toJSON();
          localStorage.setItem("agenda", JSON.stringify(agenda));
          navigator.notification.alert('"' + this.model.get("titolo") + '" è stato salvato in agenda', function() {}, "Agenda");
        }
      });

    return SezioneEnteView;

  });