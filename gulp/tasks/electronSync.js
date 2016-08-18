/**
 * Created by gou4shi1 on 16-8-18.
 */

var gulp        = require('gulp');
var config      = require('../config').electronSync;
var electron = require('electron-connect').server.create();

gulp.task('electronSync', ['browserify'], function() {
    electron.start();
    gulp.watch(config.src,electron.restart);
});
