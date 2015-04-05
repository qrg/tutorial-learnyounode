var args = process.argv;
var result = 0;

args.splice(0, 2);

for (var i = 0; i < args.length; i++) {
  result += parseInt(args[i], 10);
}

console.log(result);
