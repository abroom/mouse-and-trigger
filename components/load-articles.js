// Loads articles for display on index

var articlesPerPage = 10;
var lastDefaultIndex = 7;

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
	// Directory of Articles
	var dirItems = directory.split("\n");

	// Index for directory
	var index = getIndex();
	var startingIndex = index;

	// Booleans for whether newest or oldest article is listed
	var hasNewest = false;
	var hasOldest = false;

	if (category) {
		var i = 0;
		while(i < articlesPerPage && index < dirItems.length) {
			var article = dirItems[index].split(" ");
			if (category == article[2]) {
				loadArticleAscending(article[0],article[1], i);
				if (article[3] == "oldest") {
					hasOldest = true;
					break; // no need to continue
				} else if (article[3] == "newest") {
					hasNewest = true;
				}
				i++;
			}
			index++;
		}
	} else {
		for (var i = 0; i < articlesPerPage && index < dirItems.length; i++) {
			var article = dirItems[index].split(" ");
			loadArticleAscending(article[0],article[1], i);
			index++;
		}
	}

	if (!category) {
		category=  "index";
	}

	// Older Articles button
	if (index < dirItems.length && !hasOldest) {
		$(document).find('#navButtons a:first-child').attr('href', category+'.html?index='+index);
	} else {
		$(document).find('#navButtons a:first-child').hide();
	}
	// Newer Articles button
	if (startingIndex > 0 && !hasNewest) {
		$(document).find('#navButtons a:last-child').attr('href', category+'.html?index='+(startingIndex-1)+'&order=descending');
	} else {
		$(document).find('#navButtons a:last-child').hide();
	}
}
function loadArticleAscending(date, fileName, i) {
	$.get (
		'articles/'+date+'/'+fileName+'.html',
		function(article) {
			writeArticleAscending(article, date, fileName, i);
		},
		'html'
	);
}
function writeArticleAscending(article, date, fileName, i) {
	if (i > 0) {
		$("#articles").append('<hr>');
	}
	$("#articles").append(writeArticle(article, date, fileName));
}

function navDirectoryDescending(directory, category) {
	// Directory of articles
	var dirItems = directory.split("\n");

	// Index for directory
	var index = getIndex();
	var startingIndex = index;

	// Booleans for whether list has newest and/or oldest
	var hasOldest = false;
	var hasNewest = false;

	if (category) {
		var i = 0;
		while(i < articlesPerPage && index >= 0) {
			var article = dirItems[index].split(" ");
			if (category == article[2]) {
				loadArticleDescending(article[0],article[1], i);
				if (article[3] == "oldest") {
					hasOldest = true;
				} else if (article[3] == "newest") {
					hasNewest = true;
					break; // No need to continue
				}
				i++;
			}
			index--;
		}
	} else {
		for (var i = 0; i < articlesPerPage && index >= 0; i++) {
			var article = dirItems[index].split(" ");
			loadArticleDescending(article[0],article[1], i);
			index--;
		}
	}

	if (!category) {
		category = "index";
	}

	if (startingIndex < dirItems.length && !hasOldest) {
		$(document).find('#navButtons a:first-child').attr('href', category+'.html?index='+(startingIndex+1));
	} else {
		$(document).find('#navButtons a:first-child').hide();
	}
	if (index > lastDefaultIndex && !hasNewest) {
		$(document).find('#navButtons a:last-child').attr('href', category+'.html?index='+index+'&order=descending');
	} else {
		$(document).find('#navButtons a:last-child').hide();
	}
}
function loadArticleDescending(date, fileName, i) {
	$.get (
		'articles/'+date+'/'+fileName+'.html',
		function(article) {
			writeArticleDescending(article, date, fileName, i);
		},
		'html'
	);
}
function writeArticleDescending(article, date, fileName, i) {
	if (i > 0) {
		$("#articles").prepend('<hr>');
	}
	$("#articles").prepend(writeArticle(article, date, fileName));
}


// writes article summary
function writeArticle(article, date, fileName) {
	var link = 'href="article.html?date='+date+'&amp;article='+fileName+'"';
	var authorPortrait = $(article).find('#article-author-portrait').find('img').attr('src');
	if (typeof authorPortrait == 'undefined') {
		authorPortrait = "components/images/logo.png";
	}
	var authorSource = $(article).find('#author').attr('href');
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
			   + '<a href="'+authorSource+'"><img class="author-portrait" src="'+authorPortrait+'"></a>'
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
