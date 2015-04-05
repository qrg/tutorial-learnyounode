var http = require('http');
var bl = require('bl');
var args = process.argv;
var results = [];
var count = 0;
var max = args.length - 2;

function printResults() {
  "use strict";
  for (var i = 0; i < max; i++) {
    console.log(results[i]);
  }
}

function httpGet(index) {
  "use strict";

  http.get(args[index + 2], function (resp) {
    resp.pipe(bl(function(err, data){
      if (err) {
        return console.error(err, data);
      }

      results[index] = data.toString();
      count++;

      if (count === max) {
        printResults();
      }
    }));
  });
}

for (var i = 0; i < max; i++) {
  httpGet(i);
}
