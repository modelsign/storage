module.exports = app => {
  const { STRING, BIGINT, UUID } = app.Sequelize;

  const MFile = app
    .model
    .define(
      'upload', {
        fileid: BIGINT(),
        creator: BIGINT(),
        path: STRING(2048),
        url: STRING(2048),
        md5: STRING(2048),
        sha1: STRING(2048),
      },
      {
        freezeTableName: true,
      }
    );

  return MFile;
};
