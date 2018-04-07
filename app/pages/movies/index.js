
var app = getApp()
var event = require('../../utils/event')
Page({
  data: {
    head: {
      currentCity: '',
      placestr: '找电影 影院'
    },

    indexData: {},
    counts: 10,
    start: 1,
    movies:{},
    page: 1,
    size: 10,
    swiperImg: ["1.png", "2.png", "3.png"]
  },
  onLoad: function () {
    var that = this

    wx.request({
      url: getApp().data.host + '/api/index?city=' + that.data.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
      success: function (res) {
        //     console.log(res.data)
        //     that.setData({
        //       indexData: res.data.data,
        //       start: that.data.start + that.data.counts
        //     })
      }
    }),
      wx.request({
        url: getApp().data.newHost + '/film/getHotMovies/' + that.data.page + '/' + that.data.size,
        success: function (res) {
          console.log(res);
          if (res.data.code == 0) {
            that.setData({
              movies: res.data.content,
              page: that.data.page+1,
              host:getApp().data.newHost
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              content: res.data.msg,
              duration: 2000
            })
          }

        }
      })

  },
  onShow: function () {
    console.log('index-onShow')
    var that = this
    app.getpol(
      function (currentCity) {
        that.setData({
          'head.currentCity': currentCity
        })
      }
    )
  },

  onReachBottom: function () {
    var that = this
    // wx.request({
    //   url: getApp().data.host + '/api/index?city=' + that.data.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
    //   success: function (res) {
    //     var moviesLi = that.data.indexData.moviesList
    //     var nextLi = res.data.data.moviesList;
    //     var newLi = moviesLi.concat(nextLi)
    //     that.setData({
    //       'indexData.moviesList': newLi,
    //       start: that.data.start + that.data.counts
    //     })
    //   }
    // })
    wx.request({
      url: getApp().data.newHost + '/film/getHotMovies/' + that.data.page + '/' + that.data.size,
      success: function (res) {
        var moviesLi = that.data.movies
        var nextLi = res.data.content;
        console.info(nextLi);
        var newLi = moviesLi.concat(nextLi)
        if (nextLi.length == 0){
          wx.showToast({
            title: '暂无更多数据...',
            icon: 'none',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '加载中',
            icon:'loading',
            duration: 1000
          })
        that.setData({
          movies: newLi,
          page: that.data.page + 1
        })
        }
      }
    })
  }
})
