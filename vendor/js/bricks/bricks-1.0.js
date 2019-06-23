/* Bricks.js
* version: 1.0
* author: Brennan Nunamaker
* license: MIT
*/
function toggleVisibility(targetSelector){
	if ($(targetSelector).hasClass("visible")) {
		$(targetSelector).removeClass("visible");
		return;
	}

	$(targetSelector).addClass("visible");
}

function toggleHamburger(targetSelector){
	$(targetSelector).toggleClass("is-active");
}

function getHamburgerAnimationClass(targetSelector){
	let supportedClasses = ["collapse", "elastic", "spin", "stand", "spring", "vortex"];

	for (var classIdx = 0; classIdx < supportedClasses.length; classIdx++) {
		let className = supportedClasses[classIdx];
		if($(targetSelector).hasClass(className))
			return "hamburger--" + className;
	}

	return "";
}

function injectHamburger(targetSelector){
	let animationClass = getHamburgerAnimationClass(targetSelector);
	$(targetSelector).addClass("hamburger" + " " + animationClass);
	$(targetSelector).append("<span class=\"hamburger-box\">" 				+ 
								"<span class=\"hamburger-inner\"></span>" 	+
							"</span>");
}

function toggleNav(){
	injectHamburger("#nav-toggle");

	return function(){
		toggleHamburger("#nav-toggle");
		toggleVisibility("#nav-links");
	}
}

function trackNavToggle(){
	$("#nav-toggle").click(toggleNav());
}

function getCssValue(elementSelector, attrName, attrUnit){
	var attrString = $(elementSelector).css(attrName);
	if (!attrString) {
		return 0;
	}
	return parseInt(attrString.replace(attrUnit, ""));
}

function fitMainContent() {
	var fitScreen 	=  ".fit-screen";
	var widthOffset = 	getCssValue(fitScreen, "padding-left", 	"px") +
						getCssValue(fitScreen, "padding-right", 	"px");

	var heightOffset = 	getCssValue(fitScreen, "padding-top", 	"px") +
						getCssValue(fitScreen, "padding-bottom", "px") +
						$("body > header > nav").height();

	var targetSelector = fitScreen;

	var maxWidth 	= getCssValue(targetSelector, "max-width", "px");
	var width 		= $(window).width() 	- widthOffset;
	if(maxWidth && width > maxWidth)
		width = maxWidth;

	var maxHeight 	= getCssValue(targetSelector, "max-height", "px");
	var height 		= $(window).height() 	- heightOffset;
	if(maxHeight && height > maxHeight)
		height = maxHeight;

	$(targetSelector).css("min-width", width).css("min-height", height);
}

function displayCookieNotice(){
	const cookiesAccepted = document.cookie.indexOf('cookiesaccepted=1') != -1;
	if(cookiesAccepted){
		$('#cookie-notice').hide();
		$('#cookie-notice-close').hide();
		return;
	}

	$('#cookie-notice').show();
	$('#cookie-notice-close').show();
}

function onDocumentReady() {
	MicroModal.init();
	
	trackNavToggle();
	fitMainContent();
	displayCookieNotice();
}

$(document).ready(onDocumentReady);

function onWindowResize(){
	fitMainContent();
}

$(window).resize(onWindowResize);

