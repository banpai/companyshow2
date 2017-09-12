/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la
var host = "https://api.shanggao.wshoto.com/app/index.php?i=5&shopid=3"
// var host = "https://qiye2.wshoto.com/app/index.php?i=2&shopid=3"
var config = {
    //下面的地址配合云端 Server 工作
    host,
    //主页显示
    index2_api:`${host}&c=entry&do=index2_api&m=siyuan_cms`,
    //idea2_api 留言板提交
    idea2_api:`${host}&c=entry&do=idea2_api&m=siyuan_cms`,
    //list2_api点击更多
    list2_api:`${host}&c=entry&do=list2_api&m=siyuan_cms`,
    //engine2_api工程案例
    engine2_api:`${host}&c=entry&do=engine2_api&m=siyuan_cms`,
    //goods2_api产品展示
    goods2_api:`${host}&c=entry&do=goods2_api&m=siyuan_cms`,
    //news2_api新闻
    news2_api:`${host}&c=entry&do=news2_api&m=siyuan_cms`,
    //addquestion2_api咨询提交
    addquestion2_api:`${host}&c=entry&do=addquestion2_api&m=siyuan_cms`,
    //zixunfenlei2_api 我要咨询
    zixunfenlei2_api:`${host}&c=entry&do=zixunfenlei2_api&m=siyuan_cms`,
    //加入我们是enjoyus2_api
    enjoyus2_api:`${host}&c=entry&do=enjoyus2_api&m=siyuan_cms`,
    //关于我们 about2_api
    about2_api:`${host}&c=entry&do=about2_api&m=siyuan_cms`,
    //myquestion2_api 我的咨询
    myquestion2_api:`${host}&c=entry&do=myquestion2_api&m=siyuan_cms`,
    //userinfo2_api 提交我的信息
    userinfo2_api:`${host}&c=entry&do=userinfo2_api&m=siyuan_cms`
};

module.exports = config