var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet({
  maxDepth: 1
});

hnet.on('node', function (node, data, options) {
  // loaded a node !!!
  // console.log(this.event);

});

hnet.on('level::*', function(nodes, options) {
  // loaded an entire level of nodes !
  // console.log(this.event);
});

//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0']);

