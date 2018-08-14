'use strict';

module.exports = {

  async show(ctx) {
    const spaceid = this.params.id;

    let { app } = this,
      { Sequelize } = app,
      { MSpace, MObjsrc, RSpaceObjsrc } = app.model;

    const objects = await RSpaceObjsrc
      .findAll(
        {
          where: { spaceid },
          include: [ MObjsrc, MSpace ],
        }
      );
    this.data = objects || [];
  },
};
