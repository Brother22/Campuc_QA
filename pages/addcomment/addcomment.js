const app = getApp()
var util=require("../../utils/util.js");
Page({
  data: {
    art: {},
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  bindFormSubmit: function (e) {
    var that = this
    const db = wx.cloud.database()
    console.log(that.data.art)
    db.collection("comment").add({
      data: {
        content: e.detail.value.textarea1,
        uid: app.globalData.id,
        aid: that.data.art.aid,
        time: util.formatTime(new Date())
      },
      success(res) {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
      }
    })
  },


  onLoad(options) {
    var that = this
    // const db = wx.cloud.database()
    that.setData({
      art: options
    })  
  }
})
