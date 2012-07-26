var http = require('http');
var fs = require('fs');

http.createServer(function(req,res) {
  fs.readFile('index.html', function(err,data){
    if(!err){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    } else {
      res.writeHead(404);
      res.end();
    };
  });
}).listen(9876, 'therealplato.com');

