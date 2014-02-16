define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");

	var MyModel = Backbone.Model.extend({
		constructorName: "MyModel"
	});

	return MyModel;
});