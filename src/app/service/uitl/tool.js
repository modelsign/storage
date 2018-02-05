module.exports = app => {
  let { model } = app,
      {
        MObjsrc, MSpace, MFile,
        MProcess, MTag, MCounter,
        RSpaceObjsrc, RObjsrcTag
      }         = model;
  
  return {
    async createUniquid (prefix = '', len = 3) {
      let timenow   = new Date();
      let year      = timenow.getYear() + 1900,
          month     = `0${timenow.getMonth() + 1}`.substr(-2),
          date      = `0${timenow.getDate()}`.substr(-2);
      let uniquid   = 0;
      let counterId = (
          await MCounter.findOrCreate(
              {
                where   : {
                  key: `uniquid_${prefix}_${year}${month}${date}`
                },
                defaults: {
                  val: 0,
                  min: 0,
                  max: Math.pow(10, len) - 1
                }
              }
          )
      )[0];
      counterId.val += 1;
      await      counterId.save();
      uniquid = `${prefix}${year}${month}${date}`
                + (
                    `${new Array(len).join('0')}${counterId.val}`.substr(-len)
                );
      return uniquid;
    }
  };
};
