let express= require('express')
let router= express.Router()

let {url} = require('../config/database')
let Service= require('../models/service')

router.post('/service/operar', (req,res, next) => {
  console.log(req.body)

  if(req.body._id === '') {
    let ser= new Service({
      name: req.body.name,
      lastName: req.body.lastName,
      persons: req.body.persons,
      date: req.body.date
    })
    ser.save()
  }else {
    Service.findByIdAndUpdate(req.body._id, {$set: req.body }, {new: true}, (err, model) => {
      if (err) throw err
    })
  }
  res.redirect('/service')
})

module.exports= router