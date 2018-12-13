// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = function (event, context) {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  // const _openid = event.userInfo.openId
  return db.collection("mylovequestion").where({qid:event.qid}).remove({
  })
  // return event
}

