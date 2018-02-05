const uuid = require('eustia-module/uuid');

module.exports = app => {
  let { model } = app,
      {
        MObjsrc, MSpace, MFile, MUser,
        MProcess, MTag, MCounter,
        RSpaceObjsrc, RObjsrcTag
      }         = model;
  
  let tool = require('./tool')(app);
  
  (
      async () => {
        /** ************************************************************
         *
         *                          重置模型关联
         *
         ***************************************************************/
        
        /** ******************************
         *  关系       模型-空间
         *********************************/
        MSpace.belongsToMany(MObjsrc, {
          through   : RSpaceObjsrc,
          foreignKey: 'spaceid',
          otherKey  : 'objsrcid'
        });
        MObjsrc.belongsToMany(MSpace, {
          through   : RSpaceObjsrc,
          foreignKey: 'objsrcid',
          otherKey  : 'spaceid'
        });
        
        /** ******************************
         *  关系       模型-标签
         *********************************/
        MTag.belongsToMany(MObjsrc, {
          through   : RObjsrcTag,
          foreignKey: 'tagid',
          otherKey  : 'objsrcid'
        });
        MObjsrc.belongsToMany(MTag, {
          through   : RObjsrcTag,
          foreignKey: 'objsrcid',
          otherKey  : 'tagid'
        });
        
        /** ******************************
         *  建表
         *********************************/
        await RSpaceObjsrc.drop();
        await RObjsrcTag.drop();
        
        // 空间
        await MSpace.sync({ force: true });
        // 用户
        await MUser.sync({ force: true });
        // 模型源
        await MObjsrc.sync({ force: true });
        // 计数器
        await MCounter.sync({ force: false });
        // 上传记录
        await MFile.sync({ force: true });
        
        await MProcess.sync({ force: true });
        // 标签
        await MTag.sync({ force: true });
        
        await RSpaceObjsrc.sync({ force: true });
        await RObjsrcTag.sync({ force: true });
        
        /** ************************************************************
         *
         *                          模拟一批数据
         *
         ***************************************************************/
        /** ******************************
         *  10 个用户
         *  每个用户4~9个随机数量的空间
         *********************************/
        let countUser = 10;
        let bulkSpace = [],
            bulkUser  = [];
        while ( countUser >= 0 ) {
          let unidUser = await tool.createUniquid('u', 5);
          bulkUser.push({
                          userid  : unidUser,
                          username: unidUser,
                          passhash: unidUser,
                          phone   : unidUser,
                          email   : `${unidUser}@msign.tech`
                        });
          
          let countSpace = Math.floor(Math.random() * 5 + 4);
          while ( countSpace >= 0 ) {
            bulkSpace.push(
                {
                  spaceid: await tool.createUniquid('s', 5),
                  name   : `${unidUser}的${countSpace}#空间`,
                  creater: unidUser,
                  owner  : unidUser
                }
            );
            
            countSpace--;
          }
          
          countUser--;
        }
        
        /** ******************************
         *  插入数据
         *********************************/
        await MSpace.bulkCreate(bulkSpace);
        await MUser.bulkCreate(bulkUser);
      }
  )();
  
  return class {
    constructor () {
    
    }
  };
};
