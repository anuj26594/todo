var todoApp = angular.module("todoApp", ['ngRoute']);

//ROUTES
todoApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'view.html',
        controller: 'mainController'
    })

    .otherwise({
				redirectTo: '/'
		});

});

// SERVICES
todoApp.service('todoLists', function(){
    this.list = [
      {text: "Todo #1", done:true},
      {text: "Todo #2", done:false},
      {text: "Todo #3", done:false},
      {text: "Todo #4", done:false},
    ];
})

//CONTROLLERS
todoApp.controller("mainController", ["$scope", "$filter", "todoLists", function($scope, $filter, todoLists) {
    $scope.list = todoLists.list;
    $scope.$watch('list', function(){
        todoLists.list = $scope.list;
    });


    $scope.submit = function() {
        $scope.list.push({text:$scope.newTodo, done:false});
        $scope.newTodo = "";
    }
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.list, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    // $scope.$watch('')

    $scope.archive = function() {
      var oldTodos = $scope.list;
      $scope.list = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.list.push(todo);
      });
    };

}])
