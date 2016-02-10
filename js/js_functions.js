/**
 * 
 */

var str =  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//========= JS ADD FUNCTIONS ===========
var add_js = function(a, b){
	return a + b;
}

var add = function(a, b){
	var first = a;
	var second = b;
	
	var sum = first + second;
	return sum;
}

var add_empty = function(a, b){
	return;
}

/**
 * 
 */
//========= JS SORT FUNCTIONS ===========

var compare = function(first, second)
{
    if (first == second)
        return 0;
    if (first < second)
        return -1;
    else
        return 1; 
}

var sort = function(arr){
	var otherArr = [];
	for(var i = 0; i < arr.length; i++)
		otherArr[i] = arr[i];
	otherArr.sort(compare);
	return otherArr;
}

/**
 * 
 */
//========= JS CREATE FUNCTIONS ===========

var create_object = function(size){
	var obj = {};
	for(var i = 0; i < size; i++){
		obj[i.toString()] = i;
	}
	
	return obj;
}

var create_object_bad = function(size){
	var object = {};
	for(var i = 0; i < size; i++){
		var propName;
		var val = i;
		for(var index = 100; index > 0; index = index / 10){
			var intati = Math.floor(val / index);
			propName = propName + intati.toString();
			val = val % index;
		}
		object[propName] = i;
	}
	
	return object;
}

//double size = args[0]->NumberValue();
//for (int i = 0; i < size; i++) {
//	char numbers[4];
//	numbers[3] = '\0';
//	int buffIndex = 0;
//	int val = i;
//	for (int index = 100; index > 0; index = index / 10) {
//		int intati = val / index;
//		numbers[buffIndex] = '0' + intati;
////		printf("%i:%c\t", i, numbers[buffIndex]);
//		buffIndex++;
//		val = val % index;
//	}
////	printf("\nHeres the buffer at the end %s\n", numbers);
//	//	char *p = alphanum + i;
//		obj->CreateDataProperty(context, String::NewFromUtf8(isolate, numbers),
//				Number::New(isolate, i));
//
//}

var create_object_substring = function(){
	var obj = {};
	for(var i = 0; i < 50 ; i++){
		var propName = str.substring(i, 63);
		obj[propName] = i;
	}
	
	return obj;
}

var create_object_passing_substring = function(){
	var obj = {};
	for(var i = 0; i < 50 ; i++){
		if(i % 2 == 0){
			var propName = str.substring(i, 63);
			obj[propName] = i;
		}else{
			volley(obj, i);
		}
	}
	
	return obj;
}

var volley = function(obj, i){
	var propName = str.substring(i, 63);
	obj[propName] = i;
}

var create_object_pcompare_substring = function(){
	var obj = {};
	for(var i = 0; i < 50 ; i++){
		if(i < 100){
			var propName = str.substring(i, 63);
			obj[propName] = i;
		}
		
		if(i % 2 != 0)
			doNothin();
	}
	
	return obj;
}

var doNothin = function(){
	return;
}

/**
 * 
 */
//========= JS GET PROPERTY FUNCTIONS ===========

var get_properties = function(obj){
	var props = Object.getOwnPropertyNames(obj);
	for(var i = 0; i < props.length; i++){
		var property = props[i];
//		console.log(property);
	}
	return;
}
//
//var modify_properties = function(target, manipulations){
//	var props = Object.getOwnPropertyNames(manipulations);
//	
//	for(var i = 0; i < props.length; i++){
//		target[props[i]] = manipulations[props[i]];
//	}
//	
//	return target;
//}

/**
 * 
 */
//========= JS MODIFY PROPERTY FUNCTIONS ===========
var modify_properties = function(source, manipulations){
	var i;
	var manipProps = Object.getOwnPropertyNames(manipulations);
	for(i = 0; i < manipProps.length; i++ ){
		var propname = manipProps[i];
		var propval = manipulations[propname];
		
		source[propname] = propval;
	}
	
	return source;
}

module.exports = {
		add_js : add_js,
		add : add,
		add_empty : add_empty,
		sort: sort,
		create_object: create_object,
		get_properties: get_properties,
//		create_object_pcompare: create_object_pcompare,
//		create_object_passing: create_object_passing,
		modify_properties: modify_properties
};