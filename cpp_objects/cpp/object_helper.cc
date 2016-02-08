/*
 * hello-helper.cc
 *
 *  Created on: Jan 28, 2016
 *      Author: kriegers
 */

#include <node.h>
#include <v8.h>

#include "../../cpp_objects/cpp/processing.h"

using namespace v8;

double sum_coords(location &loc)
{
	return loc.latitude + loc.longitude;
}

sample unpack_sample(Isolate * isolate, const Handle<Object> sample_obj) {
  sample s;
  Handle<Value> date_Value = sample_obj->Get(String::NewFromUtf8(isolate, "date"));
  Handle<Value> rainfall_Value = sample_obj->Get(String::NewFromUtf8(isolate, "rainfall"));

  v8::String::Utf8Value utfValue(date_Value);
  s.date = std::string(*utfValue);

  // Unpack the numeric rainfall amount directly from V8 value
  s.rainfall = rainfall_Value->NumberValue();
  return s;
}

location unpack_location(Isolate * isolate, const Handle<Object> location_obj) {
  location loc;

  Handle<Value> lat_Value = location_obj->Get(String::NewFromUtf8(isolate,"latitude"));
  Handle<Value> lon_Value = location_obj->Get(String::NewFromUtf8(isolate,"longitude"));
  loc.latitude = lat_Value->NumberValue();
  loc.longitude = lon_Value->NumberValue();

  Handle<Array> array = Handle<Array>::Cast(location_obj->Get(String::NewFromUtf8(isolate,"samples")));
  int sample_count = array->Length();
  for ( int i = 0; i < sample_count; i++ ) {
    sample s = unpack_sample(isolate, Handle<Object>::Cast(array->Get(i)));
    loc.samples.push_back(s);
  }
  return loc;
}

double avg_rainfall(location & loc) {
  double total = 0;
  for (const auto &sample : loc.samples) {
    total += sample.rainfall;
  }
  return total / loc.samples.size();
}
