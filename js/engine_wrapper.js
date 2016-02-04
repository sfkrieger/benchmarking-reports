/**
 * 
 */
var engine = require("./engine");
var PAIRED_FUNCTIONS = ["sort", "create_object"];
var TRICOMPARE = ["add", "add_empty"];
var MAX_TIMES = 1000000;
var arr_size = 10;

var fnArgs = {
		add: [1, 2],
		add_empty: [1, 2],
		create_object: []
}


var add = function(noTimes){
	var results = engine.callingModules("add", [1,2], noTimes);
//	results[add_js] = engine.benchmark(ALL_MODULES[3].jsAdd, args, noTimes);
	console.log("Here are all the results %j", results);
	return results;
}

//var prepArgs = function(){
//	
//}

/**
 * This method will call all the functions in the fnArgs object
 * 
 * It will call them a discrete amount of times and then will output all the results together for that given function 
 */
var callAllFunctions = function(noTimes){
	var functions = Object.getOwnPropertyNames(fnArgs);
	var results = {};
	for(var i = 0; i < functions.length; i++)
		results[functions[i]] = engine.callingModules(functions[i], fnArgs[functions[i]], noTimes);
	return results;
}

var callTailoredObjectFunctions = function(){
	
}

var writeOutAllResults = function(results){
	var functions = Object.getOwnPropertyNames(results);
//	console.log("Writing out all the results %j\nProperties: %j", results, functions);
	
	for(var i = 0; i < functions.length; i++)
		writeResults(results[functions[i]], functions[i]);
//		results[functions[i]] = engine.callingModules(functions[i], fnArgs[i], noTimes)
}

var outputEverything = function(){
	for(var times = 1; times < MAX_TIMES; times = times * 10){
		console.log("\n\n ================ %s ITERATION(S) ================", times);
		writeOutAllResults(callAllFunctions(times));
	}
}

//var benchmarkIncremental = function(max){
//	if(typeof max == 'undefined')
//		max = MAX;
//	for(var size = 1; size < max; size = size * 10){
//		var result = benchmark(module[fn_name], args, times);
//		result["size"] = size;
//		results[modules[i]] = result;
//	}
//}

var writeResults = function(results, functionName){
	var modules = Object.getOwnPropertyNames(results);
	
	console.log("---- FOR THE %s FUNCTION------", functionName.toUpperCase());
	
	for(var i = 0; i < modules.length; i++)
		console.log("%s time: %s msec", modules[i], results[modules[i]].duration);
	
	return;
	
}

module.exports = {
		add: add,
		writeResults: writeResults,
		outputEverything: outputEverything
};