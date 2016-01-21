define(["jquery", "underscore", "backbone", "collections/Sponsors", "views/SponsorListItemView", "handlebars"],
    function ($, _, Backbone, Sponsors, SponsorListItemView, Handlebars) {

    var SponsorView = Backbone.View.extend({

        model: Sponsors,

        className: "defaultlist_wrapper",

        initialize: function() {
            this.title = "Sponsor";
          },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).empty();
          for (var i = 0; i < this.model.length; i++) {
            $(this.el).append(new SponsorListItemView({
              model: this.model.at(i)
            }).render().el);
          }
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.remove("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            functions[i].classList.add("nonvisibile");
          }
        }
      });

    return SponsorView;

  });