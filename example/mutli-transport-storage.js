var Hnet = require('../lib/hnet').Hnet;

var hnet = new Hnet();

hnet.on('loaded', function (node, data) {
//  console.log('just loaded data set from ', node.uri);
  //console.log(hnet.get());
  
});

hnet.on('ready', function(){
  console.log('all data sets have been loaded, here if your data: \n');
  console.log(JSON.stringify(hnet.get(), true, 2));
});

//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0', 
           'https://raw.github.com/gist/01889d7e9e8cc35375c8/9e26dfeeb6e641a33dae4961196235bdb965b21b/h',
           'https://raw.github.com/gist/697ffae7ed038c2f12f9/7d93ea8a75af4b167641ae2db8a7567f23dfd546/h0',
           'http://hnet.iriscouch.com/public/1',
           'http://hnet.iriscouch.com/public/2',
           ]);

