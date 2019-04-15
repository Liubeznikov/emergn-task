
const messageApi = Vue.resource('/users');
const userByLoginApi = Vue.resource('/users/login{/login}');
Vue.component('registerForm', {

    data: function() {
        return{
            login: '',
            name: '',
            repeatPassword: '',
            password: '',
            user : {login:'', name: '', email:'',password:''},
            userFromDB : {login:'', name: '', email:'',password:''}
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
    '<button @click ="registerButton"> Register </button>'+
    '<button @click ="cancelButton"> Cancel </button>'+


    '</div>',
    methods: {
        registerButton: function () {
            const regexp = /^[a-zA-Z0-9-_]+$/;
            const regexpAlpha = /^[a-zA-Z]+$/;
            if (this.login.search(regexp) === -1){
                alert('invalid login');
               return 0;
                }

            if (this.name.search(regexpAlpha) === -1){
                alert('invalid name');
              return 0;
            }
            if (this.password.length < 6 ){
                alert('Too short password');
               return 0;
            }

            if ( this.password !==  this.repeatPassword ){
                alert('passwords do not match');
                return 0;
            }
                this.user.login = this.login;
            this.user.name = this.name;
            this.user.password = this.password;
            this.user.email = '';

            userByLoginApi.get({login:this.login}).then(result =>
            result.json().then(usr => {
                if(result.status === 200) {
                    this.userFromDB.name = usr.name;
                    this.userFromDB.login = usr.login;
                    this.userFromDB.email = usr.email;
                    this.userFromDB.password = usr.password;

                    alert("login is busy");

                }



            })
        ).catch((error) => { messageApi.save({}, this.user).then(result =>
                result.json().then(data => {
                    alert("Registration done");
                    window.location.href = 'index.html';
                })
            )})




        },
        cancelButton: function(){
            window.location.href='index.html';

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

