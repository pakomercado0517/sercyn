var express = require('express');
var router = express.Router();
const sendMailer= require('../models/email')

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
router.post('/mailing', sendMailer)
router.get('/shopping', function (req,res, next) {
	res.render('compra', {title: 'Reservacion-Ecoturismo, Pesca deportiva y Servicios Turísticos'})
})
router.get('/privacy', function(req, res) {
	res.render('privacy')
})

module.exports = router;
