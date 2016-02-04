# Performance reporting

This is a reporting structure for the performance tests written in 'Performance Testing'

A description of that repo is below:

This is a performance test of c++ node addon.

The test compares adding two numbers and sorting a array of size 100000 of 
random doubles in javascript vs c++.

It also checks marshalling time for making the c++ library call.

I consistently have found js outperforming c++'s speed.

At what point does writing an addon improve performance? Or does marshalling 
speed generally trump processing when trying to manipulate JS objects in C++.

Why?
