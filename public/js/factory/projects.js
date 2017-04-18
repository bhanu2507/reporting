/**
 * Created by bhanu.mokkala on 4/18/2017.
 */

angular.module('atmecsreport')
    .factory('pservice', function($http){
        return {
            getprojects: function () {
                return $http.get('/plist');
            }
        }

    });