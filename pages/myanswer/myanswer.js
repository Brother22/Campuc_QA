// pages/myloveqa/myloveqa.js
//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore(e) {
    const db=wx.cloud.database()
    db.collection('answer_brief').where({ uid: app.globalData.id }).orderBy("time", "desc").get({
      success(res) {
        that.setData({
          list: res.data
        })
      }
    })
  },
  // getNextDate() {
  //   const now = new Date()
  //   now.setDate(now.getDate() - this.index++)
  //   return now
  // },
  onLoad() {
    let that = this
    const db = wx.cloud.database()
    console.log(111)
    
    db.collection('answer_brief').where({ uid: app.globalData.id }).orderBy("time","desc").get({
      success(res) {  
                that.setData({
                  list: res.data
                })
        wx.showToast({ title: "加载成功", icon: "success" })
      }
    })
    this.index = 1

  }
})
