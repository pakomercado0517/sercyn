const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  local: {
    // name: {type:String, required: true, max: 50} ,
    email: String,
    password: String 
  },
  // facebook: {
  //   email: String,
  //   password: String,
  //   id: String,
  //   token: String
  // },
  // twitter: {
  //   email: String,
  //   password: String,
  //   id: String,
  //   token: String
  // },
  // google: {
  //   email: String,
  //   password: String,
  //   id: String,
  //   token: String
  // }
})

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

let User= mongoose.model('Users', userSchema)

module.exports= User
