/**
 * 
 */
var all_modules = {
		helpers : require("./helpers.js"),
		nan_c : require('bindings')('ncmod.node'),
		c : require('bindings')('cmod.node'),
		js : require("./js.js")
};

var NO_TIMES = 100000;

//========= FUNCTIONS FOR BENCHMARKING

//---------- RUNNING IN SEQUENCE ------------
//runs the add function with parameters
var run = function(fn, noTimes, arr){
	var i;
	var sum = 0;
	for(i = 0; i < noTimes; i++){
		if(typeof arr != 'undefined'){
			fn.apply(null, arr);
		}else{
			fn();
		}
	}
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
