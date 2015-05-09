/**
 * Created by Jean on 4/29/2015.
 */
define(["app","page"], function (app,page) {

    page.setTitle("AngularAMD-template");

    app.controller("default", ["$scope", function ($scope) {
        $scope.title = "angularAMD-template Summary";
    }]);
    return app;

});