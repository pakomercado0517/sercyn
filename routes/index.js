var express = require('express');
var router = express.Router();
const sendMailer= require('../models/email')
let Service= require('../models/service')
const mongoose= require('mongoose')
let User= require('../models/user')
let passport= require('passport')
const request= require('request')
const Swal= require('sweetalert2')

/* GET home page. */
router.get('/',async function(req,res) {
  await res.render('index', {
    title: 'Sercyn-Ecoturismo,Pesca deportiva y Servicios Turísticos-',
    background_slide: '/stylesheet/home_background/background-slide.css'
  });
});
router.get('/covid19', async function(req,res) {
  await res.render('covid_19')
})
router.get('/rio', async function(req,res) {
  await res.render('rio', { 
    title: 'Rio Tuxpan-Ecoturismo,Pesca deportiva y Servicios Turísticos-',
    background_slide: '/stylesheet/rio_background/background-slide.css'
  })
})
router.get('/arrecife', async function(req,res) {
  await res.render('arrecife', {
    title: 'Arrecífes-Ecoturismo,Pesca deportiva y Servicios Turísticos-',
    background_slide: '/stylesheet/arrecife_background/background-slide.css'
  })
})
router.get('/lobos',async function(req, res) {
  await res.render('lobos', {
    title:'Isla de Lobos-Ecoturismo,Pesca deportiva y Servicios Turísticos-',
    background_slide: '/stylesheet/isla_background/background-slide.css'
  })
})
router.get('/comment', async function(req,res) {
  await res.render('comment', {
    title:'Contacto-Ecoturismo,Pesca deportiva y Servicios Turísticos-',
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})
router.get('/reservar', async function(req,res) {
  await res.render('reservacion', {title: 'Reservacion-Ecoturismo, Pesca deportiva y Servicios Turísticos'})
})

router.post('/mailing', (res,req,next) => {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response']=== '' || req.body['g-recaptcha-response'] === null) {
    res.json({"respondeCode": 1, "responseDesc": "Por favor, responde al captcha"})
    Swal.fire('Error', 'Por favor verifica el captcha', 'error')
  }
  
  const secretKey= '6LdstnkUAAAAABQjQu64PPlcdW1KaKO2M7H_ymIW';

  let verifyUrl= `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}&remoteip=${req.connection.remoteAddress}`;

  request(verifyUrl, function(error, response,body) {
    body=JSON.parse(body);
    if(body.success !== undefined && !body.success) {
      res.json({"responseCode": 1, "responseDesc": "Falló verificación de captcha"})
      Swal.fire('Atención', 'Fallo la verificación del Captcha', 'error')
    }
    res.json({"responseCode": 0, "responseDesc": "Captcha verificado"})
    Swal.fire('Muchas gracias!', 'Mensaje enviado con éxito', 'success') 
    // return next('/mailing')
  })
  // next('/comment')
}, (sendMailer) )
router.get('/shopping', function (req,res, next) {
  res.render('compra', {title: 'Reservacion-Ecoturismo, Pesca deportiva y Servicios Turísticos'})
})
router.get('/privacy', function(req, res) {
  res.render('privacy', {
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})

// login and signup

router.get('/acceso', (req, res) => {
  res.render('acceso', {
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})
router.get('/login', (req,res) => {
  res.render('login', {
    message: req.flash('loginMesage'),
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/service',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/signup', (req,res) => {
  res.render('signup', {
    message: req.flash('signupMessage'),
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/service',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/logout', (req,res) => {
  req.logout()
  res.redirect('/acceso', {
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/acceso')
}

// crud services


router.get('/conanp', (req, res, next) => {
  res.redirect('/service', {
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})

router.get('/admin', isLoggedIn, (req,res,next) => {
  Service.find((err,services) =>{
    if(err) throw err
    res.render('adminService', {
      services: services,
      background_slide: '/stylesheet/home_background/background-slide.css'
    })
  })
})

router.get('/service', isLoggedIn, (req, res, next) => {
  Service.find((err, services) => {
    if (err) throw err
    res.render('service', {
      services:services,
      background_slide: '/stylesheet/home_background/background-slide.css'
    })
  })
  })
router.get('/service/nuevo', isLoggedIn, (req,res,next) => {
  res.render('serviceForm', {
    background_slide: '/stylesheet/home_background/background-slide.css'
  })
})

router.get('/service/modificar/:id', isLoggedIn, (req, res, next) => {
  let idService= req.params.id
  Service.findOne({_id: idService}, (err, service) => {
    if (err) throw err
    res.render('serviceFormUpdate', {
      service: service,
      background_slide: '/stylesheet/home_background/background-slide.css'
    })
  })
})

router.get('/service/eliminar/:id', isLoggedIn, (req, res, next) => {
  let idService= req.params.id
  Service.remove({_id: idService}, (err) => {
    if(err) throw err
    res.redirect('/admin', {
      background_slide: '/stylesheet/home_background/background-slide.css'
    })
  })
})

module.exports = router;