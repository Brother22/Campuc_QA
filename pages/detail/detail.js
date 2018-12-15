const app = getApp()
Page({
  data: {
    question:{},
      answer:{},
      author:{},
      isfan:'faning'
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  closequestion:function(){
    var that=this
    const db=wx.cloud.database()

    if (that.checkauthority()){
      wx.showModal({
        title: '提示',
        content: '问题关闭确认',
        success(res) {
          if (res.confirm) {
            console.log(that.data.question._id)
            that.updatefunction({ qid: that.data.question._id, union: "question", close: true })
          } 
        }
      })    
    }else{
      wx.showToast({
        title: '无权限',
        icon: 'loading',
        duration: 1000,
        mask: true,
      })
    }
  },

  checkauthority:function(){
    var that = this
    if(app.globalData.id === that.data.question.uid)
    {
      return true
    }
    return false
  },

//页面跳转至answer页
  answerquetsion:function(){
    var that = this
    // console.log(this.data.question.qid)
    if(that.data.question.close === false){
      console.log(this.data.question._id)
    wx.navigateTo({
      url: '../answer/answer?qid='+this.data.question._id
    })
    }
    else{
      wx.showToast({
        title: '问题已关闭',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
  },

  //跳转关注成功页
  fquestion: function () {
    console.log(this.data.question._id)
    var that=this
    const db = wx.cloud.database()
      if(that.data.isfan==="faning"){
          db.collection('mylovequestion').add({
      data:{
        uid:app.globalData.id,
        qid: that.data.question._id
      },
      success(res){
        that.setData({
          isfan: "faned"
        })
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
           console.log("ssssssssssssssssssssss")
          that.updatefanfunction({qid:that.data.question._id})
          that.setData({
            isfan:"faning"
          })
        }
      // }
    // })
  },
  onLoad (options) {
    var that=this
    that.getQestiondetail(options.id)
      console.log(options.uid)
      that.getUser(options.uid)
    that.getQuestion(options.id)
  },
  getUser: function (uid){
    var that=this
    const db=wx.cloud.database()
    db.collection('user').where({ _openid: uid }).get({
      success(res) {
        that.setData({
          author: { name: res.data[0].nickName, country: res.data[0].country, province: res.data[0].province, city: res.data[0].city }
        })
        console.log(res.data)
      }
    })
  },
  getQestiondetail:function(tqid){
    var that = this
    const db = wx.cloud.database()
    db.collection('question').where({_id: tqid }).get({
      success: function (res) {
        console.log(444444444)
        console.log(res.data)
        console.log(444444444)
        that.setData({
          question: res.data[0]
        })
        that.fanfunction()
      }
    })
  },
  getQuestion:function(tqid){
    var that=this
    const db=wx.cloud.database()
    db.collection('answer_brief').where({qid: tqid }).get({
      success: function (res) {
        console.log(1111)
        console.log(res.data)
        // if (res.data[0] != undefined){
        if (res.data.length === 0) {
          that.setData({
            answer: [{ title: '暂无回答' }]
          })
        }
        else {
          that.setData({
            answer: res.data
          })
        }
      },
        fail(res) {
        console.log(res)
      }
    })
  },
  updatefunction: function (e) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'updateclose',
      data: e,
      success(res) {
        wx.showToast({
          title: '关闭成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success(res){
            wx.navigateTo({
              url: '../user/user'
            })
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  updatefanfunction: function (e) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'updatefan',
      data: e,
      success(res) {
        console.log(res.result)
        wx.showToast({
          title: '取关成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success(res) {
            wx.navigateTo({
              url: '../user/user'
            })
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  fanfunction:function(){
    var that = this
    const db = wx.cloud.database()
    db.collection('mylovequestion').where({ qid: that.data.question._id }).get({
      success(res) { 
        if (res.data.length === 0) {
          that.setData({
            isfan:"faning"
          })
        }
        else {
           console.log(res.data.length)
          that.setData({
            isfan:"faned"
          })
          
          // wx.navigateTo({
          //   url: '../fsuccr/fsucc'
          // })
        }
      }
    })
  }
})
    
