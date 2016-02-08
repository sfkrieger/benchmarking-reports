/**
 * 
 */
var fs = require('fs');
var file = './chart_data.json';
var new_file = './restructuredResults.js';
var results = JSON.parse(fs.readFileSync(file,  "utf-8"));
//var fd = fs.openSync(file);
console.log("Here it comes! %j", results);

var graphNames;
var functions;
var restructuredResults = {
		functionNames : []
};

var get_stuff = function(){
	noTimes = Object.getOwnPropertyNames(results);
	
	//now retrieve all of functions for each tick
	
	
//	console.log("\nHeres the number of times %j\n, and the properties \n%j", noTimes, functions);
	setupFields();
	
	//for each number of times, you want to
	
	//create a row of data for each given function
	for(var i = 0; i < noTimes.length; i++){
		var curNoTimes = noTimes[i];
		var noTimesObj = results[curNoTimes]; //this is the object at eg. 1000
		
		for(var fnIndex = 0; fnIndex < functions.length; fnIndex++){
			var dataRow = [parseInt(curNoTimes)];
			var fnName = functions[fnIndex];
			
			//get the object at this time associated with this function (if it exists)
			var fnObj = noTimesObj[fnName];
			
			if(typeof fnObj != 'undefined'){ //fn exists at this nubmer of times, now use the modules that this function has
				var fnModules = restructuredResults[fnName].modules;
				
				//use these modules to add retrieve the data from the results object in the same order
				for(var moduleNumber = 0; moduleNumber < fnModules.length; moduleNumber++){
					var duration = fnObj[fnModules[moduleNumber]].duration;
					dataRow.push(duration);
				}
				
				console.log("Here's the data row \n%j associated with %s function at %s number of times", dataRow, fnName, curNoTimes);
				//add all the functions data to the row
				restructuredResults[functions[fnIndex]].data.push(dataRow);
			}
		}
	}
	
	console.log("Heres all the restructured results loooll: %j", restructuredResults);
	writeRestructuredResToFile();
};

var setupFields = function(){
	var firstObject = results[Object.keys(results)[0]];
	functions = Object.getOwnPropertyNames(firstObject);
	
	//for each function 
	//create it as an object (1) find out what the modules are
	for(var i = 0; i < functions.length; i++){
		var fn_name = functions[i];
		var displayName = capitalizeFirstLetter(fn_name);
		var fn_obj = firstObject[functions[i]];
		var modules = Object.getOwnPropertyNames(fn_obj);
		
		restructuredResults[fn_name] = {
				"modules" : modules,
				"displayName": displayName,
				"data": []
		};
		restructuredResults.functionNames.push(fn_name);
	}
	
	console.log("\nHere's the restructured results %j", restructuredResults);
	

};

var writeRestructuredResToFile = function(){
	fs.writeFileSync(new_file, "var results = " + JSON.stringify(restructuredResults));

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

get_stuff();