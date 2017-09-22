var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger= require('morgan')
var index = require('./routes/index');
var users = require('./routes/users');
var nodemailer= require('nodemailer')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/images/favicon/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));

app.use('/', index);
app.use('/users', users);
app.post('/mailing', function(req, res) {
	let transporter= nodemailer.createTransport({
	    host: 'smtp.zoho.com',
	    port: 465,
	    secure: true,
	    auth: {
	    	user:'fgme.facturacion@b-and-bconsultores.com.mx',
	    	pass: 'alexa1512'
	    } 
	})

	let mailOptions= {
	  from: 'fgme.facturacion@b-and-bconsultores.com.mx',
	  to: 'sissyyayle0517@hotmail.com',
	  subject: 'Mensaje de www.sercyn.com',
	  text: req.body.message,
	  html: `<p>De: ${req.body.name}</p><br><p>Correo: ${req.body.mail}</p><br><p>Teléfono: ${req.body.number}</p><br><p>Destino: ${req.body.services}</p><br><p>Servicio para: ${req.body.person} persona(s)</p><br><p>Para la fecha: ${req.body.date}</p><br><p>Mensaje: ${req.body.message}</p>`
	}

	transporter.sendMail(mailOptions, (error, info) => {
	  if(error) {
	    return console.log(`El mensaje no pudo enviarse:${error}`)
	  }
	  console.log('Mensaje enviado con éxito' + info)
	})
	res.redirect('/comment')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
