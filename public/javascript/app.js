// Incorporacion de vue.js

var vm = new Vue({
  el: '#form-contact',
  data:{
    sercyn:{
      price:' El Costo por persona es de $',
      name:'',
      email:'',
      phone:'',
      persons: 0,
      place: null
    }
  },
  computed: {
    costoDelViaje: function () {
      var place= this.sercyn.place;
      var price= this.sercyn.price;
      var person= this.sercyn.persons;
      var item1= 1800;
      var item2= 3600;
      var item3= 3500
      var item4= 7000
      var item5= 5500
      var item6= 11000

      if(this.sercyn.persons == 0 && place == place) {
        return `Hola! ${this.sercyn.name}`
      }
      else if(this.sercyn.persons <= 7 && place == 'rio') {
        swal('Hola!', `El costo total del paquete es de $${item1} con un máximo de 7 personas`)
        return price + Math.ceil(item1/this.sercyn.persons)
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


// Alerta de envio de formulario
$('.form-contact').submit(function() {
    swal('Muchas Gracias!', 'Tu mensaje ha sido enviado', 'success')
  .fail(function(){
    swal('Lo sentimos!','Hubo un error en el envío', 'error')
  })
})

