/**
 * Created by Jean on 4/30/2015.
 */
require("./build.js");

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
    , path = require("path");


gulp.task("watch", function (cb) {
    gulpLivereload.listen();

    gulp.watch("app/**/*.less", function (event) {
        gulp.src(event.path)
            .pipe(less())
            .pipe(gulp.dest("app/css/"));
    });

    gulp.watch([
        "app/**/*"
        , "!app/**/*.less"
    ], function (event) {
        gulpLivereload.reload({path: event.path});
    });

    return cb();
});

gulp.task("default", ["watch"]);
