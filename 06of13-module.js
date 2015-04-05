var fs = require('fs');
var path = require('path');

module.exports = function (dir, ext, callback){
  fs.readdir(dir, function(err, list){
    if (err) { return callback(err);}
    var result = [];
    list.forEach(function(item, index, list){
      if (path.extname(item) === '.' + ext) {
        result.push(item);
      }
    });
    callback(null, result);
  });
};

