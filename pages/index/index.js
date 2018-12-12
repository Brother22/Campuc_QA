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
  loadMore (e) {
    if (this.data.list.length === 0) return
    // var date = this.getNextDate()
    var that = this
    that.getQuestionbrief()
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad () {
    let that = this
    that.getQuestionbrief()
    this.index = 1
    
  },
  getQuestionbrief:function(){
    const db = wx.cloud.database()
    var that=this
    db.collection('question').orderBy("time", "desc").get({
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })
  }
})
