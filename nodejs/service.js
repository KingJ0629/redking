
const {query} = require('./db');

// 获取user entity
async function selectUserInfo(userPhone) {
 let sql = 'SELECT * from ele_user where phone = ' + userPhone + ' limit 1'
 return await query(sql)
}
exports.selectUserInfo = selectUserInfo

// 获取捐助者
exports.selectContributor = async function selectContributor(notArray) {
 let sql = 'select * from ele_user where ele_user.phone not in (' + notArray + ') and ele_user.count > 0 and ele_user.count >= (select ele_status.number from ele_status limit 1) limit 1'
 return await query(sql)
}

// 获取当前status表的count
exports.selectCount = async function selectCount() {
 let sql = 'select ele_status.number from ele_status limit 1'
 return await query(sql)
}

// 更新status表的count
exports.updateStatus = async function updateStatus(newCount) {
 let sql = 'update ele_status set ele_status.number = ' + newCount
 return await query(sql)
}

// 当日帮人垫刀的次数减1
exports.updateUserCountMinus = async function updateUserCountMinus(userPhone) {
 let sql = 'select ele_user.count from ele_user where ele_user.phone = ' + userPhone
 let result = await query(sql)
 let sql_ = 'update ele_user set ele_user.count = ' + (result[0].count - 1) + ' where ele_user.phone = ' + userPhone
 return await query(sql_)
}

// 当日抢最大红包的次数加1
exports.updateUserCountPlus = async function updateUserCountPlus(userPhone) {
 let sql = 'select ele_user.count_get from ele_user where ele_user.phone = ' + userPhone
 let result = await query(sql)
 let sql_ = 'update ele_user set ele_user.count_get = ' + (result[0].count_get + 1) + ' where ele_user.phone = ' + userPhone
 return await query(sql_)
}

exports.addRecord = async function addRecord(userPhone, luckyNumber, luckyMoney) {
 let user = await selectUserInfo(userPhone)
 let sql = "insert into ele_record VALUES(0, '" + user[0].name + "', '" + user[0].phone + "', NOW(), " + luckyNumber + ", " + luckyMoney + ")"
 return await query(sql)
}