import { promisifyAll } from 'miniprogram-api-promise';
import { needSafeBottom, showModal } from './utils/index';
import { getApp, theEnv as env } from './configs/index';
import { keys } from './configs/keys';
import { routerGo, routerBack } from './configs/router';

App({
  globalData: {},

  onLaunch() {
    const wxp = {};
    promisifyAll(wx, wxp); // 把微信原生方法 promise 化
    wxp.showModal = showModal; // 用更简约的 showModal 方法替换
    wx.wxp = wxp; // 把 promisified 的方法挂载至 wx 里

    this.setAppInfo();
    this.setSystemInfo();

    wx.routerGo = routerGo;
    wx.routerBack = routerBack;
  },

  setAppInfo() {
    const info = wx.getAccountInfoSync();
    this.globalData.app = getApp(info.miniProgram.appId);
    this.globalData.env = env;
    this.globalData.keys = keys;
  },

  setSystemInfo() {
    const info = wx.getSystemInfoSync();
    this.globalData.systemInfo = info;
    this.globalData.needSafeBottom = needSafeBottom(info);
  },
});
