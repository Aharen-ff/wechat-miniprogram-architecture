const router = {
  '/Login': '/pages/login/index',
  '/Home': '/pages/home/index',
  '/User': '/packages/user/pages/index',
  '/Map': '/packages/map/pages/index',
};

export function routerGo(e) {
  if (typeof e === 'string') {
    const path = router[e] || router['/Home'];
    wx.navigateTo({
      url: path,
    });
    return;
  }

  let { route = '/Home', method = 'navigateTo', params = {} } = e;

  if (!['navigateTo', 'redirectTo', 'reLaunch'].includes(method)) {
    method = 'navigateTo';
  }

  if (typeof params !== 'object') {
    params = {
      param: params,
    };
  }

  const path = router[route] || router['/Home'];
  wx[method]({
    url: path,
  });
}

export function routerBack(e) {
  if (typeof e === 'number') {
    wx.navigateBack({
      delta: e,
    });
    return;
  }
}
