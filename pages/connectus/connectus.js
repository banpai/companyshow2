//index.js
//获取应用实例
var app = getApp()

var jsdx;

//调用ajax
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const ceslid = require('../../utils/util.js').ceslid
const index2_api = require('../../config').index2_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;

Page({
  data: {
    title: '——联系我们——',
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
      color: "#FF0000DD",
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
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    ceslid(this);
    if (app.globalData.data) {
      that.setData({
        m: app.globalData.data,
        picc: app.globalData.data.about.descimgs[0]
      });
    }
    if (app.globalData.data) {
      var latitude = Number(app.globalData.data.about.latitude);
      var longitude = Number(app.globalData.data.about.longitude);
      that.setData({
        data: app.globalData.data,
        m: app.globalData.data,
        latitude: latitude,
        longitude: longitude,
        markers: [{
          iconPath: "",
          id: 0,
          latitude: latitude,
          longitude: longitude,
          width: 50,
          height: 50
        }]
      });
    } else {
      //获取数据,
      ajax(index2_api, {}, function (m) {
        console.log(JSON.stringify(m.news));
        var latitude = Number(m.about.latitude);
        var longitude = Number(m.about.longitude);
        that.setData({
          data: m,
          latitude: latitude,
          longitude: longitude,
          markers: [{
            iconPath: "",
            id: 0,
            latitude: latitude,
            longitude: longitude,
            width: 50,
            height: 50
          }]
        });
      });
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
