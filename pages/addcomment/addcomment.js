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
        wx.navigateTo({
          url: '../fsucc/fsucc'
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
