#include <node.h>
#include <vector>
#include <stdlib.h>
#include <iostream>
#include <string>

using namespace std;
using namespace v8;
static char alphanum[] =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//static const char supercal[] =
//		"supercalafragilisticexpealidotiouseventhoughthesoundofthisis";

int compare (const void * a, const void * b)
{
  if (*(double*)a > *(double*)b) return 1;
  else if (*(double*)a < *(double*)b) return -1;
  else return 0;
}

void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (args.Length() < 2) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }

  double value = args[0]->NumberValue() + args[1]->NumberValue();
  Local<Number> num = Number::New(isolate, value);

  args.GetReturnValue().Set(num);
}


void AddEmpty(const FunctionCallbackInfo<Value>& args) {
	return;
}

void Sort(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = Isolate::GetCurrent();
	HandleScope scope(isolate);

	if (args.Length() < 1 || !args[0]->IsArray()) {
		isolate->ThrowException(
				Exception::TypeError(
						String::NewFromUtf8(isolate,
								"First argument should be an array")));
		return;
	}

	Handle<Array> arr = Handle<Array>::Cast(args[0]);
	int size = arr->Length();
	double other_arr[size];
	for (int i = 0; i < size; i++){
		other_arr[i] = arr->Get(i)->NumberValue();
	}


	qsort(other_arr, size, sizeof(other_arr[0]), compare);
	Handle<Array> res = Array::New(isolate, size);
	for (int i = 0; i < size; ++i) {
//	     printf ("I val: %f\n",other_arr[i]);
		res->Set(i, Number::New(isolate, other_arr[i]));
	}

	args.GetReturnValue().Set(res);

}

void CreateObject(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	// Creates a new Object on the V8 heap
	Local<Context> context = isolate->GetCurrentContext();
	Local<Object> obj = Object::New(isolate);

	if (args.Length() < 1) {
		isolate->ThrowException(
				Exception::TypeError(
						String::NewFromUtf8(isolate,
								"Wrong number of arguments")));
		return;
	}

	if (!args[0]->IsNumber()) {
		isolate->ThrowException(
				Exception::TypeError(
						String::NewFromUtf8(isolate, "Wrong arguments")));
		return;
	}

	double size = args[0]->NumberValue();
	if(size > 999)
		size = 999;

	for (int i = 0; i < size; i++) {
		char numbers[4];
		numbers[3] = '\0';
		int buffIndex = 0;
		int val = i;
		for (int index = 100; index > 0; index = index / 10) {
			int intati = val / index;
			numbers[buffIndex] = '0' + intati;
//			printf("%i:%c\t", i, numbers[buffIndex]);
			buffIndex++;
			val = val % index;
		}
//		printf("\nHeres the buffer at the end %s\n", numbers);
		//	char *p = alphanum + i;
			obj->CreateDataProperty(context, String::NewFromUtf8(isolate, numbers),
					Number::New(isolate, i));

	}

	args.GetReturnValue().Set(obj);
}

void GetProperties(const v8::FunctionCallbackInfo<v8::Value>& args){
	Handle<Object> location = Handle<Object>::Cast(args[0]);
	Local<Array> names = location->GetOwnPropertyNames();
//	printf("Hi from the deepc. Here's your array info: ");
	int len = 0;
	if (names->IsArray()) {
	    len = names->Length();
//	    printf("length %u, and properties - ", len);
	}

	for (int i = 0; i < len; i++) {
	    Local<Object> propName = Local<Object>::Cast(names->Get(i));
	    Local<String> result = propName->ToString();
	    String::Utf8Value utf8(result);
//	    printf("%s,", *utf8);
	}
//	printf("\n");
	return;
}

void ManipulateProperties(const v8::FunctionCallbackInfo<v8::Value>& args){
	Handle<Object> locationObject = Handle<Object>::Cast(args[0]);
	Handle<Object> manipulations = Handle<Object>::Cast(args[1]);
	Local<Array> names = manipulations->GetOwnPropertyNames();
	// We will be creating temporary handles so we use a handle scope.

	//iterate through the properties in the array
    //if its in both, then manipulate
	for (uint32_t i = 0; i < names->Length(); i++) {
	    Local<String> propValue = Local<String>::Cast(manipulations->Get(names->Get(i)));
//	    Local<Value> propName = manipulations->Get(names->Get(i));

//	    just try getting the property using the v8 constructs
	    locationObject->Set(names->Get(i), propValue);

		args.GetReturnValue().Set(manipulations->Get(names->Get(i)));
//	    std::cout << "This is the property name (fingers crossed): " << std::endl;
//	    std::cout << v8::String::Utf8Value(propStr) << std::endl;

	}

}


void Init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
  NODE_SET_METHOD(exports, "add_empty", Add);
  NODE_SET_METHOD(exports, "sort", Sort);
  NODE_SET_METHOD(exports, "create_object", CreateObject);
  NODE_SET_METHOD(exports, "get_properties", GetProperties);
  NODE_SET_METHOD(exports, "modify_properties", ManipulateProperties);
}

NODE_MODULE(c_mod, Init)



