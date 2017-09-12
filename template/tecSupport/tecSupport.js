//封装底部信息获取动态数据
function getFooter(){
    var name = '微盛网络技术支持';
    var website = 'wshoto.com';

    // wx.request({
    //     url: '',
    //     data: {},
    //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     complete: function(res) {
    //         this.setData({
    //             tecSupport:{
    //                 name: name,
    //                 website: website
    //             }
    //         });
    //     }
    // })

    this.setData({
        tecSupport:{
            name: name,
            website: website
        }
    });
    
};

module.exports = {
    getFooter: getFooter
};