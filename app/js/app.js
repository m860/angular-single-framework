/**
 * Created by Jean on 4/29/2015.
 */
define(["angularAMD", "app.config"], function (angularAMD, config) {


    var app = angular.module(config.appName, ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route({
            templateUrl: "views/default.html"
            //, controller: "default"
            , controllerUrl: "controllers/default"
        }));
    });

    return angularAMD.bootstrap(app);

});