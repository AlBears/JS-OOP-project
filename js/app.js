function onReady() {
	console.log('Loaded!');

	var clock = new Clock('clock', 180);
	var clock2 = new Clock('clock2', 0, 'GMT');
	var clock3 = new Clock('clock3', -240, 'NY');

}

Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval = function (date){
	//console.log(this.__interval);
	this.__aDates.push(date);

	if(!Date.__interval)
		Date.__interval = setInterval(function(){Date.updateDates()},
		 1000);
}
Date.updateDates = function(){
	//console.log(this.__aDates.length);
	for(var i = 0; i < this.__aDates.length; i++)
		this.__aDates[i].updateSeconds();
}

Date.prototype.updateSeconds = function(){
	this.setSeconds(this.getSeconds()+1);
}

Date.prototype.autoClock = function(isAuto){
	//clearInterval(this.clockInterval);

	if(isAuto){
		// var that = this;
		// this.clockInterval = setInterval(function(){that.updateSeconds()},
		// 	1000);
		Date.addToInterval(this);
	}
}

function Clock(id, offset, label) {
	label = label || '';
	offset = offset || 0;
	var d = new Date();
	var offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
	this.d = new Date(offset+d.getTime());
	this.d.autoClock(true);
	this.id = id;
	this.label = label;
	

	var that = this;
	setInterval(function() {
		that.updateClock();
	}, 1000);
	this.updateClock();

}
Clock.prototype.version = '1.00';
Clock.prototype.updateClock = function() {
	// console.log(this.version);
	var date = this.d;
		//date.updateSeconds();
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