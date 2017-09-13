//获取应用实例
var app = getApp()
const ajaxinput = require('../../utils/util.js').ajaxinput
const tusi = require('../../utils/util.js').tusi
const addquestion2_api = require('../../config').addquestion2_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
Page({
    data: {
        showTopTips: false,
        userInfo: {},
        flag: true,
        tel: '',
        name: '',
        wechat: '',
        bz: '',
        radioItems: [
            { name: '微信号', value: 0 },
            { name: '手机号', value: 1, checked: true }
        ],
        checkboxItems: [
            { name: 'standard is dealt for u.', value: '0', checked: true },
            { name: 'standard is dealicient for u.', value: '1' }
        ],

        date: "2016-09-01",
        time: "12:01",

        countryCodes: ["+86", "+80", "+84", "+87"],
        countryCodeIndex: 0,

        countries: ["中国", "美国", "英国"],
        countryIndex: 0,

        accounts: ["微信号", "QQ", "Email"],
        accountIndex: 0,

        isAgree: false
    },
    onShareAppMessage: function(res){
        //首页初始化可转发
        var data = onloadstart.call(this, res);
        return data;
      },
    onLoad: function (o) {
        //添加尾部技术支持的信息
    getFooter.call(this);
        console.log('onLoad')
        var that = this
        //更新数据
        that.setData({
            namec: o.name,
            pic: o.pic,
            id: o.id
        })
    },
    showTopTips: function () {
        var that = this;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.data.flag) {
            if (that.data.tel === '') {
                tusi('请填写手机号');
            } else if (!myreg.test(that.data.tel)) {
                tusi('手机号码错误');
            }else if (that.data.name == '') {
                tusi('请输入姓名');
            } else if (that.data.bz == '') {
                tusi('请输入您的需求');
            } else {
                var data = {
                    id: that.data.id,
                    tel: that.data.tel,
                    name: that.data.name,
                    wechat: that.data.wechat,
                    bz: that.data.bz,
                    date: that.data.date,
                    time: that.data.time
                }
                var postdata = JSON.stringify(data);
                console.log(postdata);
                ajaxinput(addquestion2_api, data, function (m) {
                    wx.navigateBack();
                });
            }
        } else if (!that.data.flag) {
            if (that.data.wechat == '') {
                tusi('请输入微信号');
            }else if (that.data.name == '') {
                tusi('请输入姓名');
            } else if (that.data.bz == '') {
                tusi('请输入您的需求');
            } else {
                var data = {
                    id: that.data.id,
                    tel: that.data.tel,
                    name: that.data.name,
                    wechat: that.data.wechat,
                    bz: that.data.bz,
                    date: that.data.date,
                    time: that.data.time
                }
                var postdata = JSON.stringify(data);
                console.log(postdata);
                ajaxinput(addquestion2_api, data, function (m) {
                    wx.navigateBack();
                });
            }
        } 
    },
    radioChange: function (e) {
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }
        var flag = true;
        if (e.detail.value == 0) {
            flag = false;
        }
        this.setData({
            radioItems: radioItems,
            flag: flag,
            tel: '',
            wechat: ''
        });
    },
    checkboxChange: function (e) {
        console.log('ddd', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (checkboxItems[i].value == values[j]) {
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems,
            flag: e.detail.value
        });
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindCountryCodeChange: function (e) {
        console.log('picker country code 发生选择改变，携带值为', e.detail.value);
        this.setData({
            countryCodeIndex: e.detail.value
        })
    },
    bindCountryChange: function (e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);
        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindAccountChange: function (e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    //电话
    tel: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },
    name: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    wechat: function (e) {
        this.setData({
            wechat: e.detail.value
        })
    },
    bz: function (e) {
        this.setData({
            bz: e.detail.value
        })
    }
});