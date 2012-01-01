//
// TODO: not complete
//


var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet();

//
// Will start lazy loading sources
//
hnet.set([
    { 
      uri: "http://hnet.iriscouch.com/public/4",
      type: "couchdb", 
      data: { "foo":"bar" }
    }
], function(err, response, body){
  console.log('fff')
  if (err) {
    console.log(err);
  }
  
  console.log(body);
  
});
