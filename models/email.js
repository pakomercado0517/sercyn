var nodemailer= require('nodemailer')


function sendMailer(req, res, next) {
  let transporter= nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      auth: {
        user:'admin@sercyn.com',
        pass: 'chisqueado0517'
      } 
  })

  let mailOptions= {
    from:'admin@sercyn.com' ,
    to: 'sercyn_web@sercyn.com',
    subject: 'Mensaje de www.sercyn.com',
    text: req.body.message,
    html: `<p>De: ${req.body.name} ${req.body.apellido}</p><br><p>Correo: ${req.body.mail}</p><br><p>Teléfono: ${req.body.number}</p><br><p>Destino: ${req.body.services}</p><br><p>Servicio para: ${req.body.person} persona(s)</p><br><p>Para la fecha: ${req.body.date}</p><br><p>Mensaje: ${req.body.message}</p>`
  }

  let sendAnswer = {
    from: 'admin@sercyn.com',
    to: `${req.body.mail}`,
    subject: `Saludos ${req.body.name}!` ,
    html: `
    <div align= "center">
      <h1>Hola ${req.body.name}: Muchas gracias por comunicarte con nosotros, haremos contacto contigo lo mas breve posible.</h1>
      <br/>
      <h3>El servicio que solicitas incluye:</h3><br/><br/>
          Nevera</br>
          Hielo</br>
          Agua Embotellada</br>
          Refrescos</br>
          Chalecos de Seguridad</br>
          Botiquín</br>
          Tiempo máximo estimado de estancia de 6 hrs.</br>
      <br/>
      <h3> Gracias por su Preferencia.</h3>
      <img src='http://www.sercyn.com/images/logo-sercyn.png' width="150" height="225"></img>  
    </div>`
  }


  transporter.sendMail(mailOptions, (error, info) => {
    // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response']=== '' || req.body['g-recaptcha-response'] === null) {
    //   return res.json({'responseCode': 1, 'responseDesc': 'Por favor selecciona el captcha...'})
    // }
    // const secretKey= '6LdstnkUAAAAABQjQu64PPlcdW1KaKO2M7H_ymIW';

    // let verifyUrl= `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}&remoteip=${req.connection.remoteAddress}`;

    // request(verifyUrl, function(error, response,body) {
    //   body=JSON.parse(body);
    //   if(body.success !== undefined && !body.success) {
    //     return res.json({'responseCode': 1, 'responseDesc': 'Falló verificación de captcha'})
    //   }
    //   console.log(`Mensaje enviado con exito ${info}`)
    // })
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