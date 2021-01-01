import { getSvr } from '../configs/index'
import { json2Form } from './index';

const wxapp = getApp();

export const request = {
  interceptors: {
    request: (configs) => {
      const {
        env = wxapp.globalData.env,
        app = wxapp.globalData.app,
        method,
        params,
        noToken = false,
      } = configs;

      const server = getSvr(env)(app);
      configs.url = `${server}${configs.url}&ecafeNotRedirect=true`;

      if (params && JSON.stringify(params) !== '{}') {
        if (method === 'get') {
          configs.url = `${configs.url}&${json2Form(params)}`;
        } else {
          configs.data = json2Form(params);
        }
        delete configs.params;
      }

      if (!noToken) {
        const { token } = wx.getStorageSync(wxapp.globalData.keys.USER_TICKET);
        configs.url = `${configs.url}&ecafeToken=${token}`;
      }

      return configs;
    },
    response: (response) => {
      if (response.statusCode !== 200) {
        response.myErrorMessage = '网络错误';
      } else {
        if (response.data && response.data.code !== '0') {
          response.myErrorMessage = response.data.message;
        }
      }
      return response;
    },
  },

  request(configs) {
    return new Promise((resolve, reject) => {
      wx.request({
        ...configs,
        success: (response) => {
          response = this.interceptors.response(response);
          if (response.myErrorMessage) {
            reject(new Error(response.myErrorMessage));
          }
          resolve(response.data);
        },
        fail: (error) => {
          reject(new Error(error.errMsg || '出错了'));
        },
      });
    });
  },

  get(configs) {
    configs = this.interceptors.request({
      ...configs,
      method: 'get',
    });
    return this.request(configs);
  },

  post(configs) {
    configs = this.interceptors.request({
      ...configs,
      method: 'post',
    });
    return this.request(configs);
  },
};
