var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet({
  ttl: 5000
});

hnet.on('node', function (node, data, options) {
  // loaded a node !!!
  // console.log(this.event);

});

hnet.on('level::*', function(nodes, options) {
  // loaded an entire level of nodes !
  
  //
  // Remark: Pretty print local data to console
  //
  console.log(JSON.stringify(hnet.get(), true, 2));
});


//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0']);