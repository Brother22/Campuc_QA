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
    url: '../comment/comment?aid=' + that.data.art.aid + '&uid=' + that.data.art.uid
  })
},


  fanswer:function(){
    var that=this
    const db = wx.cloud.database()
    if(that.data.art.type === 0){
    db.collection('myloveperson').where({ uid: that.data.author.uid}).get({
      success(res){
        if (res.data.length === 0) {
          db.collection('myloveperson').add({
            data: that.data.author,
            success(res) {
              wx.navigateTo({
                url: '../fsucc/fsucc'
              })
            }
          })
          
          }
          else{
          wx.navigateTo({
            url: '../fsuccr/fsucc'
          })
          }
      }
    })
    }
    // db.collection('myloveperson').add({
    //   data:that.data.author
    // })
  },

  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    // console.log("123"+options.id)
    db.collection('answer').where({ aid: options.id }).get({
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
      // console.log(that.data.art)
      // db.collection('user').where({ _openid: options.uid }).get({
      //   success(res) {
          
      //     if(art.type === 0){
      //     that.setData({
      //       author: { name: res.data[0].nickName, country: res.data[0].country, province: res.data[0].province, city:                   res.data[0].city, uid: res.data[0]._openid, image:res.data[0].avatarUrl}
      //     })
      //   }
      //   else{
      //       that.setData({
      //       author: { name:'匿名', country:'', province:'', city:'', uid:'', image:''}
      //       })
      //   }
      //   }
      // })
  }
})
