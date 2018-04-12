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
    page: 0,
    size: 10,
    cityName:''
  },
  onLoad: function () {
    var that = this;
    this.setData({
      'head.currentCity': app.globalData.currentCity,
      cityName: app.globalData.currentCity
    })
     this.getCityDetail(app.globalData.currentCity);

    wx.request({
      url: getApp().data.newHost + '/film/getCinemas/' 
      + getApp().globalData.lat + '/' 
      + getApp().globalData.lon + '/' 
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

  onReachBottom: function () {
    var that = this;
    this.dealCity();//处理数据
    wx.request({
      url: getApp().data.newHost + '/film/getCinemas/'
      + that.data.lat + '/'
      + that.data.lng + '/'
      + that.data.page + '/'
      + that.data.size,
      success: function (res) {
        var theaterLi = that.data.theater
        var nextLi = res.data.content;
        console.info(nextLi);
        var newLi = theaterLi.concat(nextLi)
        if (nextLi.length == 0) {
          wx.showToast({
            title: '暂无更多数据...',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1000
          })
          that.setData({
            theater: newLi,
            page: that.data.page + 1
          })
        }
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
  },
  getCityDetail: function (cityName) {
    var that = this;
    wx.request({
      url: getApp().data.newHost + '/city/get-city-by-name/' + cityName,
      data: {},
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            lat: res.data.content.lat ,
            lng: res.data.content.log
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            content: res.data.msg,
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
  },
  dealCity:function(){
    //如果定位的城市和当前页面的城市不匹配
    //就清除
    var that = this;
    console.info(that.data.cityName != app.globalData.currentCity);
    if (that.data.cityName != app.globalData.currentCity){
      this.getCityDetail(app.globalData.currentCity);//定位经纬度
      this.firstLoadData(); 
    }
  },
  firstLoadData:function(){
    wx.request({
      url: getApp().data.newHost + '/film/getCinemas/'
      + getApp().globalData.lat + '/'
      + getApp().globalData.lon + '/'
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
  }

})
