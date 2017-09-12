//index.js
//获取应用实例
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const ceslid = require('../../utils/util.js').ceslid
const about2_api = require('../../config').about2_api
const show = require('../../utils/util.js').show
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
Page({
  data: {
    title: '——关于我们——'
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
    }else{
      //获取数据,
      ajax(index2_api, {}, function (m) {
        app.globalData.data = m;
        that.setData({
          m: m,
          picc: app.globalData.data.about.descimgs[0]
        });
      });
    }
    ajax(about2_api, {}, function (m) {
      m.content = m.body;
      m.url = m.addurl;
      show.start(m, that);
    }, true);
  }
})
