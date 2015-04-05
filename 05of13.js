var fs = require('fs');
var path = require('path');
var dir = process.argv[2];
var ext = process.argv[3];

fs.readdir(dir, function(err, list){
  var matched = list.filter(function(item, index, list){
    var itemExt = path.extname(item);
    return itemExt === '.' + ext
  });

  for (var i = 0; i < matched.length; i++) {
    console.log(matched[i]);
  }
});

