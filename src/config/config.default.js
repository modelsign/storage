'use strict';

module.exports = appInfo => {
  const config = exports = {};
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517552669865_2733';
  
  // add your config here
  config.middleware = [];
  
  config.rest = {
    urlprefix  : '/',
    authRequest: null,
    authIgnores: null
  };
  
  config.view = {
    mapping: {
      '.ejs': 'ejs'
    }
  };
  
  return config;
};
