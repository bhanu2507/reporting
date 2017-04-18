/**
 * Created by bhanu.mokkala on 4/12/2017.
 */
var app = angular.module("atmecsreport");
app.controller("NavCtrl", function($rootScope, $scope, $http, $location, pservice) {

        pservice.getprojects().then(function(plist) {
            //console.log(plist.data[1].pstatus);
            $scope.projects = plist.data;
        })
    $scope.selected = {};
    $scope.getTemplate = function (project) {
        if (project.projectname === $scope.selected.projectname) {
            return 'edit';
        }
        else {
            return 'display';
        }

    };

    $scope.editparam = function (project) {
        $scope.selected = angular.copy(project);
    };
    $scope.reset = function () {
        $scope.selected = {};
    };

       $scope.updatevalue = function(project) {
    //       console.log(project.projectname + "-" + project.status);

           $http.post("/updateprojectstatus?project=" + project.projectname + "&status=" + project.status)
               .then(function(response) {
                  // console.log(response);
               });
           pservice.getprojects().then(function(plist) {
               //console.log(plist.data[1].pstatus);
               $scope.projects = plist.data;
           })
           $scope.reset();
       }
    $scope.statuses = [{'color': 'green'},{'color': 'red'}];
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

app.controller("TaskCtrl", function($location, $scope, $http, $routeParams, $rootScope) {
    console.log($routeParams.project);
    $scope.project = $routeParams.project;
    $http.get('/tlist?project=' + $routeParams.project)
        .then(function(tlist) {
            $scope.tasks = tlist.data;
            //console.log(tlist.data);
        })
    $scope.selected = {};
    $scope.getTemplate = function (task) {
        if (task.projecttask === $scope.selected.projecttask) {
            return 'edit';
        }
        else {
            return 'display';
        }

    };

    $scope.editparam = function (task) {
        $scope.selected = angular.copy(task);
    };
    $scope.reset = function () {
        $scope.selected = {};
    };
    $scope.updatetaskvalue = function(task) {
        /*
         var data = $.param({
         project: project,
         status: status
         });*/
        $http.post("/updatetaskstatus?project=" + task.projectname + "&status=" + task.projecttaskstatus + "&task=" + task.projecttask)
            .then(function(response) {
               // console.log(response);
            });
        $http.get('/tlist?project=' + $routeParams.project)
            .then(function(tlist) {
                $scope.tasks = tlist.data;
                //console.log(tlist.data);
            })
        $scope.reset();
    }
    $scope.statuses = [{'color': 'green'},{'color': 'red'}];
    $scope.logout = function() {
        $http.post("/logout")
            .then(function() {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
    }
});