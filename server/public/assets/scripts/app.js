var tbsApp = angular.module('tbsApp', ['ngRoute', "xeditable"]);
// var tbsApp = angular.module('tbsApp', ['ngRoute', "xeditable", "ngMaterial"]);
// angular.module('tbsApp').run(function(editableOptions, editableThemes) {
//   editableThemes['angular-material'] = {
//     formTpl:      '<form class="editable-wrap"></form>',
//     noformTpl:    '<span class="editable-wrap"></span>',
//     controlsTpl:  '<md-input-container class="editable-controls" ng-class="{\'md-input-invalid\': $error}"></md-input-container>',
//     inputTpl:     '',
//     errorTpl:     '<div ng-messages="{message: $error}"><div class="editable-error" ng-message="message">{{$error}}</div></div>',
//     buttonsTpl:   '<span class="editable-buttons"></span>',
//     submitTpl:    '<md-button type="submit" class="md-primary">save</md-button>',
//     cancelTpl:    '<md-button type="button" class="md-warn" ng-click="$form.$cancel()">cancel</md-button>'
//   };
//
//   editableOptions.theme = 'angular-material';
// });

tbsApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
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
      redirectTo: 'add', // work on this later
    });
},
]);
