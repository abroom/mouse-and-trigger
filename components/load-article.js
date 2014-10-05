// Loads an Article when div is clicked
$(document).ready(function() {
	var date = getQueryVariable("date");
	var articleName = getQueryVariable("article");

	loadArticle(getFileLocation(date, articleName));
});

// Awesome code from css-tricks.com
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0; i<vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

// Loads article file into proper divs
function loadArticle(articleFileLocation) {
	$("#wrap").load(articleFileLocation);
}

// Creates file location string
function getFileLocation(date, articleName) {
	return "articles/"+date+"/"+articleName+".html";
}
