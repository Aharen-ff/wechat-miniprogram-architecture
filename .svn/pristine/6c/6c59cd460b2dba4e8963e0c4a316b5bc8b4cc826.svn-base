import { appMap, svrMap } from './config';

// ['test', 'prod']
export const theEnv = 'test';

export const getApp = (appid) => appMap[appid] || null;

export const getSvr = (env = theEnv) => (app) => {
  app = app.includes('_') ? app.split('_')[0] : app;
  return svrMap[env][app];
};
