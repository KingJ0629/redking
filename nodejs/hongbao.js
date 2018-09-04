const input = require('./input');
const db = require('./service');
const puppeteer = require('./settings');

// 引入两个输入参数
var url = input.url;
var userPhone = input.userPhone;

var notArray = [];// 用来存放排除的user的数组
var userEntity //需要最大红包的人的手机号对应的cookie
var luckyNumber; //最大红包数位置

(async () => {

  notArray.push(userPhone);
  luckyNumber = parseUrl(url)

  if (luckyNumber == null) {
    console.log('The url is wrong!')
    return;
  }

  // get user
  userEntity = await db.selectUserInfo(userPhone);
  if (userEntity[0] != null && userEntity[0].cookie != null) {
    console.log('The user phone is: ', userEntity[0].phone)
    contribute()
  } else {
    console.log('未授权的用户手机号，请联系管理员!');
  }
  
})();

// 贡献
async function contribute() {

  // 去拿到垫刀的entity
  let contributor = await db.selectContributor(notArray)
  if (contributor[0] != null && contributor[0].cookie != null) {
    console.log('The contributor phone is:' + contributor[0].phone)

    puppeteer.run(true, url, contributor[0].cookie, contributor[0].phone, contributeCallback)
  } else {
    //如果已经没有该count下的贡献者了，status表下的count减1,在回调自己
    let status = await db.selectCount()
    var newCount = status[0].number - 1
    if (newCount <= 0) {
      console.log('今日已经不能再抢红包了！！！')
      return
    }
    
    await db.updateStatus(newCount)
    console.log('updateStatus:::' + newCount)
    contribute()
  }
}

// 贡献者调用puppeteer回调函数
async function contributeCallback(res, phone) {
  notArray.push(phone)

  var obj = JSON.parse(res)
  // 抢红包的人数
  var numberNow = obj.promotion_records.length
  let result = await db.updateUserCountMinus(phone);
  // 执行成功
  if (result.affectedRows == 1) {
    if (luckyNumber == numberNow + 1) {
      // 该拿大红包了
      console.log('嘿嘿，是时候领取大红包了')
      puppeteer.run(false, url, userEntity[0].cookie, userEntity[0].phone, reapCallback)
    } else if (numberNow >= luckyNumber) {
      // 已经没有最大红包的情况
      console.log('已经没有最大红包了！！！')
    } else {
      // 继续垫刀
      console.log('继续垫刀')
      contribute()
    }
  }
  console.log('now number is ' + numberNow)
}

// 收割者调用puppeteer回调函数
async function reapCallback(res, phone) {
  var obj = JSON.parse(res)
  // 抢红包的人数
  var numberNow = obj.promotion_records.length  
  let result = await db.updateUserCountPlus(phone);
  // 执行成功
  if (result.affectedRows == 1) {
    if (numberNow == luckyNumber) {
      // 已经没有最大红包的情况
      console.log('嘿嘿嘿，抢到大红包啦')
      await db.addRecord(phone, luckyNumber, obj.promotion_items.amount)
    } else {
      // 出问题啦
      console.log('该红包同时被人抢啦！')
    }
  }
  console.log('now number is ' + numberNow)
}

// 解析地址，拿到最大红包的index
function parseUrl(str) {
  var array = str.split("?")

  if (array.length == 1) {
    array = str.split("#")
  }

  if (array.length == 2) {
    var array2 = array[1].split("&")
    for (var i = 0; i < array2.length; i++) {
      if (array2[i].indexOf("lucky_number") > -1) {
        var array3 = array2[i].split("=")

        if (array3 != null && array3.length == 2) {
          // 拿到最大红包的序号 array3[1]
          let number = array3[1]
          console.log('The big at index: ' + number)
          return number
        }
      }
    }
  }
}