/**
 * 
 */
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

module.exports = {
		add_js : add_js,
		add : add,
		add_empty : add_empty,
};