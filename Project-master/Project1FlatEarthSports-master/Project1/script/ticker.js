$(document).ready(function(e){
		var newsNum =$(".newsTicker a").length;
		//console.log(newsNum);
		var totalNews_W = 0;

		for (var i =0; i<newsNum; i++) {
			var news_W = $(".newsTicker a").eq(i).outerWidth(true);
			totalNews_W= totalNews_W + news_W;
		}

		//console.log(totalNews_W);
		$(".newsTicker").css('width', totalNews_W+'px');
		var speed = .75;
		animateNews();
		function animateNews(){
			$(".newsTicker a").eq(0).animate({
				'marginLeft' : '-='+speed+'px'
			},1, function(){

			var animNews_W = $(this).outerWidth(true);
				if (speed>= animNews_W) {
					$(this).parent().append($(this));
					$(this).removeAttr('style');
				}
				animInterval = setTimeout(function(){
					animateNews();
				});
			});
		}
		$(".newsTicker").hover(function(){
			clearTimeout(animInterval);
			$(".newsTicker a").eq(0).stop();
		}, function(){
			animateNews();
		});


	 var queryURL = "https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=3e1a94f03a5641e9acd7d2785da8954a";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
console.log(response)

	for (var i =0; i< response.articles.length; i++) {
		var article = response.articles[i];
		console.log(article.title);
		var link=$("<a href='' target='_blank'>");
		link.attr("href", article.url);
		link.text(article.title);

		$(".newsTicker").append(link);
	}animateNews();

	
}); 

	});