define(["jquery", "underscore", "backbone", "handlebars", "models/Tappa", "text!templates/introtappa.html"],
    function ($, _, Backbone, Handlebars, Tappa, template) {

    var IntroTappaView = Backbone.View.extend({

        model: Tappa,

        events: {
          "touchstart #vaiDomanda": "vaiDomanda",
          "touchstart #vaiFine": "vaiFineCaccia"
          //"touchmove": "touchMove"
        },

        initialize: function() {
            this.title = this.model.get("titolo");
            this.moving = false;
            this.on("inTheDom", this.attachListener);
        },
/*
        touchMove: function() {
          this.moving = true;
        },*/

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          //this.updateNavbar();

          $(this.el).html(this.template(this.model.toJSON()));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
/*          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "caccia") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "cacciaInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }*/
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
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

        vaiDomanda: function (e) {
          /*if(this.moving) {
            this.moving = false;
            return;
          } */
          Backbone.history.navigate("domandacaccia/" + this.model.id, {trigger: true});
        },

        vaiFineCaccia: function (e) {
/*          if(this.moving) {
            this.moving = false;
            return;
          } */
          var visitedDomande = localStorage.getItem("visitedDomande");
          // in totale abbiamo sempre 8 tappe 
          if(visitedDomande && JSON.parse(visitedDomande).visited.length == 8) {
            Backbone.history.navigate("finecaccia", {trigger: true});
          } else {
            navigator.notification.alert('Attenzione, ti mancano delle tappe da completare!', function() {
              Backbone.history.navigate("caccia/", {trigger: true});
            }, "Attenzione");
            //Backbone.history.navigate("caccia/", {trigger: true});
          }
        }
      });

    return IntroTappaView;

  });