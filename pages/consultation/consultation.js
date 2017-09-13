//index.js
//获取应用实例
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const ajax = require('../../utils/util.js').ajax
const tusi = require('../../utils/util.js').tusi
const zixunfenlei2_api = require('../../config').zixunfenlei2_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取数据
function getdata(flag, that) {
    var data = {
        status: flag
    };
    var postdata = JSON.stringify(data);
    console.log(postdata);
    //获取数据,
    ajax(zixunfenlei2_api, postdata, function (m) {
        that.setData({
            m: m
        });
    }, true);
}

Page({
    data: {
        motto: 'Hello World',
        tabs: ["分类", "排序"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        userInfo: {}
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
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        getdata(0, that);
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
        var that = this;
        var arr = ['默认', '阅读数'];
        wx.showActionSheet({
            itemList: arr,
            success: function (res) {
                if (!res.cancel) {
                    if(res.tapIndex == 0){
                        getdata(0, that);
                    }else{
                        getdata(3, that);
                    }
                    console.log(arr[res.tapIndex]);
                }
            }
        });
    },
    open2: function () {
        var that = this;
        var arr = ['最近时间', '最远时间'];
        wx.showActionSheet({
            itemList: arr,
            success: function (res) {
                if (!res.cancel) {
                    if(res.tapIndex == 0){
                        getdata(1, that);
                    }else{
                        getdata(2, that);
                    }
                    console.log(arr[res.tapIndex]);
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
