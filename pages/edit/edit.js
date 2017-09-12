//获取应用实例
var app = getApp()
const ajaxinput = require('../../utils/util.js').ajaxinput
const tusi = require('../../utils/util.js').tusi
const userinfo2_api = require('../../config').userinfo2_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
Page({
    data: {
        showTopTips: false,
        userInfo: {},
        name: '',
        sex: '0',
        tel: '',
        address: '',
        introduction: '',
        radioItems: [
            { name: '男', value: '0' },
            { name: '女', value: '1', checked: true }
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
    onLoad: function () {
        //添加尾部技术支持的信息
    getFooter.call(this);
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    showTopTips: function () {
        // name: '',
        // sex: '1',
        // tel: '',
        // address: '',
        // introduction: '',
        var that = this;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.data.tel === '') {
            tusi('请填写手机号');
        } else if (!myreg.test(that.data.tel)) {
            tusi('手机号码错误');
        }else if (that.data.name == '') {
            tusi('请输入姓名');
        } else if (that.data.address == '') {
            tusi('请输入地址');
        }else if (that.data.introduction == '') {
            tusi('请输入自我介绍');
        } else {
            var data = {
                tel: that.data.tel,
                name: that.data.name,
                address: that.data.address,
                introduction: that.data.introduction,
                sex: that.data.sex
            }
            var postdata = JSON.stringify(data);
            console.log(postdata);
            ajaxinput(userinfo2_api, data, function (m) {
                wx.navigateBack();
            });
        }
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems,
            sex: e.detail.value
        });
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

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
            checkboxItems: checkboxItems
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
    address: function (e) {
        this.setData({
            address: e.detail.value
        })
    },
    introduction: function (e) {
        this.setData({
            introduction: e.detail.value
        })
    }
});