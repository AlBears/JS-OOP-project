function onReady() {
	console.log('Loaded!');

	var clock = new com.app.AlarmClock('clock', 180);
	var clock2 = new com.app.TextClock('clock2', 0, 'GMT');
	var clock3 = new com.app.Clock('clock3', -240, 'NY');

	//LiveDate.call(clock, 1,2,3);
	LiveDate.apply(clock, [1,2,3]);
}

function LiveDate(a,b,c){
	//console.log(this, a,b,c)
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

var com = com || {};
	com.app = com.app || {};

com.app.Clock = function (id, offset, label) {
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
com.app.Clock.prototype.version = '1.00';
com.app.Clock.prototype.updateClock = function() {
	// console.log(this.version);
	var date = this.d;
		//date.updateSeconds();
	var clock = document.getElementById(this.id);
	clock.innerHTML = this.formatOutput(date.getHours(),
		date.getMinutes(),date.getSeconds(), this.label);
};
com.app.Clock.prototype.formatOutput = function(h,m,s,label){

	return this.formatDigits(h) + ':' +
		this.formatDigits(m) + ':' +
		this.formatDigits(s) + ' ' + label;
}

com.app.Clock.prototype.formatDigits = function(val) {
	if (val < 10) val = "0" + val;
	return val;
};

com.app.TextClock = function(id, offset, label){
	com.app.Clock.apply(this, arguments);
	console.log(this.version);
}
com.app.TextClock.prototype = createObject(com.app.Clock.prototype, com.app.TextClock);
//com.app.TextClock.prototype.constructor = com.app.TextClock;
com.app.TextClock.prototype.formatOutput = function(h,m,s,label){

	return this.formatDigits(h) + ' Hours ' +
		this.formatDigits(m) + ' Minutes ' +
		this.formatDigits(s) + ' Seconds ' + label;
}
com.app.TextClock.prototype.version = '1.01';

com.app.AlarmClock = function(id, offset, label,almH,almM){
	com.app.Clock.apply(this, arguments);
	this.almH = almH;
	this.almM = almM;
	console.log(this.version);

	this.dom = document.getElementById(id);
	this.dom.contentEditable = true;
}
com.app.AlarmClock.prototype = createObject(com.app.Clock.prototype, com.app.AlarmClock);
com.app.AlarmClock.prototype.formatOutput = function(h,m,s,label){
	var output;
	if(h==this.almH && m==this.almM){ 
		
		output = 'ALARM WAKE UP';
		var snd = new Audio('art/beep.mp3');
		snd.play();
	}else { 
		output = com.app.Clock.prototype.formatOutput.apply(this,arguments);
		}
		return output;
}




//use this instead object.create
function createObject(proto, cons){
	function c(){}
	c.prototype = proto;
	c.prototype.constructor = cons;
	return new c();
}

window.onload = onReady;




















