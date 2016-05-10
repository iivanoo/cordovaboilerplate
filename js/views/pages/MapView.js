define(function(require) {

  var Backbone = require("backbone");
  var L = require("leaflet");
  var Utils = require("utils");

  var MapView = Utils.Page.extend({

    constructorName: "MapView",

    id: "map",

    initialize: function(options) {
      // when I am in the DOM, I can start adding all the Leaflet stuff
      this.listenTo(this, "inTheDOM", this.addMap);
    },

    render: function() {
      return this;
    },

    addMap: function() {

      // the center of the map is the address of the University of L'Aquila
      var mapCenter = {
        lat: 42.3676443,
        lon: 13.3496695
      };

      var options = {
        center: new L.LatLng(mapCenter.lat, mapCenter.lon),
        zoom: 12
      };

      // create the map
      var map = L.map('map', options);
      // say thanks to Leaflet
      map.attributionControl.setPrefix("Leaflet");

      // create a marker and add it to the map
      L.marker([mapCenter.lat, mapCenter.lon]).addTo(map);

      // add a layer showing Open Street Map's tiles
      var layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; OpenStreetMap',
          maxZoom: 20
        });
      map.addLayer(layer);
    }
  });

  return MapView;

});
