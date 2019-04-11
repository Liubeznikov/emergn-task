const messageApi = Vue.resource('/users{/id}');
Vue.component('searchForm', {

    data: function() {
        return{
            login: ''

        }
    },
    template:
    '<div>'+
    '<h3> Search Form</h3>' +
    '<p>Login </p>'  +
    '<input  type="text" placeholder="info" v-model="login" />' +

    '<br> </br>' +
    '<button @click ="searchButton"> Login </button>'+

    '</div>',
    methods: {

        searchButton: function(){
           alert("search");

        }
    }
});


Vue.component('userTable', {

    data: function() {
        return{
            login: ['a', 'b','c'],
            name: ['a', 'b','c']

        }
    },
    template:
    '<div>'+
    '<h3 align="center"> User Table</h3>' +
    '<table align="center" >'+
    '<tr >'+
    '<td >'+
    '<p> Login </p>'+
    '</td>' +
    '<td >'+
    '<p> Name </p>'+
    '</td>' +
    '</tr>' +
    '<tr v-for="n in 3">'+
    '<td >'+
    '<p @click="clickProcessor(login[n-1])"> {{login[n-1]}}</p>'+
    '</td>' +
    '<td >'+
    '<p @click="clickProcessor(name[n-1])"> {{name[n-1]}}</p>'+
    '</td>' +

    '</tr>' +
    '</table>'+

    '</div>',
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
    '<searchForm />' +
    '<userProfile />' +
    '<br> </br>'+
    '<userTable/>' +
    '</div>',
    data: {
        messages: []
    }
});

