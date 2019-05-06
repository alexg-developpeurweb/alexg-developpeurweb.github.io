$(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://medium.com/feed/@alexgwebdev'
	};
	
	$.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@alexgwebdev&api_key=mlscq6tmj2tcfrui1xwmwghqsju6x7r99ied4cwi', data, function (response) {
		if (response.status == 'ok') {
			var output = '';
      var posts = $.map(response.items, function(post, i) {
        var postCategories = response.items[i].categories
        if(postCategories.length !== 0 ) {
          return post;
        }
      });
			$.each(response.items, function (k, item) {
				var visibleSm;
				if(k < 12){
					visibleSm = '';
				 } else {
					 visibleSm = ' visible-sm';
				 }
				output += '<div class="col-sm-6 col-md-4' + visibleSm + '">';
				output += '<div class="blog-post"><div>';
				// output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
        output += '<div class="blog-element"><img style="border-radius:10px" class="img-responsive" src="' + src + '" width="360px" height="240px"></div></div>';
				output += '<div class="blog-content"><h3>' + item.title + '</h3>';
				output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
				var maxLength = 120 // maximum number of characters to extract
				//trim the string to the maximum length
				var trimmedString = yourString.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
				output += '<p>' + trimmedString + '...</p>';
        output += '<p><a href="'+ item.link + '" target="_blank"> Voir plus </a></p>';
				output += '</div></div></div>';
				return k < 12;
			});
			$content.html(output);
		}
	});
});