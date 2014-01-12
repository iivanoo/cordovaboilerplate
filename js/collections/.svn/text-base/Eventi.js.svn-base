define(["jquery", "underscore", "backbone", "models/Evento"],
    function ($, _, Backbone, Evento) {

    var Eventi = Backbone.Collection.extend({
        model: Evento,
        store: new WebSQLStore(db, "eventi"),

		comparator: function(evento) {
  			return evento.get("timestamp");
		},

		search: function(startDate, endDate) {
			return _(this.filter(function(data) {
		  		return data.get("timestamp") >= startDate && data.get("timestamp") <= endDate;
		  	}));
		},

    searchFrom: function(startDate) {
      return _(this.filter(function(data) {
          return data.get("timestamp") >= startDate;
        }));
    },

    searchTo: function(endDate) {
      return _(this.filter(function(data) {
          return data.get("timestamp") <= endDate;
        }));
    },

    getByEnte: function(ente) {
      return _(this.filter(function(data) {
          return data.get("organizzatori").toString().indexOf(ente) != -1;
        }));
    },

    getByTag: function(tag) {
      return _(this.filter(function(data) {
          return data.get("tag").toString().indexOf(tag) != -1;
        }));
    },

    getByKeyword: function(keyword) {
      return _(this.filter(function(data) {
          var result = ((data.get("descrizione").toLowerCase().indexOf(keyword.toLowerCase()) != -1) || (data.get("titolo").toLowerCase().indexOf(keyword.toLowerCase()) != -1));
          return result;
        }));
    }

      });

    return Eventi;

  });