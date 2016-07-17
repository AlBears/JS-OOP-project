function onReady() {

	var clock = createClock('clock');
	var clock2 = createClock('clock2');
}

function createClock(id) {
	var c = {};
	c.updateClock = function() {
		var date = new Date();

		var clock = document.getElementById(id);
		clock.innerHTML = this.formatDigits(date.getHours()) + ':' + 
		this.formatDigits(date.getMinutes()) + ':' + 
		this.formatDigits(date.getSeconds());
	};

	c.formatDigits = function(val) {
	if (val < 10) val = "0" + val;
	return val;
	};

	setInterval(function(){c.updateClock();}, 1000);
	c.updateClock();

	return c;
}

window.onload = onReady;