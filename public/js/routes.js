/**
 * Created by bhanu.mokkala on 4/12/2017.
 */

var app = angular.module("atmecsreport");

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'view/home.html'
        })
        .when('/login', {
            templateUrl: 'view/login.html',
            controller: 'LoginCtrl'
        })
        .when('/profile', {
            templateUrl: 'view/profile.html',
            controller: 'NavCtrl',
            resolve: {
                logincheck: checkLoggedin
            }
        })
        .when('/profile/:project', {
            templateUrl: 'view/tasks.html',
            controller: 'TaskCtrl',
            resolve: {
                logincheck: checkLoggedin
            }
        })
        .otherwise({
            redirectTo: '/home'
        })
});

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('cyan').accentPalette('light-blue');
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/loggedin').then(function(user) {
        //console.log(user);
        $rootScope.errorMessage = null;
        //User is Authenticated
        if (user.data !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else { //User is not Authenticated
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    return deferred.promise;
}