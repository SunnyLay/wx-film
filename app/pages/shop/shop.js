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
    cinemasId:1,
    currentDateShowId:0
  },
  onLoad: function (options) {
    //加载参数
    var that = this;
    console.info(options);
    var cinemasId = options.cinemasId;
    var lng = options.lng;
    var lat = options.lat;
    that.setData({
      cinemasId: cinemasId,
      lng:lng,
      lat:lat
    })
   
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
    //请求影院的详细数据
    wx.request({
      url: getApp().data.newHost + '/film/get-cinema-and-movie/' + that.data.cinemasId,
      success: function (res) {
        console.log(res.data.data);
        console.log(res.data.content.cinemasDatailModel);
        console.log(res);
        console.info(res.data.content.dateShow[0]);
        if (res.data.code == 0) {
          that.setData({
            cinemaDetailModel: res.data.content.cinemaDetailModel,
            movies: res.data.content.movies,
            currentMovie: res.data.content.currentMovie,
            dateShow: res.data.content.dateShow,
            currentDateShow: res.data.content.dateShow[0]
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
    var id = Number(e.currentTarget.id)
    //请求影院的详细数据
    wx.request({
      url: getApp().data.newHost + '/film/get-cinema-and-movie/' + that.data.cinemasId,
      data:{
         movieId : id
      },
      success: function (res) {
        console.log(res.data.data);
        console.log(res.data.content.cinemasDatailModel);
        console.log(res);
        console.info(res.data.content.dateShow[0]);
        if (res.data.code == 0) {
          that.setData({
            cinemaDetailModel: res.data.content.cinemaDetailModel,
            movies: res.data.content.movies,
            currentMovie: res.data.content.currentMovie,
            dateShow: res.data.content.dateShow,
            currentDateShow: res.data.content.dateShow[0]
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
  selectDate: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    this.setData({
      currentDateShow: that.data.dateShow[id],
      currentDateShowId:id
    })
  }
})