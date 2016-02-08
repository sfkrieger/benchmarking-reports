/*
 * processing.h
 *
 *  Created on: Jan 20, 2016
 *      Author: kriegers
 */

#ifndef PROCESSING_H_
#define PROCESSING_H_

#include <vector>
#include <string>
using namespace std;
using namespace v8;

class sample;

class location {
public:
	double longitude;
	double latitude;
	vector<sample> samples;
};

class sample {
public:
  sample () {
    date = ""; rainfall = 0;
  }
  sample (string d, double r) {
    date = d;
    rainfall = r;
  }

  string date;
  double rainfall;
};

double avg_rainfall(location & loc);
double sum_coords(location &loc);
location unpack_location(Isolate * isolate, const Handle<Object> location_obj);
sample unpack_sample(Isolate * isolate, const Handle<Object> sample_obj);


#endif /* PROCESSING_H_ */
