// pages/myloveqa/myloveqa.js
//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    arr:[],
    // Index:1
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore(e) {
    // const db=wx.cloud.database()
    var that=this
    // db.collection('comment').where({ aid: db.command.in(that.data.arr) }).orderBy("time", "desc").get({
    //   success(res) {
    //     console.log("sss" + res.data.length)
    //     for (var j = 0; j < res.data.length; ++j) {
    //       a.push(res.data[j])
    //     }
    //       that.setData({
    //         list: a
    //       })
    //   }
    // })

    that.getComment()
  },
  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad() {
     let that = this
    // const db = wx.cloud.database()
    // console.log(111)
    // // console.log(app.globalData.id)
    // db.collection('answer').where({ uid: app.globalData.id }).get({
    //   success(res) {
    //     console.log(res.data)
    //     var a = new Array()
    //     var i = 0
    //     // console.log(i)
    //     // console.log(res.data.length)
    //     var len = res.data.length
    //     for(var k=0;k<len;++k){
    //       that.data.arr.push(res.data[i].aid)
    //     }
    //     // while (i < res.data.length) {
    //       db.collection('comment').where({ aid:db.command.in(that.data.arr)}).orderBy("time","desc").get({
    //         success(res) {        
    //           console.log("sss"+res.data.length)
    //           for(var j=0;j < res.data.length;++j){
    //           a.push(res.data[j])
    //           }
    //             that.setData({
    //               list: a
    //             })
    //         }
    //       })
    //       // i++
    //     // }
    //   }
    // })
    // that.data.Index+=1
    that.getComment()
    // this.index = 1
  },
  getComment:function(){
    let that = this
    const db = wx.cloud.database()
    console.log(111)
    // console.log(app.globalData.id)
    db.collection('answer_brief').where({ uid: app.globalData.id }).get({
      success(res) {
        // console.log(res.data)
        var a = new Array()
        var i = 0
        // console.log(i)
        console.log(res.data)
        var len = res.data.length
        for (var k = 0; k < len; ++k) {
          that.data.arr.push(res.data[k]._id)
        }
        console.log(that.data.arr)
        // while (i < res.data.length) {
        db.collection('comment').where({aid: db.command.in(that.data.arr) }).orderBy("time", "desc").get({
          success(res) {
            console.log(res.data)
            that.setData({
              list: res.data
            })
          }
        })
      }
    })
  }

})
