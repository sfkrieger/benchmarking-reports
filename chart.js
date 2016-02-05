/**
 * 
 */


var drawGoogleChart = function(fnName, fnObject){
	var data = new google.visualization.DataTable();
    data.addColumn('number', 'Day');
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');

    data.addRows([
      [1,  37.8, 80.8, 41.8],
      [2,  30.9, 69.5, 32.4],
      [3,  25.4,   57, 25.7],
      [4,  11.7, 18.8, 10.5],
      [5,  11.9, 17.6, 10.4],
      [6,   8.8, 13.6,  7.7],
      [7,   7.6, 12.3,  9.6],
      [8,  12.3, 29.2, 10.6],
      [9,  16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11,  5.3,  7.9,  4.7],
      [12,  6.6,  8.4,  5.2],
      [13,  4.8,  6.3,  3.6],
      [14,  4.2,  6.2,  3.4]
    ]);

    var options = {
      chart: {
        title: 'Box Office Earnings in First Two Weeks of Opening',
        subtitle: 'in millions of dollars (USD)'
      },
      width: 900,
      height: 500
    };
    
    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, options);
}

var createDOMElements = function(){
	for(var fnNameIndex = 0; fnNameIndex < results.functionNames.length; fnNameIndex++){
//		var fnName = results.functionNames[fnNameIndex];
//		console.log("Function name: %s", fnName)
//	    var div = document.createElement('div');
//	    div.setAttribute("id", fnName);
//	    div.setAttribute("style", "width: 900px; height: 500px");

	}

}

var drawChart = function(fnName, fnObj){
	console.log("Object!", fnObj);
	var data = new google.visualization.DataTable();
	var modules = fnObj.modules;
	console.log(modules);
	
	data.addColumn('number', 'Time (in msec)');
	for(var i = 0; i < modules.length; i++){
//		console.log("Module!" + fnObj.modules[i]);
		data.addColumn('number', fnObj.modules[i]);
	}

//	data.addColumn('number', 'Day');
//    data.addColumn('number', 'Guardians of the Galaxy');
//    data.addColumn('number', 'The Avengers');
//    data.addColumn('number', 'Transformers: Age of Extinction');

	data.addRows(fnObj.data)
//    data.addRows([
//      [1,  37.8, 80.8, 41.8],
//      [2,  30.9, 69.5, 32.4],
//      [3,  25.4,   57, 25.7],
//      [4,  11.7, 18.8, 10.5],
//      [5,  11.9, 17.6, 10.4],
//      [6,   8.8, 13.6,  7.7],
//      [7,   7.6, 12.3,  9.6],
//      [8,  12.3, 29.2, 10.6],
//      [9,  16.9, 42.9, 14.8],
//      [10, 12.8, 30.9, 11.6],
//      [11,  5.3,  7.9,  4.7],
//      [12,  6.6,  8.4,  5.2],
//      [13,  4.8,  6.3,  3.6],
//      [14,  4.2,  6.2,  3.4]
//    ]);

    var options = {
      chart: {
        title: 'Time Differences for ' + fnObj.displayName + " Function",
        subtitle: 'in msec'
      },
      width: 900,
      height: 500
    };

    var chart = new google.charts.Line(document.getElementById(fnName));

    chart.draw(data, options);
}

var drawCharts = function() {
//	drawGoogleChart();
	var fnNames = results.functionNames;
	for(var fnNameIndex = 0; fnNameIndex < fnNames.length; fnNameIndex++){
		drawChart(fnNames[fnNameIndex], results[fnNames[fnNameIndex]]);
		
	}
}
		