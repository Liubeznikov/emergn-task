const userApi = Vue.resource('/users{/name}');
const deleteApi= Vue.resource('/users{/id}');
const userByLoginApi = Vue.resource('/users/login{/login}');
var eventBus = new Vue();
function getIndex(list, id) {
    for (let i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}
Vue.component('searchForm', {
    props: ['users'],
    data: function() {
        return{
            user: null,
            nameS: ''

        }
    },
    template:
    '<div>'+
    '<h3> Search Form</h3>' +
    '<p>Name </p>'  +
    '<input  type="text" placeholder="info" v-model="nameS" />' +



    '<button @click ="searchButton"> Search </button>'+

    '</div>',
    created: function(){
        eventBus.$on("dataChanged",() => this.searchButton());
    },
    methods: {

        searchButton: function(){
            eventBus.$emit("searchClick", this.nameS);
        }

    }
});



Vue.component('userTable', {
    props: ['users'],
    data: function() {
        return{
            user: null,
            userName: ''

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
    '<p @click="clickProcessor(user.id)"> {{user.login}}</p>'+
    '</td>' +
    '<td >'+
    '<p @click="clickProcessor(user.id)"> {{user.name}}</p>'+
    '</td>' +

    '</tr>' +
    '</table>'+

    '</div>',
    created: function() {
        eventBus.$on("searchClick", (nameS)=>{
            this.userName = nameS;

        this.users.splice(0,this.users.length);
        userApi.get({name: this.userName}).then(result =>
        result.json().then(data =>
        data.forEach(user => this.users.push(user))))

    });
        if (this.userName === '' ){
            this.users.splice(0,this.users.length);
        userApi.get().then(result =>
        result.json().then(data =>
        data.forEach(user => this.users.push(user))))
    }




    },

    methods: {

        clickProcessor: function(str){
            eventBus.$emit("clickOnTable", this.users[getIndex(this.users,str)]);

        }
    }
});

Vue.component('userProfile', {
    props: ['users'],
    data: function() {
        return{
            login: '',
            name:'',
            email: '',
            password: '',
            repeatPassword: '',
            user: null

        }
    },
    template:
    '<div>'+
    '<h3> Info and Edit Form</h3>' +
    '<p>Login </p>'  +
    '<input  type="text" v-model="login" />' +
    '<p>Name </p>'  +
    '<input  type="text"  v-model="name" />' +
    '<p>Email </p>'  +
    '<input  type="text"  v-model="email" />' +
    '<p>Password </p>'  +
    '<input  type="text"  v-model="password" />' +
    '<p>Repeat password</p>'  +
    '<input  type="text"  v-model="repeatPassword" />' +
    '<br> </br>' +
    '<button @click ="updateButtonClick"> Update </button>'+
    '<button @click ="deleteButtonClick"> Delete </button>'+
    '<br> </br>'+

    '</div>',
    created: function(){
        eventBus.$on("clickOnTable", (usr)=>{
            this.login  = usr.login;
        this.name = usr.name;
        this.email = usr.email;
        this.password = usr.password;
        this.user = usr;
    });
    },

    methods: {
        updateButtonClick: function () {
            const regexp = /^[a-zA-Z0-9-_]+$/;
            const regexpAlpha = /^[a-zA-Z]+$/;
            const regexpEmail =/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/; //регулярное выражение для e-mail
            if (this.login.search(regexp) === -1){
                alert('invalid login');
                 return 0;
            }


            if (this.name.search(regexpAlpha) === -1){
                alert('invalid name');
                 return 0;
            }

            if (this.email.search(regexpEmail) === -1){
                alert('invalid email');
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
            this.user.email= this.email;
            this.user.password = this.password;
            userApi.update({}, this.user).then(result =>
                result.json().then(usr => {
                   this.user = usr;
                    this.name = usr.name;
                    this.email = usr.email;
                    this.password = usr.password;
                    this.login = usr.login;
                    this.repeatPassword = '';
                    this.dataChanged();
                })
            )


        },
        deleteButtonClick: function(){
            deleteApi.remove({id: this.user.id}).then(result => {
                if (result.ok) {
                    this.user = null;
                    this.name = '';
                    this.email = '';
                    this.password = '';
                    this.login = '';
                    this.repeatPassword = '';
                    this.dataChanged();
                }
            });
            //window.location.href='index.html';

        },
        dataChanged: function(){
            eventBus.$emit("dataChanged");
        },
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
            window.location.href='index.html';

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

