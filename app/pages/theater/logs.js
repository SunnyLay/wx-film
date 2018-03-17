var event = require('../../utils/event')
var app = getApp()

Page({
  data: {
    head: {
      currentCity: '',
      placestr: '找影院'
    },
    theater: [],
    lat: 1,
    lng: 1,
    page: 1,
    size: 10
  },
  onLoad: function () {
    var that = this;
    this.setData({
      'head.currentCity': app.globalData.currentCity
    })
    wx.request({
      url: getApp().data.host + '/data/cityTheater?city=武汉',
      success: function (res) {
        // that.setData({
        //   theater: res.data.data
        // })
      }
    })

    wx.request({
      url: getApp().data.newHost + '/film/getCinemas/' 
      + that.data.lat + '/' 
      + that.data.lng + '/' 
      + that.data.page + '/'
      + that.data.size,
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            theater: res.data.content,
            page: that.data.page + 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            content: res.data.msg,
            duration: 2000
          })
        }

        // that.setData({
        //   theater: res.data.data
        // })
      }
    })
  },
  onShow: function () {
    var that = this
    app.getpol(function (currentCity) {
      that.setData({
        'head.currentCity': currentCity
      })
    }
    )
  }

})
