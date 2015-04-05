var fs = require('fs');
var file = process.argv[2];
var buf = fs.readFileSync(file);

console.log(buf.toString().split('\n').length - 1);
