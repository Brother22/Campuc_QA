const app = getApp()
Page({
  data: {
    art: {},
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  // submit:function(){
  //   var that = this
  //   const db = wx.cloud.database()
  //   db.collection("answer_brief").add({
  //     data: {
  //       title: e.detail.value.textarea1,
  //       uid: app.globalData.id,
  //       qid: that.data.art.qid,
  //       type: 1
  //     },
  //     success(res) {
  //       db.collection("answer_brief").where({ title: e.detail.value.textarea1 }).get({
  //         success(res) {
  //           db.collection("answer").add({
  //             data: {
  //               content: e.detail.value.textarea2,
  //               uid: app.globalData.id,
  //               aid: res.data[0]._id
  //             },
  //             success(res) {
  //               wx.navigateTo({
  //                 url: '../fsucc/fsucc'
  //               })
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
  niming:function(e){
    var that=this
    if (e.detail.value == '') {
      that.data.art.type=0
    }
    else {
      that.data.art.type=1
    }
  },
  bindFormSubmit:function(e){
    var that = this
    const db = wx.cloud.database()
    console.log(e.detail.value)
    db.collection("answer_brief").add({
      data:{
        title: e.detail.value.textarea1,
        uid: app.globalData.id,
        qid:that.data.art.qid,
        type:that.data.art.type
      },
      success(res){
        db.collection("answer_brief").where({ title: e.detail.value.textarea1}).get({
          // data: {
          //   title: e.detail.value.textarea1,
          //   uid: app.globalData.id,
          //   qid: that.art.qid,
          //   aid: 0
          // }
      success(res){
        db.collection("answer").add({
          data: {
            content: e.detail.value.textarea2,
            uid: app.globalData.id,
            aid: res.data[0]._id,
            type:that.data.art.type
          },
          success(res){
            wx.navigateTo({
              url: '../fsucc/fsucc'
            })
          }
        })
      }
    })
      }
    })
  },


  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    // console.log("123"+options.id)
    console.log(options.qid)
    db.collection('qdetail').where({ qid: options.qid }).get({
      success: function (res) {
         console.log(res.data[0])
        that.setData({
          art: res.data[0]
        })
      }
    })
  }
})
