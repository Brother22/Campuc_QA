// pages/myquestion/myquestion.js
//index.js
//获取应用实例
const app = getApp()
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
    id:''
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
    // wx.request({
    //   url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success(res) {
    //     that.setData({
    //       loading: false,
    //       list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
    //     })
    //   }
    // })
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
    
    // id: app.globalData.id
    // console.log(1111)
     console.log(app.globalData.id)
    // console.log(1111)
    const db = wx.cloud.database()
    db.collection('question2').where({ uid:app.globalData.id}).get({
      success(res){
         console.log(res)
       that.setData({
        //  banner: res.data.top_stories,
         list: { header: '今日问答', data: res.data}
       })
      }
    })
    this.index = 1

  }
})
