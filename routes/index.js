var express = require('express');
var router = express.Router();
const sendMailer= require('../models/email')
let Service= require('../models/service')
const mongoose= require('mongoose')
let User= require('../models/user')
let passport= require('passport')
const request= require('request')
const swal= require('sweetalert2')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sercyn-Ecoturismo,Pesca deportiva y Servicios Turísticos-' });
});
router.get('/rio', function(req,res, next) {
  res.render( 'rio', { title: 'Rio Tuxpan-Ecoturismo,Pesca deportiva y Servicios Turísticos-' })
})
router.get('/arrecife', function(req,res,next) {
	res.render('arrecife', {title: 'Arrecífes-Ecoturismo,Pesca deportiva y Servicios Turísticos-'})
})
router.get('/lobos', function(req, res, next) {
	res.render('lobos', {title:'Isla de Lobos-Ecoturismo,Pesca deportiva y Servicios Turísticos-'})
})
router.get('/comment', function(req,res, next) {
	res.render('comment', {title:'Contacto-Ecoturismo,Pesca deportiva y Servicios Turísticos-'})
})
router.get('/reservar', function(req, res, next) {
	res.render('reservacion', {title: 'Reservacion-Ecoturismo, Pesca deportiva y Servicios Turísticos'})
})

router.post('/mailing', (req,res, next) => {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response']=== '' || req.body['g-recaptcha-response'] === null) {
    console.log('Por favor, verifica el captcha')
    return next('/comment')
  } 
  const secretKey= '6LdstnkUAAAAABQjQu64PPlcdW1KaKO2M7H_ymIW';

  let verifyUrl= `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}&remoteip=${req.connection.remoteAddress}`;

  request(verifyUrl, function(error, response,body) {
    body=JSON.parse(body);
    if(body.success !== undefined && !body.success) {
      console.log('Falló verificación de captcha')
      return next('/comment')
    } 
  })
  next()
}, (sendMailer) )
router.get('/shopping', function (req,res, next) {
	res.render('compra', {title: 'Reservacion-Ecoturismo, Pesca deportiva y Servicios Turísticos'})
})
router.get('/privacy', function(req, res) {
	res.render('privacy')
})

// login and signup

router.get('/acceso', (req, res) => {
  res.render('acceso')
})
router.get('/login', (req,res) => {
  res.render('login', {
    message: req.flash('loginMesage')
  })
})
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/service',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/signup', (req,res) => {
  res.render('signup', {
    message: req.flash('signupMessage')
  })
})
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/service',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/logout', (req,res) => {
  req.logout()
  res.redirect('/acceso')
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/acceso')
}

// crud services


router.get('/conanp', (req, res, next) => {
  res.redirect('/service')
})

router.get('/admin', isLoggedIn, (req,res,next) => {
  Service.find((err,services) =>{
    if(err) throw err
    res.render('adminService', {services: services})
  })
})

router.get('/service', isLoggedIn, (req, res, next) => {
  Service.find((err, services) => {
    if (err) throw err
    res.render('service', {services:services})
  })
  })
router.get('/service/nuevo', isLoggedIn, (req,res,next) => {
  res.render('serviceForm')
})

router.get('/service/modificar/:id', isLoggedIn, (req, res, next) => {
  let idService= req.params.id
  Service.findOne({_id: idService}, (err, service) => {
    if (err) throw err
    res.render('serviceFormUpdate', {service: service})
  })
})

router.get('/service/eliminar/:id', isLoggedIn, (req, res, next) => {
  let idService= req.params.id
  Service.remove({_id: idService}, (err) => {
    if(err) throw err
    res.redirect('/admin')
  })
})

module.exports = router;
