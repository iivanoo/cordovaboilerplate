define(["jquery", "underscore", "backbone", "models/Sponsor", "handlebars", "text!templates/sponsorlistitem.html"],
    function ($, _, Backbone, Sponsor, Handlebars, template) {

    var SponsorListItemView = Backbone.View.extend({

        model: Sponsor,

        tagName: "div",

        className: "row_wrapper",

        events: {
          "touchend .icon_map_sponsor": "showMappa",
          "touchend .icon_www_sponsor": "showSito",
          "touchmove": "touchMove"
        },

        initialize: function() {
          this.moving = false;
        },

        touchMove: function() {
          this.moving = true;
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).empty();
          var sponsor = this.model.toJSON();
          sponsor.cid = this.model.get("__id");
          $(this.el).html(this.template(sponsor));
          $(this.el).attr("id", this.model.get("__id"));
          return this;
        },

        showMappa: function() {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          Backbone.history.navigate("mappaSponsor/" + this.model.get("__id"), {trigger: true});
        },

        showSito: function(event) {
          if(this.moving) {
            this.moving = false;
            return;
          } 
          window.open(this.model.get("sito"), '_blank', 'location=yes,closebuttoncaption=chiudi');
        },
      });

    return SponsorListItemView;

  });