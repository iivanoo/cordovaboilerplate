define(["jquery", "underscore", "backbone", "models/Sponsor"],
    function ($, _, Backbone, Sponsor) {

    var Sponsors = Backbone.Collection.extend({
        model: Sponsor,
        store: new WebSQLStore(db, "sponsors")
      });

    return Sponsors;

  });