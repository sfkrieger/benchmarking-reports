/**
 * 
 */
var util = require('util');
var benchmarking = require("../benchmarking/benchmarking_engine");
//var output = benchmarking.benchmarkAllFunctions();

var fs = require('fs');
var file = "./charting/log.json"
var new_file = './charting/restructuredResults.js';
var fnsSoFar = ["add","add_empty", "modify_properties"];
var candlestickFns = ["sort_c","sort_js", "create_object_c", "create_object_js", "get_properties_c", "get_properties_js"];
var output = JSON.parse(fs.readFileSync(file,  "utf-8"));

var getAddResults = function(whichAdd){
	var results = output[whichAdd];
	var displayName;
	if(whichAdd == 'add')
		displayName = "Add";
	else if(whichAdd == 'add_empty')
		displayName = "Add Empty";
	else if(whichAdd == 'modify_properties')
		displayName = 'Manipulate Properties';
	
	displayName = displayName + " Function";
//	var displayName = (whichAdd == 'add' ? 'Add Function' : 'Add Empty Function');
	var data = [['Iteration Count', 'C', 'Javascipt']];
	var iterationArr = Object.getOwnPropertyNames(results.c); 
	
	for(var i = 0; i < iterationArr.length; i++){
		var iterationNumber = iterationArr[i];
		var dataRow = [iterationNumber];
//		console.log("\n\nHere are the results for %s: %j\nThis is the iterationNumber %s\nThis is the mean for C - %s, and this is the mean for JS - %s", 
//				whichAdd, results, iterationNumber, results.c[iterationNumber], results.js[iterationNumber]);
		dataRow.push(results.c[iterationNumber].mean);
		dataRow.push(results.js[iterationNumber].mean);
		data.push(dataRow);
	}
	
	return { display_name : displayName , 
						data: data
						};

//	var toFile = "\nvar " + whichAdd + " = " + JSON.stringify(addVariable);
//	fs.appendFileSync(new_file, toFile);
};

var getVariableInputResults = function(whichFunction){
	var results = output[whichFunction];
	var displayName;
	var c = {};
	var js = {};
	console.log("\n\n%s function\n-----------", whichFunction);
	if(whichFunction == 'sort')
		displayName = "Sort";
	else if(whichFunction == 'create_object')
		displayName = "Create Object";
	else if(whichFunction == 'get_properties')
		displayName = 'Get Properties';

	displayName = displayName + " Function";
	
	var sizes = Object.getOwnPropertyNames(results); 
	var firstRow = ['Input Size'];
	firstRow.push.apply(firstRow, sizes);

	//just need to get all the info for doing the operation on a single input (to initialize everything)
	var perSizeObj = results[sizes[0]].c; //arbitrarily choosing c
	var iterationArr = Object.getOwnPropertyNames(perSizeObj);

	
		console.log("Here's the first row of the candlestick arrays: %j, the first element of the sort for c: %j, and the number of different " +
				"iterations %j.", firstRow, perSizeObj, iterationArr);

	var c_data = [];
	var js_data = [];
	
	for(var i = 0; i < sizes.length; i++){
		var iterationN = parseInt(sizes[i]);
		var c_results = results[sizes[i]].c;
		var js_results = results[sizes[i]].js;
		
		var c_data_row = [iterationN];
		var js_data_row = [iterationN];
		
		for(var iterationCountIndex = 0; iterationCountIndex < iterationArr.length; iterationCountIndex++){
			c_data_row.push(c_results[iterationArr[iterationCountIndex]].mean);
			js_data_row.push(js_results[iterationArr[iterationCountIndex]].mean);
		}
		
		console.log("---Size %s---\nHere's the current row for c: %j\nHeres the current row for js: %j", sizes[i], c_data_row, js_data_row);
		c_data.push(c_data_row);
		js_data.push(js_data_row);
		
	}
	
	var c_result_obj = {
			display_name: "C " + displayName,
			data: c_data
	};
	
	var js_result_obj = {
			display_name: "JS " + displayName,
			data: js_data
	};
	
	var toRet = { 
			"c": c_result_obj,
			"js": js_result_obj
		};
	console.log(toRet);
	return toRet;
};

var getRestructuredResults = function(){
	var results = { 
			"functionNames" : fnsSoFar,
			"candlesticks" : candlestickFns
			};
	
	results["add"] = getAddResults("add");
	results["add_empty"] = getAddResults("add_empty");
	results["modify_properties"] = getAddResults("modify_properties");
	
	var sort = getVariableInputResults("sort");
	results["sort_c"] = sort.c;
	results["sort_js"] = sort.js;

	var create_object = getVariableInputResults("create_object");
	results["create_object_c"] = create_object.c;
	results["create_object_js"] = create_object.js;
	
	var get_properties = getVariableInputResults("get_properties");
	results["get_properties_c"] = get_properties.c;
	results["get_properties_js"] = get_properties.js;

	var toFile = "var results = " + JSON.stringify(results);
	console.log(util.inspect(results, false, null));
	fs.writeFile(new_file, toFile); //to reset the file

};

getRestructuredResults();
