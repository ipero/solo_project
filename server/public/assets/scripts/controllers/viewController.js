tbsApp.controller('ViewController', ["$http", "$location", "$rootScope", "ViewStuff", "$scope",
  function ($http, $location, $rootScope, ViewStuff, $scope) {
  console.log('loaded View Page');

  var $this = this;
  $this.data = '';
  //$scope.updateData = {};


  ViewStuff.viewStuff($rootScope.userEmail);
  $this.data = ViewStuff.data;

  $scope.deleteItem = ViewStuff.deleteItem;

  $scope.updateItem = ViewStuff.updateItem;
  
}]);
