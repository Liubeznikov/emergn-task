const userApi = Vue.resource('/users{/name}');
const userByLoginApi = Vue.resource('/users/login{/login}');
Vue.component('searchForm', {
    props: ['users'],
    data: function() {
        return{
            user: null,
            name: ''

        }
    },
    template:
    '<div>'+
    '<h3> Search Form</h3>' +
    '<p>Name </p>'  +
    '<input  type="text" placeholder="info" v-model="name" />' +

    '<br v-for = "user in users "> {{user.login}}</br>' +

    '<button @click ="searchButton"> Search </button>'+

    '</div>',

    methods: {

        searchButton: function(){
          alert("search")
        }
    }
});



Vue.component('userTable', {
    props: ['users'],
    data: function() {
        return{
            user: null

        }
    },
    template:
    '<div>'+
    '<h3 align="center"> User Table</h3>' +
    '<table border="1" >'+
    '<tr >'+
    '<td >'+
    '<p> Login </p>'+
    '</td>' +
    '<td >'+
    '<p> Name </p>'+
    '</td>' +
    '</tr>' +
    '<tr v-for="user in users">'+
    '<td >'+
    '<p @click="clickProcessor(user.login)"> {{user.login}}</p>'+
    '</td>' +
    '<td >'+
    '<p @click="clickProcessor(user.login)"> {{user.name}}</p>'+
    '</td>' +

    '</tr>' +
    '</table>'+

    '</div>',
    created: function() {
        userApi.get().then(result =>
        result.json().then(data =>
        data.forEach(user => this.users.push(user))
    )
    )
    },

    methods: {

        clickProcessor: function(str){
            alert(str);

        }
    }
});

Vue.component('userProfile', {

    data: function() {
        return{
            login: '',
            name:'',
            email: '',
            password: '',
            repeatPassword: ''

        }
    },
    template:
    '<div>'+
    '<h3> Info and Edit Form</h3>' +
    '<p>Login </p>'  +
    '<input  type="text" placeholder="info" v-model="login" />' +
    '<p>Name </p>'  +
    '<input  type="text" placeholder="info" v-model="name" />' +
    '<p>Email </p>'  +
    '<input  type="text" placeholder="info" v-model="email" />' +
    '<p>Password </p>'  +
    '<input  type="text" placeholder="info" v-model="password" />' +
    '<p>Repeat password</p>'  +
    '<input  type="text" placeholder="info" v-model="repeatPassword" />' +
    '<br> </br>' +
    '<button @click ="updateButtonClick"> Update </button>'+
    '<button @click ="deleteButtonClick"> Delete </button>'+
    '<br> </br>'+

    '</div>',
    methods: {
        updateButtonClick: function () {
            const regexp = /^[a-zA-Z0-9-_]+$/;
            const regexpAlpha = /^[a-zA-Z]+$/;
            const regexpEmail =/^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i; //регулярное выражение для e-mail
            if (this.login.search(regexp) === -1){
                alert('invalid login');
                // return 0;
            }

            if (this.name.search(regexpAlpha) === -1){
                alert('invalid name');
                // return 0;
            }
            if (this.name.search(regexpEmail) === -1){
                alert('invalid email');
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
        deleteButtonClick: function(){
            window.location.href='index.html';

        }
    }
});


Vue.component('logOutButton', {

    data: function() {
        return{
            login: ''

        }
    },
    template:
    '<div>'+
    '<button @click ="logOut"> Logout </button>'+
    '</div>',
    methods: {

        logOut: function(){
            alert("logout");

        }
    }
});






const appUserList = new Vue({
    el: '#appUserList',
    template:
    '<div>' +
    '<logOutButton/>'+
    '<table border="1">' +
     '<tr >' +
    '<td  >' +
    '<searchForm />' +
    '</td>' +
    '<td>' +
    '<userTable :users = "users"/>' +
    '</td>' +
    '<td>' +
    '<userProfile />' +
    '</td>' +
    '</tr>' +
    '</table>'+

    '</div>',
    data: {
        users: []
    }
});

