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
    plain: false,
    arr:[]
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore(e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad() {
    let that = this
    const db = wx.cloud.database()
    console.log(111)
    db.collection('mylovequestion').where({ uid: app.globalData.id }).get({
      success(res) {
        // console.log(res.data)      
        var a = new Array()  
        var i = 0    
            // console.log(i)
          // console.log(res.data[0].qid)
        var len = res.data.length
        for (var k = 0; k < len; ++k) {
          that.data.arr.push(res.data[k].qid)
        } 
          db.collection('question').where({_id:db.command.in(that.data.arr)}).orderBy("time","desc").get({
            success(res){
                that.setData({
                  list:res.data
                })}  
          })
          }     
    })
    this.index = 1
  }
})
