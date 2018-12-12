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
//页面跳转至answer页
  answerquetsion:function(){
    console.log(this.data.question.qid)
    wx.navigateTo({
      url: '../answer/answer?qid='+this.data.question.qid
    })
  },
  //跳转关注成功页
  fquetsion: function () {
    // console.log(this.data.question.qid)
    var that=this
    const db = wx.cloud.database()
    db.collection('mylovequetion').where({qid:that.data.question.qid}).get({
      success(res){
        if(res.data.length===0){
    db.collection('mylovequetion').add({
      data:{
        uid:app.globalData.id,
        qid: this.data.question.qid
      },
      success(res){
        wx.navigateTo({
          url: '../fsucc/fsucc'
        })
      }
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
    var that = this
    const db = wx.cloud.database()
    db.collection('qdetail').where({qid:options.id}).get({
        success:function(res) {
          // console.log(1111)
          // console.log(options.id)
          that.setData({
           question:res.data[0]
          })
        }
      }),
      console.log(options.uid)
      db.collection('user').where({_openid:options.uid}).get({
       
        success(res){
          that.setData({
            author: { name: res.data[0].nickName, country: res.data[0].country, province: res.data[0].province, city: res.data[0].city}
          })
        }
      }),
    db.collection('answer_brief').where({ qid: options.id }).get({
      success: function (res) {
        // console.log(1111)
         console.log(res.data)
        // if (res.data[0] != undefined){
        if (res.data.length === 0){
        that.setData({
          answer: [{ title: '暂无回答' }]
        })
        }
        else{
          that.setData({
            answer: res.data
          })
        }
        // }
        // else{
          // answer[0]={title:'暂无回答'}
        // }
        // console.log(art)
      },
      fail(res){
        console.log(res)
      }
      // fail(err){
      //   console.log(22222)
      // }
    })
  }
      // success (res) {
      //   if (res.data.body) {
      //     var body = res.data.body;
      //     body = body.match( /<p>.*?<\/p>/g );
      //     var ss = [];
      //     if (body) {
      //       for( var i = 0, len = body.length; i < len;i++ ) {
      //       ss[ i ] = /<img.*?>/.test( body[ i ] );
      //       if( ss[ i ] ) {
      //         body[ i ] = body[ i ].match( /(http:|https:).*?\.(jpg|jpeg|gif|png)/ );
      //       } else {
      //         body[ i ] = body[ i ].replace( /<p>/g, '' )
      //         .replace( /<\/p>/g, '' )
      //         .replace( /<strong>/g, '' )
      //         .replace( /<\/strong>/g, '' )
      //         .replace( /<a.*?\/a>/g, '' )
      //         .replace( /&nbsp;/g, ' ' )
      //         .replace( /&ldquo;/g, '"' )
      //         .replace( /&rdquo;/g, '"' );
      //       }
      //     }
      //     }
      //     res.data.body = body
      //   }
      //    that.setData({
      //      art: res.data
      //    })
      // }
    })
//   }
// })