module.exports = app => {
  const { BIGINT, STRING } = app.Sequelize;

  const RObjsrcTag = app
    .model
    .define(
      'r_objsrc_tag',
      {
        creator: BIGINT(),
      },
      {
        freezeTableName: true,
      }
    );
  return RObjsrcTag;
};
