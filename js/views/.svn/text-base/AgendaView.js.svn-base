define(["jquery", "underscore", "backbone", "handlebars", "views/AgendaListItemView", "models/Ente", "models/Evento", "text!templates/agenda.html"],
    function ($, _, Backbone, Handlebars, AgendaListItemView, Ente, Evento, template) {

    var AgendaView = Backbone.View.extend({

        initialize: function() {
            this.title = "Agenda Personale";
            this.moving = false;
            this.preferiti = JSON.parse(localStorage.getItem("agenda"));
            this.subviews = [];
            this.on("removed", this.removed);
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        events: {
          "touchend #ling_eventi": "showEventi",
          "touchend #ling_enti": "showEnti",
          "touchmove": "touchMove"
        },

        touchMove: function() {
          this.moving = true;
        },

        removed: function() {
          for(var i=0; i<this.subviews.length; i++) {
            this.subviews[i].remove();
          }
        },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var elem = $("#titlebar");
          elem.removeClass();
          elem.addClass("agenda_top");
          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "agenda") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "agendaInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }
          this.on("inTheDom", this.showEnti);
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            functions[i].classList.add("nonvisibile");
          }
        },

        showEnti: function() {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          if((isEmpty(this.preferiti.enti)) && (isEmpty(this.preferiti.eventi))) {
            document.getElementById("agenda_empty").classList.remove("nonvisibile");
          }
          var enti = this.preferiti.enti;
          $("#agenda_wrapper_content").empty();
          for (var key in enti) {
            var currentEnte = enti[key];
            var view = new AgendaListItemView({
              model: new Ente(currentEnte)
            });
            view.superView = this;
            this.subviews.push(view);
            $("#agenda_wrapper_content").append(view.render().el);
            view.trigger("inTheDom");
          }
          document.getElementById("title").innerHTML = "Agenda Personale - Enti";
        },

        showEventi: function() {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          var eventi = this.preferiti.eventi;
          $("#agenda_wrapper_content").empty();
          for (var key in eventi) {
            var currentEvento = eventi[key];
            var view = new AgendaListItemView({
              model: new Evento(currentEvento)
            });
            view.superView = this;
            this.subviews.push(view);
            $("#agenda_wrapper_content").append(view.render().el);
            view.trigger("inTheDom");
          }
          document.getElementById("title").innerHTML = "Agenda Personale - Eventi";
        }
      });

    return AgendaView;

  });