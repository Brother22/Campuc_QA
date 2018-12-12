var util=require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    art: {},
    Iniming:0,
    close:false
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  niming:function(e){
    var that=this
    if (e.detail.value.length == 0) {
      that.data.Iniming=0
    }
    else {
      that.data.Iniming=1
    }
    console.log(that.data.Iniming)
  },
  bindFormSubmit:function(e){
    var that = this
    const db = wx.cloud.database()
    console.log(e.detail.value)
    that.checkQuestion(e)
  },
checkQuestion:function(e){
  const db=wx.cloud.database()
  var that=this
  console.log(that.data.art.qid)
  db.collection('question').where({ _id:that.data.art.qid}).get({
      success(res){
        console.log(res.data[0].close)
        if(!(res.data[0].close)){
          db.collection("answer_brief").where({ title: e.detail.value.textarea1 }).get({
            success(res) {
              console.log(11111)
              if (res.data.length === 0) {
                db.collection("answer_brief").add({
                  data: {
                    title: e.detail.value.textarea1,
                    uid: app.globalData.id,
                    qid: that.data.art.qid,
                    type: that.data.Iniming,
                    time:util.formatTime(new Date())
                  },
                  success(res) {
                    db.collection("answer_brief").where({ title: e.detail.value.textarea1 }).get({
                      success(res) {
                        db.collection("answer").add({
                          data: {
                            content: e.detail.value.textarea2,
                            uid: app.globalData.id,
                            aid: res.data[0]._id,
                            type: that.data.Iniming
                          },
                          success(res) {
                            wx.navigateTo({
                              url: '../fsucc/fsucc'
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
              else {
                wx.navigateTo({
                  url: '../fsuccr/fsucc'
                })
              }
            }
          })

        }
        else {
          wx.navigateTo({
            url: '../fsuccr/fsucc'
          })}

      }
  })
},


  onLoad(options) {
    var that = this
    const db = wx.cloud.database()
    // console.log("123"+options.id)
    console.log(options.qid)
    db.collection('qdetail').where({ qid: options.qid }).get({
      success: function (res) {
         console.log(res.data[0])
        that.setData({
          art: res.data[0]
        })
      }
    })
  }
})
