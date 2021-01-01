import { toast } from '../../utils/index';

Page({
  data: {
    username: '', // 这里可以设置初始值
    password: '', // 也可以在方法中处理
  },

  /**
   * @func onLoad 页面生命周期
   * 页面创建时触发
   * 其他声明周期参考文档，还有一个高频使用的是 onShow
   */
  onLoad() {
    // 也可以在页面 json 文件中配置页面标题
    wx.setNavigationBarTitle({
      title: '登录',
    });

    this.init();
  },

  /**
   * @func 初始化
   */
  init() {
    // 除了在 data 中预设值，也可以在合适的时候手动更改
    // 例如这里在 onLoad 时手动将 username 设为 admin
    // 小程序必须通过 setData 才能触发界面渲染
    // 如果不需要界面渲染，也可以简单地 this.data.var = value 赋值
    this.setData({
      username: 'admin',
    });

    // 下面这个赋值不会反馈到界面上，但是是有效的
    // 在调试器-AppData栏可以看到 password 的值已经更新，但界面上还是空的
    // 此时点击登录，不会提示密码为空
    this.data.password = '123';
  },

  /**
   * @func 输入事件
   * @param {Event} e 输入事件
   */
  bindInput(e) {
    const {
      detail: { value },
      target: { id },
    } = e;
    // 注意 input 组件上赋予了一个 id，
    // 在 e 里可以取到 id，判断事件由具体哪个组件触发
    // 也可以给每一个组件写单独的事件，代码会啰嗦很多
    console.log('bind input!!', value, id);

    this.setData({
      [id]: value,
    });
    // 上面这段代码等价于 this.setData({ 'username': value })
    // 使用变量作为键时，要用方括号包裹

    // 通过给组件赋予一个 id，完成了输入事件和处理方式的统一

    // 注意！picker 组件返回的 value 是【选中项的下标的字符串】
    // 选中第一项，value 是【'0'】，需要自己手动取到选中项的实际值
  },

  /**
   * @func 登录
   */
  async bindLogin() {
    const msg = this.validate();
    if (msg) {
      toast(msg); // toast 是封装好的 wx.showToast，简化了写法
      return;
    }

    // 请求做了底层封装，token 等通用参数会自动添加
    // 也可以使用 promise-then 的写法
    let res;
    const params = {
      username: this.data.username,
      password: this.data.password,
    };
    wx.showLoading({ title: '登录中' });
    try {
      res = await this.mockLogin(params);
    } catch (e) {
      typeof e === 'string'
        ? toast(e)
        : e instanceof Error
          ? toast(e.message)
          : '请求错误';
      return;
    } finally {
      wx.hideLoading();
    }

    toast('登录成功');
    // 对数据做一些处理，例如存储 token 等
    // 用于存储的键在 configs/keys 统一管理，并且挂载到全局了
    wx.setStorageSync(getApp().globalData.keys.USER_TICKET, res);

    // routerGo 是封装好的页面跳转方法，然后挂载到全局
    // 可以在 configs/router 查看具体实现
    wx.routerGo({ route: '/Home', method: 'redirectTo' });
  },

  /**
   * @func 校验
   */
  validate() {
    const { username, password } = this.data;

    if (!username.trim()) {
      return '请输入用户名';
    }

    if (!password.trim()) {
      return '请输入密码';
    }

    if (username !== 'admin') {
      return '用户不存在';
    }

    if (password !== '123456') {
      return '密码错误';
    }

    return null;
  },

  /**
   * @func 模拟登录
   */
  mockLogin() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ code: '0', data: {} });
      }, 3000);
    });
  },
});
