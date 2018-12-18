// pages/writequestion/write.js
var util=require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    height: 20,
    focus: false,
    nextid:0,
    param:{},
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {

  },



  bindFormSubmit: function (e) {
    console.log(33333)
    wx.showToast({
                        title: '提交中',
                        icon: 'loading',
                        duration: 1000,
                        mask: true,
                      })
    var that = this
        that.data.param.title=e.detail.value.textarea1,
        that.data.param.uid=app.globalData.id,
        that.data.param.image='1111111',
        that.data.param.close=false,
        that.data.param.time=util.formatTime(new Date()),
        that.data.param.isanswer=0,
        that.data.param.content=e.detail.value.textarea2
        that.writeqfunction(that.data.param)
  },

  

  onLoad(options) {

  },
writeqfunction(e){
  var db=wx.cloud.database()
  db.collection('question').add({
    data:e,
    success(res){
            wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000,
        mask: true,
      })
    }
  })
}

})