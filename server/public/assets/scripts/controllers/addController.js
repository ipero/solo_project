tbsApp.controller('AddController', ['$http', '$scope', 'AddStuff', '$location', '$rootScope', '$filter',
  function ($http, $scope, AddStuff, $location, $rootScope, $filter) {
  console.log('loaded Add Page');

  var $this = this;
  console.log($this);
  $this.data = '';

  $http.get('/private/add')
    .then(function (response) {
      if (response.data.err) {
        //$this.data = 'Sorry, you need to be logged in to see this page!';
        $location.path('/login');
      } else {
        $this.data = response.data.message;

        $scope.data = [];
        $scope.item = {};

        $scope.addItem = function(data){

            data.dateBorrowed = $filter('date')(data.dateBorrowed, 'yyyy-MM-dd');
            data.returnDueDate = $filter('date')(data.returnDueDate, 'yyyy-MM-dd');

            // $scope.$watch("data.dateBorrowed", function(date){
            //   data.dateBorrowed = $filter('date')(date, 'yyyy-MM-dd');
            // });
            // $scope.$watch("data.returnDueDate", function(returnDueDate){
            //   data.returnDueDate = $filter('date')(data.returnDueDate, 'yyyy-MM-dd');
            // });

            data.email = $rootScope.userEmail;
            console.log(data);
            AddStuff.addStuff(data);
            $scope.item = {};
        };

      }
    });
}]);
