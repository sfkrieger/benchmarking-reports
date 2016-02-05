/**
 * 
 */

var fs = require('fs');
var file = './chart_data.json';
//var fd = fs.openSync(file);
//var variable = [];
//
//for(var i = 0; i < 10; i++){
//	variable[i] = i;
//	fs.appendFileSync(file, JSON.stringify(variable));
//
//}
var engine_wrapper = require("./js/engine_wrapper");
engine_wrapper.outputEverything();
engine_wrapper("Here's the results from the sort: %j", engine_wrapper.callTailoredObjectFunctions());
//engine_wrapper.writeResults(engine_wrapper.add(), "add");
//engine_wrapper.writeResults(engine_wrapper.add(), "add");

