module.exports = app => {
  const { STRING, BIGINT, FLOAT } = app.Sequelize;
  
  const MProcess = app
      .model
      .define(
          'process',
          {
            proid   : BIGINT(),
            title   : STRING(255),
            describe: STRING(255),
            progress: FLOAT(),
            status  : STRING(2048)
          },
          {
            freezeTableName: true
          }
      );
  return MProcess;
};
