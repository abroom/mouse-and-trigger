// Loads an Article when div is clicked
$(document).ready(function() {
	loadContributer(getFileLocation(getContributer()));
});

// Awesome code from css-tricks.com
function getContributer() {
	var Contributer = window.location.search.substring(1);
	return Contributer;
}

// Loads article file into proper divs
function loadContributer(contributerFileLocation) {
	$("#wrap").load(contributerFileLocation);
}

// Creates file location string
function getFileLocation(contributerName) {
	return "contributers/"+contributerName+".html";
}
