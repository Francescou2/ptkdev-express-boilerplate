$("#navbar-burger").on("click", function() {
	$(".navbar-burger").toggleClass("is-active");
	$(".navbar-menu").toggleClass("is-active");
});

$("#set-skin-default").on("click", function() {
	skin_set_active_stylesheet("default");
	skin_create_cookie("style", "default", 365);
});

$("#set-skin-nightmode").on("click", function() {
	skin_set_active_stylesheet("nightmode");
	skin_create_cookie("style", "nightmode", 365);
});