tbsApp.factory('AuthFactory', function ($http) {
  var Status = {
    loggedIn: false,
  };

  // the public API
  return {
    Status: Status,

    checkLoggedIn: function () {
      return Status.loggedIn;
    },

    isLoggedIn: function () {
      return $http.get('/auth');
    },

    setLoggedIn: function (value) {
      Status.loggedIn = value;
    },

    logout: function () {
      return $http.get('/auth/logout');
    },
  };

});

tbsApp.factory("AddStuff", ["$http", function($http){
    var data = {};

    var addStuff = function(data){
        $http.post("/private/add", data).then(function(response){
            console.log("Stuff SAVED! ", response);

        });
    };

    return {
        addStuff : addStuff,
        data : data
    };
}]);

tbsApp.factory("ViewStuff", ["$http", "$location", "$rootScope", "$filter",
  function($http, $location, $rootScope, $filter){
    var $this = this;
    var data = {};

    // var viewStuff = function(id){
    //     $http.get('/private/view/' + id)
    var viewStuff = function(){
        $http.get('/private/view/')
        .then(function (response) {
          console.log("Made to server");
          if (response.data.err) {
            //$this.data = 'Sorry, you need to be logged in to see this page!';
            $location.path('/login');
          } else {

            data.response= response.data[0].stuff;
            for(var i = 0; i<data.response.length; i++){
              data.response[i].dateBorrowed = new Date(data.response[i].dateBorrowed);
              data.response[i].returnDueDate = new Date(data.response[i].returnDueDate);
              //console.log(data.response[i].dateBorrowed);
            }
            console.log("Factory ViewStuff ", response.data[0].stuff);
          }
        });


    };

    var deleteItem = function(itemId){
          console.log(itemId +", "+ $rootScope.userEmail);
          $http.delete("/private/view/delete/" + itemId).then(function(response){
          viewStuff();
          });
    };

    var updateItem = function(data){
      // var formatedData = {};
      // var formatedData = data;
      // formatedData.dateBorrowed = $filter('date')(data.dateBorrowed, 'yyyy-MM-dd');
      // formatedData.returnDueDate = $filter('date')(data.returnDueDate, 'yyyy-MM-dd');
      // data.dateBorrowed = new Date(data.dateBorrowed).toLocaleDateString('en-GB',
      //   {
      //       year : 'numeric',
      //       month : 'numeric',
      //       day : 'numeric'
      //   }).split(' ').join('-');

      //data.dateBorrowed = new Date(data.dateBorrowed).to('dd.MM.yy');
      // formatedData.dateBorrowed = new Date(formatedData.dateBorrowed).toISOString().slice(0,10);
      //console.log(typeof formatedData.dateBorrowed);
      $http.post("/private/view", data).then(function(response){
          console.log("Stuff Updated! ", response);
          //viewStuff();
      });
    };

    return {
        viewStuff : viewStuff,
        deleteItem : deleteItem,
        updateItem : updateItem,
        data : data
    };
}]);
