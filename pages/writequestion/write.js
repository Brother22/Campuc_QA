// pages/writequestion/write.js
var util=require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    height: 20,
    focus: false,
    nextid:0,
    param:{},
    // que:{
    //   title:'',
    //   uid :'',
    //   image :'11111',
    //   close :false,
    //   time :util.formatTime(new Date()),
    //   isanswer : 0,
    //   content :''
    // }
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    //  console.log(e.detail.value)
    // console.log(e.)
  },



  bindFormSubmit: function (e) {
    console.log(33333)
    wx.showToast({
                        title: '提交中',
                        icon: 'loading',
                        duration: 1000,
                        mask: true,
                      })
    var that = this
        that.data.param.title=e.detail.value.textarea1,
        that.data.param.uid=app.globalData.id,
        that.data.param.image='1111111',
        that.data.param.close=false,
        that.data.param.time=util.formatTime(new Date()),
        that.data.param.isanswer=0,
        that.data.param.content=e.detail.value.textarea2
        that.writeqfunction(that.data.param)
    // console.log(that.data.param)
    // const db = wx.cloud.database()
    
    //    db.collection("question").add({
    //     data: {
    //           title: e.detail.value.textarea1,
    //           uid: app.globalData.id,
    //           image: '1111111',
    //           close:false,
    //           time: util.formatTime(new Date()),
    //           isanswer:0,
    //           content: e.detail.value.textarea2
    //         },
    //         success(res){
    //           wx.showToast({
    //                     title: '发布成功',
    //                     icon: 'success',
    //                     duration: 1000,
    //                     mask: true,
    //                   })
             
    //         },
    //      fail(res){
    //        console.log(err)
    //      }

    //    })
    // db.collection("question").where({ title: e.detail.value.textarea1}).get({
    //   success(res){
    //     if(res.data.length === 0){
    //       db.collection('question').add({
    //         data: {
    //           qid: that.data.nextid,
    //           title: e.detail.value.textarea1,
    //           uid: app.globalData.id,
    //           image: '1111111',
    //           close:false,
    //           time: util.formatTime(new Date()),
    //           isanswer:0
    //         },
    //         success(res) {
    //           console.log(222222)
    //           db.collection("question").where({ title: e.detail.value.textarea1 }).get({
    //             success(res) {
    //               db.collection("qdetail").add({
    //                 data: {
    //                   qid: res.data[0]._id,
    //                   content: e.detail.value.textarea2,
    //                   uid: app.globalData.id
    //                   // image = '1111111'
    //                 },
    //                 success(res) {
    //                   console.log(33333)
    //                   wx.showToast({
    //                     title: '成功',
    //                     icon: 'succes',
    //                     duration: 1000,
    //                     mask: true,
    //                   })  
    //                 }
    //               })
    //             }
    //           })

    //         }
    //       })
    //     }
    //     else{
    //       wx.navigateTo({
    //         url: '../fsuccr/fsucc'
    //       })
    //     }
    //   }
    // })
    
  },

  

  onLoad(options) {
    // var that = this
    // const db = wx.cloud.database()
    // console.log(options.id)
    // db.collection('question2').where({id:0}).get({
    //   success: function (res) {
    //     // console.log(11111)
    //     //  console.log(res.data[0].nextqid)
    //     that.setData({
    //       nextid: res.data[0].nextqid
    //     })
    //   }
    // })
  },
// submitfunction:function(e,param){
//   wx.cloud.init()
//   wx.cloud.callFunction({
//     name: 'submitquestion',
//     data: {e,param},
//     success(res) {
//       console.log(res)
//       wx.showToast({
//         title: '提交成功',
//         icon: 'success',
//         duration: 1000,
//         mask: true,
//         success(res) {
//           // wx.navigateTo({
//           //   url: '../user/user'
//           // })
          
//         }
//       })
// },
// fail(err){
//   console.log(err)
// }
// })
// }
writeqfunction(e){
  wx.cloud.init()
  wx.cloud.callFunction({
    name:'addquestion',
    data:e,
    success(res) {
      console.log(2222)
      console.log(res.result)
      console.log(2222)
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000,
        mask: true,
      })
    },
    fail(res) {
      // console.log(e)
        // console.log(res)
    }
  })
}

})