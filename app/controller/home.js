'use strict';

const Controller = require('egg').Controller;


module.exports = app => {
  return class extends Controller {
    async index(ctx) {
      // this.ctx.body = "Welcome to the void.\nボイドへようこそ.\n欢迎来到虚空.";

      ctx.set('content-type', 'text/html');
      await ctx.render('site/index.ejs');
    }
  };
};
