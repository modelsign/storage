module.exports = app => {
  const { GEOMETRY, FLOAT } = app.Sequelize;
  
  const RSpaceObjsrc = app
      .model
      .define(
          'r_space_objsrc',
          {
            location: GEOMETRY('POINT'),
            height  : FLOAT()
          },
          {
            freezeTableName: true
          }
      );
  return RSpaceObjsrc;
};
