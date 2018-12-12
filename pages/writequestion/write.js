// pages/writequestion/write.js
const app = getApp()

Page({
  data: {
    height: 20,
    focus: false,
    nextid:0
  },
  // question1: {
  //   qid: nextid,
  //   title: e.detail.value.textarea1,
  //   uid: app.globalData.id,
  //   image: '1111111'
  // },
  // question2: {
  //   qid: that.data.nextid,
  //   content :e.detail.value.textarea2,
  //   uid : app.globalData.id
  //   // image = '1111111'
  // },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    //  console.log(e.detail.value)
    // console.log(e.)
  },

  bindFormSubmit2:function(e){
    // const db = wx.cloud.database()
    // db.collection('question2').doc('XA85YuSiwXKAQmth').update({
    //   // data 传入需要局部更新的数据
    //   data: {
    //     // _id:'XA85YuSiwXKAQmth',
    //     id: 0,
    //     nextqid: 5
    //   },
    //   success(res) {
    //     console.log(res),
    //       console.log('更新成功')
    //     // db.collection('question2').doc('XA85YuSiwXKAQmth').get({
    //     //   // data 传入需要局部更新的数据
    //     //   // data: {
    //     //   //   nextqid: 5
    //     //   // },
    //     //   success(res) {
    //     //     console.log(res)
    //     //   },
    //     //   fail(res) {
    //     //     console.log(res)
    //     //   }
    //     // })
    //   },
    //   fail(res) {
    //     console.log(res)
    //   }
    // })
  },

  bindFormSubmit: function (e) {
    var that = this
    const db = wx.cloud.database()
    console.log(222222)
    //  console.log(e.detail.value.textarea2)
    db.collection('question2').add({
      data: {
        qid: that.data.nextid,
        title: e.detail.value.textarea1,
        uid: app.globalData.id,
        image: '1111111'
      },
      success(res){
        db.collection("question2").where({ title: e.detail.value.textarea1}).get({
          success(res){
            db.collection("qdetail").add({
              data: {
                qid: res.data[0]._id,
                content: e.detail.value.textarea2,
                uid: app.globalData.id
                // image = '1111111'
              },
              success(res) {
                console.log(33333)
                wx.navigateTo({
                  url: '../writesucc/writesucc'
                })
              }
            })
          }
        })
       
      }
    })
  },

  

  onLoad(options) {
    // var that = this
    // const db = wx.cloud.database()
    // console.log(options.id)
    // db.collection('question2').where({id:0}).get({
    //   success: function (res) {
    //     // console.log(11111)
    //     //  console.log(res.data[0].nextqid)
    //     that.setData({
    //       nextid: res.data[0].nextqid
    //     })
    //   }
    // })
  }
})