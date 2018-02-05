'use strict';

module.exports = appInfo => {
  const config = exports = {};
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517552669865_2733';
  
  // add your config here
  config.middleware = [];
  
  config.development = {
    watchDirs      : [],
    ignoreDirs     : [
      `${__dirname}/../app/view`,
      `${__dirname}/../app/assets`,
      `${__dirname}/../app/upload`
    ],
    fastReady      : false,
    reloadOnDebug  : true,
    overrideDefault: false
  };
  
  config.rest = {
    urlprefix  : '/v1',
    authRequest: null,
    authIgnores: null
  };
  
  config.view = {
    mapping: {
      '.ejs': 'ejs'
    }
  };
  
  config.security = {
    csrf: false
  };
  
  config.multipart = {
    fileSize      : '500mb',
    fileExtensions: [
      '.glb',
      '.gltf'
    ]
  };
  
  config.oss = {
    client: {
      accessKeyId    : 'LTAIUHxAx7I8py98',
      accessKeySecret: 'I2rdSd93UAlOzVfCo3L6wcPjWSECSP',
      bucket         : 'msign-modelstorage',
      endpoint       : 'oss-cn-shenzhen.aliyuncs.com',
      timeout        : '60s'
    }
  };
  
  config.job = {
    client: {
      prefix: 'q',
      redis : {
        port    : 9530,
        host    : 'redis.tool.budblack.me',
        password: '',
        db      : 9,
        options : {
          // see https://github.com/mranney/node_redis#rediscreateclient
        }
      }
    }
  };
  
  return config;
};
