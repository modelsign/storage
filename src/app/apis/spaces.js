'use strict';

module.exports = {
  
  async show (ctx) {
    let spaceid = this.params.id;
    
    let { app }                           = this,
        { Sequelize }                     = app,
        { MSpace, MObjsrc, RSpaceObjsrc } = app.model;
    
    let objects = await RSpaceObjsrc
        .findAll(
            {
              where  : { spaceid },
              include: [MObjsrc, MSpace]
            }
        );
    this.data   = objects || [];
  }
};
