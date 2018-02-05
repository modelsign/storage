module.exports = app => {
  const { BIGINT } = app.Sequelize;
  
  const RObjsrcTag = app
      .model
      .define(
          'r_objsrc_tag',
          {
            creator: BIGINT()
          },
          {
            freezeTableName: true
          }
      );
  return RObjsrcTag;
};
