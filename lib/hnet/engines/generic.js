var request = require('request'),
    couch   = exports;

couch.load = function (options, cb) {
  var self = this;
  request({ uri: options.uri }, cb);
};

couch.set  = function () {
  //
  // Perform a post to a couchdb document
  //
};
couch.get  = function (uri) {
  
  var self = this;
  
  //
  // Get a document from the couchdb
  //
  return self.store;
  
};