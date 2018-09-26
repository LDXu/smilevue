const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'
const golb = require('glob')
const {resolve} = require('path')

exports.initSchemas = ()=>{
  golb.sync(resolve(__dirname, './schema', '**/*.js' )).forEach(require)
}

exports.connect = ()=>{
  //连接数据库
  mongoose.connect(db);
  let maxConnectTime = 0;

  return new Promise((resolve, reject)=>{
    //增加数据库监听事件
        /**
       * 连接成功
       */
    mongoose.connection.on('connected', function () {
        console.log('数据库连接成功');
    });

    /**
     * 连接异常
     */
    mongoose.connection.on('error',function (err) {
        console.log('数据库连接出现错误，错误为：'+ err);
        if(maxConnectTime<=3){
          maxConnectTime++;
          mongoose.connect(db);
        }else{
          reject();
          throw new Error('数据库出现问题，请人为修改')
        }
    });

    /**
     * 连接断开
     */
    mongoose.connection.on('disconnected', function () {
        console.log('数据库连接断开');
        if(maxConnectTime<=3){
          maxConnectTime++;
          mongoose.connect(db);
        }else{
          reject();
          throw new Error('数据库出现问题，请人为修改')
        }
    });

    /**
     * 连接断开
     */
    mongoose.connection.once('open', function () {
      console.log('连接打开');
      resolve();
  });
  })

}
