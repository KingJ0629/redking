
const puppeteer = require('./settings');
const db = require('./service');

var cookie = "%7B%22city%22%3A%22%22%2C%22constellation%22%3A%22%22%2C%22eleme_key%22%3A%22f695464e7570d7d32a17d3bb7a35ddee%22%2C%22figureurl%22%3A%22http%3A%2F%2Fqzapp.qlogo.cn%2Fqzapp%2F101204453%2F76EF5D4D9E4CE11E704397376C434164%2F30%22%2C%22figureurl_1%22%3A%22http%3A%2F%2Fqzapp.qlogo.cn%2Fqzapp%2F101204453%2F76EF5D4D9E4CE11E704397376C434164%2F50%22%2C%22figureurl_2%22%3A%22http%3A%2F%2Fqzapp.qlogo.cn%2Fqzapp%2F101204453%2F76EF5D4D9E4CE11E704397376C434164%2F100%22%2C%22figureurl_qq_1%22%3A%22http%3A%2F%2Fthirdqq.qlogo.cn%2Fqqapp%2F101204453%2F76EF5D4D9E4CE11E704397376C434164%2F40%22%2C%22figureurl_qq_2%22%3A%22http%3A%2F%2Fthirdqq.qlogo.cn%2Fqqapp%2F101204453%2F76EF5D4D9E4CE11E704397376C434164%2F100%22%2C%22gender%22%3A%22%E7%94%B7%22%2C%22is_lost%22%3A0%2C%22is_yellow_vip%22%3A%220%22%2C%22is_yellow_year_vip%22%3A%220%22%2C%22level%22%3A%220%22%2C%22msg%22%3A%22%22%2C%22nickname%22%3A%22IN_BLACK_IN%22%2C%22openid%22%3A%2276EF5D4D9E4CE11E704397376C434164%22%2C%22province%22%3A%22%22%2C%22ret%22%3A0%2C%22vip%22%3A%220%22%2C%22year%22%3A%221899%22%2C%22yellow_vip_level%22%3A%220%22%2C%22name%22%3A%22IN_BLACK_IN%22%2C%22avatar%22%3A%22http%3A%2F%2Fthirdqq.qlogo.cn%2Fqqapp%2F101204453%2F76EF5D4D9E4CE11E704397376C434164%2F40%22%7D";
var url = "https://h5.ele.me/hongbao/?from=groupmessage&isappinstalled=0#hardware_id=&is_lucky_group=True&lucky_number=6&track_id=&platform=0&sn=2a07ca21489ea0c1&theme_id=3033&device_id=&refer_user_id=31257437";

(async () => {

  // puppeteer.run(false, url, cookie, '18858336290', callback)

  console.log(await db.addRecord('18858336290', 1, 2))
  // console.log(await db.selectUserInfo('18858336290'))
  

})();

async function callback(res, phone) {
	console.log('callback:::' + res)
}