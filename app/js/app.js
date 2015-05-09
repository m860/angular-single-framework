/**
 * Created by Jean on 4/29/2015.
 */
define(["angularAMD", "app.config"], function (angularAMD, config) {


    var app = angular.module(config.appName, ["ngRoute"]);

    function configRoute(templateUrl, _controllerUrl, _controller) {

        if (!_controllerUrl) {

            if (!config.controllerPath) {
                throw new Error("controllerPath is not defined");
            }

            var lastDot = templateUrl.lastIndexOf(".");
            _controllerUrl = config.controllerPath + templateUrl.slice(0, lastDot);
            console.log("controllerUrl : %s", _controllerUrl);
        }

        if (!config.templatePath) {
            throw new Error("templatePath is not defined");
        }
        templateUrl = config.templatePath + templateUrl;
        console.log("templateUrl : %s", templateUrl);

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
        console.log("controller : %s", _controller);
        cfg.controller = _controller;

        return cfg;
    }

    function Loading(loadingStyle) {
        this._arr = [];
        this._loadingStyle = "";
        switch (typeof(loadingStyle)) {
            case "function":
                this._loadingStyle = loadingStyle();
                break;
            default:
                var reg = /\.gif$/i;
                if (reg.test(loadingStyle)) {
                    this._loadingStyle = '<img src="' + loadingStyle + '">';
                }
                else {
                    this._loadingStyle = loadingStyle;
                }
        }

        this._mask = '<div class="loading-mask"></div>';
        this._loading = '<div class="loading"></div>';
        this._startIndex = 10000;
    }

    Loading.prototype = {
        appendLoading: function (container) {
            var top = 0
                , left = 0
                , width
                , height
                , hideScreen = false
                , zIndex = this._startIndex;

            if (typeof(container) === "boolean") {
                $(document.body).css("overflow", "hidden");
                container = $(document.documentElement);
                width = container.width();
                height = container.height();
                hideScreen = true;
            }
            else {
                container = $(container);
                width = container.outerWidth(true);
                height = container.outerHeight(true);
                var offset = container.offset();
                top = offset.top;
                left = offset.left;
            }

            //mask
            var mask = $(this._mask);
            zIndex += this._arr.length;
            mask.css({
                top: top
                , left: left
                , width: width
                , height: height
                , zIndex: zIndex
            });
            this._arr.push(mask);
            mask.appendTo(document.body);

            //loading
            var loading = $(this._loading);
            loading.html(this._loadingStyle);
            zIndex += this._arr.length;
            loading.css({
                top: top + (height / 2)
                , left: left
                , width: width
                , zIndex: zIndex
            });
            if (hideScreen) {
                loading.css({
                    top: top + (height / 2) + $(window).scrollTop()
                });
            }


            this._arr.push(loading);
            loading.appendTo(document.body);


        },
        removeLoading: function () {
            this._arr.pop().remove();
            this._arr.pop().remove();
            $(document.body).css("overflow", "auto");
        }
    };

    var loading = new Loading(config.loading);

    app.config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        config.route.each(function (ele, index, self) {
            $routeProvider.when(ele.url,
                angularAMD.route(configRoute(ele["templateUrl"], ele["controllerUrl"], ele["controller"])));
        });

        $httpProvider.interceptors.push(["$q", function ($q) {
            return {
                request: function (cfg) {
                    console.log("request config ...");
                    console.log(cfg);
                    if (cfg.params && cfg.params.loading) {
                        loading.appendLoading(cfg.params.loading);
                    }
                    return cfg;
                }
                , requestError: function (rejection) {
                    return $q.reject(rejection);
                }
                , response: function (response) {
                    console.log("response ...");
                    console.log(response);
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
    }]);

    return angularAMD.bootstrap(app);

});