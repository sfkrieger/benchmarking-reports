/**
 * 
 */
var js_functions = require("./js_functions");
var helpers = require("./helpers");

module.exports = {
		add : js_functions.add,
		add_empty : js_functions.add_empty,
		generateArray: helpers.generateArray,
		sort: js_functions.sort,
		create_object: js_functions.create_object,
		get_properties: js_functions.get_properties,
		modify_properties: js_functions.modify_properties
}