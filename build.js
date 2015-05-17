/*!
 * Created by Jean on 5/17/2015.
 * 
 * email:mahai_1986@126.com
 *
 */
/**
 * Created by Jean on 4/30/2015.
 */
var gulp = require("gulp")
    , uglify = require('gulp-uglify')
    , concat = require("gulp-concat")
    , argv = require('yargs').argv
    , _ = require("./gulp-helper.js")
    , minifyHTML = require('gulp-minify-html')
    , gulpsync = require('gulp-sync')(gulp)
    , rimraf = require("rimraf")
    , minifyCss = require('gulp-minify-css')
    , less = require("gulp-less")
    , gulpLivereload = require("gulp-livereload")
    , gulpIf = require("gulp-if")
    , path = require("path");


var ENV = {
    qa: "qa"
    , prd: "prd"
};
var args = {
    env: argv.env || ENV.qa
};

_.i("env : %s", args.env);

var root = path.normalize(__dirname + "/");

_.i("root path : %s", root);

function isprd() {
    return args.env == ENV.prd;
}

gulp.task("build:app:lib", function (cb) {

    return gulp.src([
        path.join(root, "app/js/lib/") + "**/angular.js"
        , path.join(root, "app/js/lib/") + "**/angular-route.js"
        , path.join(root, "app/js/lib/") + "**/angularAMD.js"
        //, path.join(root, "app/js/lib/") + "**/font-awesome.css"
        , path.join(root, "app/js/lib/") + "**/dist/jquery.js"
        //, path.join(root, "app/js/lib/") + "**/normalize.css"
        , path.join(root, "app/js/lib/") + "**/require.js"
        //, path.join(root, "app/js/lib/") + "**/fonts/**"
    ])
        .pipe(gulpIf(isprd(), uglify()))
        .pipe(gulp.dest(path.join(root, "dist/app/js/lib")));
});
gulp.task("copy:app:lib-fonts", function (cb) {
    return gulp.src([
        path.join(root, "app/js/lib/") + "**/fonts/**"
    ])
        .pipe(gulp.dest(path.join(root, "dist/app/js/lib")));
});
gulp.task("build:app:lib-css", function (cb) {

    return gulp.src([
        path.join(root, "app/js/lib/") + "**/font-awesome.css"
        , path.join(root, "app/js/lib/") + "**/normalize.css"
    ])
        .pipe(gulpIf(isprd(), minifyCss()))
        .pipe(gulp.dest(path.join(root, "dist/app/js/lib")));
});
gulp.task("build:app:config", function (cb) {
    return gulp.src(path.join(root, "app/js/config/") + "**")
        .pipe(gulpIf(isprd(), uglify()))
        .pipe(gulp.dest(path.join(root, "dist/app/js/config/")));
});
gulp.task("build:app:controllers", function (cb) {
    return gulp.src(path.join(root, "app/js/controllers/") + "**")
        .pipe(gulpIf(isprd(), uglify({mangle: false})))
        .pipe(gulp.dest(path.join(root, "dist/app/js/controllers/")));
});
gulp.task("build:app:js", function (cb) {
    return gulp.src(path.join(root, "app/js/") + "*.js")
        .pipe(gulpIf(isprd(), uglify({mangle: false})))
        .pipe(gulp.dest(path.join(root, "dist/app/js/")));
});
gulp.task("build:app:views", function (cb) {
    return gulp.src([
        path.join(root, "app/views/") + "**"
    ])
        .pipe(gulpIf(isprd(), minifyHTML({
            conditionals: true,
            spare: true
        })))
        .pipe(gulp.dest(path.join(root, "dist/app/views/")));
});
gulp.task("build:app:partial", function (cb) {
    return gulp.src([
        path.join(root, "app/partial/") + "**"
    ])
        .pipe(gulpIf(isprd(), minifyHTML({
            conditionals: true,
            spare: true
        })))
        .pipe(gulp.dest(path.join(root, "dist/app/partial/")));
});
gulp.task("build:app:index", function (cb) {
    return gulp.src(path.join(root, "app/") + "index.html")
        .pipe(gulpIf(isprd(), minifyHTML({
            conditionals: true,
            spare: true
        })))
        .pipe(gulp.dest(path.join(root, "dist/app/")));
});
gulp.task("clean:app", function (cb) {
    rimraf.sync(path.join(root, "dist/app"));
    return cb();
});
gulp.task("build:less", function (cb) {
    return gulp.src("app/less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("app/css/"))
        .pipe(gulpIf(isprd(), minifyCss()))
        .pipe(gulp.dest("dist/app/css/"));
});

gulp.task("build:app", gulpsync.sync([
    "clean:app"
    , [
        "build:app:index"
        , "build:app:views"
        , "build:app:partial"
        , "build:app:js"
        , "build:app:config"
        , "build:app:controllers"
        , "build:app:lib"
        , "copy:app:lib-fonts"
        , "build:app:lib-css"
        , "build:less"
    ]
]));

