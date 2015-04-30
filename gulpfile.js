/**
 * Created by Jean on 4/30/2015.
 */
var gulp = require("gulp")
    , uglify = require('gulp-uglify')
    , concat = require("gulp-concat")
    , argv = require('yargs').argv
    , _ = require("./helper.js")
    , path = require("path");


var ENV = {
    qa: "qa"
    , prd: "prd"
};
var args = {
    env: argv.env || "qa"
};

_.i("env : %s", args.env);

gulp.task("build:app",function(cb){
});

gulp.task("default", []);