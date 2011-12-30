var request = require('request'),
    gist   = exports;

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

gist.set  = function () {
  
  //
  // Perform a post to a gist document
  //
  
};
gist.get  = function (uri) {
  
  var self = this;
  
  //
  // Get a document from the gist
  //
  return self.store;
  
};