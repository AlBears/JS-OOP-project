function onReady() {

	var clock = createClock('clock');
	var clock2 = createClock('clock2');
}

function createClock(id) {
	var c = {};
	c.updateClock = function() {
		var date = new Date();

		var clock = document.getElementById(id);
		clock.innerHTML = formatDigits(date.getHours()) + ':' + 
		formatDigits(date.getMinutes()) + ':' + 
		formatDigits(date.getSeconds());
	};

	setInterval(c.updateClock, 1000);
	c.updateClock();

	return c;
}



function formatDigits(val) {
	if (val < 10) val = "0" + val;
	return val;
}

window.onload = onReady;