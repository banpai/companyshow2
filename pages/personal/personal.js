//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    qiyeshowflag: true,
    zxshowflag: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  //同步信息
  tapxinxi: function () {
    wx.showToast({
      title: '同步中',
      icon: 'loading',
      duration: 2000,
      complete: function () {
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  //企业展示
  qiyeshow: function () {
    var flag = !this.data.qiyeshowflag;
    this.setData({
      qiyeshowflag: flag
    });
  },
  //咨询信息
  zxshow: function () {
    var flag = !this.data.zxshowflag;
    this.setData({
      zxshowflag: flag
    });
  },
  //清理缓存
  clearcache: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    });
  },
  //获取收货地址
  getaddress: function () {
    console.log('dd');
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    });
  }
})
