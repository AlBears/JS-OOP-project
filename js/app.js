function onReady() {

	var clock = new Clock('clock', 180);
	var clock2 = new Clock('clock2', 0, 'GMT');
	var clock3 = new Clock('clock3', -240, 'NY');

}

function Clock(id, offset, label) {
	label = label || '';
	offset = offset || 0;
	var d = new Date();
	this.id = id;
	this.label = label;
	this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;

	var that = this;
	setInterval(function() {
		that.updateClock();
	}, 1000);
	this.updateClock();

}

Clock.prototype.updateClock = function() {
	var date = new Date();
	date = new Date(this.offset + date.getTime());

	var clock = document.getElementById(this.id);
	clock.innerHTML = this.formatDigits(date.getHours()) + ':' +
		this.formatDigits(date.getMinutes()) + ':' +
		this.formatDigits(date.getSeconds()) + ' ' + this.label;
};

Clock.prototype.formatDigits = function(val) {
	if (val < 10) val = "0" + val;
	return val;
};

window.onload = onReady;