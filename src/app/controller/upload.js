const crypto         = require('crypto');
const fs             = require('fs');
const path           = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller     = require('egg').Controller;

const uuid = require('eustia-module/uuid');

module.exports = app => {
  return class extends Controller {
    
    async save (fileid, creator, path, url, md5, sha1) {
      let { MFiles } = app.model;
      let file       = await MFiles.create(
          { fileid, creator, path, url, md5, sha1 });
      file.save();
    }
    
    async upload () {
      const ctx     = this.ctx;
      const parts   = ctx.multipart();
      let part;
      let files     = [];
      let timestamp = Date.now();
      let localPath = path.join(
          __dirname,
          '/../upload/',
          `${timestamp}/`
      );
      // if()
      await fs.mkdirSync(localPath);
      localPath = path.join(filename);
      
      while ( part = await parts() ) {
        if (part.length) {
        } else {
          if (!part.filename) {
            return;
          }
          let result;
          try {
            let { fieldname, filename, mimeType } = part;
            let fid                               = uuid();
            let nameArr                           = part.filename.split('.');
            let nameExt                           = nameArr[nameArr.length - 1];
            
            // 准备对文件流计算hash值
            let fsHashMD5  = crypto.createHash('md5');
            let fsHashSHA1 = crypto.createHash('sha1');
            let ossPath    = `uploads/${fid}.${nameExt}`;
            
            part.on('data', (data) => {
              fsHashMD5.update(data);
              fsHashSHA1.update(data);
            });
            part.on('end', () => {
              let md5  = fsHashMD5.digest('hex');
              let sha1 = fsHashSHA1.digest('hex');
              
              this.save(fid, null, localPath, ossPath, md5, sha1);
            });
            
            let fw = fs.createWriteStream(localPath);
            part.pipe(fw);
            files.push(
                {
                  fieldname, filename,
                  mimeType, md5: '',
                  ossPath, part
                }
            );
            
            // result = await ctx.oss.put(ossPath, part);
          } catch (err) {
            await sendToWormhole(part);
            throw err;
          }
        }
      }
      if (files.length) {
        ctx.body = {
          meta: {
            files
          }
        };
      } else {
        ctx.body = {
          error: {}
        };
      }
    }
  };
};
