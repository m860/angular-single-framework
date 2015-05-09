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
        , "bootstrap": "lib/bootstrap/dist/js/bootstrap"
    }
    , shim: {
        "angular": ["jquery"]
        , "angular-route": ["angular"]
        , "angularAMD": ["angular-route"]
        , "bootstrap": ["jquery"]
        , "app": ["angularAMD", "app.config", "jsext", "bootstrap"]
    }
    , deps: ["app"]
});