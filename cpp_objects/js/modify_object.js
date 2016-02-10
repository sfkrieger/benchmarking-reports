var addon = require('../cpp/build/Debug/object_manipulation');
var helper = require('./modify_object_helpers.js');
var constants = require('./constants.js');
var locationf = constants.location;
var manipulatef = constants.manipulate;
var manipulate = constants.manipulate();
var location = constants.location();

var changeProperties = function(){
	var location = locationf();
	var manipulate = manipulatef();
//	location.samples = helper.generateSamples();
	console.log("Here's the location object BEFORE %j", location);
	addon.change_properties(location, manipulate);
	console.log("Here the new field should hopefully have changed - this is its value");
	console.log(location.newField + " " + location.latitude);
	console.log("Here's the location object %j", location);

}

var hello = function(){
	console.log(addon.hello()); // 'world'
}

var sumProperties = function(){
	location.samples = helper.generateSamples();
	console.log("Here's the sum of the lat long: " + addon.sum_coords(location)); // 'world'
	console.log("Here I'm calling change lat function:");
	addon.change_coord(location);

}

var getProperties = function(){
	addon.get_properties(location); 
}


var benchmarkSum = function(){
	location.samples = helper.generateSamples();
	
	var start = Date.now();
	var c_result = addon.avg_rainfall(location);
	var duration = Date.now() - start;
	console.log("Here's the average rainfall data from C: " + c_result + ". It took " + duration + " msec."); // 'world'

	start = Date.now();
	var jsResult = helper.calculateSum(location.samples);
	duration = Date.now() - start;
	console.log("Here's the average rainfall data from JS: " + jsResult + ". It took " + duration + " msec."); // 'world'	
}

var benchmarkObjModsOld = function(noTimes){
	var start = Date.now();
	var c_result = addon.change_properties(location, helper.generateFields(noTimes));
	var duration = Date.now() - start;
//	cArray.push(duration);
//	console.log("Here's the mutatated object from C: %j. It took " + duration + " msec.", location); // 'world'
//	console.log("Here's the mutatated object from C: %j. It took " + duration + " msec.", location); // 'world'
	console.log("C mutation took " + duration + " msec."); // 'world'
	
	
	start = Date.now();
	var jsResult = helper.mutateObj(location, helper.generateFields(noTimes));
	duration = Date.now() - start;
	console.log("JS mutation took " + duration + " msec."); // 'world'
}

var benchmarkObjMods = function(noTimes, cArray, jsArray){
	reset();
	var start = Date.now();
	var c_result = addon.change_properties(location, helper.generateFields(noTimes));
	var duration = Date.now() - start;
	cArray.push(duration);
//	console.log("Here's the mutatated object from C: %j. It took " + duration + " msec.", location); // 'world'
//	console.log("Here's the mutatated object from C: %j. It took " + duration + " msec.", location); // 'world'
	console.log("C mutation took " + duration + " msec."); // 'world'
	
	
	start = Date.now();
	var jsResult = helper.mutateObj(location, helper.generateFields(noTimes));
	duration = Date.now() - start;
	console.log("JS mutation took " + duration + " msec."); // 'world'
	jsArray.push(duration);
}

var benchmarkObjModsIncremental = function(){
	var i;
	var cArr = [];
	var jsArr = [];
	var output = [];
	
	//call benchmark that many times
	for(i = 1; i < 100000000; i = i * 10){
		benchmarkObjMods(i, cArr, jsArr);
		output.push(i);
	}
	
	for(i = 0; i < cArr.length; i++){
		var manipulations = 
		console.log("%s manipulation -- C: %s msec and Js: %s msec", output[i], cArr[i], jsArr[i]);
	}
}


module.exports = {
		benchmarkObjMods: benchmarkObjMods,
		benchmarkSum: benchmarkSum,
		getProperties: getProperties,
		sumProperties: sumProperties,
		hello: hello,
		changeProperties: changeProperties,
		manipulate: manipulate,
		location: location,
		benchmarkObjModsIncremental : benchmarkObjModsIncremental
};

/**
 * THis worked when I passed a complex json but didn't rebuild, so it would just ignore
 * the other properties within the json... good to know
 */


