define(["jquery", "underscore", "backbone", "spin", "models/Ente", "models/Rss", "collections/RssList", "views/RssListItemView", "handlebars", "text!templates/rssente.html"],
    function ($, _, Backbone, Spinner, Ente, Rss, RssList, RssListItemView, Handlebars, template) {

    var RssEnteView = Backbone.View.extend({

        model: Ente,

        events: {
          "touchstart #tel": "tel",
          "touchstart #mail": "mail"
        },

        className: "default_wrapper",

        initialize: function() {
          this.title = this.model.get("titolo");
          var opts = {
            lines: 5, // The number of lines to draw
            length: 15, // The length of each line
            width: 5, // The line thickness
            radius: 15, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '20%', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
          };
          this.spinner = new Spinner(opts);
          this.spinnerStopped = false;
          this.on("inTheDom", this.fetchNews);
          this.subviews = [];
          this.on("removed", this.removed);
        },

        template: Handlebars.compile(template),

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          var context = {};
          var contatti = this.model.get("contatti");
          if(contatti.immagine) {
            context.immagine = contatti.immagine;
          } else {
            if(contatti.video) {
              context.video = contatti.video;
            }
          }
          context.email = this.model.get("email");
          context.telefono = this.model.get("telefono");
          $(this.el).html(this.template(context));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("frascatiscienze_top");
          return this;
        },

        removed: function() {
          for(var i=0; i<this.subviews.length; i++) {
            this.subviews[i].remove();
          }
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "www") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "mappa") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "aggiungiAgenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },

        fetchNews: function () {
          var self = this;
          setTimeout(function(){
            if(!self.spinnerStopped) {
              self.spinner.spin(document.getElementById("rss_container"));
            }
          }, 20);          
          var news = new RssList();
          news.populate(self.model.get("rss"), self);
        },

        showNews: function (news) {
          this.spinner.stop();
          this.spinnerStopped = true;
          var rssItemView;
          for (var i = 0; i < news.length; i++) {
            rssItemView = new RssListItemView({model: news.at(i)});
            $(".rss_wrapper").append(rssItemView.render().el);
            this.subviews.push(rssItemView);
          }
        },

        addAgenda: function (event) {
          var agenda = JSON.parse(localStorage.getItem("agenda"));
          agenda.enti[this.model.get("__id")] = this.model.toJSON();
          localStorage.setItem("agenda", JSON.stringify(agenda));
          navigator.notification.alert('"' + this.model.get("titolo") + '" è stato salvato in agenda', function() {}, "Agenda");
        },

        tel: function (event) {
          window.location.href = 'tel:' + this.model.get("telefono");
        },

        mail: function (event) {
          window.location.href = 'mailto:' + this.model.get("email");
        }
      });

    return RssEnteView;

  });