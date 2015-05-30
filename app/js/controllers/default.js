/**
 * Created by Jean on 4/29/2015.
 */
define(["app", "../business/contextService", "../business/defaultService"],
    function (app) {

        //ctx.title("AngularAMD-template");

        app.controller("default",
            [
                "$scope"
                , "$http"
                , "defaultService"
                , "contextService"
                , "$injector"
                , function ($scope, $http, defaultService, contextService, $injector) {
                $scope.title = "angularAMD-template Summary";
                contextService.title($scope.title);

                $scope.loading1 = function () {
                    $http.get("http://127.0.0.1:3000", {
                        params: {
                            loading: true
                        }
                    }).success(function (res) {
                        console.log(res);
                    });
                };

                $scope.loading2 = function () {
                    $http.get("http://127.0.0.1:3000", {
                        params: {
                            loading: "#loading2"
                        }
                    }).success(function (res) {
                        console.log(res);
                    });
                };

            }
            ]);
        return app;

    });