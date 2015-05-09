/**
 * Created by Jean on 4/30/2015.
 */
var gulp = require("gulp")
    , uglify = require('gulp-uglify')
    , concat = require("gulp-concat")
    , argv = require('yargs').argv
    , gulpHelper = require("./gulp-helper.js")
    , minifyHTML = require('gulp-minify-html')
    , gulpsync = require('gulp-sync')(gulp)
    , rimraf = require("rimraf")
    , minifyCss = require('gulp-minify-css')
    , less = require('gulp-less')
    , livereload = require('gulp-livereload')
    , path = require("path");


var ENV = {
    qa: "qa"
    , prd: "prd"
};
var args = {
    env: argv.env || ENV.qa
};

gulpHelper.i("env : %s", args.env);

var root = path.normalize(__dirname + "/");

gulpHelper.i("root path : %s", root);

gulp.task("build:app:lib", function (cb) {

    var stream = gulp.src([
        path.join(root, "app/js/lib/") + "**/angular.js"
        , path.join(root, "app/js/lib/") + "**/angular-route.js"
        , path.join(root, "app/js/lib/") + "**/angularAMD.js"
        //, path.join(root, "app/js/lib/") + "**/font-awesome.css"
        , path.join(root, "app/js/lib/") + "**/dist/jquery.js"
        //, path.join(root, "app/js/lib/") + "**/normalize.css"
        , path.join(root, "app/js/lib/") + "**/require.js"
        //, path.join(root, "app/js/lib/") + "**/fonts/**"
    ]);
    if (args.env === ENV.prd) {
        stream = stream.pipe(uglify());
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/js/lib")));
});
gulp.task("copy:app:lib-fonts", function (cb) {
    var stream = gulp.src([
        path.join(root, "app/js/lib/") + "**/fonts/**"
    ]);
    return stream.pipe(gulp.dest(path.join(root, "dist/app/js/lib")));
});
gulp.task("build:app:lib-css", function (cb) {

    var stream = gulp.src([
        path.join(root, "app/js/lib/") + "**/font-awesome.css"
        , path.join(root, "app/js/lib/") + "**/normalize.css"
    ]);
    if (args.env === ENV.prd) {
        stream = stream.pipe(minifyCss());
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/js/lib")));
});
gulp.task("build:app:config", function (cb) {
    var stream = gulp.src(path.join(root, "app/js/config/") + "**");
    if (args.env === ENV.prd) {
        stream = stream.pipe(uglify());
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/js/config/")));
});
gulp.task("build:app:controllers", function (cb) {
    var stream = gulp.src(path.join(root, "app/js/controllers/") + "**");
    if (args.env === ENV.prd) {
        stream = stream.pipe(uglify({mangle: false}));
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/js/controllers/")));
});
gulp.task("build:app:js", function (cb) {
    var stream = gulp.src(path.join(root, "app/js/") + "*.js");
    if (args.env === ENV.prd) {
        stream = stream.pipe(uglify({mangle: false}));
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/js/")));
});
gulp.task("build:app:views", function (cb) {
    var stream = gulp.src(path.join(root, "app/views/") + "**");
    if (args.env === ENV.prd) {
        stream = stream.pipe(minifyHTML({
            conditionals: true,
            spare: true
        }));
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/views/")));
});
gulp.task("build:app:index", function (cb) {
    var stream = gulp.src(path.join(root, "app/") + "index.html");
    if (args.env === ENV.prd) {
        stream = stream.pipe(minifyHTML({
            conditionals: true,
            spare: true
        }));
    }
    return stream.pipe(gulp.dest(path.join(root, "dist/app/")));
});
gulp.task("clean:app", function (cb) {
    rimraf.sync(path.join(root, "dist/app"));
    return cb();
});


gulp.task("less", function (cb) {
    return gulp.src(path.join(root, "app/less/") + "*.less")
        .pipe(less())
        .pipe(gulp.dest(path.join(root, "app/css")))
        .pipe(livereload());
});
gulp.task("watch:app", function (cb) {
    livereload.listen();
    gulp.watch([
        path.join(root, "app/less/") + "*.less"
        ,path.join(root,"app/index.html")
        ,path.join(root,"app/views/**/*.html")
        ,path.join(root,"app/js/config/*.js")
        ,path.join(root,"app/js/controllers/*.js")
        ,path.join(root,"app/js/app.js")
        ,path.join(root,"app/js/jsext.js")
    ], [
        "less"
    ]);
    return cb();
});

gulp.task("build:app", gulpsync.sync([
    "clean:app"
    , [
        "build:app:index"
        , "build:app:views"
        , "build:app:js"
        , "build:app:config"
        , "build:app:controllers"
        , "build:app:lib"
        , "copy:app:lib-fonts"
        , "build:app:lib-css"
    ]
]));

gulp.task("default", [
    "less"
    , "watch:app"
]);