var fs   = require('fs'),
    request = require('request'),
    EventEmitter = require('EventEmitter2').EventEmitter2,
    util = require('util'),
    async = require('async'),
    hnet = exports;


var Hnet = exports.Hnet = function (options) {
  var self = this;

  //
  // Hook inherits from EventEmitter2
  //
  EventEmitter.call(this, {
    delimiter: '::',
    wildcard: true
  });

  //
  // Setup default values
  //
  options = options || {};

  // Where data is stored locally
  self.store   = [];
  
  // Lookup table of all found nodes
  self.nodes   = {};

  // Default node depth that hnet will jump
  self.maxDepth = options.maxDepth || 100;

  // Default to not resolviing circular data sets
  self.ttl = options.ttl || -1;

  // Default amount of items we will allow to be stored in self.store
  // TODO: size limit should be based on array size as bytes, not array size as elements.
  self.MAXRECORDS = 100;

  //
  // TODO: upgrade EE2 to version that has "**"
  //
  self.on('*::*', function(data){
    console.log('debug:', this.event, data);
  });

  //
  // Select a default crypto engine
  //
  // self.encrypt = self.cyphers['CaesarZalgo'].encrypt;
  // self.decrypt = self.cyphers['CaesarZalgo'].decrypt;

};

//
// Hnet inherits from `EventEmitter2`.
//
util.inherits(Hnet, EventEmitter);

// Pluggable engines system
Hnet.prototype.engines = {};

// Pluggable cyphers system
Hnet.prototype.cyphers = {};


//
// Load engines and cyphers
//
fs.readdirSync(__dirname + '/hnet/engines').forEach(function(engine){
  try {
    Hnet.prototype['engines'][engine.replace('.js', '')] = require(__dirname + '/hnet/engines/' + engine);
  } catch (err) {
    console.log(err.message, engine);
  }
});

fs.readdirSync(__dirname + '/hnet/cyphers').forEach(function(cypher){
  try {
    Hnet.prototype['cyphers'][cypher.replace('.js', '')] = require(__dirname + '/hnet/cyphers/' + cypher);
  } catch (err) {
    console.log(err.message, engine);
  }
});

//
// Parses a JSON document for possible instructions
//
Hnet.prototype.parseDocument = function (node, doc, options) {


  var self = this;
  self.emit('node::parsing', node);
  try {
    doc = JSON.parse(doc);
    //
    // Remark: "h" is an optional and reserved key used for hnet data
    // If "h" exists in the doc, it's assumed to be the top level variable,
    // and all other data is ignored
    if (typeof doc.h !== 'undefined') {
      doc = doc.h;
    }
  } catch (err) {
      //
      // TODO: attempt custom engine.parse if available
      //
      console.log(err);
      return null;
  }
    //
    // Attempt to determine if we have any JSON-RPC commands to execute in the documents
    //
    if (doc instanceof Array && doc.length) {
 
      
      doc.forEach(function(d){
        //
        // Remark: This conditional is a very simple validity check for JSON-RPC schema
        //
        if (d.method && d.params) {
          
          //
          // Since we have detected JSON-RPC, attempt to execute documents commands
          //
          
          //
          // TODO: Add a more generic command parsing system here
          //
          if (d.method === "link") {
            //
            // Attempt to load a linked node
            //

            function _load () {
              self.load(d.params, { currentDepth: options.currentDepth + 1, maxDepth: self.maxDepth });
            }

            if (self.ttl) {
              console.log('setting timeout');
              setTimeout(function(){
                _load();
              }, self.ttl)
            } else {
              console.log('NOT setting timeout');
              _load();
            }
          }
          
        }
      });
    }
  doc.forEach(function(record){
    //
    // Determine if we've reached the capped size, if so, shift off some records,
    // we dont need them
    //
    if(self.store.length >= self.MAXRECORDS) {
      self.store.shift();
    }
    self.store.push(record);
  });
}

