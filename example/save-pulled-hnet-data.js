var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet();


hnet.on('node', function (node, data, options) {
  //console.log('level::' + options.currentDepth + '::' + node.uri);
});

hnet.on('level::*', function(nodes, options){
  //console.log('level::' + this.event.split('::')[1] + '::loaded');
  //console.log(JSON.stringify(hnet.get(), true, 2));
});

hnet.on('level::0', function(nodes, options){
  //console.log(hnet.nodes);
  hnet.save(function(err, response, body){
    
    //console.log(err, body);
    
  });
});

hnet.load(['http://hnet.iriscouch.com/public/0']);

