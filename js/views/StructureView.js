define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");

    var StructureView = Backbone.View.extend({
        constructorName: "StructureView",
        id: "main",
        events: {
            "tap #nav1": "myView",
            "tap #nav2": "map",
            "tap #nav3": "home",
            "tap #mymenu": "show_hide_menu",
            "tap #btn-offerte": "show_offerte",
            "tap #btn-richieste": "show_richieste"
        },
        initialize: function (options) {
            // load the precompiled template
            this.template = Utils.templates.structure;
            //this.on("inTheDOM", this.rendered);
            // bind the back event to the goBack function
            //document.getElementById("back").addEventListener("back", this.goBack(), false);
        },
        render: function () {
            // load the template
            this.el.innerHTML = this.template({});
            // cache a reference to the content element
            this.contentElement = this.$el.find('#content')[0];
            return this;
        },
        // rendered: function(e) {
        // },

        // generic go-back function
        goBack: function () {
            //window.history.back();
        },
//    setActiveTabBarElement: function(elementId) {
//      // here we assume that at any time at least one tab bar element is active
//      document.getElementsByClassName("active")[0].classList.remove("active");
//      document.getElementById(elementId).classList.add("active");
//    },

        map: function (event) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        home: function (event) {
            Backbone.history.navigate("home", {
                trigger: true
            });
        },
        myView: function (event) {
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        show_hide_menu: function () {
            this.$mymenu = $("#mymenu");
            this.$content = $("#content");
            this.$menu_row = $("#menu_row");
            this.$struct_btn = $("#struct_btn");
            if (this.$mymenu.hasClass("aperto")){
                this.$mymenu.removeClass("aperto");
                this.$content.removeClass("aperto");
                this.$menu_row.removeClass("aperto");
                this.$struct_btn.removeClass("aperto");
            } else {
                this.$mymenu.addClass("aperto");
                this.$content.addClass("aperto");
                this.$menu_row.addClass("aperto");
                this.$struct_btn.addClass("aperto");
            }
            
        },
        show_offerte: function(){
            this.$line_selector = $("#line_selector");
            this.$line_selector.removeClass("richieste");
            this.$line_selector.addClass("offerte");
            
        },
        show_richieste: function(){
            this.$line_selector = $("#line_selector")
            this.$line_selector.removeClass("offerte");
            this.$line_selector.addClass("richieste");
        }
    });

    return StructureView;

});