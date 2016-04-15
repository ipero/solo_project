var tbsApp = angular.module('tbsApp', ['ngRoute', 'xeditable', 'ngFitText']);

tbsApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: '/public/views/routes/home.html',
      controller: 'HomeController',
      controllerAs: 'homePage'
    })
    .when('/add', {
      templateUrl: '/public/views/routes/add.html',
      controller: 'AddController',
      controllerAs: 'addStuff'
    })
    .when('/view', {
      templateUrl: '/public/views/routes/view.html',
      controller: 'ViewController',
      controllerAs: 'viewStuff'
    })
    .when('/login', {
      templateUrl: '/public/views/routes/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .otherwise({
      redirectTo: 'home', // work on this later
    });
},
]);
