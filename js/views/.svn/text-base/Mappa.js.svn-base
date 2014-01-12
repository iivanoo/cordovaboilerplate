define(["jquery", "underscore", "backbone", "models/Evento", "handlebars", "leaflet", "text!templates/mappa.html"],
    function ($, _, Backbone, Evento, Handlebars, L, template) {

    var MappaView = Backbone.View.extend({

        tagName: "div",
        id: "map",

        // come model qui bisogna passargli l'evento, l'ente o la tappa

        initialize: function() {
            if(this.model.has("titolo")) {
              this.title = this.model.get("titolo");
            }
            if(this.model.has("nome")) {
              this.title = this.model.get("nome");
            }
            this.on("inTheDom", this.addMap);
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        },

        addMap: function() {
          var options ={center: new L.LatLng(this.model.get("luogo").lat, this.model.get("luogo").lon),
            zoom: 16
          };
          var map = L.map('map', options);

          L.marker([this.model.get("luogo").lat, this.model.get("luogo").lon]).addTo(map);

          var positionIcon = L.icon({
            iconUrl: './res/hereIcon.png',
            iconSize:     [20, 20], // size of the icon
          });

          navigator.geolocation.getCurrentPosition(function (position) {
            L.marker([position.coords.latitude, position.coords.longitude], {icon: positionIcon}).addTo(map);
          }, function() {});

          var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data &copy; OpenStreetMap',
              maxZoom: 20
          });

          map.addLayer(layer);    
        }
      });

    return MappaView;

  });