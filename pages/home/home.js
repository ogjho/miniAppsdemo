
Page({
  data: {
    background:[
      {
        id:"0",
        src:"../../images/banner1.png"
      },
      {
        id: "1",
        src: "../../images/banner2.png"
      }
    ],
    indicatorDots: true, //是否显示面板指示点
    vertical: false,//滑动方向是否为纵向
    autoplay: false,//是否自动切换
    circular: false,//是否采用衔接滑动
    interval: 2000,//自动切换时间间隔
    duration: 500,//滑动动画时长
    previousMargin: 0,//前边距，可用于露出前一项的一小部分
    nextMargin: 0//后边距，可用于露出后一项的一小部分
  }
})
