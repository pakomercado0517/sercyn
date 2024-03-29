let express= require('express')
let router= express.Router()

let {url} = require('../config/database')
let Service= require('../models/service')

// Servicio Normal

router.post('/service/operar', (req,res, next) => {
  console.log(req.body)

  if(req.body._id === '') {
    let ser= new Service({
      name: req.body.name,
      lastName: req.body.lastName,
      persons: req.body.persons,
      date: req.body.date,
      observations: req.body.observations,
    })
    ser.save()
  }else {
    Service.findByIdAndUpdate(req.body._id, {$set: req.body }, {new: true}, (err, model) => {
      if (err) throw err
    })
  }
  res.redirect('/service')
})

router.post('/update/service/operar', (req,res, next) => {
  console.log(req.body)

  if(req.body._id === '') {
    let ser= new Service({
      name: req.body.name,
      lastName: req.body.lastName,
      persons: req.body.persons,
      date: req.body.date,
      observations: req.body.observations,
    })
    ser.save()
  }else {
    Service.findByIdAndUpdate(req.body._id, {$set: req.body }, {new: true}, (err, model) => {
      if (err) throw err
    })
  }
  res.redirect('/admin')
})

module.exports= router