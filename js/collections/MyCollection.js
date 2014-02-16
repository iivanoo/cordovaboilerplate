define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Handlebars = require("models/MyModel");

	var MyCollection = Backbone.Collection.extend({
		constructorName: "MyCollection",
		model: MyModel
	});

	return MyCollection;
});