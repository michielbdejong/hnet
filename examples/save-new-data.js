var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet();

hnet.store = ["foo", {"boo": "bar"}];

hnet.save(function(err, response, body){
  if(err) {
    console.log(err);
  }
  
});
