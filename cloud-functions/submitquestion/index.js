// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = function (event, context) {
   const db = cloud.database()
  var value = 0
  var resu=0
  return db.collection("question").where({ _id:'XBJfEZT75u22fPQH'}).get({
    success(res) {
      value = 2 
      if (res.data.length === 0) {
        db.collection('question').add({
          data: {
            qid: 0,
            title: event.e.textarea1,
            uid: event.param.id,
            image: '1111111',
            close: false,
            time: event.param.time,
            isanswer: 0
          },
          success(res) {
            console.log(222222)
            db.collection("question").where({ title: e.textarea1 }).get({
              success(res) {
                db.collection("qdetail").add({
                  data: {
                    qid: res.data[0]._id,
                    content: e.textarea2,
                    uid: event.param.id
                    // image = '1111111'
                  },
                  success(res) {
                    // console.log(33333)
                    // wx.showToast({
                    //   title: '成功',
                    //   icon: 'succes',
                    //   duration: 1000,
                    //   mask: true,
                    // })
                    value=1
                  }
                })
              }
            })

          }
        })
      }
      else {
        // wx.navigateTo({
        //   url: '../fsuccr/fsucc'
        // })
        // value=0
      }
    },
    fail(err){
      resu=err
    }
  })
   
}

