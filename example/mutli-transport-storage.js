var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet();

hnet.on('loaded', function(set){
  console.log('just loaded data set from ', set);
});

hnet.on('ready', function(){
  console.log('all data sets have been loaded');
  console.log(hnet.get());
});

//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0', 'https://gist.github.com/01889d7e9e8cc35375c8', 'http://hnet.iriscouch.com/public/1']);

//
// Get will always work, regardless of how many sets are loaded.
// If no data sets have been loaded, get will just not return any data
//
console.log(hnet.get());
