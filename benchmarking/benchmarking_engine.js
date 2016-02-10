/**
 * 
 */
var util = require('util');
var engine = require("./engine");
var constants = require("../package.json").constants;

var MAX_SIZE = constants.max_size;
var MIN_SIZE = constants.min_size;

var nan_c = require('../cpp/build/Debug/ncmod.node');
var c = require('../cpp/build/Debug/cmod.node');
var js = require("../js/js.js");
var helpers = require("../js/helpers.js");

var callInBoth = function(fnName, args, interval, min, max){
//	var results = { function_name: fnName};
	var results = { };
//	console.log("For the %s function, here's what i think will work: %s, " +
//			"and this is what actually being run: %s", fnName, c.sort, c[fnName]);
//	console.log(c.add(1,2));
	results["c"] = engine.benchmarkOnInterval(c[fnName], args, interval, min, max);
	results["js"] = engine.benchmarkOnInterval(js[fnName], args, interval, min, max);
	return results;
}

var benchmarkInvaraibleinputFunctions = function(){
	var results = {};
	results['add'] = callInBoth("add", [1,2], 10, 1, 100000000);
	results['add_empty'] = callInBoth("add_empty", [1,2], 10, 1, 100000000);
	return results;
}

var benchmarkSort = function(){
	var results = {};
	for(var i = MIN_SIZE; i <= MAX_SIZE; i = i * 10){
		var array = helpers.generateArray(i);
		var result = callInBoth("sort", [array], 10, 1, 1000);
		results[i] = result;
//		result["size"] = i;
//		results.push(result);
	}
	
	return { sort: results};
}

var benchmarkCreateObject = function(){
	var createObjectresults = {};
	var getPropresults = {};
	var manipulatePropresults = {};
	var coresult, getpropresult, manipulatepropresult;
	for(var i = MIN_SIZE; i <= MAX_SIZE; i = i * 10){
		coresult = callInBoth("create_object", [i], 10, 1, 1000);
//		coresult["size"] = i;
		createObjectresults[i] = coresult;
//		createObjectresults.push(coresult);
		
		getpropresult = callInBoth("get_properties", [js.create_object(i)], 10, 1, 1000);
		getPropresults[i] = getpropresult;
//		getpropresult["size"] = i;
//		getPropresults.push(getpropresult);
		
		manipulatepropresult = callInBoth("modify_properties", [js.create_object(i), helpers.generateFields(i)], 10, 1, 1000);
		manipulatePropresults[i] = manipulatepropresult;
//		manipulatepropresult["size"] = i;
//		manipulatePropresults.push(manipulatepropresult);
//		
//		manipulatepropresult = callInBoth("modify_properties", ) 
	}
	
	return { create_object: createObjectresults, 
			get_properties: getPropresults,
			modify_properties: manipulatepropresult
			};
	
}

var benchmarkVariableInputFunctions = function(functionName, helperFunction){
	var results = [];
	for(var i = MIN_SIZE; i < MAX_SIZE; i = i * 10){
		var parameter = helperFunction(i);
		var result = callInBoth(functionName, [parameter], 10, 1, 1000);
		result["size"] = i;
		results.push(result);
	}
	
	return { functionName: results};
}

var benchmarkAllFunctions = function(){
	var results = {};
	results['add'] = callInBoth("add", [1,2], 10, 1, 100000000);
	results['add_empty'] = callInBoth("add_empty", [1,2], 10, 1, 100000000);
	results["sort"] = benchmarkSort().sort;
	
	var objects = benchmarkCreateObject();
	results["create_object"] = objects.create_object;
	results["get_properties"] = objects.get_properties;
	results["modify_properties"] = objects.modify_properties;
	
	return results;
}

//console.log(helpers.generateFields(1000));
//console.log(benchmarkInvaraibleinputFunctions());
//console.log(util.inspect(benchmarkSort(), {showHidden: false, depth: null}));
//console.log(util.inspect(benchmarkCreateObject(), {showHidden: false, depth: null}));

//console.log(benchmarkSort());
//console.log(benchmarkCreateObject());
//compareTimePractice();
module.exports = {
		benchmarkAllFunctions: benchmarkAllFunctions
};


