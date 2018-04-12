var qqmap = require('./vendor/qqmap-sdk.min.js')
App({
  data: {
    host: 'http://120.77.37.251:8888',
     newHost:'http://localhost:8083/chao'
  //  newHost: 'http://120.77.37.251:13000/chao'
  },
  onLaunch: function () {
    this.login();
  },
  getpol: function (cb) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        var lat = res.latitude
        var lon = res.longitude
        that.globalData.lat = lat;
        that.globalData.lon = lon;
        var demo = new qqmap({
          key: 'SZBBZ-DARAP-ACWDA-VN2QZ-XO4F5-3UBNM'
        });
        demo.reverseGeocoder({
          location: {
            latitude: lat,
            longitude: lon
          },
          success: function (res) {
            var acc = res.result.address_component.city
            console.log(acc)
            var len = acc.length
            var last = acc.charAt(len - 1)
            if (last === '市') {
              var positionCity = acc.slice(0, -1)
              that.globalData.positionCity = positionCity
            }
            else {
              that.globalData.positionCity = acc
            }
            var recity = wx.getStorageSync('recity') || []
            if (recity.length) {
              that.globalData.currentCity = recity[0]
              if (!that.globalData.remind & recity[0] != acc) {
                that.remind()
                that.globalData.remind = true
              }

            }
            else {
              that.globalData.currentCity = that.globalData.positionCity
            }
            typeof cb == "function" && cb(that.globalData.currentCity)
          }
        });
      }
    })
  },
  remind: function (onLoad) {
    var that = this
    var positionCity = that.globalData.positionCity
    var currentCity = that.globalData.currentCity
    wx.showModal({
      title: '',
      content: '定位到您当前所在的城市在' + positionCity + ',是否切换',
      success: function (res) {
        if (res.confirm) {
          console.log('confirm')
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    positionCity: '',
    currentCity: '',
    remind: false
  },
  login: function () {
    /**
     * 获取code和用户信息
     */
    wx.login({
      success: function (res) {
        console.log(res);
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            //console.log(simpleUser.nickName);
            console.log(res);
            //存入昵称缓存 - 同步
            wx.setStorageSync('nickName', simpleUser.nickName);
            wx.setStorageSync('avatarUrl', simpleUser.avatarUrl);
            wx.setStorageSync('gender', simpleUser.gender);
          }
        });
      }
    });
  },
  logout:function(){
    wx.removeStorageSync('nickName');
    wx.removeStorageSync('avatarUrl');
    wx.removeStorageSync('gender');
  }
})