/**
 * 
 */

var drawGoogleChart = function(fnName, fnObject) {
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Day');
	data.addColumn('number', 'Guardians of the Galaxy');
	data.addColumn('number', 'The Avengers');
	data.addColumn('number', 'Transformers: Age of Extinction');

	data.addRows([ [ 1, 37.8, 80.8, 41.8 ], [ 2, 30.9, 69.5, 32.4 ],
			[ 3, 25.4, 57, 25.7 ], [ 4, 11.7, 18.8, 10.5 ],
			[ 5, 11.9, 17.6, 10.4 ], [ 6, 8.8, 13.6, 7.7 ],
			[ 7, 7.6, 12.3, 9.6 ], [ 8, 12.3, 29.2, 10.6 ],
			[ 9, 16.9, 42.9, 14.8 ], [ 10, 12.8, 30.9, 11.6 ],
			[ 11, 5.3, 7.9, 4.7 ], [ 12, 6.6, 8.4, 5.2 ],
			[ 13, 4.8, 6.3, 3.6 ], [ 14, 4.2, 6.2, 3.4 ] ]);

	var options = {
		chart : {
			title : 'Box Office Earnings in First Two Weeks of Opening',
			subtitle : 'in millions of dollars (USD)'
		},
		width : 900,
		height : 500
	};

	var chart = new google.charts.Line(document
			.getElementById('linechart_material'));

	chart.draw(data, options);
}

var createDOMElements = function() {
	for (var fnNameIndex = 0; fnNameIndex < results.functionNames.length; fnNameIndex++) {
		// var fnName = results.functionNames[fnNameIndex];
		// console.log("Function name: %s", fnName)
		// var div = document.createElement('div');
		// div.setAttribute("id", fnName);
		// div.setAttribute("style", "width: 900px; height: 500px");

	}
}

var drawBoxPlot = function() {

    var array = [
      ['a', 100, 90, 110, 85, 96, 104, 120],
      ['b', 120, 95, 130, 90, 113, 124, 140],
      ['c', 130, 105, 140, 100, 117, 133, 139],
      ['d', 90, 85, 95, 85, 88, 92, 95],
      ['e', 70, 74, 63, 67, 69, 70, 72],
      ['f', 30, 39, 22, 21, 28, 34, 40],
      ['g', 80, 77, 83, 70, 77, 85, 90],
      ['h', 100, 90, 110, 85, 95, 102, 110]
    ];

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'x');
    data.addColumn('number', 'values');
    data.addColumn('number', 'series1');
    data.addColumn('number', 'series2');
    data.addColumn('number', 'series3');
    data.addColumn('number', 'series4');
    data.addColumn('number', 'series5');
    data.addColumn('number', 'series6');

    data.addColumn({id:'max', type:'number', role:'interval'});
    data.addColumn({id:'min', type:'number', role:'interval'});
    data.addColumn({id:'firstQuartile', type:'number', role:'interval'});
    data.addColumn({id:'median', type:'number', role:'interval'});
    data.addColumn({id:'thirdQuartile', type:'number', role:'interval'});


    data.addRows(array);

    /**
     * Takes an array of input data and returns an
     * array of the input data with the box plot
     * interval data appended to each row.
     */
    function getBoxPlotValues(array) {

      for (var i = 0; i < array.length; i++) {
    	var arrSize = array[i].length - 1;
    	console.log(arrSize);
        var arr = array[i].slice(1).sort(function (a, b) {
          return a - b;
        });

        var max = arr[arr.length - 1];
        var min = arr[0];
        var median = getMedian(arr);

        // First Quartile is the median from lowest to overall median.
        var firstQuartile = getMedian(arr.slice(0, 4));

        // Third Quartile is the median from the overall median to the highest.
        var thirdQuartile = getMedian(arr.slice(3));

//        arr[i].push(max);
//        arr[i].push(min);
//        arr[i].push(firstQuartile);
//        arr[i].push(median);
//        arr[i].push(thirdQuartile);
        array[i][arrSize] = max;
        array[i][++arrSize] = min
        array[i][++arrSize] = firstQuartile;
        array[i][++arrSize] = median;
        array[i][++arrSize] = thirdQuartile;
      }
      return array;
    }

    /*
     * Takes an array and returns
     * the median value.
     */
    function getMedian(array) {
      var length = array.length;

      /* If the array is an even length the
       * median is the average of the two
       * middle-most values. Otherwise the
       * median is the middle-most value.
       */
      if (length % 2 === 0) {
        var midUpper = length / 2;
        var midLower = midUpper - 1;

        return (array[midUpper] + array[midLower]) / 2;
      } else {
        return array[Math.floor(length / 2)];
      }
    }

    var options = {
        title:'Box Plot',
        height: 500,
        legend: {position: 'none'},
        hAxis: {
          gridlines: {color: '#fff'}
        },
        lineWidth: 0,
        series: [{'color': '#D3362D'}],
        intervals: {
          barWidth: 1,
          boxWidth: 1,
          lineWidth: 2,
          style: 'boxes'
        },
        interval: {
          max: {
            style: 'bars',
            fillOpacity: 1,
            color: '#777'
          },
          min: {
            style: 'bars',
            fillOpacity: 1,
            color: '#777'
          }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('box_plot'));

    chart.draw(data, options);
  }

