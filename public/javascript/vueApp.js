var vm = new Vue({
  el: '#form-contact',
  data:{
    sercyn:{
      price:' El costo de tu servicio es de $',
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

      if(this.sercyn.persons <= 7 && place == 'rio') {
        return price + 1800
      }
      else if(person > 7 && place == 'rio') {
        return price + 3600
      }
      else if(person <=7 && place == 'arrecife') {
        return price + 3500
      }
      else if(person > 7 && place == 'arrecife') {
        return price + 7000
      }
      else if(person <= 7 && place == 'isla') {
        return price + 5500
      }
      else if(person > 7 && place == 'isla') {
        return price + 11000
      }
    } 
  }
})