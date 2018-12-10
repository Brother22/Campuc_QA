// pages/writequestion/write.js
Page({
  data: {
    height: 20,
    focus: false
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
  },

  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    // console.log(options.id)
    db.collection('question2').add({
      success: function (res) {
        // console.log(11111)
        console.log(res.data)
        that.setData({
          art: res.data[0]
        })
      }
    })
  }
})