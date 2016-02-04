/**
 * 
 */

var add = require("./js/benchmarking.js");
console.log(" ----- Cost to add -------");
var results = add.benchmarkAdd();
add.toConsole(results);


console.log(" ----- Cost for marshalling -------");
add.toConsole(add.benchmarkEmptyAdd());

console.log(" ----- Cost for sorting -------");
add.toConsole(add.benchmarkSort());

console.log(" ----- Creating the object ------")
//add.justCreate();
add.toConsole(add.benchmarkCreate());

console.log(" ----- Creating the object in JS comparison ------")
var optimization = add.benchmarkOptimization();
console.log("JS optimized: %s, JS regular time: %s, JS volley time: %s", optimization.jsregular, optimization.js, optimization.jsvolley);

//console.log("C time: %s msec", results.c);
//console.log("Nan time: %s msec", results.nan);
//console.log("JS time: %s msec", results.js);
//console.log("JS fast time: %s msec", results.jsFast);
//console.log("NAn sum: %s, time: %s msec", results.nan.result, results.nan.duration);
//console.log("JS regular sum: %s, time: %s msec", results.js.result, results.js.duration);
//console.log("JS fast sum: %s, time: %s msec", results.jsFast.result, results.jsFast.duration);
