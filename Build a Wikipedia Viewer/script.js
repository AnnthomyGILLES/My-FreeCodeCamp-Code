$(document).ready(function () {
	var s = $('input'),
		f = $('form'),
		a = $('.after'),
		m = $('ul');

	s.focus(function () {
		if (f.hasClass('open')) return;
		f.toggleClass('in');
		setTimeout(function () {
			f.toggleClass('open');
			f.removeClass('in');
		}, 1300);
	});

	a.on('click', function (e) {
		e.preventDefault();
		if (!f.hasClass('open')) return;
		s.val('');
		f.toggleClass('close'); // j'ai changé les addClass en toggleClass
		f.removeClass('open');
		setTimeout(function () {
			f.removeClass('close');
		}, 1300);
	});

	f.submit(function (e) {
		e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire
		e.stopImmediatePropagation();
		var search = $("#searchTerm").val();
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search + "&limit=10&format=json&callback=?";
		if (search === '') {
			f.addClass('explode');
			setTimeout(function () {
				s.val('');
				f.removeClass('explode');
				m.removeClass('show');
			}, 400);
		} else {
			$.ajax({
				type: "GET",
				url: url,
				contentType: "application/json;charset=utf-8",
				async: true,
				dataType: "jsonp",
				success: function (data) {
					$('.list-group').empty(); // Vide la liste, au cas où il y aurait eu de précédentes requêtes.
					var title = data[1];
					var definition = data[2];
					var link = data[3];
					for (var i = 0; i < title.length; i++) {
						$(".list-group").append(
							"<a href=\"" + link[i] + "\" target=\"_blank\" class=\"list-group-item\"><h1 class=\"text-primary\">" + title[i] + "</h1><p class=\"text-muted\">" + definition[i] + "</p></a>");
					}
				}
			});
		}
	});
});
