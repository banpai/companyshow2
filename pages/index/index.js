//index.js
//获取应用实例
var app = getApp()

var jsdx;

//调用ajax
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi

//订单取消的接口
const index_api = require('../../config').index_api
const index2_api = require('../../config').index2_api
const newslist_api = require('../../config').newslist_api

Page({
  data: {
    open : false,
    mark: 0,
    newmark: 0,
    istoright:true,
    tel:'',
    emai:"",
    desc:'',
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
      iconPath: '/resources/location.png',
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
  onLoad: function () {
    var that = this;
    //重新获取高度
    wx.getSystemInfo({
      success: function (res) {
        var width = "width:" + res.windowWidth + 'px;';
        var width2 = +res.windowWidth - 202;
        var height = res.windowHeight - 2;
        var mapwidth = +res.windowWidth - 30;
        var lenwidth = (+res.windowWidth - 14)/2;
        console.log(lenwidth);
        that.setData({
          width: width,
          width2: width2,
          width3: res.windowWidth,
          height: height,
          mapwidth: mapwidth,
          lenwidth: lenwidth
        })
      }
    });
    if (app.globalData.data) {
      var latitude = Number(app.globalData.data.about.latitude);
      var longitude = Number(app.globalData.data.about.longitude);
      that.setData({
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
  //侧边栏滑动
  // tap_ch: function () {
  //   console.log(11);
  //   var that = this;
  //   var flag = !this.data.open;
  //   this.setData({
  //     open: flag
  //   });
  //   if (this.data.open) {
  //     setTimeout(function () {
  //       var state2 = 'width: ' + that.data.width2 + 'px !important;';
  //       state2 = state2 + 'height: ' + that.data.height + 'px !important';
  //       that.setData({
  //         state2: state2
  //       })
  //     }, 500);
  //   } else {
  //     setTimeout(function () {
  //       var state2 = 'width: ' + that.data.width3 + 'px !important;';
  //       var state3 = 'width: ' + that.data.width3 + 'px !important;overflow: hidden;';
  //       that.setData({
  //         state3: state3,
  //         state2: state2
  //       })
  //     }, 500);
  //   }
  // },
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
  showTopTips:function(){
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if ( that.data.tel === '') {
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
    }
    
  },
  tap_ch: function(e){
    if(this.data.open){
      this.setData({
        open : false
      });
    }else{
      this.setData({
        open : true
      });
    }
  },
  tap_start:function(e){
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function(e){
    // touchmove事件

    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if(this.data.mark < this.data.newmark){
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if(this.data.mark > this.data.newmark){
      this.istoright = false;

    }
    this.data.mark = this.data.newmark;

  },
  tap_end: function(e){

  }
})
