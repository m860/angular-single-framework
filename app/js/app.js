/**
 * Created by Jean on 4/29/2015.
 */
define(["angularAMD", "app.config", "jquery-component"], function (angularAMD, config, jqueryComponent) {

    var app = angular.module(config.appName, ["ngRoute"]);

    function configRoute(templateUrl, _controllerUrl, _controller) {

        if (!_controllerUrl) {

            if (!config.controllerPath) {
                throw new Error("controllerPath is not defined");
            }

            var lastDot = templateUrl.lastIndexOf(".");
            _controllerUrl = config.controllerPath + templateUrl.slice(0, lastDot);
            //console.log("controllerUrl : %s", _controllerUrl);
        }

        if (!config.templatePath) {
            throw new Error("templatePath is not defined");
        }
        templateUrl = config.templatePath + templateUrl;
        //console.log("templateUrl : %s", templateUrl);

        var cfg = {
            templateUrl: templateUrl
            , controllerUrl: _controllerUrl
        };


        //cfg.resolve = ["$q", "$rootScope", function ($q, $rootScope) {
        //    var defer = $q.defer();
        //
        //    //set ng-include onload
        //    //$("ng-include,[ng-include]").bind("load",function(){
        //    //    alert("sdf");
        //    //});
        //
        //    require([_controllerUrl], function (ctrl) {
        //        console.log("controller loaded");
        //        defer.resolve(ctrl);
        //        $rootScope.$apply();
        //    });
        //    return defer.promise;
        //}];

        if (!_controller) {
            var last = _controllerUrl.lastIndexOf("/");
            _controller = _controllerUrl.slice(last + 1);
        }
        //console.log("controller : %s", _controller);
        cfg.controller = _controller;

        return cfg;
    }

    var loading = new Component.Loading(config.loading);


    app.config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        config.route.each(function (ele, index, self) {
            $routeProvider.when(ele.url,
                angularAMD.route(configRoute(ele["templateUrl"], ele["controllerUrl"], ele["controller"])));
        });

        $httpProvider.interceptors.push(["$q", function ($q) {
            return {
                request: function (cfg) {
                    //console.log("request config ...");
                    //console.log(cfg);
                    if (cfg.params && cfg.params.loading) {
                        loading.appendLoading(cfg.params.loading);
                    }
                    return cfg;
                }
                , requestError: function (rejection) {
                    return $q.reject(rejection);
                }
                , response: function (response) {
                    //console.log("response ...");
                    //console.log(response);
                    if (response.config && response.config.params && response.config.params.loading) {
                        loading.removeLoading();
                    }
                    return response;
                }
                , responseError: function (rejection) {
                    return $q.reject(rejection);
                }
            };
        }]);
    }])
        .directive("ngRequire", function () {
            return function (scope, ele, attr) {
                var moduleName = attr.ngRequire || attr.value;
                require([moduleName], function (cb) {
                    if (typeof(cb) === "function") {
                        cb(scope);
                    }
                });
            }
        })
        .directive("urlMatch", ["$location", function ($location) {
            return function (scope, ele, attr) {
                var path = $location.path();
                var strs = attr.urlMatch.split(":");
                var name = strs[0];
                var className = strs[1];
                var route = config.route.find(function (item) {
                    return item.name == name;
                });
                if (route) {
                    if (route.url === path) {
                        ele.addClass(className);
                    }
                }
            }
        }]);

    //extend $scope
    app.run(function($rootScope) {
        //TODO 可以添加任意的基类方法或者属性
    });

    return angularAMD.bootstrap(app);

});