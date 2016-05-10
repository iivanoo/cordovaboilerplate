define(["jquery", "underscore", "backbone", "handlebars", "views/FrascatiScienzaView", "views/IntroTappaView", "views/DomandaCacciaView", "views/RisultatoCacciaView", "views/FineCacciaView", "text!templates/structure.html"],
    function ($, _, Backbone, Handlebars, FrascatiScienzaView, IntroTappaView, DomandaCacciaView, RisultatoCacciaView, FineCacciaView, template) {

    var StructureView = Backbone.View.extend({

        id: "mainContainer", 

        events: {
          "touchend #backbutton": "goBack",
          "touchend #frascatiscienza": "frascatiscienza",
          "touchend #eventi": "eventi",
          "touchend #caccia": "caccia",
          "touchend #agenda": "agenda",
          "touchend #frascatiscienzaInactive": "frascatiscienza",
          "touchend #eventiInactive": "eventi",
          "touchend #cacciaInactive": "caccia",
          "touchend #agendaInactive": "agenda",
          "touchend #legenda": "legenda",
          "touchend #aggiungiAgenda": "addAgenda",
          "touchend #www": "showSito",
          "touchend #mappa": "showMappa",
          "touchend #ricerca": "ricerca",
          "touchend #eventi_ente_butt": "showEventi",
          "touchend #credits": "credits"
        },

        initialize: function() {
          var self = this;
          this.on("updateTitle", this.updateTitle);
          document.addEventListener("backbutton", function(e) {
            if(e) {
              e.preventDefault();
            }
            self.goBack(self);
          }, false);
          this.currentView = undefined;
        },

        goBack: function (self) {
          var that = (self instanceof StructureView) ? self : this;
          if(!that.currentView) {
            return false;
          }
          if(that.currentView instanceof FrascatiScienzaView) {
            return false;
          }
          if(that.currentView instanceof IntroTappaView) {
            return false;
          }
          if(that.currentView instanceof DomandaCacciaView) {
            return false;
          }
          if(that.currentView instanceof RisultatoCacciaView) {
            Backbone.history.navigate("introcaccia", {trigger: true});
            return false;
          }
          if(that.currentView instanceof FineCacciaView) {
            Backbone.history.navigate("caccia", {trigger: true});
            return false;
          }
          window.history.back();
        },

        updateTitle: function (page) {
          document.getElementById("title").innerHTML = page.title;
        },

        template: Handlebars.compile(template),

        render: function () {
          this.title = "Test";
          $(this.el).html(this.template({}));
          $('body').append($(this.el));
          $('#content').css({
            'height': $(window).height() - 88
          });
          return this;
        },

        frascatiscienza: function(event) {
          Backbone.history.navigate("frascatiscienza", {trigger: true});
        },

        eventi: function(event) {
          Backbone.history.navigate("intronotte", {trigger: true});
        },

        credits: function(event) {
          $("#backbutton").show();
          Backbone.history.navigate("credits", {trigger: true});
        },

        caccia: function(event) {
            // navigator.notification.alert('La caccia al tesoro sarà disponibile a breve!', function() {}, "Coming soon");
            Backbone.history.navigate("caccia", {trigger: true});
        },
        
        agenda: function(event) {
          Backbone.history.navigate("agenda", {trigger: true});
        },

        legenda: function(event) {
          Backbone.history.navigate("legenda", {trigger: true});
        },

        addAgenda: function(event) {
          this.currentView.addAgenda(event);
        },

        showSito: function(event) {
          if(navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('Questa funzionalità ha bisogno di una connessione ad Internet. Sembra che non sei connesso ad Internet, potresti riprovare più tardi?', function() {}, "Problema di connessione");
            return;
          }
          window.open(this.currentView.model.get("sito"), '_blank', 'location=yes,closebuttoncaption=chiudi,EnableViewPortScale=yes');
        },

        showMappa: function(event) {
          Backbone.history.navigate("mappa", {trigger: true});
        },

        showEventi: function(event) {
          this.currentView.eventi();
        },

        ricerca: function(event) {
          Backbone.history.navigate("cerca", {trigger: true});
        }
      });

    return StructureView;

  }); 