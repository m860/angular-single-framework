/**
 * Created by Jean on 4/29/2015.
 */
define(["angularAMD", "app.config"], function (angularAMD, config) {


    var app = angular.module(config.appName, ["ngRoute"]);

    function configRoute(templateUrl, _controllerUrl, _controller) {

        if (!_controllerUrl) {

            if (!config.route.controllerPath) {
                throw new Error("controllerPath is not defined");
            }

            var lastDot = templateUrl.lastIndexOf(".");
            _controllerUrl = config.route.controllerPath + templateUrl.slice(0, lastDot);
            console.log("controllerUrl : %s", _controllerUrl);
        }

        if(!config.route.templatePath){
            throw new Error("templatePath is not defined");
        }
        templateUrl=config.route.templatePath+templateUrl;
        console.log("templateUrl : %s",templateUrl);

        var cfg = {
            templateUrl: templateUrl
        };


        cfg.resolve = ["$q", "$rootScope", function ($q, $rootScope) {
            var defer = $q.defer();
            require([_controllerUrl], function (ctrl) {
                defer.resolve(ctrl);
                $rootScope.$apply();
            });
            return defer.promise;
        }];

        if (!_controller) {
            var last = _controllerUrl.lastIndexOf("/");
            _controller = _controllerUrl.slice(last + 1);
        }
        console.log("controller : %s",_controller);
        cfg.controller = _controller;

        return cfg;
    }


    app.config(["$routeProvider",function ($routeProvider) {
        config.route.mapping.each(function (ele, index, self) {
            $routeProvider.when(ele.url,
                angularAMD.route(configRoute(ele["templateUrl"], ele["controllerUrl"], ele["controller"])));
        });
    }]);

    return angularAMD.bootstrap(app);

});