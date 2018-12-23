Page({
  data: {
    list: [{
        id: "0",
        src: "../../images/production1.png",
        name: "智能多功能集成水槽",
        money: "3999.99",
        count: "1",
        sum: "1",
        selected: false
      },
      {
        id: "2",
        src: "../../images/production1.png",
        name: "智能多功能集成水槽",
        money: "3999.99",
        count: "1",
        sum: "1",
        selected: false
      }
    ],
    totalPrices: "0.00",
    allSelected: false
  },
  onshow: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  radio: function(event) {
    let index = event.currentTarget.dataset.index;
    let list = this.data.list;
    let length = list.length;
    for (let i = 0; i < length; ++i) {
      if (list[index].change == true) {
        list[index].change = !list[index].change
      }
      return;
    }
  },
  //添加数量
  addCount: function(event) {
    let index = event.currentTarget.dataset.index;
    let list = this.data.list;
    list[index].sum++;
    list[index].count++;
    this.setData({
      list: list,
      totalPrices: this.getTotalPrice()
    });
    /* // 如果名字一样，可以直接写
    this.setData({
      list
    }); */
  },
  //减少数量
  reduceCount: function(event) {
    let index = event.currentTarget.dataset.index;
    let list = this.data.list;
    if (list[index].sum == 1) {
      return;
    } else {
      list[index].sum--;
      list[index].count--;
      this.setData({
        list: list,
        totalPrices: this.getTotalPrice()
      });
    }
  },
  //总价计算
  getTotalPrice: function() {
    // 获取购物车列表
    let list = this.data.list;
    let totalPrices = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中才会计算价格
      if (list[i].selected) {
        // 所有价格加起来               
        totalPrices += list[i].sum * list[i].money;
      }
    }
    return totalPrices.toFixed(2);
  },
  //单选
  selectList: function(event) {
    // 获取data- 传进来的index
    let index = event.currentTarget.dataset.index;
    // 获取购物车列表   
    let list = this.data.list;
    // 获取当前商品的选中状态                    
    let selected = list[index].selected;
    // 改变状态         
    list[index].selected = !selected;
    this.setData({
      list: list
    });
    // 取消全选
    /* for (let i = 0; i < list.length; i++) {
      if (list[i].selected == false) {
        this.setData({
          allSelected: false
        });
        return;
      } else {
        this.setData({
          allSelected: true
        });
      } */
    let sign = true;
    let totalPrices = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        // 所有价格加起来               
        totalPrices += list[i].sum * list[i].money;
      }
      sign &= list[i].selected;
    }
    this.setData({
      allSelected: sign,
      totalPrices: totalPrices.toFixed(2),
    });
  },
  //全选
  allSelected: function() {
    let allSelected = !this.data.allSelected;
    let list = this.data.list;
    if (list.length == 0) {
      return;
    }
    let totalPrices = 0;
    for (let i = 0; i < list.length; i++) {
      list[i].selected = allSelected;
      if (allSelected) {
        totalPrices += list[i].sum * list[i].money;
      }
    }
    this.setData({
      list: list,
      allSelected: allSelected,
      totalPrices: totalPrices.toFixed(2),
    });
  },
  //删除商品
  deleteList: function(event) {
    // 获取data- 传进来的index
    let index = event.currentTarget.dataset.index;
    // 获取购物车列表   
    let list = this.data.list;
    // 删除购物车列表里这个商品
    list.splice(index, 1);
    let totalPrices = 0;
    let sign = list.length > 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        totalPrices += list[i].sum * list[i].money;
      }
      sign &= list[i].selected;
    }

    this.setData({
      list: list,
      totalPrices: totalPrices.toFixed(2),
      allSelected: sign
    });
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      imageUrl: 'http://md.mrxiexie.cn/song/180731/1H7LLFFcID.jpg',
      success: function(event) {
        console.log(event);
      }
    };
  }
});