var drawChartOld = function(fnName, fnObj, isCandlestick) {
	console.log("Object!", fnObj);
	var data = new google.visualization.DataTable();
	var modules = fnObj.modules;
	console.log(modules);

	data.addColumn('number', 'Number of iterations');
	for (var i = 0; i < modules.length; i++) {
		// console.log("Module!" + fnObj.modules[i]);
		data.addColumn('number', fnObj.modules[i]);
	}

	data.addRows(fnObj.data);

	var options = {
		chart : {
			title : 'Time Differences for ' + fnObj.displayName + " Function",
			subtitle : 'in nanosec'
		},
		width : 900,
		height : 500
	};

	var chart = new google.charts.Line(document.getElementById(fnName));

	chart.draw(data, options);
}

var getCandlestickOptions = function(fnObj){
	var options, chart, data;

	options = {
			title : 'Time Differences for '+ fnObj.displayName,
			curveType : 'function',
			lineWidth : 4,
			series : [ {
				'color' : '#D3362D'
			} ],
			interval : {
				'style' : 'bars'
			},
			hAxis: {
				'scaleType': 'log',
			},
			vAxis: {
				'scaleType': 'log'
			},
			'legend' : 'none'
		};
	
//	var ticks = [];
//	for(var i = 0; i < fnObj.data.length; i++)
//		ticks.push(fnObj.data[i].0);
	var colour = (fnObj.display_name.charAt(0) == 'C' ? "blue" : "pink");
	
    var options_lines = {
            title: "Time Differences for " + fnObj.display_name,
            curveType: 'function',
            lineWidth: 4,
            colors: [colour],
            intervals: { 'style':'bars' },
            vAxis: {scaleType: 'log', title: "Time (in microseconds)"},
            hAxis: {scaleType: 'log', title: "Object Size (in elements/properties)"},

            legend: 'none'
        };
	
	return options_lines; 
};

var getRegularOptions = function(fnObj){
	var options = {
			// chart: {
			title : 'Time Differences for ' + fnObj.display_name,
			// subtitle: 'in msec',
			// },
			width : 900,
			height : 500,
			hAxis : {
				 title: "Number of Iterations",
				slantedText : true,
				slantedTextAngle : 90
			},
			vAxis : {
				title : 'Time (in microseconds)',
				baseline : 0.001,
				scaleType : 'log',
//				ticks : [ .01, .1, 1, 10, 100, 1000 ]
			}
		};
	
	return options;
}

var getCandlestickData = function(fnObj){
	data = new google.visualization.DataTable();
	data.addColumn('number', 'x');
	data.addColumn('number', 'Value');
	console
			.log(
					"For the fnObj %j object, the length of the data rows (i.e number of columns) is %s",
					fnObj.data[0].length);
	for (var noCols = 1; noCols < (fnObj.data[0].length -1 ); noCols++){
		data.addColumn({
			type : 'number',
			role : 'interval'
		});
	}

	data.addRows(fnObj.data);
	console.log("heres the data %j", data);
	return data;

}
var drawChart = function(fnName, fnObj, isCandlestick) {
	// var data = google.visualization.arrayToDataTable(fnObj.data);

	var options, chart, data;

	if (isCandlestick == 'candlestick') {
		options = getCandlestickOptions(fnObj);
		data = getCandlestickData(fnObj);
	} else {
		options = getRegularOptions(fnObj);
		data = new google.visualization.arrayToDataTable(fnObj.data);
	}

	chart = new google.visualization.LineChart(document.getElementById(fnName));
	chart.draw(data, options);
}

var drawCharts = function() {
	// drawGoogleChart();
//	drawBoxPlot();
	var fnNames = results.functionNames;
	var candlesticks = results.candlesticks;

	for (var fnNameIndex = 0; fnNameIndex < fnNames.length; fnNameIndex++) {
		drawChart(fnNames[fnNameIndex], results[fnNames[fnNameIndex]]);

	}

	for (var fnNameIndex = 0; fnNameIndex < candlesticks.length; fnNameIndex++) {
		console.log("Here's the object going to pass in: %j",
				results[candlesticks[fnNameIndex]]);
		drawChart(candlesticks[fnNameIndex],
				results[candlesticks[fnNameIndex]], "candlestick");

	}
}
