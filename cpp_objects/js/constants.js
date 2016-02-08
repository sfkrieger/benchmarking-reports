/**
 * 
 */

var location = function(){
	var location = {
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
	return location;
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

module.exports {
	manipulate: manipulate,
	reset: reset,
	location: location
}