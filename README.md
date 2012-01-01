# hnet - an experimental decentralized and anonymous database

## hnet spreads small amounts of data across several non-traditional storage engines such as images, gists, pastebin, twitter streams, irc chat rooms, etc...

### hnet is ideal for distributing small amounts of state anonymously. By design, it is not reliable, fast, or consistent. 

### An ideal use-case for hnet would be storing sets of IP addresses and ports for servers.

# How does it work?

*hnet uses couchiris at top*

*img of db layout*

*another img of client getting data*

*description of data format*

*basic linking*

*basic circular dep linking*


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

* Finish pluggable crypto system
* Create basic implementation for `Hnet.set`
* Add additional engines for:
 - Image Stenography
 - PasteBin
 - Reddit
 - Imgur
 - Hacker News deadlink jail
 - Twitter
 - IRC
