define(["jquery", "underscore", "backbone", "handlebars", "text!templates/caccia.html"],
    function ($, _, Backbone, Handlebars, template) {

    var CacciaView = Backbone.View.extend({

        events: {
          "touchend #vai": "goToIntroCaccia",
          "touchmove": "touchMove"
        },

        initialize: function() {
            this.title = "Caccia al tesoro"; 
            this.moving = false;
        },

        className: "default_wrapper",

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
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

        goToIntroCaccia: function (event) {
          if(this.moving) {
            this.moving = false;
            return;
          }
          Backbone.history.navigate("introcaccia", {trigger: true});
        }
      });

    return CacciaView;

  });