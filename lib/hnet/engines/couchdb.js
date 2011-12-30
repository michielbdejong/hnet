var request = require('request'),
    couch   = exports;

couch.detect = function (node, response, body) {
  
  if (response['headers']['server'] && response['headers']['server'].search('CouchDB') !== -1) {
    try {
      body = JSON.parse(body.toString());
    } catch (err) {
      return false;
    }
    return true;
  } else {
    return false;
  }
  
};

couch.load = function (options, cb) {
  var self = this;
  request({ uri: options.uri, method: "GET" }, cb);
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