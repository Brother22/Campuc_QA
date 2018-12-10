//app.js
App({
  onLaunch: function () {
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
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              const db = wx.cloud.database()
              db.collection('user').add({
                // data 字段表示需新增的 JSON 数据
                data: res.userInfo,
                success: function (res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log(res)
                }
              })
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})