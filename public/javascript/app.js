$('#form-contact').submit(function() {
    swal('Muchas Gracias!', 'Tu mensaje ha sido enviado', 'success')
  .fail(function(){
    swal('Lo sentimos!','Hubo un error en el envío', 'error')
  })
})