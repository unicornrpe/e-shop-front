export const isServer = global.window ? false : true;
export const isDev = process.env.NODE_ENV === 'development' ? true : false;
export const isProd = process.env.NODE_ENV === 'production' ? true : false;

let serverVars = {
  PROD_ENV: process.env.PROD_ENV || 'dev',
  isProdLive: process.env.PROD_ENV === 'LIVE',
  isProdStage: process.env.PROD_ENV === 'STAGE',
  isProdQA: process.env.PROD_ENV === 'QA',
  isProdDev:
    !process.env.PROD_ENV ||
    !['LIVE', 'STAGE', 'QA'].includes(process.env.PROD_ENV)
};

let _title = ['LabFriend'];

export const setTitle = (title, position = 1) => {
  _title[position] = title;
  _title.length = position + 1;
  if (!isServer) {
    // document.title = _title
    //   .filter(i => !!i)
    //   .reverse()
    //   .join(' | ');
  }
};

export const ServerVars = (isServer && serverVars) || window.__SERVER__;
