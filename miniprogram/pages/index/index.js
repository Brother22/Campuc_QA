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
    plain: false,
    Index:1,
    imagepath:'../../images/question'
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore (e) {
    // if (this.data.list.length === 0) return
    var that = this
    that.data.Index +=1
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
    that.data.Index = 1
  },
  getQuestionbrief:function(){
    const db = wx.cloud.database()
    var that=this
    db.collection('question').where({close:false}).orderBy("time", "desc").limit(4*that.data.Index).get({
      success(res) {
        // console.log(res.data)
        that.setData({
          list: res.data
        })
        wx.showToast({ title: "加载成功", icon: "success" })
      }
    })
  },
  testfunction:function(e){
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'update',
      data: {
        title: '问题十用户二',
        qid:e
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
         console.log(res)
      }
    })
  }
})
