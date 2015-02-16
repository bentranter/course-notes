###CORS Test

This is just a simple test to see if CORS and JWTs are working properly. Start RethinkDB and the server, then open main.html in your browser and open the dev console. If you see the success messages, you'll know everything is working the way it's supposed to. This folder will be deleted once this test is merged into the existing test suite.

If it isn't wokring, try running a local server in this directory instead of just opening the file in your browser. The easiest way to do that is to run `python -m SimpleHTTPServer` in this directory, and open any browser to `0.0.0.0:8000`. 
