



Vue.component('loginForm', {

    data: function() {
        return{
            login: '',
            password: ''
        }
    },
    template:
    '<div>'+
        '<p>Login</p>'  +
        '<input  type="text" placeholder="info" v-model="login" />' +
        '<p>Password</p>'  +
        '<input  type="text" placeholder="info" v-model="password" />' +
        '<br> </br>' +
        '<button @click ="loginButton"> Login </button>'+
        '<button @click ="registerButton"> Register </button>'+


    '</div>',
    methods:{
        loginButton: function(){
            alert("Login =" + this.login + "Password =" + this.password)
            window.location.href='userListPage.html';
        },
        registerButton: function(){
            window.location.href='registerPage.html';

        }
    }
});




const appLogin = new Vue({
    el: '#appLogin',
    template:
    '<div>' +
    '<loginForm/>' +
    '</div>',
    data: {
        messages: []
    }
});

