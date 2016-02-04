/**
 * 
 */
//========= JS ADD FUNCTIONS ===========
addJS = function(a, b){
	return a + b;
}

addTemp = function(a, b){
	var first = a;
	var second = b;
	
	var sum = first + second;
	return sum;
}

add_empty = function(a, b){
	return;
}

module.exports = {
		addJS : addJS,
		addTemp : addTemp,
		add_empty : add_empty,
};