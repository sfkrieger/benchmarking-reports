/**
 * 
 */
var all_modules = {
		helpers : require("../js/helpers.js"),
//		nan_c : require('bindings')('ncmod.node'),
//		c : require('bindings')('cmod.node'),
		nan_c : require('../cpp/build/Debug/ncmod.node'),
		c : require('../cpp/build/Debug/cmod.node'),
		js : require("../js/js.js")
};

var NO_TIMES = 100000;

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
	var noTimes = (typeof times != 'undefined'? times: NO_TIMES);
	var start = Date.now();
	var result = run(fn, noTimes, args);
	var duration = Date.now() - start;
	return {
		duration: duration, 
		result: result
	};
}

//--------- FN CALLING ------------
var callingModules = function(fn_name, args, times){
//	console.log("FUnction name %s, arguments %j, times, %s", fn_name, args, times)
	var results = {};
	modules = Object.getOwnPropertyNames(all_modules);
	for(var i = 0; i < modules.length; i++){
		var module = all_modules[modules[i]];
		if(typeof module[fn_name] != 'undefined'){
			var result = benchmark(module[fn_name], args, times);
			results[modules[i]] = result;

		}
	}
	
	return results;
}

module.exports = {
		callingModules: callingModules
};
