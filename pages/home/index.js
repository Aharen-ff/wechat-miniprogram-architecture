Page({
  onLoad() {
    wx.setNavigationBarTitle({
      title: '首页',
    });

    // 从本地存储中读取值，对应 login 页面里的存储
    const token = wx.getStorageSync(getApp().globalData.keys.USER_TICKET);
    console.log('token!', token);
  },

  bindUserTap() {
    // routerGo 使用默认跳转方式时，
    // 可以直接传 route，省略其他内容
    wx.routerGo('/User');
  },

  bindMapTap() {
    wx.routerGo('/Map');
  },

  bindScanTap() {
    wx.navigateTo({
      url: '../../packages/scan/pages/index',
    });
  },
});
