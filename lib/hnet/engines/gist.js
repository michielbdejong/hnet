var request = require('request');

gist = exports;


gist.detect = function (node, response, body) {
  if (node.uri.search('raw.github.com') !== -1) {
    return true;
  } else {
    return false;
  }
};

gist.load = function (options, cb) {
  var self = this;
  request({ uri: options.uri, method: "GET" }, cb);
};

gist.set = function (node, cb) {
  var self = this;
  request({ uri: "http://hnet.iriscouch.com/public", json: true, body: JSON.stringify({"h":node}), method: "POST" }, function(err, response, body){
    cb(err, response, body);
    /*
    if(self.nodes[node.uri]) {
      self.nodes[node.uri].rev = body.rev;
    } else {
      self.nodes[node.uri] = {
        body:rev
      }
    }
    */
  });
};
gist.get  = function (uri) {
  
  var self = this;
  
  //
  // Get a document from the gist
  //
  return self.store;
  
};