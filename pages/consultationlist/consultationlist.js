//index.js
//获取应用实例
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

//调用ajax
const ajax = require('../../utils/util.js').ajax
const ajaxinput = require('../../utils/util.js').ajaxinput
const tusi = require('../../utils/util.js').tusi
const myquestion2_api = require('../../config').myquestion2_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
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
        //获取数据
        if (app.globalData.m) {
            that.setData({
                m: app.globalData.m
            });
        }
        ajaxinput(myquestion2_api, {}, function (m) {
            console.log(m);
            that.setData({
                data: m
            });
        });
    },
    tabClick: function (e) {
        console.log(e.currentTarget.id === '0');
        if(e.currentTarget.id === '0'){
            this.open();
        }else{
            this.open2();
        }
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    //拨打电话
    tel: function () {
        var that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.m.tel
        });
    },
    //查看图片
    showimg: function () {
        wx.previewImage({
            current: 'http://www.umelady.com/uploads/allimg/170711/11355a3Z-0.jpg', // 当前显示图片的http链接
            urls: ['http://www.umelady.com/uploads/allimg/170711/11355a3Z-0.jpg'] // 需要预览的图片http链接列表
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
            url: '../index/index',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
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
    }
})
