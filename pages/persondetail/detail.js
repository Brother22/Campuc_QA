const app = getApp()
Page({
  data: {
    art: {},
    artq: {},
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    // console.log("123"+options.id)
    db.collection('user').where({ id: Number(options.id) }).get({
      success: function (res) {
         console.log(res.data)
        that.setData({
          art: res.data[0]
        })
      }
    })

    db.collection('answer').where({ uid: Number(options.id) }).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          artq: res.data
        })
      }
    })



  }
})
