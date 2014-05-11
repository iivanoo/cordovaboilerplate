define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
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
      var options = {
        center: new L.LatLng(42.3676443, 13.3496695),
        zoom: 12
      };

      // create the map
      var map = L.map('map', options);
      // say thanks to Leaflet
      map.attributionControl.setPrefix("Leaflet");

      // create a marker and add it to the map
      L.marker([42.3676443, 13.3496695]).addTo(map);

      // create an icon for showing the user its current location
      var positionIcon = L.icon({
        iconUrl: './img/hereIcon.png',
        iconSize: [20, 20],
      });

      // get the current location of the user
      navigator.geolocation.getCurrentPosition(function(position) {
        L.marker([position.coords.latitude, position.coords.longitude], {
          icon: positionIcon
        }).addTo(map);
      }, function() {});

      // add a layer showing Open Street Map's tiles
      var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap',
        maxZoom: 20
      });
      map.addLayer(layer);
    }
  });

  return MapView;

});