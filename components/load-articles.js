// Loads articles for display on index

var articlesPerPage = 10;

function loadArticles(category) {
	loadDirectory(category);
}


function loadDirectory(category) {
	var order = getOrder();
	if (order == "ascending") {
		$.get (
			"articles/directory.txt",
			function(directory) {
				navDirectoryAscending(directory, category)
			},
			'text'
		);
	} else {
		$.get (
			"articles/directory.txt",
			function(directory) {
				navDirectoryDescending(directory, category)
			},
			'text'
		);
	}
}

function navDirectoryAscending(directory, category) {
	var dirItems = directory.split("\n");
	var index = getIndex();
	var startingIndex = index;

	if (category) {
		var i = 0;
		if (category == "other") {
			while(i < articlesPerPage && index < dirItems.length) {
				var article = dirItems[index].split(" ");
				if ("videoGames" != article[2]) {
					loadArticleAscending(article[0],article[1]);
					i++;
				}
				index++;
			}
		} else {
			while(i < articlesPerPage && index < dirItems.length) {
				var article = dirItems[index].split(" ");
				if (category == article[2]) {
					loadArticleAscending(article[0],article[1]);
					i++;
				}
				index++;
			}
		}
	} else {
		for (var i = 0; i < articlesPerPage && index < dirItems.length; i++) {
			var article = dirItems[index].split(" ");
			loadArticleAscending(article[0],article[1]);
			index++;
		}
	}

	if (!category) {
		category = "index";
	}

	var navButtons = '<ul>';
	if (index < dirItems.length) {
		navButtons += '<li><a class="button" href="'+category+'.html'
				   +'?index='+index+'">Older Articles</a></li>';
	}
	if (index > articlesPerPage) {
		navButtons += '<li><a class="button" href="'+category+'.html'
				   +'?index='+(startingIndex-1)
				   +'&amp;order=descending">Newer Articles</a></li>';
	}
	navButtons += '</ul>';

	$("#navButtons").append(navButtons);
}
function loadArticleAscending(date, fileName) {
	$.get (
		'articles/'+date+'/'+fileName+'.html',
		function(article) {
			writeArticleAscending(article, date, fileName);
		},
		'html'
	);
}
function writeArticleAscending(article, date, fileName) {
	$("#articles").append(writeArticle(article, date, fileName));
}

function navDirectoryDescending(directory, category) {
	var dirItems = directory.split("\n");
	var index = getIndex();
	var startingIndex = index;

	if (category) {
		var i = 0;
		if (category == "other") {
			while(i < articlesPerPage && index >= 0) {
				var article = dirItems[index].split(" ");
				if ("videoGames" != article[2]) {
					loadArticleDescending(article[0],article[1]);
					i++;
				}
				index--;
			}
		} else {
			while(i < articlesPerPage && index >= 0) {
				var article = dirItems[index].split(" ");
				if (category == article[2]) {
					loadArticleDescending(article[0],article[1]);
					i++;
				}
				index--;
			}
		}
	} else {
		for (var i = 0; i < articlesPerPage && index >= 0; i++) {
			var article = dirItems[index].split(" ");
			loadArticleDescending(article[0],article[1]);
			index--;
		}
	}

	if (!category) {
		category = "index";
	}

	var navButtons = '<ul>';
	if (index < dirItems.length) {
		navButtons += '<li><a class="button" href="'+category+'.html'
				   +'?index='+(startingIndex+1)+'">Older Articles</a></li>';
	}
	if (index > articlesPerPage) {
		navButtons += '<li><a class="button" href="'+category+'.html'
				   +'?index='+index
				   +'&amp;order=descending">Newer Articles</a></li>';
	}
	navButtons += '</ul>';

	$("#navButtons").append(navButtons);
}
function loadArticleDescending(date, fileName) {
	$.get (
		'articles/'+date+'/'+fileName+'.html',
		function(article) {
			writeArticleDescending(article, date, fileName);
		},
		'html'
	);
}
function writeArticleDescending(article, date, fileName) {
	$("#articles").prepend(writeArticle(article, date, fileName));
}


// writes article summary
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
	return output;
}

// returns index
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

// returns order of output
function getOrder() {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	var order = "ascending";

	for (var i=0; i<vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == "order") {
			order = pair[1];
		}
	}

	return order;
}
