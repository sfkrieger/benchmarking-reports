/**
 * 
 */
var engine = require("./engine");
var helpers = require("../js/js.js");
var fs = require('fs');
var file = './chart_data.json';

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
//	console.log("Here are all the results %j", results);
	return results;
}

/**
 * This method will call all the functions in the fnArgs object
 * 
 * It will call them a discrete amount of times and then will output all the results together for that given function 
 */
var callAllFunctions = function(noTimes, fnArgs){
	var functions = Object.getOwnPropertyNames(fnArgs);
	var results = {};
	for(var i = 0; i < functions.length; i++)
		results[functions[i]] = engine.callingModules(functions[i], fnArgs[functions[i]], noTimes);
	return results;
}

var callTailoredObjectFunctions = function(max, noTimes){
	var results = {};
	if(typeof max == 'undefined')
		max = MAX_TIMES;
	
	for(var size = 1; size < max; size = size * 10){
		var result = engine.callingModules("sort", [helpers.generateArray(size)], noTimes);
//		result["size"] = size;
		results[size] = result;
		results["times"] = noTimes;
//		console.log("Here are the results so far: %j", results);
	}
	
	return results;
}

var writeToFile = function(allResults){
	fs.writeFileSync(file, JSON.stringify(allResults));
}


var writeOutAllResults = function(results){
	console.log("Here are all the results: %j", results);
	var functions = Object.getOwnPropertyNames(results);
//	console.log("Writing out all the results %j\nProperties: %j", results, functions);
	
	for(var i = 0; i < functions.length; i++){
		var result = results[functions[i]]; 
		writeResults(result,functions[i]);
	}
}

var writeResults = function(results, functionName){
	var modules = Object.getOwnPropertyNames(results);
	
	console.log("---- FOR THE %s FUNCTION------", functionName.toUpperCase());
	
	for(var i = 0; i < modules.length; i++)
		console.log("%s time: %s msec", modules[i], results[modules[i]].duration);
	
	return;
	
}

var outputEverything = function(){
	var all_output= {};
	
	for(var times = 1; times < MAX_TIMES; times = times * 10){
		console.log("\n\n ================ %s ITERATION(S) ================", times);
		var allFnResults = callAllFunctions(times, fnArgs);
//		var tailoredRes = callTailoredObjectFunctions(times);
		all_output[times] = allFnResults;
//		console.log("Here are the things to add to the file: \n%j\n is all the results, and \n%j\n is the tailored ones.", allFnResults, tailoredRes);

		
		writeOutAllResults(allFnResults);
	}
	
	fs.writeFileSync(file, JSON.stringify(all_output));
}



module.exports = {
		add: add,
		writeResults: writeResults,
		callTailoredObjectFunctions: callTailoredObjectFunctions,
		outputEverything: outputEverything
};