//
// A basic casear cypher based on Zalgo. It should be conisdered extremely simple to crack.
//

exports.encrypt = function (str) {
  Object.keys(lookupTable).forEach(function(key){
    console.log(key);
    str = str.replace(key, key);
  });
  return str;
};

exports.decrypt = function (str) {
  return str;
};


var lookupTable = {
  "a": "",
  "b": "",
  "c": "",
  "d": "",
  "e": "",
  "f": "",
  "g": "",
  "h": "",
  "i": "",
  "j": "",
  "k": "",
  "l": "",
  "m": "",
  "n": "",
  "o": "",
  "p": "",
  "q": "",
  "r": "",
  "s": "",
  "t": "",
  "u": "",
  "v": "",
  "w": "",
  "x": "",
  "y": "",
  "z": "",
  "A": "",
  "B": "",
  "C": "",
  "D": "",
  "E": "",
  "F": "",
  "G": "",
  "H": "",
  "I": "",
  "J": "",
  "K": "",
  "L": "",
  "M": "",
  "N": "",
  "O": "",
  "P": "",
  "Q": "",
  "R": "",
  "S": "",
  "T": "",
  "U": "",
  "V": "",
  "W": "",
  "X": "",
  "Y": "",
  "Z": "",
  "0": "",
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",
  "6": "",
  "7": "",
  "8": "",
  "9": "",
  ".": "",
  ":": "",
  "{": "",
  "}": "",
  "[": "",
  "]": "",
  "\"": "",
  "\'": "",
  "-": "",
  "_": "",
  ")": "",
  "(": ""


};