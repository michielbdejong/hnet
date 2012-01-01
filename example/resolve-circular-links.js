var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet({
  ttl: 5000
});

hnet.on('node', function (node, data, options) {
  console.log('level::' + options.currentDepth + '::' + node.uri);
});

hnet.on('level::*', function(nodes, options){
  console.log('level::' + this.event.split('::')[1] + '::loaded');
  console.log(JSON.stringify(hnet.get(), true, 2));
});

//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0']);