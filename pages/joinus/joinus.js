//获取应用实例
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const ceslid = require('../../utils/util.js').ceslid
const enjoyus2_api = require('../../config').enjoyus2_api
const show = require('../../utils/util.js').show
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
Page({
  data: {
    title: '——加入我们——'
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
    if (app.globalData.data) {
      that.setData({
        m: app.globalData.data,
        picc: app.globalData.data.about.descimgs[0]
      });
    }else{
      //获取数据,
      ajax(index2_api, {}, function (m) {
        app.globalData.data = m;
        that.setData({
          picc: app.globalData.data.about.descimgs[0]
        });
      });
    }
    ceslid(this);
    console.log('ddddddddddddddddddd');
    ajax(enjoyus2_api, {}, function (m) {
      m.content = m.body;
      show.start(m, that);
    }, true);
  }
})
