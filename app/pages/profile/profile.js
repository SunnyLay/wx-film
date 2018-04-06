
var that;

Page({
  onLoad: function () {
    that = this;
    that.setData({
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
      gender: wx.getStorageSync('gender')
    });
  },
  logout: function () {
    // 确认退出登录
    wx.showModal({
      title: '确定退出登录',
      success: function (res) {
        if (res.confirm) {
          // 退出操作
          getApp().logout();
          that.setData({
            nickName: wx.getStorageSync('nickName'),
            avatarUrl: wx.getStorageSync('avatarUrl'),
            gender: wx.getStorageSync('gender')
          });
        }
      }
    });
  },
  login: function () {
    // 确认退出登录
    // 退出操作
    getApp().login();
    that.setData({
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
      gender: wx.getStorageSync('gender')
    });
  }
}) 