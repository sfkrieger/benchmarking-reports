/**
 *
 * HELPERS
**/

var str =  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** ----- CREATING LARGE OBJECTS/ARRAYS ------
 * 
 */

var getRand = function(min, max) {
    return Math.random() * (max - min) + min;
}

var generateArray = function(arrSize){
	var i, size = (typeof arrSize != 'undefined'? arrSize: 10000);
	var arr = [];
	for(i = 0; i < size; i++){
		arr.push(getRand(0, 19000));
	}
	
	return arr;
}

var generateFields = function(times){
	//create fields 1 - 1000 for object, and assign them a random number
	var max = (typeof times != 'undefined' ? times : 10000000);
	var object = {};
	var property, val;
	for(var i = 0; i < max; i++){
		property = Math.floor(getRand( 1, 99999)).toString();
		val = Math.floor(getRand( 1, 999999));
		console.log("Property - %s, val - %s, Object: %j", property, val, object);
		object[property] = val;
	}
	return object;
}

/**
 * ------ LOCATION AND MANIPULATION OBJECTS -------
 */
var location = function(){
	var loc = {
			"latitude" : 40.71,
			"longitude" : -74.01,
			"samples" : [
			             {
			                "date" : "2014-06-07",
			                "rainfall" : "2"
			             },
			             {
			                "date" : "2014-08-12",
			                "rainfall" : "0.5"
			             },
			             {
			                "date" : "2014-09-29",
			                "rainfall" : "1.25"
			             }
			          ]
		};
	return loc;
}

var manipulate = function(){
	var manipulate = {
			latitude: 18.0,
			value: 36.0,
			manipulatedText: "Some text",
			manipulatedValue: 1234
	};
	return manipulate;
}

module.exports = {
		generateArray: generateArray,
		generateFields: generateFields,
		manipulate: manipulate,
		location: location
};