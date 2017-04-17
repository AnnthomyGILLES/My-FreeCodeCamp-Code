var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
$(document).ready(function () {
	$('#getQuote').on('click', function () {
		var color = colors[Math.floor(Math.random() * colors.length)];
		document.body.style.backgroundColor = color;
		$.ajax({
			url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
			success: function (data) {
				var post = data.shift(); // The data is an array of posts. Grab the first one.
				var quote = $('<p>' + post.content + '</p>');
				var author = $('<p> -' + post.title + '</p>');
				$('#quotes').html(quote);
				$('#author').html(author);
			},
			cache: false
		});
	});
});
