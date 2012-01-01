var request = require('request');

couch = exports;

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

couch.set  = function (node, cb) {
  var self = this;
  var parts = node.uri.split('/');
  node.data._id = node.data._id || parts[parts.length -1] || 'no-id';
  parts.pop();
  node.uri = parts.join('/');
  request({ uri: node.uri, json: node.data, method: "POST" }, function(err, response, body){
    if(self.nodes[node.uri]) {
      self.nodes[node.uri].rev = body.rev;
    } else {
      self.nodes[node.uri] = {
        body:rev
      }
      
    }
  });
};

couch.get  = function (uri) {
  
  var self = this;
  
  //
  // Get a document from the couchdb
  //
  return self.store;
  
};