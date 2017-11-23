var http = require('http');
var url = require('url');

function sleep(s) {
    var e = new Date().getTime() + s;
    while (new Date().getTime() <= e) {;}
  }

http.createServer(function(request, response) {
    var u = url.parse(request.url, true);
  
    if (u.path.indexOf('/secure') == 0) {
        var statusCode = 200;
        console.log(u.query.pass);

        if (u.query.pass === '1234'){
            statusCode = 200;   
            sleep(5);
        } else {
            statusCode = 401;
        }

        response.writeHeader(statusCode, {'Content-Type': 'text/html'});
        response.end();
  
    }
  }).listen(8080);
  
  console.log('Server running at http://localhost:8080/');