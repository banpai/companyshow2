//index.js
//获取应用实例
var app = getApp()

var jsdx;

//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;

//调用ajax
const ajax = require('../../utils/util.js').ajax
const ajaxinput = require('../../utils/util.js').ajaxinput
const tusi = require('../../utils/util.js').tusi
const ceslid = require('../../utils/util.js').ceslid
const index2_api = require('../../config').index2_api
const idea2_api = require('../../config').idea2_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;

Page({
  data: {
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    open: false,
    mark: 0,
    newmark: 0,
    istoright: true,
    tel: '',
    emai: "",
    desc: '',
    data: {},
    lenwidth: 166,
    latitude: 31.477887,
    longitude: 120.281242,
    markers: [{
      iconPath: "",
      id: 0,
      latitude: 31.477887,
      longitude: 120.281242,
      width: 50,
      height: 50
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
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function () {
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    ceslid(this);
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
        app.globalData.data = m;
        that.setData({
          data: m,
          m: m,
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
  },
  //电话
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //邮箱
  emai: function (e) {
    this.setData({
      emai: e.detail.value
    })
  },
  //建议
  desc: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  //提交按钮
  showTopTips: function () {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (that.data.tel === '') {
      tusi('请填写手机号');
    } else if (!myreg.test(that.data.tel)) {
      tusi('手机号码错误');
    } else if (that.data.emai === '') {
      tusi('请输入邮箱');
    } else if (that.data.desc === '') {
      tusi('请输入您的建议');
    } else {
      var data = {
        tel: that.data.tel,
        emai: that.data.emai,
        desc: that.data.desc
      }
      console.log(data);
      ajaxinput(idea2_api, data, function (data) {
        that.setData({
          tel: '',
          emai: '',
          desc: ''
        });
        tusi('提交成功', true);
      });
    }
  },
  //新闻
  newsskip: function (e) {
    console.log(e.currentTarget.dataset.id);
    var url = "../wxparse/wxparse?id=" + e.currentTarget.dataset.id + "&type=news2_api";
    wx.navigateTo({
      url: url
    })
  }
})