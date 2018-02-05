module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;
  
  const MFile = app
      .model
      .define(
          'upload', {
            fileid : BIGINT(),
            creator: STRING(255),
            path   : STRING(2048),
            url    : STRING(2048),
            md5    : STRING(2048),
            sha1   : STRING(2048)
          },
          {
            freezeTableName: true
          }
      );
  
  return MFile;
};
