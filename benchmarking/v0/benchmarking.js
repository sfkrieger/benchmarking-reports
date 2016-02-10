var engine = require("../engine");
var ncmod = require('../../cpp/build/Debug/ncmod.node');
var cmod = require('../../cpp/build/Debug/cmod.node');
var js = require("../../js/js.js");
var helpers = require("../../js/helpers.js");

var engine = require('../engine.js');

var ALL_MODULES = ["ncmod", "cmod", "jsAdd"];

var NUM_TRIALS = 10000;

var add = function(noTimes){
	var results = callingModules("add", ALL_MODULES, [1,2], noTimes);
	results[add_js] = engine.benchmark(ALL_MODULES[3].jsAdd, args, noTimes);
	return results;
}

var addEmpty = function(noTimes){
	
}
//------- BENCHMARK ADD ----------//
var benchmarkAdd = function(){
	var args = [1, 2];
	var nanres = engine.benchmark(ncmod.add, args);
	var cres = engine.benchmark(cmod.add, args);
	var jsresTempVar = engine.benchmark(js.addTemp, args);
	var jsres = engine.benchmark(js.addJS, args);
	
	return {
		c : cres,
		nan : nanres,
		js : jsresTempVar,
		jsFast : jsres
	}
}

var benchmarkEmptyAdd = function(){
	var args = [1, 2];
	var nanres = engine.benchmark(ncmod.add_empty, args);
	var cres = engine.benchmark(cmod.add_empty, args);
	var jsres = engine.benchmark(js.add_empty, args);
	
	return {
		c : cres,
		nan : nanres,
		js : jsres
	};
}

//------- BENCHMARK SORT ----------//
var benchmarkSort = function(){
	var arr = helpers.generateArray(ARR_SIZE);
	var args = [arr];
	var cres = benchmark(cmod.sort, args, 10);
//	console.log("Here's the sorted array: %j", arr);
	
	
	var arr = helpers.generateArray(ARR_SIZE);
	var args = [arr];
	var jsres = benchmark(js.sort, args, 10);
//	console.log("Here's the sorted array: %j", arr);
	return {
		c: cres,
		js: jsres
	};
	
}

var justCreate = function(){
	var obj = cmod.create_object();
	var props = Object.getOwnPropertyNames(obj);
	for(var i = 0; i < props.length; i++)
		console.log("Name: %s, Value: %s" , props[i], obj[props[i]]);
	
	obj = js.create_object();
	props = Object.getOwnPropertyNames(obj);
	for(var i = 0; i < props.length; i++)
		console.log("Name: %s, Value: %s" , props[i], obj[props[i]]);
}

var benchmarkCreate = function(){
	var cres = engine.benchmark(cmod.create_object);
	var jsres = engine.benchmark(js.create_object);
	return {
		c: cres,
		js: jsres
	};
}

var benchmarkOptimization = function(){

	var jsregular = engine.benchmark(js.create_object)
	var js = engine.benchmark(js.create_object_passing);
	var jsvolley = engine.benchmark(js.create_object_pcompare);
	
	return {
		jsregular: jsregular,
		js: js,
		jsvolley: jsvolley
	};
}

var toConsole = function(results){
	console.log("JS time: %s msec", results.js.duration);
	console.log("C time: %s msec", results.c.duration);
	
	if(typeof results.nan != 'undefined')
		console.log("Nan time: %s msec", results.nan.duration);
}

var writeResults = function(results, functionName){
	var modules = Object.getOwnPropertyNames(results);
	
	console.log("---- FOR THE %s FUNCTION------", functionName);
	
	for(var i = 0; i < modules.length; i++)
		console.log("%s time: %smsec", modules[i], results[modules[i]]);
	
	return;
	
}

module.exports = {
	toConsole : toConsole,
	benchmarkEmptyAdd : benchmarkEmptyAdd,
	benchmarkAdd : benchmarkAdd,
	benchmarkSort : benchmarkSort,
	benchmarkCreate : benchmarkCreate,
	benchmarkOptimization : benchmarkOptimization,
	justCreate: justCreate
	
};
