const app = getApp()
Page({
  data: {
    art: {},
    author:{},
    comment:{}
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },

fcomment:function(){
  var that=this
  wx.navigateTo({
    url: '../comment/comment?aid=' + that.data.art._id + '&uid=' + that.data.art.uid
  })
},


  fanswer:function(){
    var that=this
    var I = true
    const db = wx.cloud.database()
    if(that.data.art.type === 0){
      // console.log(2222222222222222)
      console.log(app.globalData.id)
    db.collection('myloveperson').where({uid:that.data.author.uid}).get({
      success(res){
        console.log(res.data)
        for (var i = 0; i < res.data.length;++i){
            if(res.data[i]._openid === app.globalData.id)
            {
             
              I = false
              break
            }
        }
        if (I) {
          db.collection('myloveperson').add({
            data: that.data.author,
            success(res) {
              wx.showToast({
                title: '关注成功',
                icon: 'success',
                duration: 1000,
                mask: true
              })
            }
          })
          }
          else{
          wx.showToast({
            title: '已在关注列表中',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
          }
      }
    })
    }
    else {
      wx.showToast({
        title: '无法关注',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
  },

  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    // console.log("123"+options.id)
    db.collection('answer_brief').where({ _id: options.id }).get({
      success: function (res) {
        // console.log(art)
        // console.log(res.data)
        that.setData({
          art: res.data[0]
        })
        // console.log(res.data[0].type)
          if(res.data[0].type === 1) {
            that.setData({
              author: { name: '匿名', country: '', province: '', city: '', uid: '', image: '' }
            }) 
          }
          else{
            db.collection('user').where({ _openid: options.uid }).get({
              success(res) {
                that.setData({
                  author: { name: res.data[0].nickName, country: res.data[0].country, province: res.data[0].province, city: res.data[0].city, uid: res.data[0]._openid, image: res.data[0].avatarUrl }
                })
              }
              })
          }
      }
    })
  }
})
