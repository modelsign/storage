module.exports = app => {
  const { STRING, BIGINT} = app.Sequelize;
  
  const MObjsrc = app
      .model
      .define(
          'objsrc',
          {
            objsrcid: { type: BIGINT(255), unique: true },
            name    : STRING(255),
            source  : STRING(2048)
          },
          {
            freezeTableName: true
          }
      );
  return MObjsrc;
};
