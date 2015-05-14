/**
 * Created by Jean on 4/29/2015.
 */
define(["app", "page"], function (app, page) {

    page.setTitle("AngularAMD-template");

    app.controller("default", ["$scope", "$http", function ($scope, $http) {
        $scope.title = "angularAMD-template Summary";

        $scope.loading1=function(){
            $http.get("http://127.0.0.1:3000", {
                params: {
                    loading: true
                }
            }).success(function (res) {
                console.log(res);
            });
        };

        $scope.loading2=function(){
            $http.get("http://127.0.0.1:3000", {
                params: {
                    loading: "#loading2"
                }
            }).success(function (res) {
                console.log(res);
            });
        };

        //$scope.partialLoad=function(){
        //    console.log("partial load");
        //    require(["test"]);
        //};


    }]);
    return app;

});