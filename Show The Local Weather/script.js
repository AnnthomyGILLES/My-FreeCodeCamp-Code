$(document).ready(function () {
	$(".icon").hide();

	function selectIcon(weather) {
		weather = weather.toLowerCase();
		switch (weather) {
			case "drizzle":
				$(".sun-shower").show();
				break;
			case "thunderstom":
				$(".thunder-storm").show();
				break;
			case "clouds":
				$(".clouds").show();
				break;
			case "snow":
				$(".flurries").show();
				break;
			case "clear":
				$(".sunny").show();
				break;
			case "rain":
				$(".rainy").show();
				break;
			default:
				$(".sunny").show();

		}
	}

	var temp = 0;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var url = "http://api.openweathermap.org/data/2.5/weather?APPID=6b6d0e4abc25ddd59453fd3ef8a47104&lat=" + lat + "&lon=" + lon + "&units=metric&lang=fr";
			$.ajax({
				url: url,
				dataType: 'json',
				async: true,
				success: function (city) {
					temp = city.main.temp;
					$("#data").append("<h1>" + city.name + "," + city.sys.country + "</h1>");
					$("#temperature").append(city.main.temp + "°C");
					selectIcon(city.weather[0].main);
				}
			});
		});
	};
	$('#temperature').hover(function () {
		var tempF = 0;
		tempF = temp * 1.8 + 32;
		$main_text = $(this).text();
		$(this).text(tempF + "F");
	}, function () {
		$(this).text($main_text);
	});
});
