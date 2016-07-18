function onReady() {

	var clock = new Clock('clock');
	var clock2 = new Clock('clock2');
}

function Clock(id) {
	this.updateClock = function() {
		var date = new Date();

		var clock = document.getElementById(id);
		clock.innerHTML = this.formatDigits(date.getHours()) + ':' + 
		this.formatDigits(date.getMinutes()) + ':' + 
		this.formatDigits(date.getSeconds());
	};

	this.formatDigits = function(val) {
	if (val < 10) val = "0" + val;
	return val;
	};

	var that = this;
	setInterval(function(){that.updateClock();}, 1000);
	this.updateClock();

}

window.onload = onReady;