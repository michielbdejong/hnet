var fs   = require('fs'),
    EventEmitter = require('EventEmitter2').EventEmitter2,
    util = require('util'),
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

  self.engines = {};
  fs.readdirSync(__dirname + '/hnet/engines').forEach(function(engine){
    self.engines[engine.replace('.js', '')] = require(__dirname + '/hnet/engines/' + engine);
  });

  self.cyphers = {};
  fs.readdirSync(__dirname + '/hnet/cyphers').forEach(function(cypher){
    self.cyphers[cypher.replace('.js', '')] = require(__dirname + '/hnet/cyphers/' + cypher);
  });

  //
  // Setup a default crypto engine
  //
  self.encrypt = self.cyphers['CaesarZalgo'].encrypt;
  self.decrypt = self.cyphers['CaesarZalgo'].decrypt;

  self.emit('loaded', 'asd');

};

//
// Inherit from `EventEmitter2`.
//
util.inherits(Hnet, EventEmitter);

Hnet.prototype.load = function(uris){

  var self = this;

  if (typeof uris === "String") {
    uris = [uris];
  }

  uris.forEach(function(uri){
    Object.keys(self.engines).forEach(function(engine){
      if(engine.detect && engine.detect(uri)) {
        self.nodes[uri] = {
          "type": engine
        };
      }
    });
  });
  
  self.emit('ready');
  
};
Hnet.prototype.get = function(){

  var self = this;
  
  if(self.decrypt) {
    return self.decrypt("");
  }
  return "";
  
};
Hnet.prototype.set = function(data){
  
  if(self.encrypt) {
    data = self.encrypt(data);
  }
  
};
