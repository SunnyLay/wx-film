
Page({
  data: {
    page: 0,
    size: 10,
    vMovie:[],
    status:[]
  },
  onLoad: function (param) {
    this.getVMovie();
    
  },
  getVMovie:function(){
    var that = this;
    wx.request({
      url: getApp().data.newHost + '/film/getVMovie/' + that.data.page + "/" + that.data.size,
      data: {},
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            vMovie: res.data.content,
            page: that.data.page + 1
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
  onReachBottom: function () {
    var that = this;
    wx.request({
      url: getApp().data.newHost + '/film/getVMovie/' + that.data.page + "/" + that.data.size,
      data: {},
      success: function (res) {
        var vmovieLi = that.data.vMovie
        var nextLi = res.data.content;
        console.info(nextLi);
        var newLi = vmovieLi.concat(nextLi)
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
            vMovie: newLi,
            page: that.data.page + 1
          })
        }
      }
    })
  
  },
  listenerButton:function(e){
   var that = this;
   var index = e.currentTarget.dataset.id;
   console.log(e);
   console.log(index+"xxxxx");
   var status = that.data.status;
   status.forEach(function(item,i){
     status[i] = false;
   });
   status[index] = true;
    that.setData({
      status: status
    });
  }
})