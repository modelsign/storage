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
         *  删表
         *********************************/
        await RSpaceObjsrc.drop();
        await RObjsrcTag.drop();
        await MSpace.drop();
        await MObjsrc.drop();
        
        /** ******************************
         *  建表
         *********************************/
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
        
        /** ******************************
         *  关系       空间-用户
         *********************************/
        MSpace.belongsTo(MUser, {
          foreignKey: 'creator',
          targetKey : 'userid'
        });
        MSpace.belongsTo(MUser, {
          foreignKey: 'owner',
          targetKey : 'userid'
        });
        await MSpace.sync({ force: true });
        
        /** ******************************
         *  关系       模型-用户
         *********************************/
        MObjsrc.belongsTo(MUser, {
          foreignKey: 'creator',
          targetKey : 'userid'
        });
        await MObjsrc.sync({ force: true });
        
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
        
        /** ************************************************************
         *
         *                          模拟一批数据
         *
         ***************************************************************/
        /** ******************************
         *  countUser 个用户
         *  每个用户创建4~9个随机数量的空间
         *  每个用户上传1~5个模型
         *
         *********************************/
        let countUser  = 2;
        let bulkSpace  = [],
            bulkUser   = [],
            bulkObjsrc = [];
        while ( countUser >= 0 ) {
          // 用户数据
          let unidUser = await tool.createUniquid('u', 5);
          bulkUser.push({
                          userid  : unidUser,
                          username: unidUser,
                          passhash: unidUser,
                          phone   : unidUser,
                          email   : `${unidUser}@msign.tech`
                        });
          
          // 空间数据
          let countSpace = Math.floor(Math.random() * 5 + 4);
          while ( countSpace >= 0 ) {
            bulkSpace.push(
                {
                  spaceid: await tool.createUniquid('s', 5),
                  name   : `${unidUser}的${countSpace}#空间`,
                  creator: unidUser,
                  owner  : unidUser
                }
            );
            
            countSpace--;
          }
          
          // 模型数据
          let countObjsrc = Math.floor(Math.random() * 5 + 1);
          while ( countObjsrc >= 0 ) {
            let unidObj = await tool.createUniquid('o', 5);
            bulkObjsrc.push(
                {
                  objsrcid: unidObj,
                  source  : `http://msign.oss.tool.budblack.me/${unidObj}`,
                  creator : unidUser
                }
            );
            
            countObjsrc--;
          }
          
          countUser--;
        }
        
        /** ******************************
         *  插入数据
         *********************************/
        await MUser.bulkCreate(bulkUser);
        await MSpace.bulkCreate(bulkSpace);
        await MObjsrc.bulkCreate(bulkObjsrc);
      }
  )();
  
  return class {
    constructor () {
    
    }
  };
};
