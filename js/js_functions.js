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
	arr.sort(compare);
}

/**
 * 
 */
//========= JS CREATE FUNCTIONS ===========

var create_object = function(){
	var obj = {};
	for(var i = 0; i < 50 ; i++){
		var propName = str.substring(i, 63);
		obj[propName] = i;
	}
	
	return obj;
}

var create_object_passing = function(){
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

var create_object_pcompare = function(){
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
		create_object_pcompare: create_object_pcompare,
		create_object_passing: create_object_passing,
		modify_properties: modify_properties
};