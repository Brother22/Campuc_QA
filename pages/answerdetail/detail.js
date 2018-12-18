const app = getApp()
Page({
  data: {
    art: {},
    author:{},
    comment:{},
    isfan:"faning",
    niming:0,
    admin:false
      },
  //       onReady() {
  // },
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

  closeanswer:function(){
    var that = this
    const db = wx.cloud.database()
    if (that.data.admin){
    wx.showModal({
      title: '提示',
      content: '答案删除确认',
      success(res) {
        if (res.confirm) {
          that.removeanswer({ aid: that.data.art._id, union: 'answer_brief'})
          db.collection('answer_brief').where({ qid: that.data.art.qid }).get({
            success(res) {
              if (res.data.length == 1) {
                that.updateq({ value: 0, union: 'question', qid: that.data.art.qid})
              }
            }
          })
        }
      }
    })
    }
    else{
      wx.showToast({
        title: '无权限',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
    
  },
  checkauthority: function () {
    var that = this
    const db = wx.cloud.database()
    console.log(app.globalData.id)
    db.collection('admin').where({mid:app.globalData.id}).get({
      success(res){
        console.log(res.data.length)
        if(res.data.length==0){
          that.setData({
            admin:false
          })
        }
        else{
          that.setData({
            admin: true
          })
        }
      },
      fail(err){
        console.log(err)
      }
    })
  },
  fanswer:function(){
    var that=this
    const db = wx.cloud.database()
    if(that.data.art.type === 0){
        if (that.data.isfan==="faning") {
          db.collection('myloveperson').add({
            data: that.data.author,
            success(res) {
              wx.showToast({
                title: '关注成功',
                icon: 'success',
                duration: 1000,
                mask: true
              })
              that.setData({
                isfan: "faned"
              })
            }
          })
          }
          else{
          that.updatefanfunction({ uid: app.globalData.id, fid: that.data.author.uid})
          that.setData({
            isfan: "faning"
          })
          }
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
    db.collection('answer_brief').where({ _id: options.id }).get({
      success: function (res) {
        that.setData({
          art: res.data[0]
        })
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
    db.collection('myloveperson').where({ uid: that.data.author.uid }).get({
      success(res) {
        for (var i = 0; i < res.data.length; ++i) {
          if (res.data[i]._openid === app.globalData.id) {
            if (that.data.art.type == 0) {
              that.setData({
                isfan: "faned"
              })
            }
            break
          }
        }
      }
      })
    that.checkauthority()
  },
  updatefanfunction(e) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'removefan',
      data: e,
      success(res) {
        console.log(res.result)
        wx.showToast({
          title: '取关成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        })
      }
    })
  },
  removeanswer(e){
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'removeanswer',
      data: e,
      success(res) {
        console.log(res.result)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  updateq(e){
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'update',
      data: e,
      success(res) {
      }
        })
  }
})
