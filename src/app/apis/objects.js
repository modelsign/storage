'use strict';

module.exports = {
  
  async index () {
    
    let { app }     = this,
        { MObjsrc } = app.model;
    
    let count_models = await MObjsrc.count();
    
    this.meta = {
      'count_models': count_models,
      'count_users' : 0,
      'max_ref'     : 0,
      'avg_ref'     : 0
    };
  },
  
  async show (next) {
    let objsrcid = this.params.id;
    
    let { app }     = this,
        { MObjsrc } = app.model;
    
    let object = await MObjsrc.find({ where: { 'objsrcid': objsrcid } });
    
    if (!object) {
      return await next;
    }
    
    this.data = {
      type      : 'objects',
      id        : object.objsrcid,
      attributes: {
        name  : object.name,
        source: object.source
      },
      links     : {
        self: `//${this.request.header.host}/objects/${object.objsrcid}`
      }
    };
  },
  
  async create () {
    
  },
  
  async update () {
    
  },
  
  async destroy () {
    
  }
};
