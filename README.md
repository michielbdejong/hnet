# hnet - a distributed, decentralized, and somewhat anonymous database

## hnet spreads small amounts of data across several engines

It's good for distributing things like ip routing tables

## Usage

var hnet = require('hnet');

//
// Will start lazy loading sources
//
hnet.load(['http://hnet.iriscouch.com/public/0', 'https://gist.github.com/01889d7e9e8cc35375c8', 'http://hnet.iriscouch.com/public/1']);

hnet.on('load', function(set){
  console.log('just load data set from ', set);
});

hnet.on('ready', function(){
  console.log('all data sets have been load');
  console.log(hnet.get());
});

//
// Get will always work, regardless of how many sets are load.
// If no data sets have been load, get will just not return any data
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
{ "method": "link", params: [ { "type": "gist",  "uri": "http://hnet.iriscouch.com/public/0"}, "cypher":"CaesarZalgo" ] }
{ "foo": "bar", "tar": "val" }
```

## hnet protocol methods

### link
#### params: type, uri

**the link method indicates that we should lazily link this document from a remote dataset**

## hnet protocol params

### type
#### the type of dataset we are going to load

**ex: couch, gist, imgur, irc, etc..**

### uri
#### the uri of the dataet. i.e., the location

**ex: http://hnet.iriscouch.com/0**

### cypher ( optional )
#### the cryptology cypher the dataset is encoded in

**ex: CaesarZalgo**


# TODO:

Add additional engines for:

 - PasteBin
 - Image Stenography
 - Reddit
 - Imgur
 - Hacker News deadlink jail

