define(["jquery", "underscore", "backbone", "handlebars", "datamanager", "text!templates/cover.html"],
    function ($, _, Backbone, Handlebars, Data, template) {

    var CoverView = Backbone.View.extend({

        id: "cover", 

/*        events: {
          // "touchend .language": "chooseLanguage"
          //"touchend": "chooseLanguage"
        },*/

        initialize: function () {
          this.body = document.getElementsByTagName("body")[0];
          this.on("startData", this.chooseLanguage);
        },

        chooseLanguage: function() {
          var self = this;
          setTimeout(function(){
            Data.spinner.spin(self.body);
          }, 20);         
          Data.on("dataReady", function() {
            Data.spinner.stop();
            // Backbone.history.start();
            Backbone.history.navigate("frascatiscienza", {trigger: true});
          });
          // localStorage.setItem("language" , event.currentTarget.id);
          localStorage.setItem("language" , "ita");
          setTimeout(function(){
            Data.startupData();
          }, 300);         
        },

        template: Handlebars.compile(template),

        render: function () {
          $(this.el).html(this.template({}));
          return this;
        }
      });

    return CoverView;

  });