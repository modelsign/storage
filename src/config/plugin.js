'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enable : true,
  package: 'egg-sequelize'
};

exports.validate = {
  package: 'egg-validate',
};

exports.rest = {
  enable : true,
  package: 'egg-rest'
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
