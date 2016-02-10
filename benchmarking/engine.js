/**
 * 
 */
var constants = require('../package.json').constants;
var MIN = constants.min_iterations;
var MAX = constants.max_iterations;
var INTERVAL = constants.interval;

var all_modules = {
		helpers : require("../js/helpers.js"),
//		nan_c : require('bindings')('ncmod.node'),
//		c : require('bindings')('cmod.node'),
		nan_c : require('../cpp/build/Debug/ncmod.node'),
		c : require('../cpp/build/Debug/cmod.node'),
		js : require("../js/js.js")
};

//========= FUNCTIONS FOR BENCHMARKING

//---------- RUNNING IN SEQUENCE ------------
//runs the add function with parameters
var run = function(fn, noTimes, arr){
	var parameters = (typeof arr == 'undefined' ? [] : arr);
	for(var i = 1; i < noTimes; i++)
			 result = fn.apply(null, parameters);
	return fn.apply(null, parameters);
}

//--------- TIMESTAMPING ------------
var benchmark = function(fn, args, times){
	var noTimes = (typeof times != 'undefined'? times: MAX);
	var start = process.hrtime();
	var result = run(fn, noTimes, args);
	var end = process.hrtime();
	var duration = (end[0] * 1000000 + end[1] / 1000) - (start[0] * 1000000 + start[1] / 1000);
	return {
		duration: duration, 
		result: result
	};
}

//--------- FN CALLING ------------
var benchmarkOnInterval = function(fn, args, interval, min, max){
	console.log("Here's whats passed in: fn %s, args %s, interval %s, min %s, max %s",
			fn, args, interval, min, max);
	var minTimes = (typeof min != 'undefined' ? min : MIN);
	var maxTimes = (typeof max != 'undefined' ? max : MAX);
	var factor = (typeof interval != 'undefined' ? interval : INTERVAL);
	
	console.log("About to benchmark %s function for %s min and %s max number of intervals, and %j args",
			fn, minTimes, maxTimes, args);
	var results = {};
	for(var i = minTimes; i < maxTimes; i = i * factor){
		var result = benchmark(fn, args, i);
		result["mean"] = result.duration / i;
		results[i] = result;
	}
	
	return results;
	
}

var callingModules = function(fn_name, args, times){
	console.log("FUnction name %s, arguments %j, times, %s", fn_name, args, times)
	var results = {};
	modules = Object.getOwnPropertyNames(all_modules);
	for(var i = 0; i < modules.length; i++){
		var module = all_modules[modules[i]];
		if(typeof module[fn_name] != 'undefined'){
			console.log("Here's the function: %j, args: $j, and no times: %s", module[fn_name], args, times);
			var result = benchmark(module[fn_name], args, times);
			results[modules[i]] = result;

		}
	}
	
	return results;
}

module.exports = {
		benchmark: benchmark,
		benchmarkOnInterval: benchmarkOnInterval,
		callingModules: callingModules
};
