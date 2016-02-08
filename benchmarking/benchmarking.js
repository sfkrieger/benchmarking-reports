var engine = require("./engine");
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
benchmarkAdd = function(){
	var args = [1, 2];
	var nanres = benchmark(ncmod.add, args);
	var cres = benchmark(cmod.add, args);
	var jsresTempVar = benchmark(jsAdd.addTemp, args);
	var jsres = benchmark(jsAdd.addJS, args);
	
	return {
		c : cres,
		nan : nanres,
		js : jsresTempVar,
		jsFast : jsres
	}
}

benchmarkEmptyAdd = function(){
	var args = [1, 2];
	var nanres = benchmark(ncmod.add_empty, args);
	var cres = benchmark(cmod.add_empty, args);
	var jsres = benchmark(add_empty, args);
	
	return {
		c : cres,
		nan : nanres,
		js : jsres
	};
}

//------- BENCHMARK SORT ----------//
benchmarkSort = function(){
	var arr = helpers.generateArray(ARR_SIZE);
	var args = [arr];
	var cres = benchmark(cmod.sort, args, 10);
//	console.log("Here's the sorted array: %j", arr);
	
	
	var arr = helpers.generateArray(ARR_SIZE);
	var args = [arr];
	var jsres = benchmark(helpers.sort, args, 10);
//	console.log("Here's the sorted array: %j", arr);
	return {
		c: cres,
		js: jsres
	};
	
}

justCreate = function(){
	var obj = cmod.create_object();
	var props = Object.getOwnPropertyNames(obj);
	for(var i = 0; i < props.length; i++)
		console.log("Name: %s, Value: %s" , props[i], obj[props[i]]);
	
	obj = helpers.create_object();
	props = Object.getOwnPropertyNames(obj);
	for(var i = 0; i < props.length; i++)
		console.log("Name: %s, Value: %s" , props[i], obj[props[i]]);
}

var benchmarkCreate = function(){
	var cres = benchmark(cmod.create_object);
	var jsres = benchmark(helpers.create_object);
	return {
		c: cres,
		js: jsres
	};
}

benchmarkOptimization = function(){

	var jsregular = benchmark(helpers.create_object)
	var js = benchmark(helpers.create_object_passing);
	var jsvolley = benchmark(helpers.create_object_pcompare);
	
	return {
		jsregular: jsregular,
		js: js,
		jsvolley: jsvolley
	};
}

toConsole = function(results){
	console.log("JS time: %s msec", results.js.duration);
	console.log("C time: %s msec", results.c.duration);
	
	if(typeof results.nan != 'undefined')
		console.log("Nan time: %s msec", results.nan.duration);
}

writeResults = function(results, functionName){
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
