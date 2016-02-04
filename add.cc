#include <node.h>
#include <vector>
#include <stdlib.h>
#include <iostream>
#include <string>

using namespace std;
using namespace v8;
static char alphanum[] =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
static const char supercal[] =
		"supercalafragilisticexpealidotiouseventhoughthesoundofthisis";

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
//	printf("BEGIN ------- SIZE %i -------------", size);
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

void CreateObject(const FunctionCallbackInfo<Value>& args){
	  Isolate* isolate = args.GetIsolate();
	  // Creates a new Object on the V8 heap
	  Local<Context> context = isolate->GetCurrentContext();
	  Local<Object> obj = Object::New(isolate);

	  Local<Context> creationContext = obj->CreationContext();

//	  printf("It is %i that the creation and local context of the isolate are the same", (context == creationContext));

	  for(int i = 0; i < 50; i++){
//		  string s = std::to_string(i);
//		  char const *pchar = s.c_str();
//
//		  std::ostringstream ss;
//		  ss << i;

		  char *p = alphanum + i;
		  obj->CreateDataProperty(creationContext, String::NewFromUtf8(isolate, p), Number::New(isolate, i));
	  }

//	  obj->CreationContext();
	  args.GetReturnValue().Set(obj);
}

//void Sort(const FunctionCallbackInfo<Value>& args) {
//	  Isolate* isolate = Isolate::GetCurrent();
//	  HandleScope scope(isolate);
//
//  if (args.Length() < 1 || !args[0]->IsArray()) {
//    isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "First argument should be an array")));
//    return;
//  }
//
//  Handle<Array> arr = Handle<Array>::Cast(args[0]);
//  vector<double> v;
//  for (int i = 0; i < arr->Length(); ++i) {
//    v.push_back(arr->Get(i)->NumberValue());
//  }
//  sort(v.begin(), v.end());
//  Handle<Array> res = Array::New(isolate, v.size());
//  for (int i = 0; i < v.size(); ++i) {
////	 printf("index %i, val %f", i, v[i]);
//    res->Set(i, Number::New(isolate, v[i]));
//  }
//
//  args.GetReturnValue().Set(res);
//
//}


void Init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
  NODE_SET_METHOD(exports, "add_empty", Add);
  NODE_SET_METHOD(exports, "sort", Sort);
  NODE_SET_METHOD(exports, "create_object", CreateObject);
}

NODE_MODULE(add, Init)



