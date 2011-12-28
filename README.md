# hnet - a distributed, decentralized, and somewhat anonymous database

## hnet spreads small amounts of data across several engines

It's good for distributing things like ip routing tables

## Usage

var hnet = require('hnet');

//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0', 'https://gist.github.com/01889d7e9e8cc35375c8', 'http://hnet.iriscouch.com/public/1']);

hnet.on('loaded', function(set){
  console.log('just loaded data set from ', set);
});

hnet.on('ready', function(){
  console.log('all data sets have been loaded');
  console.log(hnet.get());
});

//
// Get will always work, regardless of how many sets are loaded.
// If no data sets have been loaded, get will just not return any data
//
console.log(hnet.get());


## hnet protocol

**arbitrary data**

```
{ "foo": "bar", "tar": "val" }
{ "foo": "boo", "something": ["a","b","c"] }
{ "foo": "bar", "tar": "val" }
```

**JSON-RPC commands**

`hnet` supports JSON-RPC. 

```
{ "foo": "boo", "something": ["a","b","c"] }
{ "method": "link", params: [ { "type": "couch", "uri": "http://hnet.iriscouch.com/public/0"} ] }
{ "foo": "bar", "tar": "val" }
```

## hnet protocol methods

### link
#### params: type, uri

**the link method indicates that we should lazily link this document from a remote dataset**
