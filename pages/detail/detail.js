const app = getApp()
Page({
  data: {
    art: {},
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad (options) {
    var that = this
    const db = wx.cloud.database()
    // wx.request({
      // url: 'http://news-at.zhihu.com/api/4/news/' + options.id,
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    // Number Id = Number(options.id)
    db.collection('qdetail').where({uid:options.id}).get({
        success:function(res) {
          // console.log(1111)
           console.log(res.data)
          // console.log({ header: '今日问答', data: res.data[0].stories })
          that.setData({
            //  banner: res.data.top_stories,
            // list: { header: '今日问答', data: res.data[0].stories }
           art:res.data[0]
          })
          // console.log(art)
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