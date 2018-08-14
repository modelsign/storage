const uuid = require('eustia-module/uuid');

const TABLE_RESET = false;

module.exports = app => {
  let { model } = app,
      {
        MObjsrc, MSpace, MFile, MUser,
        MProcess, MTag, MCounter,
        RSpaceObjsrc, RObjsrcTag
      }         = model;
  
  const tool = require('./tool')(app);
  
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
        if (TABLE_RESET) {
          await RSpaceObjsrc.drop();
          await RObjsrcTag.drop();
          await MSpace.drop();
          await MObjsrc.drop();
        }
        
        /** ******************************
         *  建表
         *********************************/
        if (TABLE_RESET) {
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
        }
        /** ******************************
         *  关系       空间-用户
         *********************************/
        await MSpace.belongsTo(MUser, {
          foreignKey: 'creator',
          targetKey : 'userid'
        });
        await MSpace.belongsTo(MUser, {
          foreignKey: 'owner',
          targetKey : 'userid'
        });
        
        await MSpace.sync({ force: TABLE_RESET });
        
        /** ******************************
         *  关系       模型-用户
         *********************************/
        await MObjsrc.belongsTo(MUser, {
          foreignKey: 'creator',
          targetKey : 'userid'
        });
        await MObjsrc.sync({ force: TABLE_RESET });
        
        /** ******************************
         *  关系       模型-空间
         *********************************/
        RSpaceObjsrc.belongsTo(MObjsrc, {
          foreignKey: 'objsrcid',
          targetKey : 'objsrcid'
        });
        RSpaceObjsrc.belongsTo(MSpace, {
          foreignKey: 'spaceid',
          targetKey : 'spaceid'
        });
        MSpace.hasMany(RSpaceObjsrc, {
          foreignKey: 'spaceid',
          source    : 'spaceid'
        });
        MObjsrc.hasMany(RSpaceObjsrc, {
          foreignKey: 'objsrcid',
          source    : 'objsrcid'
        });
        await RSpaceObjsrc.sync({ force: TABLE_RESET });
        /** ******************************
         *  关系       模型-标签
         *********************************/
        RObjsrcTag.belongsTo(MObjsrc, {
          foreignKey: 'objsrcid',
          targetKey : 'objsrcid'
        });
        RObjsrcTag.belongsTo(MTag, {
          foreignKey: 'tagid',
          targetKey : 'tagid'
        });
        MTag.hasMany(RObjsrcTag, {
          foreignKey: 'tagid',
          source    : 'tagid'
        });
        MObjsrc.hasMany(RObjsrcTag, {
          foreignKey: 'objsrcid',
          source    : 'objsrcid'
        });
        await RObjsrcTag.sync({ force: TABLE_RESET });
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
        if (TABLE_RESET) {
          let countUser        = 2;
          let bulkSpace        = [],
              bulkUser         = [],
              bulkObjsrc       = [],
              bultRSpaceObjsrc = [];
          
          while ( countUser >= 0 ) {
            // 用户数据
            const unidUser = await tool.createUniquid('u1001', 5);
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
                    spaceid: await tool.createUniquid('s1002', 5),
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
              const unidObj = await tool.createUniquid('o1003', 5);
              bulkObjsrc.push(
                  {
                    objsrcid: unidObj,
                    source  : `http://msign.oss.tool.budblack.me/${unidObj}`,
                    creator : unidUser
                  }
              );
              
              countObjsrc--;
            }
            
            // 空间-模型数据
            bulkSpace.forEach(
                ({ spaceid }) => {
                  let countObjsrc = Math
                      .floor(Math.random() * bulkObjsrc.length);
                  
                  while ( countObjsrc ) {
                    bultRSpaceObjsrc.push(
                        {
                          spaceid,
                          objsrcid: bulkObjsrc[countObjsrc].objsrcid
                        }
                    );
                    
                    countObjsrc--;
                  }
                }
            );
            
            countUser--;
          }
          
          /** ******************************
           *  插入数据
           *********************************/
          await MUser.bulkCreate(bulkUser);
          await MSpace.bulkCreate(bulkSpace);
          await MObjsrc.bulkCreate(bulkObjsrc);
          await RSpaceObjsrc.bulkCreate(bultRSpaceObjsrc);
        }
      }
  )();
  
  return class {
    constructor () {
    
    }
  };
};
