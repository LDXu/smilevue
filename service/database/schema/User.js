const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALF_WORK_FACTOR = 10

//创建UserSchema
const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  passWord: String,
  createAt:{type:Date, default:Date.now()},
  lastLoginAt:{type:Date, default:Date.now()}
},{
  collection:'user'
})
userSchema.pre('save', function(next){
  bcrypt.genSalt(SALF_WORK_FACTOR,)
  bcrypt.genSalt(SALF_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err);
    bcrypt.hash(this.passWord, salt,(err,hash)=>{
      if(err) return next(err);
      this.passWord = hash;
      next();
    })
  })
})

userSchema.methods={
  comparePassword:(_password,passWord)=>{
    return new Promise((resolve,reject)=>{
      bcrypt.compare(_password,passWord,(error,isMatch)=>{
        if(!error) resolve(isMatch)
        else reject(error)
      })
    })
  }
}

//发布模型  'User' 表名，集合名
mongoose.model('User', userSchema)
