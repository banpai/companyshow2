//index.js
//获取应用实例
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const zixunfenlei2_api = require('../../config').zixunfenlei2_api

Page({
    data: {
        motto: 'Hello World',
        tabs: ["分类", "排序"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        userInfo: {}
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        //获取数据,
        ajax(zixunfenlei2_api, {}, function (m) {
           that.setData({
               m: m
           });
        });
    },
    tabClick: function (e) {
        console.log(e.currentTarget.id === '0');
        if (e.currentTarget.id === '0') {
            this.open();
        } else {
            this.open2();
        }
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    open: function () {
        wx.showActionSheet({
            itemList: ['销售', '技术'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    },
    open2: function () {
        wx.showActionSheet({
            itemList: ['综合排序', '距离最近'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    },
    //打电话
    tapCall: function (e) {
        console.log(e.target.dataset.tel);
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.tel
        })
    }
})
