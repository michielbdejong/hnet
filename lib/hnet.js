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

  // Where data is stored locally
  self.store   = [];
  
  // Lookup table of all found nodes
  self.nodes   = {};
  
  // Pluggable engines system
  self.engines = {};
  
  // Pluggable crypto system
  self.cyphers = {};

  //
  // Load engines and cyphers
  //
  fs.readdirSync(__dirname + '/hnet/engines').forEach(function(engine){
    self.engines[engine.replace('.js', '')] = require(__dirname + '/hnet/engines/' + engine);
  });

  fs.readdirSync(__dirname + '/hnet/cyphers').forEach(function(cypher){
    self.cyphers[cypher.replace('.js', '')] = require(__dirname + '/hnet/cyphers/' + cypher);
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

//
// Parses a JSON document for possible instructions
//
Hnet.prototype.parseDocument = function (engine, doc) {
  var self = this;
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
            // Attempt to load another resource
            //
            console.log('attempting to load', d.params[0].uri);
            self.load(d.params);
            
          }
          
          
        }
      });
    }
    

  self.store.push(doc);
}

//
// Loads a datanode
//
Hnet.prototype.load = function(nodes, cb){

  var self = this;

  //
  // If the incoming node is just a string, 
  // coherse it into a one element array
  //
  if (typeof nodes === "string") {
    nodes = [nodes];
  }


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

    request({ uri: node.uri }, function(err, response, body) {

      //
      // If the node has no type, attempt to detect one
      //
      if (!node.type) {
        node.type = "generic";
        Object.keys(self.engines).forEach(function(engine) {
         if (self.engines[engine].detect) {
           if(self.engines[engine].detect(node, response, body)){
             node.type = engine;
           }
         }
        });
      }

      if(self.nodes[node.uri]){
        console.log('This node has already been loaded. Cannot re-load circular dependency');
        return cb(null);
      }

      if(self.engines[node.type].load) {
        self.engines[node.type].load(node, function(err, response, doc){
          doc = self.parseDocument(node, body);
          self.nodes[node.uri] = node;
          self.emit('loaded', node, doc);
          cb(null);
        });
      }

    });
    
  }, function(err){

      if (err) {
        // TODO: do something meaningful with this error state
      }

      // if any of the loads produced an error, err would equal that error
      self.emit('ready');
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


Hnet.prototype.set = function(data){
  if(self.encrypt) {
    data = self.encrypt(data);
  }
};
