// Incorporacion de vue.js

var vm = new Vue({
  el: '#form-contact',
  data:{
    sercyn:{
      price:' El Costo por persona es de $',
      name:'',
      apellido:'',
      email:'',
      phone:'',
      persons: 0,
      place: null,
    }
  },
  computed: {
    costoDelViaje: function () {
      var place= this.sercyn.place;
      var price= this.sercyn.price;
      var person= this.sercyn.persons;
      var item1= 3500;
      var item2= 7000;
      var item3= 4200
      var item4= 8400
      var item5= 7000
      var item6= 14000

      if(this.sercyn.persons == 0 && place == place) {
        return null
      }
      else if(this.sercyn.persons <= 7 && place == 'rio') {
        swal('Hola!', `El costo total del paquete es de $${item1} con un máximo de 7 personas`)
        return  price + Math.ceil(item1/this.sercyn.persons)
      }
      else if(person > 7 && place == 'rio') {
        swal('Hola!', `El costo total del paquete es de ${item2} con un máximo de 14 personas`)
        return price + Math.ceil(item2/this.sercyn.persons)
      }
      else if(person <=7 && place == 'arrecife') {
        swal('Hola!', `El costo total del paquete es de ${item3} con un máximo de 7 personas`)
        return price + Math.ceil(item3/this.sercyn.persons)
      }
      else if(person > 7 && place == 'arrecife') {
        swal('Hola!', `El costo total del paquete es de ${item4} con un máximo de 14 personas`)
        return price + Math.ceil(item4/this.sercyn.persons)
      }
      else if(person <= 7 && place == 'isla') {
        swal('Hola!', `El costo total del paquete es de ${item5} con un máximo de 7 personas`)
        return price + Math.ceil(item5/this.sercyn.persons)
      }
      else if(person > 7 && place == 'isla') {
        swal('Hola!', `El costo total del paquete es de ${item6} con un máximo de 14 personas`)
        return price + Math.ceil(item6/this.sercyn.persons)
      }
    } 
  }
})
Vue.config.devtools = true;

// Alerta de envio de formulario
// function captcha(a) {
//   var response= grecaptcha.getResponse();
//   if(reponse.length == 0) {
//     swal('Error', 'Captcha no verificado', 'error');
//     return false;
//     event.preventDefault();
//   } else {
//     swal('Muchas Gracias!', 'Tu mensaje ha sido enviado con exito', 'success');
//     return true;
//   }
// }



$('.form-contact').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr){
        status('Error ' + xhr.status)
      },
      success: function(response) {
        console.log('Mensaje enviado con exito!')
      }
    })
    return false
})

