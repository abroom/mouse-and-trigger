// Loads articles for display on index

$(document).ready(function() {
	loadDirectory();
});

function loadDirectory() {
	$.get (
		"articles/directory.txt",
		function(directory) {
			navDirectory(directory)
		},
		'text'
	);
}

function navDirectory(directory) {
	var dirItems = directory.split("\n");
	var index = 0;
	for (var i = 0; i < 10 && i < dirItems.length; i++) {
		var article = dirItems[index].split(" ");
		loadAritcle(article[0],article[1]);
		index++;
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
	var blurb = $(article).find('#article-blurb').html();

	var output = '<div class="article">'
			   + '<h2 class="title"><a '+link+'>'+title+'</a></h2>'
			   + '<h4 class="sub">'+sub+'</h4>'
			   + '<p class="blurb">'+blurb+'</p>'
			   + '<a class="continue-reading" '+link+'>Continue Reading ...</a>'
			   + '</div>';
	$("#wrap").append(output);
}


