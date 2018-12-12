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
    // wx.request({
    //   url: 'http://news-at.zhihu.com/api/4/news/latest',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success(res) {
    //     that.setData({
    //       banner: res.data.top_stories,
    //       list: [{ header: '今日问答' }].concat(res.data.stories)
    //     })
    //   }
    // })
    const db = wx.cloud.database()
    console.log(111)
    // console.log(app.globalData.id)
    db.collection('answer').where({ uid: app.globalData.id }).get({
      success(res) {
        // console.log(res.data)
        var a = new Array()
        var i = 0
        // console.log(i)
        // console.log(res.data.length)
        var len = res.data.length
        while (i < res.data.length) {
          db.collection('comment').where({ aid: res.data[i].aid }).get({
            success(res) {        
              // if (res.data.length != 0)
              for(var j=0;j < res.data.length;++j){
              a.push(res.data[j])
              }
              if (i == len || i == len - 1) {
                // console.log(a)
                that.setData({
                  list: a
                })
              }
            }
          })
          i++
        }
      }
    })
    this.index = 1

  }
})