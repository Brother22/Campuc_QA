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
  onPullDownRefresh() {
    var that=this
    wx.showNavigationBarLoading(
      {
        success(res){
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
        }
      }
    ) //在标题栏中显示加载
    that.getQuestionbrief()
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore (e) {
    var that = this
    that.data.Index +=1
    that.getQuestionbrief()
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
        that.setData({
          list: res.data
        })
        wx.showToast({ title: "加载成功", icon: "success" })
      }
    })
  },
})
