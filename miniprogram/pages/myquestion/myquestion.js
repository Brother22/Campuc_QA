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
    loading:false,
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
    var that = this
    // that.setData({ loading: true })
    const db = wx.cloud.database()
    db.collection('question').where({ uid: app.globalData.id }).orderBy("time", "desc").limit(1).get({
      success(res) {
        console.log(res)
        that.setData({
          list: { 
            data: res.data ,
          },
        //  loading:false
        })
        wx.showToast({title:"刷新成功",icon:"success"})
      }
    })
    // that.setData({ loading:false})
  },



  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad() {
    let that = this
    
    // id: app.globalData.id
    // console.log(1111)
     console.log(app.globalData.id)
    // console.log(1111)
    const db = wx.cloud.database()
    db.collection('question').where({ uid:app.globalData.id}).orderBy("time","desc").get({
      success(res){
         console.log(res)
       that.setData({
        //  banner: res.data.top_stories,
         list: {data: res.data}
       })
      }
    })
    this.index = 1

  }
})