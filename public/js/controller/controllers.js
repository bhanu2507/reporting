/**
 * Created by bhanu.mokkala on 4/12/2017.
 */
var app = angular.module("atmecsreport");
app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {

    $http.get('/plist')
        .then(function(plist) {
            $scope.projects = plist.data;
        })
    /*
        $scope.getsetvalue =function(status) {
           //return angular.isDefined(newName) ? (_name = newName) : _name;
            return status=='green' ? false : true;
        };*/
       $scope.updatevalue = function(project, status) {
           /*
           var data = $.param({
               project: project,
               status: status
           });*/
           if (status=='green') {
               status = 'red';
           }
           else {
               status = 'green';
           }
           $http.post("/updateprojectstatus?project=" + project + "&status=" + status)
               .then(function(response) {
                    console.log(response);
               });
       }
    $scope.status = {
        cb1: true,
        cb2: false
    };
    $scope.detail = function(project) {
        $location.url("/profile/"+project);
    }

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
                //console.log(response);
                $rootScope.currentUser = response;
                $location.url("/profile");
            }, function(error){
                console.log(error);
            });
    }
});

app.controller("TaskCtrl", function($location, $scope, $http, $routeParams) {
    console.log($routeParams.project);
    $scope.project = $routeParams.project;
    $http.get('/tlist?project=' + $routeParams.project)
        .then(function(tlist) {
            $scope.tasks = tlist.data;
            console.log(tlist.data);
        })
    $scope.status = {
        cb1: true,
        cb2: false
    };
    $scope.updatetaskvalue = function(project, task, status) {
        /*
         var data = $.param({
         project: project,
         status: status
         });*/
        if (status=='green') {
            status = 'red';
        }
        else {
            status = 'green';
        }
        $http.post("/updatetaskstatus?project=" + project + "&status=" + status + "&task=" + task)
            .then(function(response) {
                console.log(response);
            });
    }
});