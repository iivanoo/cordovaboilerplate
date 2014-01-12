define(["jquery", "underscore", "backbone", "models/Ente"],
    function ($, _, Backbone, Ente) {

    var Enti = Backbone.Collection.extend({
        model: Ente,
        store: new WebSQLStore(db, "enti")
      });

    return Enti;

  });