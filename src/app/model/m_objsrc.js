module.exports = app => {
  const { STRING, BIGINT,UUID} = app.Sequelize;
  
  const MObjsrc = app
      .model
      .define(
          'objsrc',
          {
            objsrcid: { type:STRING(255), unique: true },
            source  : STRING(2048)
          },
          {
            freezeTableName: true
          }
      );
  return MObjsrc;
};
