/**
 * This files generates the rainfall data
 */
var getRand = function(min, max) {
    return Math.random() * (max - min) + min;
}

//create an array of objects
//each has a field rainfall

var generateSamples = function(){
	var samples = [];
	for(var i = 0; i < 100; i++){
		var obj = {
				rainfall: getRand(0, 15)
		}
		samples.push(obj);
	}
	return samples;
}

var calculateSum = function(samples){
	var sum = 0;
	
	for(var i = 0; i < samples.length; i++ ){
		sum = sum + samples[i].rainfall;
	}
	
	return sum/samples.length;
}

var intersection = function(location, manipulate){
	var index;
	var fields = Object.getOwnPropertyNames(location);
	var manFields = Object.getOwnPropertyNames(manipulate);
//	console.log("Here are the fields: " + fields);
	for(index = 0; index < manFields.length; index++){
//		console.log(manFields[index]);
		if(fields.indexOf(manFields[index]) == -1){
			fields.pcanush(manFields[index]);
//			console.log("Here we just added a field " + fields);
		}
	}
	
	return fields;

}

var mutateObj = function(source, manipulations){
	var i;
	var manipProps = Object.getOwnPropertyNames(manipulations);
	for(i = 0; i < manipProps.length; i++ ){
		var propname = manipProps[i];
		var propval = manipulations[propname];
		
		source[propname] = propval;
	}
}

var generateFields = function(times, object){
	//create fields 1 - 1000 for object, and assign them a random number
	var max = (typeof times != 'undefined' ? times : 10000000);
	var object = (typeof object != 'undefined' ? object : {});
	var i = 0;
	while( i < max ){
		object[i] = getRand(1, 500);
		i++;
	}
	return object;
}

module.exports = {
		mutateObj: mutateObj,
		intersection: intersection,
		calculateSum : calculateSum,
		generateSamples : generateSamples,
		generateFields : generateFields,
};