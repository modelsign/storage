module.exports = app => {
  let { model } = app,
      {
        MObjsrc, MSpace, MFile,
        MProcess, MTag,
        RSpaceObjsrc, RObjsrcTag
      }         = model;
  
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
        
        await MSpace.sync({ force: false });
        await MObjsrc.sync({ force: false });
        
        await MFile.sync({ force: false });
        await MProcess.sync({ force: false });
        await MTag.sync({ force: false });
        
        await RSpaceObjsrc.sync({ force: true });
        await RObjsrcTag.sync({ force: true });
        
        /** ************************************************************
         *
         *                          模拟一批数据
         *
         ***************************************************************/
      }
  )();
  
  return class {
    constructor () {
    
    }
  };
};
