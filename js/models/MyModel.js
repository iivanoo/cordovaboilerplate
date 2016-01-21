define(function(require) {

	var Backbone = require("backbone");

	var MyModel = Backbone.Model.extend({
		constructorName: "MyModel"
	});

	return MyModel;
});