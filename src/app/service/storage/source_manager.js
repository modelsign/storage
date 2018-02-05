class ObjSrc {
  
  constructor () {
    this._tags  = [];
    this._url   = '';
    this._objid = '';
  }
  
  /**
   * 获取对象的tags
   * @return {string[]} 标签数组
   */
  getTags () {
    return this._tags || [];
  };
  
  /**
   *
   * @return {string}
   */
  getUrl () {
    return this._url || '';
  }
  
  /**
   *
   * @return {string}
   */
  getObjid () {
    return this._objid;
  }
}

module.exports = class {
  
  /**
   *
   * 查询一个关键字
   * @param {string} keyword 关键字
   * @return {ObjSrc}
   */
  static find (keyword) {
    
    return {};
  }
  
  static save (objSrc, objFile) {
  
  }
  
  static get (objId) {
  
  }
  
  static edit (objId, objSrc) {
    
  }
};
