var MD5 = require('md5');
var request = require('request')

function getwordinfo(query, callback) {
var appid = '39cc19bd6dface02';
var key = 'UEa9x2MCrhx08p5VhXLGUNEok090ihuy';
var salt = (new Date).getTime();
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'en';
var to = 'zh-CHS';
var str1 = appid + query + salt +key;
var sign = MD5(str1);
let options = {
    url: "http://openapi.youdao.com/api",
    form: {
        q: query,
        appKey: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
    }
}
request.post(options, function(err, res) {
    if (err) {
        console.log(err);
        console.log(query);
    }else{
    callback(res.body);
    }
    // console.log(res.body);
    // console.log();
})
}

module.exports = getwordinfo;
// getwordinfo('village', console.log);