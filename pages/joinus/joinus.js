//index.js
//获取应用实例
var app = getApp()

var jsdx;

//调用ajax
const ajax = require('../../utils/util.js').ajax

//订单取消的接口
const index_api = require('../../config').index_api
const newslist_api = require('../../config').newslist_api

Page({
  data: {
    title: '——加入我们——',
    markers: [{
      iconPath: "../../image/company.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 200,
      height: 30
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    fuji: '#ddd',
    motto: 'Hello World',
    userInfo: {},
    width: '',
    open: false,
    speed: 0,
    state1: '',
    state2: '',
    state3: '',
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    mapwidth: 200
  },
  onLoad: function () {
    var that = this;
    //重新获取高度
    wx.getSystemInfo({
      success: function (res) {
        var width = "width:" + res.windowWidth + 'px;';
        var width2 = +res.windowWidth - 202;
        var height = res.windowHeight - 2;
        var mapwidth = +res.windowWidth - 30;
        that.setData({
          width: width,
          width2: width2,
          width3: res.windowWidth,
          height: height,
          mapwidth: mapwidth
        })
      }
    });
    var that = this;
    console.log(JSON.stringify(app.globalData));
    if (app.globalData.m) {
      that.setData({
        m: app.globalData.m
      });
    } else {
      //获取数据
      ajax(index_api, {}, function (m) {
        that.setData({
          m: m
        });
        app.globalData.m = m;
      });
    }
    if (app.globalData.pic) {
      that.setData({
        pic: app.globalData.pic
      });
    } else {
      //获取数据
      ajax(newslist_api, {}, function (m) {
        that.setData({
          pic: m
        });
        app.globalData.pic = m;
      });
    }
  },
  //侧边栏滑动
  tap_ch: function () {
    console.log(11);
    var that = this;
    var flag = !this.data.open;
    this.setData({
      open: flag
    });
    if(this.data.open){
      setTimeout(function(){
        var state2 =  'width: ' + that.data.width2 + 'px !important;';
        state2 = state2 + 'height: ' + that.data.height + 'px !important';
        that.setData({
          state2: state2
        })
      }, 500);
    }else{
      setTimeout(function(){
        var state2 =  'width: ' + that.data.width3 + 'px !important;';
        var state3 =  'width: ' + that.data.width3 + 'px !important;overflow: hidden;';
        that.setData({
          state3: state3,
          state2: state2
        })
      }, 500);
    }
  },
  //拨打电话
  tel: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.m.tel
    });
  },
  //查看图片
  showimg: function (e) {
    console.log(JSON.stringify(e.target.dataset.pic));
    wx.previewImage({
      current: e.target.dataset.pic, // 当前显示图片的http链接
      urls: [e.target.dataset.pic] // 需要预览的图片http链接列表
    })
  },
  //查看更多
  seemore: function () {
    wx.redirectTo({
      url: "../article/article"
    })
  },
  //首页跳转
  sy: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  //导航
  dh: function () {
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.m.latitude),
      longitude: Number(that.data.m.longitude),
      scale: 28
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})
