define(["jquery", "underscore", "backbone", "datamanager", "collections/Eventi", "views/CoverView", "views/IntroNotteView", "views/FrascatiScienzaView", "views/EntiListView", "views/EnteView", "views/SezioneEnteView", "views/RssEnteView", "views/EventiListView", "views/EventoView", "views/SponsorListView", "views/AgendaView", "views/LegendaView", "views/CacciaView", "views/IntroCacciaView", "views/IntroTappaView", "views/DomandaCacciaView", "views/RisultatoCacciaView", "views/FineCacciaView", "views/Mappa", "views/RicercaView", "views/PartnerView", "views/CreditsView", "views/StructureView"],
    function ($, _, Backbone, Data, Eventi, CoverView, IntroNotteView, FrascatiScienzaView, EntiListView, EnteView, SezioneEnteView, RssEnteView, EventiListView, EventoView, SponsorListView, AgendaView, LegendaView, CacciaView, IntroCacciaView, IntroTappaView, DomandaCacciaView, RisultatoCacciaView, FineCacciaView, MappaView, RicercaView, PartnerView, CreditsView, StructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "cover",
        "frascatiscienza": "frascatiScienza",
        "enti": "enti",
        "sponsor": "sponsor",
        "agenda": "agenda",
        "eventi": "eventi",
        "enti/:id": "enteDetails",
        "sezioneEnte/chisiamo/:id": "sezioneEnteChiSiamo",
        "sezioneEnte/storia/:id": "sezioneEnteStoria",
        "sezioneEnte/contatti/:id": "sezioneEnteContatti",
        "sezioneEnte/miglioriamo/:id": "sezioneEnteMiglioriamo",
        "eventi/:id": "eventoDetails",
        "eventiEnte/:id": "eventiEnte",
        "eventiCerca/:keyword/:tag/:organizzatore/:da/:a": "eventiCerca",
        "legenda": "legenda",
        "mappa": "mappa",
        "intronotte": "intronotte",
        "cerca": "cerca",
        "caccia": "caccia",
        "introcaccia": "introcaccia",
        "introtappa/:id": "introtappa",
        "domandacaccia/:id": "domandacaccia",
        "risultatocaccia/:id": "risultatocaccia",
        "finecaccia": "finecaccia",
        "partner": "partner",
        "credits": "credits"
      },

      initialize: function () {
        this.currentView = undefined;
      },

      cover: function () {
        // if(localStorage.getItem("language")) {
        //   this.frascatiScienza();
        // } else {
          var page = new CoverView();
          page.render();
          $("body").append($(page.el)); 
          $('#content_cover').css({
            'height': $(window).height() - 75
          });
          page.trigger("startData");
        // }
      },

      enti: function () {
        var page = new EntiListView({model: Data.enti});
        this.changePage(page); 
      },

      sponsor: function () {
        var page = new SponsorListView({model: Data.sponsors});
        this.changePage(page); 
      },

      credits: function () {
        var page = new CreditsView();
        this.changePage(page); 
      },

      intronotte: function () {
        var page = new IntroNotteView();
        this.changePage(page); 
      },

      agenda: function () {
        var page = new AgendaView();
        this.changePage(page); 
      },

      enteDetails: function(id) {
        var ente = Data.enti.findWhere({"__id": id});
        var enteView = new EnteView({
          model: ente
        });
        this.changePage(enteView);
        $('.default_wrapper').css({
            'height': $(window).height() - 88
        });
      },

      sezioneEnteChiSiamo: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        ente.set("tipo", "chisiamo");
        var sezioneEnteView = new SezioneEnteView({
          model: ente
        });
        this.changePage(sezioneEnteView);
      },

      sezioneEnteStoria: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        ente.set("tipo", "storia");
        var sezioneEnteView = new SezioneEnteView({
          model: ente
        });
        this.changePage(sezioneEnteView);
      },

      sezioneEnteContatti: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        var rssEnteView = new RssEnteView({
          model: ente
        });
        this.changePage(rssEnteView);
      },

      sezioneEnteMiglioriamo: function(id) {
        var ente = Data.enti.findWhere({__id: id});
        ente.set("tipo", "miglioriamo");
        var sezioneEnteView = new SezioneEnteView({
          model: ente
        });
        this.changePage(sezioneEnteView);
      },

      eventoDetails: function(id) {
        var evento = Data.eventi.findWhere({"__id": id});
        var eventoView = new EventoView({
          model: evento
        });
        this.changePage(eventoView);
      },

      eventi: function () {
        var elements = document.getElementsByClassName("button_list_element");
        for(var i=0; i<elements.length; i++) {
          if(elements[i].id == "eventi") {
            elements[i].classList.remove("nonvisibile");
          } else {
            if(!elements[i].id.endsWith("Inactive") || elements[i].id == "eventiInactive") {
              elements[i].classList.add("nonvisibile");
            } else {
              elements[i].classList.remove("nonvisibile");
            }
          }
        }
        var page = new EventiListView({model: Data.eventi});
        this.changePage(page); 
      },

      eventiEnte: function (id) {
        var elements = document.getElementsByClassName("button_list_element");
        for(var i=0; i<elements.length; i++) {
          if(elements[i].id == "eventi") {
            elements[i].classList.remove("nonvisibile");
          } else {
            if(!elements[i].id.endsWith("Inactive") || elements[i].id == "eventiInactive") {
              elements[i].classList.add("nonvisibile");
            } else {
              elements[i].classList.remove("nonvisibile");
            }
          }
        }
        var filteredEventi = Data.eventi.getByEnte(id).toArray();
        var page = new EventiListView({model: new Eventi(filteredEventi)});
        page.title = "Eventi " + Data.enti.findWhere({"__id": id}).get("titolo");
        this.changePage(page); 
      },

      eventiCerca: function (keyword, tag, organizzatore, da, a) {
        var currentCollection = Data.eventi;
        // filtra per descrizione
        debugger;
        if(keyword != "__NO") {
          currentCollection = new Eventi(Data.eventi.getByKeyword(keyword).toArray());
        }
        // filtra per tag
        if((tag != "__NO") && currentCollection.length) {
          currentCollection = new Eventi(currentCollection.getByTag(tag).toArray());
        }
        // filtra per organizzatore
        if((organizzatore != "__NO") && currentCollection.length) {
          currentCollection = new Eventi(currentCollection.getByEnte(organizzatore).toArray());
        }
        // filtra per data "DA"
        if((da != "__NO") && currentCollection.length) {
          da = parseDate(da).getTime() / 1000;
          currentCollection = new Eventi(currentCollection.searchFrom(da).toArray());
        }
        // filtra per data "A"
        if((a != "__NO") && currentCollection.length) {
          a = parseDate(a).getTime() / 1000;
          currentCollection = new Eventi(currentCollection.searchTo(a).toArray());
        }

        // parsiamo la data in questo formato: yyyy-mm-dd
        function parseDate(data) {
          var sezioni = data.split('-');
          return new Date(sezioni[0], sezioni[1] - 1, sezioni[2]); 
        }

        // if(currentCollection.length) {
          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "eventi") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "eventiInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }
          // var filteredEventi = Data.eventi.getByKeyword(keyword).toArray();
          var page = new EventiListView({model: currentCollection});
          page.title = 'Risultati Ricerca';
          this.changePage(page); 
        //} else {
          //navigator.notification.alert('La ricerca non ha prodotto alcun risultato, prova a usare altri parametri di ricerca.', function() {}, "Attenzione");
        //}
      },

      legenda: function () {
        var page = new LegendaView();
        this.changePage(page); 
      },

      partner: function () {
        var page = new PartnerView();
        this.changePage(page); 
      },

      mappa: function () {
        var page = new MappaView({
          model: this.currentView.model
        });
        this.changePage(page); 
      },

      caccia: function () {
        var visitedDomande = localStorage.getItem("visitedDomande");
        // in totale abbiamo sempre 8 tappe 
        if(visitedDomande && JSON.parse(visitedDomande).visited.length == 8) {
          this.finecaccia();
        } else {
          var page = new CacciaView();
          if(this.changePage(page)) {
            $("#backbutton").show();
            $(".button_list_element").css("visibility", "visible"); 
            $(".button_list_element_small").css("visibility", "visible"); 
          }
        }
      },

      finecaccia: function () {
        var page = new FineCacciaView();
        if(this.changePage(page)) {
          $("#backbutton").show();
          $(".button_list_element").css("visibility", "visible"); 
          $(".button_list_element_small").css("visibility", "visible"); 
        }
      },

      introcaccia: function () {
        var page = new IntroCacciaView();
        if(this.currentView instanceof RisultatoCacciaView) {
          page.stepByStep = true;  
        } 
        if(this.changePage(page)) {
          $("#backbutton").show();
          $(".button_list_element").css("visibility", "visible"); 
          $(".button_list_element_small").css("visibility", "visible"); 
        }
      },

      introtappa: function (id) {
        var tappa = Data.getTappaById(id);
        if(tappa) {
          var tappaView = new IntroTappaView({
            model: tappa
          });
          if(this.changePage(tappaView)) {
            $("#backbutton").hide();
            $(".button_list_element").css("visibility", "hidden");
            $(".button_list_element_small").css("visibility", "hidden");
          }
        } else {
          navigator.notification.alert('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
        }
      },

      domandacaccia: function (id) {
        var tappa = Data.getTappaById(id);
        var domandaView = new DomandaCacciaView({
          model: tappa
        });
        if(this.changePage(domandaView)) {
          $("#backbutton").hide();
          $(".button_list_element").css("visibility", "hidden");
          $(".button_list_element_small").css("visibility", "hidden");
        }
      },

      risultatocaccia: function (id) {
        var tappa = Data.getTappaById(id);
        var risultatoView = new RisultatoCacciaView({
          model: tappa
        });
        if(this.changePage(risultatoView)) {
          $("#backbutton").hide();
          $(".button_list_element").css("visibility", "hidden");
          $(".button_list_element_small").css("visibility", "hidden");
        }
      },

      cerca: function () {
        var page = new RicercaView();
        this.changePage(page); 
      },

      showStructure: function () {
        if(!this.structureView) {
          this.structureView = new StructureView();
          this.structureView.render();
        }
      },

      frascatiScienza: function () {
        if(!this.structureView) {
          $("#cover").remove();
          this.showStructure();
        }
        var frascatiModel =  Data.enti.findWhere({__id :"frascati-scienza"});
        if(frascatiModel) {
          frascatiModel.set("frascatiscienza", Data.frascatiscienza);
          frascatiModel.set("imgfrascatiscienza", Data.imgfrascatiscienza);
        }
        var page = new FrascatiScienzaView({model: frascatiModel});
        this.changePage(page);
      },

      changePage: function (page) {
        if((page instanceof CoverView)) {
          //return;
          window.history.back();
          return false;
        }
        if((page instanceof CacciaView) && (this.currentView instanceof FineCacciaView)) {
          return false;
        }
/*        if((page instanceof FineCacciaView) && (this.currentView instanceof IntroTappaView)) {
          return;
        }*/
        if((page instanceof IntroCacciaView) && (this.currentView instanceof IntroTappaView)) {
          return false;
        }
        if((page instanceof IntroTappaView) && !(this.currentView instanceof IntroCacciaView)) {
          return false;
        }
        if((page instanceof DomandaCacciaView) && !(this.currentView instanceof IntroTappaView)) {
          return false;
        }
        if((page instanceof RisultatoCacciaView) && !((this.currentView instanceof DomandaCacciaView) || (this.currentView instanceof IntroCacciaView))) {
          return false;
        }
        if((page instanceof FrascatiScienzaView)) {
          $("#backbutton").hide();
        } else {
          $("#backbutton").show();
        }
        if(this.currentView) {
          this.currentView.trigger("removed");
          this.currentView.remove(); 
        }
        this.currentView = page;
        this.structureView.currentView = page;
        page.render();
        this.structureView.$el.find("#content").append($(page.el));
        this.structureView.trigger("updateTitle", page);
        this.currentView.trigger("inTheDom");
        return true;
      }

    });

    return AppRouter;

  });
