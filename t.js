var fs = require('fs');

var fd = fs.openSync('w.txt','a+');

fs.write(fd, 'asdf'+"\n");
