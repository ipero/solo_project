tbsApp.controller('ViewController', ["$http", "$location", "$rootScope", "ViewStuff", "$scope",
  function ($http, $location, $rootScope, ViewStuff, $scope) {
  console.log('loaded View Page');

  var $this = this;
  $this.data = '';
  //$scope.updateData = {};


  ViewStuff.viewStuff($rootScope.userEmail);
  $this.data = ViewStuff.data;
  $scope.predicate = 'borrowersName';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    console.log("Sort");
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.deleteItem = ViewStuff.deleteItem;

  $scope.updateItem = ViewStuff.updateItem;

}]);
