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
var options = {
    url: 'https://yq.aliyun.com/activity/147',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        // 'Accept-Encoding':'gzip, deflate, sdch, br'
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': '_med=dw:1440&dh:900&pw:2880&ph:1800&ist:0; UM_distinctid=15ac05e653c19b-027ee1d98383dc-1d3b6853-13c680-15ac05e653da5e; aliyun_choice=CN; channel=6QyTQabU6VI%3D; aliyungf_tc=AQAAAHHPPjR0TAoAJdCQdcj/om5oju07; acw_tc=AQAAAPgq4H4UzQoAJdCQdU9gGblmmnan; yunqi_abtest=25; yunqi_csrf=7ELCAW4QVX; CNZZDATA1256835944=657144989-1489674901-https%253A%252F%252Fwww.baidu.com%252F%7C1493260080; CNZZDATA1256757167=190566938-1489669869-https%253A%252F%252Fwww.baidu.com%252F%7C1493261735; login_aliyunid="57886****@qq.com"; login_aliyunid_ticket=ZxcOzYQX4meGncYvTyc_ViJ_gR7DNz_Ukpof_BNTwUhTOoNC1ZBeeMfKJzxdnb95hYssNIZor6q7SCxRtgmGCbifG2Cd4ZWazmBdHI6sgXZqg4XFWQfyKpeu*0vCmV8s*MT5tJl3_1$$wchawdNNUIfx0; login_aliyunid_csrf=_csrf_tk_1481993274202974; login_aliyunid_pk=1573031843368845; hssid=1lotriEShZyeP0yeO4cimpw1; hsite=6; aliyun_country=CN; aliyun_site=CN; ALIYUNYQ=mcpLeD%2BJsEcyTvfoUiJYxiaf8XZx7CuAHgOVGbtfbVWplk8jnOMDwoJE96RS1X5HkQML2sDJ5Zx43b24lTnmzgNdiQqqpo3%2B5MHqXeROabm4thyVyxOoe2EuUi71vsQcdUxnYIKxBYoZCTK9xYnUUfGe%2Bwxef9olbmuMwoEpC6IDAdrbOOyFOkkscEtNmyWXd%2F9BJk4nk%2BTsVkkGNw7NMWeq%2BrghBmVs67RE6FBipy2R97ZVBmit9%2B5C88savTw43GHtqP%2FGSOzgTzIKVXWtfQfx19lYLMh%2FbqkXoMKe3xz5oJKtns1x%2BaQ1ZzXXzHCUHHm0jhG7kTbr1x4xN6pskIzqJhcpslJsssMbl0C9TQ7NKh1nOiYeQ2Xj7vpZkG9F; yunqi_user=1; SERVERID=8996fe34ec2d2c3fb5d02a5efc457c6c|1493300812|1493300812; cna=MUYJEdouWkACAXI9OP004vRp; _ga=GA1.2.2085851573.1485001220; l=AvDwLmPgX8Fgy1LreDe1OjjbQLVCOdSD; isg=AomJ5DQxNDmhNMlPyneH5u8smLPtY30I7dZDmiv-BXCvcqmEcyaN2Hcg0mC_',
        'Host': 'yq.aliyun.com',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
};
var num = 1;
request(options, function(err, res) {
    if (err) {
        console.log(err);
    }
    var $ = cheerio.load(res.body);
    $('.floor-list').find('li').find('a').each(function() {
        console.log(num);
        num = num + 1;
        if (num > 1) {
            options['url'] = $(this).prop('href');
            let filename = 'ali-pdf/' + $(this).find('.tit').text().replace('/', '-') + '.pdf';
            downloadFile(options, filename, function() {
                console.log(filename + '下载完毕');
            })
        }

    })
})
var a = 2323123;
console.log(a);