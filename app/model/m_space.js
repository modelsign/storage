module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const MSpace = app
    .model
    .define(
      'space',
      {
        spaceid: { type: BIGINT(), unique: true },
        name: STRING(255),
      },
      {
        freezeTableName: true,
        indexes: [
          {
            unique: false,
            fields: [ 'name' ],
          },
        ],
      }
    );
  return MSpace;
};
