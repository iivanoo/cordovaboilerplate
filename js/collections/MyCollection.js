define(["jquery", "underscore", "backbone",
		"models/MyModel"
	],
	function($, _, Backbone,
		MyModel) {

		var MyCollection = Backbone.Collection.extend({
			model: MyModel,
		});

		return MyCollection;
	});