var nodemailer= require('nodemailer')

function sendMailer(req, res, next) {
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
}


module.exports= sendMailer