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
        , "page": "page"
    }
    , shim: {
        "angular": ["jquery"]
        , "angular-route": ["angular"]
        , "angularAMD": ["angular-route"]
        , "app": ["angularAMD", "app.config", "jsext","page"]
    }
    , deps: ["app"]
});