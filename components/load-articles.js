// Loads articles for display on index
function loadArticles(category) {
	loadDirectory(category);
}


function loadDirectory(category) {
	$.get (
		"articles/directory.txt",
		function(directory) {
			navDirectory(directory, category)
		},
		'text'
	);
}

function navDirectory(directory, category) {
	var dirItems = directory.split("\n");
	var index = 0;
	if (category) {
		for (var i = 0; i < 10 && i < dirItems.length; i++) {
			var article = dirItems[index].split(" ");
			if (category == article[2]) {
				loadAritcle(article[0],article[1]);
			}
			index++;
		}
	} else {
		for (var i = 0; i < 10 && i < dirItems.length; i++) {
			var article = dirItems[index].split(" ");
			loadAritcle(article[0],article[1]);
			index++;
		}
	}
}

function loadAritcle(date, fileName) {
	$.get (
		'articles/'+date+'/'+fileName+'.html',
		function(article) {
			writeAritcle(article, date, fileName);
		},
		'html'
	);
}

function writeAritcle(article, date, fileName) {
	var link = 'href="article.html?date='+date+'&amp;article='+fileName+'"';
	var title = $(article).find('#article-title').html();
	var sub = $(article).find('#article-sub').html();
	var bannerSrc = $(article).find('#article-banner').attr('src');
	if (typeof bannerSrc == 'undefined') {
		bannerSrc = "components/images/banner.png";
		bannerAlt = "Mouse And Trigger default banner"
	} else {
		var bannerAlt = $(article).find('#article-banner').attr('alt');
	}
	var blurb = $(article).find('#article-blurb').html();

	var output = '<div class="article">'
			   + '<h2 class="title"><a '+link+'>'+title+'</a></h2>'
			   + '<h4 class="sub">'+sub+'</h4>'
			   + '<img class="banner" src="'+bannerSrc+'" alt="'+bannerAlt+'">'
			   + '<p class="blurb">'+blurb+'</p>'
			   + '<a class="continue-reading" '+link+'>Continue Reading ...</a>'
			   + '</div>';
	$("#wrap").append(output);
}


