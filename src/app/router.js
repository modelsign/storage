'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //
  // /** ************************************************************
  //  *
  //  *                  用户
  //  *
  //  ***************************************************************/
  //
  // router.get('/v1/user/:sid', () => {});
  // router.patch('/v1/user/:sid', () => {});
  // /** ************************************************************
  //  *
  //  *                  空间
  //  *
  //  ***************************************************************/
  //
  // router.get('/v1/spaces', () => {});
  // router.get('/v1/spaces/:sid', () => {});
  // router.patch('/v1/spaces/:sid', () => {});
  // router.del('/v1/spaces/:sid', () => {});
  //
  // /**
  //  * 1. ?filter=geohash&geohash=wtw37n
  //  * 2. ?filter=tag&tag=风扇,剪刀,饼&logic=or
  //  */
  // router.get('/v1/spaces/:sid/objects', () => {});
  // router.post('/v1/spaces/:sid/objects', () => {});
  // router.patch('/v1/spaces/:sid/objects/:oid', () => {});
  // router.del('/v1/spaces/:sid/objects/:oid', () => {});
  //
  // router.get('/v1/space/:sid/clipers', () => {});
  // router.get('/v1/space/:sid/clipers/:cid', () => {});
  // router.patch('/v1/space/:sid/clipers/:cid', () => {});
  //
  // /** ************************************************************
  //  *
  //  *                  模型存储
  //  *
  //  ***************************************************************/
  // /**
  //  * 1. ?filter=tag&tag=杯子,书&logic=or
  //  * 2. ?filter=creator&creator=用户id
  //  */
  // router.get('/v1/objects', () => {});
  // router.get('/v1/objects/:oid', () => {});
  
};
