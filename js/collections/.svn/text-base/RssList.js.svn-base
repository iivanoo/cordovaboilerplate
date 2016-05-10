define(["jquery", "underscore", "backbone", "models/Rss"],
    function ($, _, Backbone, Rss) {

    var RssList = Backbone.Collection.extend({

        model: Rss,
        
        populate: function (feedUrl, view) {
        	var xmlhttp = new XMLHttpRequest();
        	var self = this;
        	xmlhttp.onreadystatechange = function() {
			  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			    var feed = xmlhttp.responseXML;
				var news = feed.getElementsByTagName("item");
				var title, description, link;
				for(var i=0; i<news.length; i++) {
					title = news[i].getElementsByTagName("title")[0].textContent.strip();
					description = news[i].getElementsByTagName("description")[0].textContent.strip();
					link = news[i].getElementsByTagName("link")[0].textContent.strip();
					if(title && description && link) {
						self.create({title: title, description: description, link: link});
					}
				}
				view.showNews(self);
			  }
			}
        	xmlhttp.open("GET", feedUrl, true);
			xmlhttp.send();
        }
      });

    return RssList;

  });