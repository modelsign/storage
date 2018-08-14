const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

const uuid = require('eustia-module/uuid');

module.exports = app => {
  return class extends Controller {

    async save(fileid, creator, path, url, md5, sha1) {
      const { MFiles } = app.model;
      const file = await MFiles.create(
        { fileid, creator, path, url, md5, sha1 });
      file.save();
    }

    async upload() {
      const ctx = this.ctx;
      const parts = ctx.multipart();
      let part;
      const files = [];
      const timestamp = Date.now();
      let localPath = path.join(
        __dirname,
        '/../upload/',
        `${timestamp}/`
      );
      // if()
      await fs.mkdirSync(localPath);
      localPath = path.join(filename);

      while (part = await parts()) {
        if (part.length) {
        } else {
          if (!part.filename) {
            return;
          }
          let result;
          try {
            const { fieldname, filename, mimeType } = part;
            const fid = uuid();
            const nameArr = part.filename.split('.');
            const nameExt = nameArr[nameArr.length - 1];

            // 准备对文件流计算hash值
            const fsHashMD5 = crypto.createHash('md5');
            const fsHashSHA1 = crypto.createHash('sha1');
            const ossPath = `uploads/${fid}.${nameExt}`;

            part.on('data', data => {
              fsHashMD5.update(data);
              fsHashSHA1.update(data);
            });
            part.on('end', () => {
              const md5 = fsHashMD5.digest('hex');
              const sha1 = fsHashSHA1.digest('hex');

              this.save(fid, null, localPath, ossPath, md5, sha1);
            });

            const fw = fs.createWriteStream(localPath);
            part.pipe(fw);
            files.push(
              {
                fieldname, filename,
                mimeType, md5: '',
                ossPath, part,
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
            files,
          },
        };
      } else {
        ctx.body = {
          error: {},
        };
      }
    }
  };
};
