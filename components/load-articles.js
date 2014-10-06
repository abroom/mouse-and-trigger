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
	var articlesPerPage = 10;
	var index = getIndex();

	if (category) {
		var i = 0;
		while(i < articlesPerPage) {
			var article = dirItems[index].split(" ");
			if (category == article[2]) {
				loadArticle(article[0],article[1]);
				i++;
			}
			index++;
		}
	} else {
		for (var i = 0; i < articlesPerPage; i++) {
			var article = dirItems[index].split(" ");
			loadArticle(article[0],article[1]);
			index++;
		}
	}

	if (!category) {
		category = "index";
	}

	var navButtons = '<ul>';
	if (index < dirItems.length) {
		navButtons += '<li><a class="button" href="'+category+'.html?index='+index+'">Older Articles</a></li>';
	}
	if (index > articlesPerPage) {
		navButtons += '<li><a class="button" href="'+category+'.html?index='+(index-2*articlesPerPage)+'">Newer Articles</a></li>'
	}
	navButtons += '</ul>';

	$("#navButtons").append(navButtons);
}

function loadArticle(date, fileName) {
	$.get (
		'articles/'+date+'/'+fileName+'.html',
		function(article) {
			writeArticle(article, date, fileName);
		},
		'html'
	);
}

function writeArticle(article, date, fileName) {
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
	$("#articles").append(output);
}

// returns page number
function getIndex() {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	var index = 0;

	for (var i=0; i<vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == "index") {
			index = pair[1];
		}
	}

	return parseInt(index);
}


