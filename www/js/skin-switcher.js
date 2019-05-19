function skin_set_active_stylesheet(title) {
	let i, a, main;
	for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			a.disabled = true;

			if (a.getAttribute("title") == title) {
				a.disabled = false;
			}
		}
	}
}

function skin_get_active_stylesheet() {
	let i, a;
	for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) {
			return a.getAttribute("title");
		}
	}
	return null;
}

function skin_get_preferred_stylesheet() {
	let i, a;
	for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) {
			return a.getAttribute("title");
		}
	}
	return null;
}

function skin_create_cookie(name, value, days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = `; expires=${date.toGMTString()}`;
	}
	document.cookie = `${name}=${value}${expires}; path=/`;
}

function skin_read_cookie(name) {
	let name_eq = `${name}=`;
	let ca = document.cookie.split(";");
	for (let i=0;i < ca.length;i++) {
		let c = ca[i];
		while (c.charAt(0)==" ") {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(name_eq) == 0) {
			return c.substring(name_eq.length, c.length);
		}
	}
	return null;
}

window.onload = function(e) {
	let cookie = skin_read_cookie("style");
	let title = cookie ? cookie : skin_get_preferred_stylesheet();
	skin_set_active_stylesheet(title);
};

window.onunload = function(e) {
	let title = skin_get_active_stylesheet();
	skin_create_cookie("style", title, 365);
};

let cookie = skin_read_cookie("style");
let title = cookie ? cookie : skin_get_preferred_stylesheet();
skin_set_active_stylesheet(title);