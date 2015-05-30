/**
 * Created by Jean on 4/29/2015.
 */
require.config({
    baseUrl: "js/"
    , paths: {
        "angular": "lib/angular/angular"
        , "jquery": "lib/jquery/dist/jquery"
        , "angularAMD": "lib/angularAMD/angularAMD"
        , "app": "app"
        , "app.config": "config/app.config"
        , "angular-route": "lib/angular-route/angular-route"
        , "jsext": "jsext"
        , "jquery-component": "jquery.component.all"
    }
    , shim: {
        "angular": ["jquery"]
        , "angular-route": ["angular"]
        , "angularAMD": ["angular-route"]
        , "jquery-component": {
            deps: ["jquery"]
            , exports: "jqueryComponent"
        }
        , "app": ["angularAMD", "app.config", "jsext", "jquery-component"]
    }
    , deps: ["app"]
});