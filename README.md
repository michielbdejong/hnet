# hnet - an experimental decentralized and anonymous database

## hnet spreads small amounts of data across several non-traditional storage engines such as images, gists, pastebin, twitter streams, irc chat rooms, etc...

### hnet is ideal for distributing small amounts of state anonymously. By design, it is not reliable, fast, or consistent. 

### An ideal use-case for hnet would be storing sets of IP addresses and ports for servers.

# How does it work?

*will add diagrams here*

# Usage

For now, see examples: https://github.com/Marak/hnet/tree/master/example

## hnet protocol is JSON

**Supports arbitrary data**

```
[
  { "foo": "bar", "tar": "val" },
  { "foo": "boo", "something": ["a","b","c"] },
  { "foo": "bar", "tar": "val" },
]
```

**Supports JSON-RPC commands**

`hnet` **optionally** supports JSON-RPC commands.

```
[
  { "foo": "boo", "something": ["a","b","c"] },
  { "method": "link", params: [ { "type": "couch", "uri": "http://hnet.iriscouch.com/public/0"} ] },
  { "method": "link", params: [ { "type": "gist",  "uri": "http://hnet.iriscouch.com/public/0"} ] },
  { "foo": "bar", "tar": "val" }
]
```

# hnet protocol JSON-RPC methods

### method: link
### params: type, uri

*the link method indicates that we should lazily link this document from a remote dataset*

**type** - the type of dataset we are going to load

*ex: couch, gist, imgur, irc, etc..*

**uri** - the uri of the node. i.e., the location

**ex: http://hnet.iriscouch.com/0**

## Ex: 

    { "method": "link", params: [ { "type": "couch", "uri": "http://hnet.iriscouch.com/public/0"} ] },



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
