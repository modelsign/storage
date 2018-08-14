'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517552669865_2733';

  // add your config here
  config.middleware = [];

  config.development = {
    watchDirs: [],
    ignoreDirs: [
      `${__dirname}/../app/view`,
      `${__dirname}/../app/assets`,
      `${__dirname}/../app/upload`,
    ],
    fastReady: false,
    reloadOnDebug: true,
    overrideDefault: false,
  };

  config.rest = {
    urlprefix: '/v1',
    authRequest: null,
    authIgnores: null,
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.security = {
    csrf: false,
  };

  config.multipart = {
    fileSize: '500mb',
    fileExtensions: [
      '.glb',
      '.gltf',
    ],
  };

  return config;
};
