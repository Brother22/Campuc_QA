//app.js
App({
  onLaunch: function () {
    wx.cloud.init()
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("123")
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
          that.globalData.Code = res.code
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              // that.globalData.id = res.userInfo._openid
              const db = wx.cloud.database()
              db.collection('user').add({
                // data 字段表示需新增的 JSON 数据
                data: res.userInfo,
                
                success: function (res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  // console.log(res)
                  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'wxaa3098e73a66c15b' + '&secret=' + 'bb7061157ae084e80e90e8830f7b9a95' + '&js_code=' + that.globalData.Code + '&grant_type=authorization_code'
                  wx.request({
                    url: l,
                    data: {},
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                    // header: {}, // 设置请求的 header  
                    success: function (res) {
                      // var obj = {};
                      // obj.openid = res.data.openid
                      // obj.expires_in = Date.now() + res.data.expires_in
                      //console.log(obj);
                      // wx.setStorageSync('user', obj);//存储openid 
                      that.globalData.id = res.data.openid
                      // console.log(234555555555)
                      // console.log(res.data.openid)
                    }
                  })
                }
              })
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });

    }
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