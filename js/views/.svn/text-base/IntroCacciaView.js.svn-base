define(["jquery", "underscore", "backbone", "handlebars", "models/Tappa", "datamanager", "text!templates/introcaccia.html"],
    function ($, _, Backbone, Handlebars, Tappa, Data, template) {

    var IntroCacciaView = Backbone.View.extend({

        events: {
          "touchstart #qrcode": "readqrcode",
          "touchstart #mappa": "showMappa"
          // "touchmove": "touchMove"
        },

        initialize: function() {
          this.model = new Tappa({titolo: "Caccia al tesoro", luogo: {lat: "41.903423", lon: "12.4802"}});
            this.title = "Caccia al tesoro"; 
            // this.moving = false;
            this.on("inTheDom", this.attachListener);
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();
          var context = {stepByStep: this.stepByStep};
          $(this.el).html(this.template(context));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("cacciatesoro_top");
          var elements = document.getElementsByClassName("button_list_element");
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
          }
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

        showMappa: function(event) {
          Backbone.history.navigate("mappa", {trigger: true});
        },

        readqrcode: function (event) {
/*          if(this.moving) {
            this.moving = false;
            return;
          }*/
          scanner = cordova.require("cordova/plugin/BarcodeScanner");
          scanner.scan(
            function (result) {
              // var result = {text: "tappa8123"};
              // console.log("We got a barcode\n" +
              //     "Result: " + result.text + "\n" +
              //     "Format: " + result.format + "\n" +
              //     "Cancelled: " + result.cancelled);
              if(!result.cancelled) {
                //Backbone.history.navigate("introtappa/" + result.text, {trigger: true});
                var tappa = Data.getTappaById(result.text);
                if(tappa) {
                  // controllare se il QR code era già stato scansionato
                  if(!localStorage.getItem("visitedDomande")) {
                    var visited = {"visited": []};
                    localStorage.setItem("visitedDomande", JSON.stringify(visited));
                  }
                  var visitedDomande = JSON.parse(localStorage.getItem("visitedDomande")).visited;
                  for(var i=0; i<visitedDomande.length; i++) {
                    if(visitedDomande[i] == result.text) {
                      navigator.notification.alert('Il QR code scansionato era già stato letto in precedenza.', function() {
                        Backbone.history.navigate("risultatocaccia/" + result.text, {trigger: true});
                      }, "Attenzione");
                      return;
                    }
                  }
                  var numberOfTappa = parseInt(result.text.replace("tappa", "").charAt(0));
                  if(numberOfTappa != (visitedDomande.length + 1)) {
                    navigator.notification.alert('Attenzione, è stata saltata qualche tappa, torna all\'ultima tappa visitata e segui il suggerimento.', function() {
                        Backbone.history.navigate("introcaccia", {trigger: true});
                      }, "Attenzione");
                      return;
                  }
                  visitedDomande.push(result.text);
                  localStorage.setItem("visitedDomande", JSON.stringify({"visited": visitedDomande})); 
                  Backbone.history.navigate("introtappa/" + result.text, {trigger: true});
                } else {
                  navigator.notification.alert('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
                }
              }
            },
            function (error) {
              navigator.notification.alert('Errore nella lettura del QR code, si prega di riprovare.', function() {}, "Attenzione");
            }
          ); 
        }
      });

    return IntroCacciaView;

  });