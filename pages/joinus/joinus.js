//index.js
//获取应用实例
var app = getApp()

var jsdx;

//调用ajax
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const ceslid = require('../../utils/util.js').ceslid
const index2_api = require('../../config').index2_api

Page({
  data: {
    title: '——加入我们——'
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.data) {
      that.setData({
        picc: app.globalData.data.about.descimgs[0]
      });
    }
    ceslid(this);
  }
})
