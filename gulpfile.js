/**
 * Created by gou4shi1 on 16-8-14.
 */

var gulp = require("gulp");
var sass = require("gulp-sass");
var minify = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var bower = require("gulp-bower");
var watch = require("gulp-watch");
var del = require("del");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var react = require("gulp-react");
var eventstream = require("event-stream");
var browserify = require("gulp-browserify");
var concatcss = require("gulp-concat-css");
var cssurladjuster = require("gulp-css-url-adjuster");
var jasmine = require("gulp-jasmine");
var jasreporter = require("jasmine-reporters");
var mainbowerfiles = require("main-bower-files");
var filter = require("gulp-filter");

gulp.task("default", function () {
    gulp.start("js");
});

gulp.task("js", function () {
    var react_stream = gulp.src("react/app.js")
        .pipe(plumber(function (error) {
            console.log(error.toString());
            this.emit("end");
        }))
        .pipe(browserify({
            "transform": [
                ["reactify", {
                    "es6": true
                }]
            ]
        }))
        .pipe(gulp.dest("build"));
});
