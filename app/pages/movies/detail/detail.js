Page({
  data: {
    des: {},
    flexed: false,
    page: 1,
    size: 10,
    comment: []
  },
  onLoad: function (param) {
    var that = this;
    var id = param.id;
    that.setData({
      movieId: param.id
    })
    wx.request({
      url: getApp().data.newHost + '/film/getHotMovieDetail/' + param.id,
      data: {},
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            movieId: param.id,
            des: res.data.content
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
    }),
      //加载评论
      this.loadComment();

  },
  loadComment: function () {
    var that = this;
    wx.request({
      url: getApp().data.newHost + '/film/getComments/' + this.data.movieId + "/" + this.data.page + "/" + this.data.size,
      data: {},
      success: function (res) {
        if (res.data.code == 0) {
          var oldComment = that.data.comment; 
          var newComment = res.data.content; 
          that.setData({
            comment: oldComment.concat(newComment),
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
    this.loadComment();
  },
  flex: function () {
    var that = this
    this.setData({
      flexed: !that.data.flexed
    })
  },
  click:function(){
    var that = this;
    that.setData({
    hidden:!that.data.hidden
    });
  }
})