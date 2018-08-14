'use strict';

module.exports = {
  
  /** *********************************************************************************************************
   *
   * 自动加载模型需要依赖接口规范
   * http://127.0.0.1:7001/v1/spaces/:space_id/objects?fliter=geohash&geohash=wtw37h
   *
   *      space_id,   指定图层所绑定的数据空间
   *      geohash,    指定当前加载空间位置的空间索引
   *
   * 按照约定, 服务器应当返回json
   *
   * {
   *    "meta":{
   *        "geohash":  "wxw27t"
   *        "layer":    "default",
   *       "count":    1
   *   },
   *   "data": [
   *       {
   *           "id": 10022018020600187,
   *           "type":"objsrcs",
   *           "attributes":{
   *               "objsrcid":10032018020600096,
   *               "location": {x:0,y:0,z:0},
   *               "url":"http://msign.oss.tool.budblack.me/10032018020600096",
   *               "created_at": "2018-02-06T12:53:28.000Z",
   *               "updated_at": "2018-02-06T12:53:28.000Z",
   *               "creator": 10012018020600028
   *           },
   *           "links":{
   *               "self":"http://127.0.0.1:7001/objsrc/10032018020600096"
   *           }
   *       }
   *   ]
   * }
   *
   *
   ************************************************************************************************************/
  async index (ctx) {
    const spaceid = this.params.parent_id;
    
    let { app }                           = this,
        { Sequelize }                     = app,
        { MSpace, MObjsrc, RSpaceObjsrc } = app.model;
    
    const objects = await RSpaceObjsrc
        .findAll(
            {
              where  : { spaceid },
              include: [MObjsrc, MSpace]
            }
        );
    this.data     = objects || [];
  }
};
