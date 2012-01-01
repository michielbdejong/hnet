//
// Super basic application that uses an hnet client
//


var http = require('http'),
    Hnet = require('../../lib/hnet').Hnet;

var hnet = new Hnet({
  ttl: 3000
});

hnet.load();


http.createServer(function(req, res){
  res.write(JSON.stringify(hnet.get()));
  res.end();
}).listen(9999);