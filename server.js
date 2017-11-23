#!/usr/bin/env node

var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
    var u = url.parse(request.url, true);
  
    if (u.path.indexOf('/secure') == 0) {
        console.log(u.query);

        var statusCode = 200;

        if (u.query.pass === '1234'){
            statusCode = 200;            
        } else {
            statusCode = 401;
            response.writeHeader(401, {'Content-Type': 'text/html'});
        }

        response.writeHeader(statusCode, {'Content-Type': 'text/html'});
        response.end();
  
    }
  }).listen(8080);
  
  console.log('Server running at http://localhost:8080/');