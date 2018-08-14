module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const MUser = app
    .model
    .define(
      'user',
      {
        userid: { type: BIGINT(), unique: true },
        username: STRING(255),
        passhash: STRING(255),
        phone: STRING(255),
        email: STRING(255),
      },
      {
        freezeTableName: true,
      }
    );
  return MUser;
};
