var couch = exports;

couch.detect = function (response) {
  //
  // if the response.body and JSON and the header is CouchDB,
  // assume we have a couchdb
  //
  console.log(response['headers'].find('CouchDB'));
  console.log(response.body);
  return true;
  
};

couch.set  = function () {
  
  //
  // Perform a post to a couchdb document
  //
  
};
couch.get  = function (uri, cb) {
  
  var self = this;
  
  //
  // Get a document from the couchdb
  //
  self.request(uri, cb)
  
};