const mongoose= require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  name: {type: String},
  lastName: {type: String},
  date: {type: Date},
  persons: {type:Number}
  
})

let Service= mongoose.model('Services', serviceSchema)

module.exports = Service