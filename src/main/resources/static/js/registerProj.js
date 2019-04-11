
const messageApi = Vue.resource('/users{/id}');

Vue.component('registerForm', {

    data: function() {
        return{
            login: '',
            name: '',
            repeatPassword: '',
            password: ''
        }
    },
    template:
    '<div>'+
    '<p>Login </p>'  +
    '<input  type="text" placeholder="info" v-model="login" />' +
    '<p>Name </p>'  +
    '<input  type="text" placeholder="info" v-model="name" />' +
    '<p>Password </p>'  +
    '<input  type="text" placeholder="info" v-model="password" />' +
    '<p>Repeat password</p>'  +
    '<input  type="text" placeholder="info" v-model="repeatPassword" />' +
    '<br> </br>' +
    '<button @click ="loginButton"> Login </button>'+
    '<button @click ="cancelButton"> Cancel </button>'+


    '</div>',
    methods: {
        loginButton: function () {
            const regexp = /^[a-zA-Z0-9-_]+$/;
            const regexpAlpha = /^[a-zA-Z]+$/;
            if (this.login.search(regexp) === -1){
                alert('invalid login');
               // return 0;
                }

            if (this.name.search(regexpAlpha) === -1){
                alert('invalid name');
               // return 0;
            }
            if (this.password.length < 6 ){
                alert('Too short password');
               // return 0;
            }

            if ( this.password !==  this.repeatPassword ){
                alert('passwords do not match');
               // return 0;
            }


                alert("Login =" + this.login + "Password =" + this.password + "Name =" + this.name + "Repeat password =" + this.repeatPassword);

        },
        cancelButton: function(){
            window.location.href='loginPage.html';

        }
    }
});





const appRegister = new Vue({
    el: '#appRegister',
    template:
    '<div>' +
    '<registerForm/>' +
    '</div>',
    data: {
        messages: []
    }
});

