module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;
  
  const MCounter = app
      .model
      .define(
          'counter',
          {
            key    : { type: STRING(255), unique: true },
            val    : BIGINT(),
            min    : { type: BIGINT(), default: 0 },
            max    : { type: BIGINT(), default: 0 },
            describ: STRING(255)
          },
          {
            freezeTableName: true
          }
      );
  return MCounter;
};
