var event = require('../../utils/event')
var util = require('../../utils/util')
var threedays = util.getWeek(3)
Page({
  data: {
    activeindex: 2,
    shop: {},
    imgUrl: '',
    activemovie: {},
    threedays: threedays,
    theday: 0,
    lng:1,
    lat:1,
    cinemasId:1
  },
  onLoad: function (options) {
    //加载参数
    var cinemasId = options.cinemasId;
    var lng = options.lng;
    var lat = options.lat;
    that.setData({
      cinemasId: cinemasId,
      lng:lng,
      lat:lat
    })
    var that = this;
    //请求影院的详细数据
    wx.request({
      url: getApp().data.host + '/shop/',
      success: function (res) {
        console.log(res.data.data)
        var shop = res.data.data
        var imgUrl = shop.movies[2].cover
        var activemovie = shop.movies[2]
        // that.setData({
        //   shop: shop,
        //   imgUrl: imgUrl,
        //   activemovie: activemovie
        // })
      }
    })
    wx.request({
      url: getApp().data.host + '/shop/',
      success: function (res) {
        console.log(res.data.data)
        var shop = res.data.data
        var imgUrl = shop.movies[2].cover
        var activemovie = shop.movies[2]
        // that.setData({
        //   shop: shop,
        //   imgUrl: imgUrl,
        //   activemovie: activemovie
        // })
      }
    })

    wx.requestPayment(
      {
        'timeStamp': '1490840662',
        'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
        'package': 'prepay_id=wx2017033010242291fcfe0db70013231072',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { },
        'fail': function (res) { },
        'complete': function (res) { }
      })
  },
  openMap: function () {
    var that = this
    wx.openLocation({
      latitude: 31, // 纬度，范围为-90~90，负数表示南纬
      longitude: 14, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例
      // name: '我家', // 位置名
      // address: '洼的地方', // 地址的详细说明
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  tapselect: function (e) {
    console.log(e.currentTarget.id)
    var that = this
    var activeindex = Number(e.currentTarget.id)
    this.setData({
      imgUrl: that.data.shop.movies[activeindex].cover,
      activeindex: activeindex,
      activemovie: that.data.shop.movies[activeindex]
    })
  },
  selectDate: function (e) {
    var theday = e.currentTarget.id
    this.setData({
      theday: theday
    })
  }
})