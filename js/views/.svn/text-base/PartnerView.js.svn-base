define(["jquery", "underscore", "backbone", "handlebars", "text!templates/partner.html"],
    function ($, _, Backbone, Handlebars, template) {

    var PartnerView = Backbone.View.extend({

        events: {
          "touchend .row_wrapper": "showSito",
          "touchmove": "touchMove"
        },

        initialize: function() {
            this.title = "Partner";
            this.partners = {
              "asi": "http://www.asi.it/",
              "cnr": "http://www.cnr.it/",
              "enea": "http://www.enea.it/",
              "esa": "http://www.esa.it/",
              "inafiaps": "http://www.ifsi-roma.inaf.it/ifsi/index.php?categoryid=25",
              "inafoar": "http://www.oa-roma.inaf.it/",
              "infn": "http://www.lnf.infn.it/",
              "ingv": "www.ingv.it",
              "sapienza": "http://www.scienzemfn.uniroma1.it/",
              "tor": "http://www.scienze.uniroma2.it/",
              "romatre": "http://www.smfn.uniroma3.it/",
              "frascati": "http://www.comune.frascati.rm.it/",
              "regione": "http://static1.frascatiscienza.it/wp-content/uploads/2009/06/REGIONE-LAZIO.jpg",
              "provincia": "http://static4.frascatiscienza.it/wp-content/uploads/2009/06/Stemma_Provincia1.png",
              "grottaferrata": "http://static4.frascatiscienza.it/wp-content/uploads/2010/04/NuovoStemma-Grottaferrata.jpg",
              "telethon": "http://www.telethon.it/",
              "eta": "http://web.tiscalinet.it/eta_carinae/",
              "tuscolana": "http://www.ataonweb.it/",
              "geco": "http://www.gecologia.it/",
              "accatagliato": "http://www.accatagliato.org/",
              "arte": "http://www.assculturale-arte-scienza.it/"
            };
            this.moving = false;
          },

          touchMove: function() {
            this.moving = true;
          },

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var elements = document.getElementsByClassName("button_list_element");
          for(var i=0; i<elements.length; i++) {
            if(elements[i].id == "frascatiscienza") {
              elements[i].classList.remove("nonvisibile");
            } else {
              if(!elements[i].id.endsWith("Inactive") || elements[i].id == "frascatiscienzaInactive") {
                elements[i].classList.add("nonvisibile");
              } else {
                elements[i].classList.remove("nonvisibile");
              }
            }
          }  
        },

        showSito: function(event) {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          if(navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('Questa funzionalità ha bisogno di una connessione ad Internet. Sembra che non sei connesso ad Internet, potresti riprovare più tardi?', function() {}, "Problema di connessione");
            return;
          }
          window.open(this.partners[event.currentTarget.id], '_blank', 'location=yes,closebuttoncaption=chiudi,EnableViewPortScale=yes');
        },
      });

    return PartnerView;

  });