module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  
  const Objsrc = app.model.define('object_source', {
    objsrcid: STRING(255),
    name    : STRING(255),
    source  : STRING(2048)
  },{
    freezeTableName:true
  });
  //
  // User.findByLogin = function* (login) {
  //   return yield this.findOne({ login: login });
  // }
  //
  // User.prototype.logSignin = function* () {
  //   yield this.update({ last_sign_in_at: new Date() });
  // }
  //
  return Objsrc;
};
