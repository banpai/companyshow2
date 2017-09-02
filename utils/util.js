function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//封装获取数据的方式
function ajax (url, data, fun, post) {
  wx.showLoading({
    title: '加载中',
  });
  var method = "GET";
  var header = {
    'content-type': 'application/json'
  };
  if (post) {
    method = "POST";
    header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  console.log(method);
  //获取数据
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      wx.hideLoading();
      if(res.data.status == 1){
        fun(res.data.result);
      }
    },
    fail: function(){
      console.log('111');
      wx.hideLoading();
      wx.showToast({
        title: '接口调用失败',
        icon: 'loading',
        duration: 2000
      })
    }
  });
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//封装tusi
function tusi(str, flag, fun) {
  var icon = 'loading';
  if (flag) {
    icon = 'success';
  }
  wx.showToast({
    title: str,
    icon: icon,
    duration: 1500,
    complete: function () {
      if (fun) {
        fun();
      }
    }
  });
}

//封装侧边栏滑动
function ceslid(that){
  // var that = this;
  //重新获取高度
  wx.getSystemInfo({
    success: function (res) {
      var width = "width:" + res.windowWidth + 'px;';
      var width2 = +res.windowWidth - 202;
      var height = res.windowHeight - 2;
      var mapwidth = +res.windowWidth - 30;
      var lenwidth = (+res.windowWidth - 14)/2;
      var screenHeight = res.windowWidth;
      console.log(screenHeight + '===dsd');
      that.setData({
        width: width,
        width2: width2,
        width3: res.windowWidth,
        height: height,
        mapwidth: mapwidth,
        lenwidth: lenwidth,
        screenHeight: screenHeight
      })
    }
  });
  that.tap_ch = function(e){
    if(this.data.open){
      this.setData({
        open : false
      });
    }else{
      this.setData({
        open : true
      });
    }
  };
  that.tap_start = function(e){
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  };
  that.tap_drag = function(e){
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
  that.tap_end = function(e){

  }
}

module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  tusi: tusi,
  ceslid: ceslid
}
