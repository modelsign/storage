module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const MTag = app
    .model
    .define(
      'tag',
      {
        tagid: { type: BIGINT(), unique: true },
        title: STRING(255),
        describ: STRING(255),
        creator: BIGINT(),
      },
      {
        freezeTableName: true,
        indexes: [
          {
            unique: false,
            fields: [ 'creator', 'title' ],
          },
        ],
      }
    );
  return MTag;
};
