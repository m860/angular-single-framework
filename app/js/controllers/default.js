/**
 * Created by Jean on 4/29/2015.
 */
define(["app","page"], function (app,page) {

    page.setTitle("Default");

    app.controller("default", ["$scope", function ($scope) {
        $scope.title = "default";
    }]);
    return app;

});