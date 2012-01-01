# hnet - an experimental decentralized and anonymous database

## hnet spreads small amounts of data across several non-traditional storage engines such as images, gists, pastebin, twitter streams, irc chat rooms, etc...

### hnet is ideal for distributing small amounts of state anonymously. By design, it is not reliable, fast, or consistent. 

### An ideal use-case for hnet would be storing sets of IP addresses and ports for servers.

# How does it work?

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/hnet-client.png"></img>

### A series of unknown hnet nodes exist in the cloud

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/top-level-nodes.png"></img>

### You connect to any number of "known" nodes

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/client-query-node.png"></img>

### These nodes return data and arbitrary JSON-RPC commands

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/JSON-RPC-Commands.png"></img>

### Optionally, JSON-RPC commands are executed

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/client-many-nodes.png"></img>


### Client receives data from many nodes

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/circular-propigation.png"></img>

### Circular node linking is supported through a TTL ( Time To Live )

<img src="https://github.com/hookio/hnet/raw/master/diagrams/hnet1/saving-data.png"></img>

### Saving data creates a new node that links back to at least two existing nodes

# Usage

For now, you can find many examples of usage here: <a href="https://github.com/hookio/hnet/tree/master/examples/sample-hnet-application/server.js">hnet api examples</a>

<a href="https://github.com/hookio/hnet/tree/master/examples/sample-hnet-application/server.js">There is also a basic http server example which will response to http requests with `hnet` data</a>

## the hnet protocol is JSON

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

- Finish pluggable crypto system
- Add additional engines for:
 - Image Stenography
 - PasteBin
 - Reddit
 - Imgur
 - Hacker News deadlink jail
 - Twitter
 - IRC
- Add pluggable item de-duplication engine
