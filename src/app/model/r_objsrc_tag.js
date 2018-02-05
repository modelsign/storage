module.exports = app => {
  const { BIGINT, STRING } = app.Sequelize;
  
  const RObjsrcTag = app
      .model
      .define(
          'r_objsrc_tag',
          {
            creator: STRING(255)
          },
          {
            freezeTableName: true
          }
      );
  return RObjsrcTag;
};
