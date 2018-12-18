const app = getApp()
Page({
  data: {
    comment: [{aid:''}],
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  // onPullDownRefresh() {
  //   var that = this
  //   wx.showNavigationBarLoading(
  //     {
  //       success(res) {
  //         wx.stopPullDownRefresh()
  //         wx.hideNavigationBarLoading()
  //       }
  //     }
  //   ) //在标题栏中显示加载
  //   that.getQuestionbrief()
  // },
  newcomment:function(){
    var that=this
    console.log(that.data.comment[0])
    wx.navigateTo({
      url: '../addcomment/addcomment?uid='+app.globalData.id+'&aid='+that.data.comment[0].aid
    })
  },
  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('comment').where({ aid: options.aid }).get({
      success(res) {
        
        if (res.data.length === 0) { 
          console.log(app.globalData.id)
          that.setData({
          comment: [{ content: '暂无评论', aid: options.aid, uid:''}]
          })
          // console.log(comment)
          }
        else { 
          //  console.log(res)
          that.setData({
            comment: res.data 
          })
        }
      }
    })
  },
})
