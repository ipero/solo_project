tbsApp.controller('ViewController', ["$http", "$location", "$rootScope", "ViewStuff", "$scope",
  function ($http, $location, $rootScope, ViewStuff, $scope) {
  console.log('loaded View Page');

  var $this = this;
  $this.data = '';


  ViewStuff.viewStuff($rootScope.userEmail);
  $this.data = ViewStuff.data;
  $scope.deleteItem = ViewStuff.deleteItem;
  $scope.updateItem = ViewStuff.updateItem;
  // $http.get('/private/view/' + $rootScope.userEmail)
  //   .then(function (response) {
  //     console.log("Made to server");
  //     if (response.data.err) {
  //       //$this.data = 'Sorry, you need to be logged in to see this page!';
  //       $location.path('/login');
  //     } else {
  //
  //       $this.data = response.data[0].stuff;
  //       console.log($this.data);
  //     }
  //   });
}]);
