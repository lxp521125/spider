var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 32769, {auto_reconnect:true});
var  db = new mongodb.Db('spider', server, {safe:true});

