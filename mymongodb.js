var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");
var DB_CONN_STR = 'mongodb://localhost:32769/spider';    

var wtablein = function(data){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功！");   
    data =  JSON.parse(data);
    db.collection('eword').insert(data,function(err,info){
        assert.equal(null, err);
    });
});
return true;
}

var wtableco = function(){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功！");   
    db.collection('eword').count(function(err, num) {
        console.log(num);
      db.close();
    });
});
return true;
}


wtableco();

module.exports.wtable = wtablein;
module.exports.wtableco = wtableco;
