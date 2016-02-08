#include <node.h>
#include <v8.h>
#include <iostream>

#include "../../cpp_objects/cpp/processing.h"

using namespace v8;

void Method(const v8::FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void SumCoords(const v8::FunctionCallbackInfo<v8::Value>& args) {
  Isolate* isolate = args.GetIsolate();

  location loc = unpack_location(isolate, Handle<Object>::Cast(args[0]));
  double sum = sum_coords(loc);

  Local<Number> retval = v8::Number::New(isolate, sum);
  args.GetReturnValue().Set(retval);
}

void AvgRainfall(const v8::FunctionCallbackInfo<v8::Value>& args) {
  Isolate* isolate = args.GetIsolate();

  location loc = unpack_location(isolate, Handle<Object>::Cast(args[0]));
  double avg = avg_rainfall(loc);

  Local<Number> retval = v8::Number::New(isolate, avg);
  args.GetReturnValue().Set(retval);
}

void ChangeLat(const v8::FunctionCallbackInfo<v8::Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Handle<Object> location = Handle<Object>::Cast(args[0]);
  Local<Value> newLat = Number::New(isolate, 18.4);

//  location->Set(String::NewFromUtf8(isolate, "latitude"), v8::Number(isolate,  18.0));
  location->Set(String::NewFromUtf8(isolate, "newField"), String::NewFromUtf8(isolate, "value"));
  location->Set(String::NewFromUtf8(isolate, "latitude"), newLat);

  Handle<Value> lat_value = location->Get(String::NewFromUtf8(isolate,"latitude"));
  double val = lat_value->NumberValue();
  std::cout << val << std::endl;

}

void GetProperties(const v8::FunctionCallbackInfo<v8::Value>& args){
	Handle<Object> location = Handle<Object>::Cast(args[0]);
	Local<Array> names = location->GetOwnPropertyNames();

	int len = 0;
	if (names->IsArray()) {
	    len = names->Length();
	    printf("length %u\n", len);
	}

	for (int i = 0; i < len; i++) {
	    Local<Object> propName = Local<Object>::Cast(names->Get(i));
	    Local<String> result = propName->ToString();
	    String::Utf8Value utf8(result);
	    printf("%s\n", *utf8);
	}
}

void ManipulateProperties(const v8::FunctionCallbackInfo<v8::Value>& args){
	Handle<Object> locationObject = Handle<Object>::Cast(args[0]);
	Handle<Object> manipulations = Handle<Object>::Cast(args[1]);
	Handle<Array> names = Handle<Array>::Cast(args[2]);
	int len = names->Length();
    printf("length %u\n", len);

    //iterate through the properties in the array
    //for each property:
    //if its in both, then manipulate
	for (int i = 0; i < len; i++) {

		locationObject->Set(manipulations->Get(i), manipulations->Get(i));
	}
}

void ManipulatePropertiesSimple(const v8::FunctionCallbackInfo<v8::Value>& args){
	Handle<Object> locationObject = Handle<Object>::Cast(args[0]);
	Handle<Object> manipulations = Handle<Object>::Cast(args[1]);
	Local<Array> names = manipulations->GetOwnPropertyNames();
	  // We will be creating temporary handles so we use a handle scope.
	//iterate through the properties in the array
    //if its in both, then manipulate
	for (int i = 0; i < names->Length(); i++) {
	    Local<String> propValue = Local<String>::Cast(manipulations->Get(names->Get(i)));
	    Local<Value> propName = manipulations->Get(names->Get(i));

//	    just try getting the property using the v8 constructs
	    locationObject->Set(names->Get(i), propValue);

		args.GetReturnValue().Set(manipulations->Get(names->Get(i)));
//	    std::cout << "This is the property name (fingers crossed): " << std::endl;
//	    std::cout << v8::String::Utf8Value(propStr) << std::endl;

	}

}

void Init(Handle<Object> exports) {
  Isolate* isolate = Isolate::GetCurrent();
  exports->Set(String::NewFromUtf8(isolate, "hello"),
      FunctionTemplate::New(isolate, Method)->GetFunction());

  NODE_SET_METHOD(exports, "sum_coords", SumCoords);
  NODE_SET_METHOD(exports, "avg_rainfall", AvgRainfall);
  NODE_SET_METHOD(exports, "change_coord", ChangeLat);
  NODE_SET_METHOD(exports, "get_properties", GetProperties);
  NODE_SET_METHOD(exports, "change_properties", ManipulatePropertiesSimple);


}

NODE_MODULE(object_manipulation, Init)
