/**
 * Created by Jean on 4/29/2015.
 */
define(["angularAMD", "app.config"], function (angularAMD, config) {


    var app = angular.module(config.appName, ["ngRoute"]);

    function configRoute(templateUrl, controllerUrl, _controller) {
        var config = {
            templateUrl: templateUrl
        };
        config.resolve = ["$q", "$rootScope", function ($q, $rootScope) {
            var defer = $q.defer();
            require([controllerUrl], function (ctrl) {
                defer.resolve(ctrl);
                $rootScope.$apply();
            });
            return defer.promise;
        }];
        config.controller = _controller;
        return config;
    }

    app.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route(configRoute("views/default.html", "controllers/default", "default")));
    });

    return angularAMD.bootstrap(app);

});