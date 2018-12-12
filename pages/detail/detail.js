const app = getApp()
Page({
  data: {
    question:{},
      answer:{},
      author:{}
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
      db.collection("question2").doc(that.data.question.qid).update({
        data:{
            close:true
        },
        success(res){
          wx.navigateTo({
            url: '../fsucc/fsucc'
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../fsuccr/fsucc'
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
    console.log(this.data.question.qid)
    wx.navigateTo({
      url: '../answer/answer?qid='+this.data.question.qid
    })
  },
  //跳转关注成功页
  fquetsion: function () {
    console.log(this.data.question.qid)
    var that=this
    const db = wx.cloud.database()
    db.collection('mylovequestion').where({qid:that.data.question.qid}).get({
      success(res){
        if(res.data.length===0){
          console.log(res.data.length)
          db.collection('mylovequestion').add({
      data:{
        uid:app.globalData.id,
        qid: that.data.question.qid
      },
      success(res){
        wx.navigateTo({
          url: '../fsucc/fsucc'
        })
      },
      fail(res){console.log("ssss"+res)}
    })
        }
        else{
          wx.navigateTo({
            url: '../fsuccr/fsucc'
          })
        }
      }
    })
  },
  onLoad (options) {
    var that=this
    that.getQestiondetail(options.id)
      console.log(options.uid)
      that.getUser(options.uid)
    that.getQuestion(options.id)
      // console.log()
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
    db.collection('qdetail').where({ qid: tqid }).get({
      success: function (res) {
        // console.log(1111)
        // console.log(options.id)
        that.setData({
          question: res.data[0]
        })
      }
    })
  },
  getQuestion:function(tqid){
    var that=this
    const db=wx.cloud.database()
    db.collection('answer_brief').where({ qid: tqid }).get({
      success: function (res) {
        // console.log(1111)
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
  }
    })
