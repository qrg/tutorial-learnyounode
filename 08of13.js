var http = require('http');
var bl = require('bl');
var url = process.argv[2];

http.get(url, function(resp){

  resp.pipe(bl(function(err, data){
    if (err) {
      return console.error(err);
    }
    var str = data.toString();
    console.log(str.length);
    console.log(str);
  }));

});

