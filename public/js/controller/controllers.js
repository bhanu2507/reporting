/**
 * Created by bhanu.mokkala on 4/12/2017.
 */
var app = angular.module("atmecsreport");
app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
    $scope.logout = function() {
        $http.post("/logout")
            .then(function() {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
    }
});


app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
    $scope.login = function(user) {
        $http.post('/login', user)
            .then(function(response) {
                $rootScope.currentUser = response;
                $location.url("/profile");
            }, function(error){
                console.log(error);
            });
    }
});