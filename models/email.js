var nodemailer= require('nodemailer')


function sendMailer(req, res, next) {
  let transporter= nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user:'sercyn_web@sercyn.com',
        pass: 'chisqueado0517'
      } 
  })

  let mailOptions= {
    from: 'sercyn_web@sercyn.com',
    to: 'admin@sercyn.com',
    subject: 'Mensaje de www.sercyn.com',
    text: req.body.message,
    html: `<p>De: ${req.body.name}</p><br><p>Correo: ${req.body.mail}</p><br><p>Teléfono: ${req.body.number}</p><br><p>Destino: ${req.body.services}</p><br><p>Servicio para: ${req.body.person} persona(s)</p><br><p>Para la fecha: ${req.body.date}</p><br><p>Mensaje: ${req.body.message}</p>`
  }

  let sendAnswer = {
    from: 'sercyn_web@sercyn.com',
    to: `${req.body.mail}`,
    subject: `Saludos ${req.body.name}!` ,
    text: `Hola ${req.body.name}: Muchas gracias por comunicarte con nosotros, haremos contacto contigo lo mas breve posible.`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(`El mensaje no pudo enviarse:${error}`)
    }
    console.log('Mensaje enviado con éxito' + info)
  })
  transporter.sendMail(sendAnswer, (error, info) => {
    if(error) {
      return console.log(`El mensaje no pudo enviarse:${error}`)
    }
    console.log('Respuesta enviada con éxito' + info)
  })
  setTimeout(() => {
    res.redirect('/comment')
  }, 5000)  
}


module.exports= sendMailer