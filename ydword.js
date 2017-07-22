var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs');

/*
 * url 网络文件地址
 * filename 文件名
 * callback 回调函数
 */
function downloadFile(uri, filename, callback) {
    fs.exists(filename, (exists) => {
        if (!exists) {
            var stream = fs.createWriteStream(filename);
            request(uri).pipe(stream).on('error', function(e) {
                console.log('error');
                console.error(e);
            }).on('close', callback);
        }
    });

}

var request = request.defaults({ jar: true });

var keyword = '';
options = {
    url: '',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        // 'Accept-Encoding':'gzip, deflate, sdch, br'
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',

        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
};

function getworld(wn) {
    console.log(wn);
    reword(wn);
}

function reword(wn) {
    options['url'] = 'http://kaoyan.17chaba.com/kaoyan' + wn + '.html';

    request(options, function(err, res) {
        if (err) {
            console.log(err);
        }
        var $ = cheerio.load(res.body);
        zisf($('.cate_title_de').text());
    });
}
var fd = fs.openSync('w.txt','a+');
var fda = fs.openSync('wa.txt','a+');
function zisf(keyword) {
    options['url'] = 'http://dict.youdao.com/w/' + keyword + '/#keyfrom=dict2.top';
            fs.write(fda, keyword+"\n");
    /*
request(options, function(err, res) {
        if (err) {
            console.log(err);
        }
        var $ = cheerio.load(res.body);
        // var fy = [];
        if( $('.baav .phonetic').text().indexOf("['") >= 0){
//            fs.write(fd, keyword+"\n");
 //          console.log(keyword);
        }            
            // if ($(this).text()[1, 1] == "'") {
                // fy = [];
                // $('.trans-container li').each(function() {
                //     // console.log($(this).text());
                //     // fy.push($(this).text()[0,20]);
                // });
                //记录单词
                
            // }
*/
       doone(); 
//    })
}
var wn = 47;
function doone() {
   wn++;
        if (wn < 1504) {
            setTimeout(getworld, parseInt(Math.random()*(1000-500+1)+500,10), wn);
        }
 
}
getworld(wn);
/*
request(options, function(err, res) {
    if (err) {
        console.log(err);
    }
    var $ = cheerio.load(res.body);
    
    $('.baav .phonetic').each(function(){
        if($(this).text()[1,1] == "'"){
            //记录单词
        }
    })
})
*/