//
// Loads a datanode
//
Hnet.prototype.load = function(nodes, options, cb){

  var self = this;

  if (typeof nodes === 'undefined') {
    nodes = ['http://hnet.iriscouch.com/public/0'];
  }

  //
  // If the incoming node is just a string, 
  // coherse it into a one element array
  //
  if (typeof nodes === "string") {
    nodes = [nodes];
  }

  //
  // Curry the cb argument if options has not been passed in,
  // and then use default options
  //
  if (typeof options === "function") {
    cb = options;
  }

  if (typeof options === "undefined") {
    options = {
      currentDepth: 0,
      maxDepth: self.maxDepth,
    };
  }

  if (options.currentDepth >= self.maxDepth) {
    console.log('Will not load: ' + JSON.stringify(nodes) + ' Reached maximum depth of: ' + self.maxDepth);
    return false;
  }

  self.emit('node::loading', nodes);

  async.forEach(nodes, function(node, cb){

    //
    // If the node is string, assume its a uri and,
    // create a default node object around it
    //
    if (typeof node === "string") {
      node = {
        uri: node
      };
    }

    request({ uri: node.uri, method: "GET" }, function(err, response, body) {

      if (err) {
        return cb(err);
      }

      //
      // If the node has no type, attempt to detect one
      //
      if (typeof node.type === 'undefined') {
        node.type = "generic";
        Object.keys(self.engines).forEach(function(engine) {
         if (self.engines[engine].detect) {
           if(self.engines[engine].detect(node, response, body)){
             node.type = engine;
           }
         }
        });
      }

      if(self.nodes[node.uri] && self.ttl < 0){
        return cb(new Error('Already loaded ' + node.uri + ' Will not re-load circular dependency'));
      }

      function loadSet () {
        self.engines[node.type].load(node, function(err, response, doc){
          doc = self.parseDocument(node, body, options);
          self.nodes[node.uri] = node;
          self.emit('node', node, doc, options);
          cb(null);
        });
      }
      if(self.engines[node.type].load) {
        loadSet();
      }

    });
    
  }, function(err){

      if (err) {
        // TODO: do something meaningful with this error state
        console.log(err.message);
        return;
      }

      // if any of the loads produced an error, err would equal that error
      self.emit('level::' + options.currentDepth, nodes);
  });
  
};


Hnet.prototype.get = function(){
  var self = this;
  /*
  if(self.decrypt) {
    return self.decrypt("");
  }
  */
  
  return self.store;
};


Hnet.prototype.save = function(cb){

  var self = this,
  dataSet,
  _keys = Object.keys(self.nodes),
  backLinks = [],
  middle,
  last;

  /*
  if(self.encrypt) {
    data = self.encrypt(data);
  }
 */

  //
  // Remark: If we have no nodes at all, we'll just create a new one using hnet.iriscouch.com
  //
  if (_keys.length === 0) {
    console.log('no known nodes, using default');
    backLinks.push({uri: 'http://hnet.iriscouch.com/public/0', type: 'couchdb'});
  } else if (_keys.length === 1) {
    //
    // Remark: Pick 1 top-level node, and 2 other "random" nodes to link back to.
    //
    backLinks.push(self.nodes[_keys[0]]);
  } else if (_keys.length >= 3) {
    middle = self.nodes[_keys[_keys.length / 2]];
    last   = self.nodes[_keys[_keys.length - 1]];
    //
    // Remark: Instead of random, let's try the middle and last element instead
    //
    backLinks.push(_link(middle));
    backLinks.push(_link(last));

  }
 
  dataSet = self.store;
  backLinks.forEach(function(savePoint){
    dataSet.push(savePoint);
  });

  //
  // Pick two "random" engines
  //
  var _engines = ['couchdb', 'gist'];
  _engines.forEach(function(engine){
    if (self.engines[engine].save) {
      self.engines[engine].save(dataSet, function(err, response, body) {
        if (err) {
          return cb(err);
        }
        //
        // If we have be given an id back from the Couch
        //
        if (body.id) {
          self.nodes['http://hnet.iriscouch.com/public/' + body.id];
        }
        self.emit('node::added', 'http://hnet.iriscouch.com/public/' + body.id)
        cb(null, body);
      });
    }
  });
};


//
// Converts node uris into JSON-RPC link commands
//
function _link(node) {
  return { "method": "link", "params": [node] };
}