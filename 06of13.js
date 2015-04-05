var lsFilter = require('./06of13-module.js');

lsFilter(process.argv[2], process.argv[3], function(err, data){
  if (err) {
    return console.error(err);
  }
  data.forEach(function(item, index, list){
    console.log(item);
  });
});

