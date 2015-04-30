/**
 * Created by Jean on 4/29/2015.
 */
define(["app"], function (app) {

    app.controller("default", function ($scope) {
        $scope.title = "default";
    });
    return app;

    //return function($scope){
    //    $scope.title = "default";
    //};

    //return ["$scope", function ($scope) {
    //    $scope.title = "default";
    //}];

});