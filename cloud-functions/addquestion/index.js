// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = function (event, context) {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  //  return event
 return db.collection("question").add({
    data:event,
    success(res) {
      // wx.showToast({
      //   title: '发布成功',
      //   icon: 'success',
      //   duration: 1000,
      //   mask: true,
      // })
    },
    fail(res) {
      // console.log(err)
    }

  })
  // return event
}

