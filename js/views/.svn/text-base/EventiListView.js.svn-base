define(["jquery", "underscore", "backbone", "collections/Eventi", "views/EventiListItemView", "datamanager", "handlebars", "text!templates/eventilist.html"],
    function ($, _, Backbone, Eventi, EventiListItemView, Data, Handlebars, template) {

    var EventiListView = Backbone.View.extend({

        model: Eventi,

        className: "defaultlist_wrapper",

        template: Handlebars.compile(template),

        events: {
          "touchend .day_back": "dayBack",
          "touchend .day_next": "dayNext"
        }, 

        initialize: function() {
          if(!this.title) {
            this.title = "Eventi";
          }
          var lastVisitedEventTimestamp = localStorage.getItem("lastVisitedEventTimestamp");
          if(lastVisitedEventTimestamp) {
            this.currentDay = this.getBaseTimestamp(lastVisitedEventTimestamp);
          } else {
            if(this.model.length > 0) {
              this.currentDay = this.getBaseTimestamp(this.model.at(0).get("timestamp"));
            } else {
              // 21 settembre 1:00
              this.currentDay = 1379725200;
            }
          }
          this.subviews = [];
          this.on("inTheDom", this.addEvents);
          this.on("removed", this.removed);
        },

        removed: function() {
          for(var i=0; i<this.subviews.length; i++) {
            this.subviews[i].remove();
          }
        },

        getBaseTimestamp: function(unix) {
          var date = new Date(unix * 1000);
          date.setHours(4);
          date.setMinutes(0);
          return date.getTime() / 1000;
        },

        getUpperTimestamp: function(unix) {
          var date = new Date(unix * 1000);
          date.setHours(22);
          date.setMinutes(0);
          return date.getTime() / 1000;
        },

        render: function () {
          // gestione nav bar
          this.updateNavbar();

          $(this.el).html(this.template({}));
          var el = $("#titlebar");
          el.removeClass();
          el.addClass("nottericerca_top");
          return this;
        },

        updateNavbar: function () {
          document.getElementById("volatile").classList.add("nonvisibile");
          var functions = document.getElementsByClassName("button_list_element_small");
          for(var i=0; i< functions.length; i++) {
            if(functions[i].id == "legenda") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            if(functions[i].id == "ricerca") {
              functions[i].classList.remove("nonvisibile");
              continue;
            }
            functions[i].classList.add("nonvisibile");
          }
        },

        addEvents: function() {
          var notteWrapper =  $("#notte_wrapper").empty();
          var altriWrapper =  $("#altri_wrapper").empty();
          var wrapper;

          var dateName = document.getElementsByClassName("date")[0];
          var date = new Date(this.currentDay * 1000);
          var months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio',
'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre','dicembre'];
          dateName.innerHTML = date.getDate() + " " + months[date.getMonth()].toUpperCase();

          var filteredModel = this.model.search(this.currentDay, this.currentDay + 86400).toArray();
          for (var i = 0; i < filteredModel.length; i++) {
            if(!filteredModel[i].nottericercatori) {
              var item = new EventiListItemView({
                model: filteredModel[i]
              });
              notteWrapper.append(item.render().el);
              this.subviews.push(item);
            }
          }
          // popoliamo la lista degli altri eventi
          var otherEvents = this.model.where({nottericercatori: false});
          for(var i=0; i<otherEvents.length; i++) {
            var date = new Date(otherEvents[i].get("timestamp") * 1000);
            var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            otherEvents[i].set("date", dateString);
            var item = new EventiListItemView({
              model: otherEvents[i]
            });
            altriWrapper.append(item.render().el);
            this.subviews.push(item);
          }
          if((filteredModel.length == 0) && (otherEvents.length == 0)) {
            navigator.notification.alert('Questa lista degli eventi è purtroppo vuota.', function() {}, "Attenzione");
          }
        },

        dayBack: function(event) {
          var yesterday = this.currentDay - 86400;
          var pastEvents = this.model.searchTo(this.getUpperTimestamp(yesterday)).toArray();
          if(pastEvents.length != 0) {
            //this.currentDay = yesterday;
            this.currentDay = this.getBaseTimestamp(pastEvents[pastEvents.length - 1].get("timestamp"));
            this.addEvents();
          } else {
            navigator.notification.alert('Non ci sono eventi programmati precedenti a quello corrente.', function() {}, "Attenzione");
          }          
        },

        dayNext: function(event) {
          var tomorrow = this.currentDay + 86400;
          var nextEvents = this.model.searchFrom(tomorrow).toArray();
          if(nextEvents.length != 0) {
            //this.currentDay = tomorrow;
            this.currentDay = this.getBaseTimestamp(nextEvents[0].get("timestamp"));
            this.addEvents();
          } else {
            navigator.notification.alert('Non ci sono eventi programmati succesivi a quello corrente.', function() {}, "Attenzione");
          } 
        }
      });

    return EventiListView;

  });