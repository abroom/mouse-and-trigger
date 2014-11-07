// Loads an Article when div is clicked
$(document).ready(function() {
	loadContributer(getFileLocation(getQueryVariable("name")));
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
function loadContributer(contributerFileLocation) {
	$("#wrap").load(contributerFileLocation, function() {
		document.title = "MAT - " + $("#wrap").find("#contributer-name").text()
						+ ' - ' + $("#wrap").find("#contributer-title").text();
	});
}

// Creates file location string
function getFileLocation(contributerName) {
	return "contributors/"+contributerName+"/"+contributerName+".html";
}
