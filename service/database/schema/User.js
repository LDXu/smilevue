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
//发布模型  'User' 表名，集合名
mongoose.model('User', userSchema)
