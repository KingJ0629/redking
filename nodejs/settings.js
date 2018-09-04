const puppeteer = require('puppeteer');

// chrome : true 无头模式
exports.run = async function run(chrome, url, cookie, phone, callback) {

  const browser = await puppeteer.launch({
    //关闭无头模式，方便我们看到这个无头浏览器执行的过程
    headless: chrome,
  });
  const page = await browser.newPage();
  //设置UA头
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 5.1; m1 metal Build/LMY47I; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043409 Safari/537.36 V1ANDSQ7.2.5744YYBD QQ/7.2.5.3305 NetType/WIFI WebP/0.3.0 Pixel/1080')
  //此处只需要设置cookie中的snsInfo[101204453]即可无需设置全部cookie信息
  await page.setCookie({
    name: 'snsInfo[101204453]',
    value: cookie,
    domain: '.ele.me',
    path: '/',
    expires: 4070851200,//过期时间
  });
  //开启监听请求
  await page.setRequestInterception(true);
  page.on('request', request => {
    request.continue(); // pass it through.
  });
  page.on('response', response => {
    const req = response.request();
    if(response.url().match('h5.ele.me/restapi/marketing/promotion/weixin')) {
      console.log(response.url());
      response.text().then(
        (res)=>{
          console.log(res)
          callback(res, phone)
        }
      );
    }
  });

  await page.evaluateOnNewDocument(function() {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          'coords': {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 23.129163,
            longitude: 113.264435,
            speed: null
          }
        })
      }, 1000)
    }
  });

  await page.goto(url, {
          // 配置项
    waitUntil: 'networkidle2', // 等待网络状态为空闲的时候才继续执行
  });
}