//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
Page({
  data: {
      name: '微盛'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //添加尾部技术支持的信息
    getFooter.call(this);
  },
  //通讯地址
  txdz: function(e){
    console.log('通讯地址 发生 change 事件，携带值为', e.detail.value)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    });
  },
  //地理位置
  dlwz: function(e){
    console.log('地理位置 发生 change 事件，携带值为', e.detail.value)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    });
  },
  //用户信息
  yhxx: function(e){
    console.log('用户信息 发生 change 事件，携带值为', e.detail.value)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    });
  }
})
