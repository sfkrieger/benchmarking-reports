/**
 * 
 */
var benchmarking = require("./benchmarking_engine");
var fs = require('fs');
//var log = "./benchmarking/log-" + (new Date().getTime()) + ".json";
var log = "./log.json";

var output = benchmarking.benchmarkAllFunctions();
console.log(output);
fs.appendFileSync(log, (JSON.stringify(output) + "\n\n\n\n"));

//fs.writeFile(log, JSON.stringify(output));