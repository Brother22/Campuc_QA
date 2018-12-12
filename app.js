//app.js
App({
  onLaunch: function () {
    wx.cloud.init()
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // console.log("123")
    wx.cloud.init()
  },
  getUserInfo:function(cb){
    var that = this  
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res),
          that.globalData.Code = res.code
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              const db = wx.cloud.database()             
                that.getOpenid()
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });

    }
  },
  getOpenid:function(){
  var that=this
  const db=wx.cloud.database()
  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'wxaa3098e73a66c15b' + '&secret=' + 'bb7061157ae084e80e90e8830f7b9a95' + '&js_code=' + that.globalData.Code + '&grant_type=authorization_code'
  wx.request({
    url: l,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    success: function (res) {
      that.globalData.id = res.data.openid
    console.log(that.globalData.id)
      db.collection('user').where({ _openid: res.data.openid }).get({
        success(res) {
          if (res.data.length === 0) {
            db.collection('user').add({ data: that.globalData.userInfo })
          }
          else {
            if (res.data[0].nickname === that.globalData.userInfo.nickname && res.data[0].avatarUrl === that.globalData.userInfo.avatarUrl && res.data[0].city === that.globalData.userInfo.city && res.data[0].provice === that.globalData.userInfo.provice && res.data[0].country === that.globalData.userInfo.country) { }
            else { db.collection('user').update({ data: that.globalData.userInfo }) }
          }
        }
      })
    }
  })
},
  globalData:{
    userInfo:null,
    id:'',
    Appid:'wxaa3098e73a66c15b',
    Appsercet:'ad378e7e0adbb27fbd6b60f4f21cd1e2',
    Code:'',
    res:{}
  }
})