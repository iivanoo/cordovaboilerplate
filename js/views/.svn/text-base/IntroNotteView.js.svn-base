define(["jquery", "underscore", "backbone", "handlebars", "text!templates/intronotte.html"],
    function ($, _, Backbone, Handlebars, template) {

    var IntroNotteView = Backbone.View.extend({

      className: "default_wrapper",

      events: {
          "touchstart #continua_eventi": "continua"
          //"touchmove": "touchMove"
      },

      initialize: function() {
        this.title = "Notte dei ricercatori";
        // this.moving = false;
      }, /*

      touchMove: function() {
        this.moving = true;
      },*/

      template: Handlebars.compile(template),

      render: function () {
        // gestione nav bar
        this.updateNavbar();

        $(this.el).html(this.template({}));
        var el = $("#titlebar");
        el.removeClass();
        el.addClass("nottericerca_top");
        var elements = document.getElementsByClassName("button_list_element");
        for(var i=0; i<elements.length; i++) {
          if(elements[i].id == "eventi") {
            elements[i].classList.remove("nonvisibile");
          } else {
            if(!elements[i].id.endsWith("Inactive") || elements[i].id == "eventiInactive") {
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

      continua: function(event) {
/*        if(this.moving) {
            this.moving = false;
            return;
          } */
        Backbone.history.navigate("eventi", {trigger: true});
        $("#backbutton").show();
      },
    });

    return IntroNotteView;

  });