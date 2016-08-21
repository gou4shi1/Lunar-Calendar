/**
 * Created by gou4shi1 on 16-8-14.
 */

var process = require('process');
var menubar = require('menubar');
var ipc = require('electron').ipcMain;
var Configstore = require('configstore');
var pkg = require('./package.json');

var isDebug = process.argv.some(function (arg) {
    return arg === '--with-dev-tools';
});
if (isDebug) {
    require('electron-debug')();
}

var conf = new Configstore(pkg.name, {
    'alwaysOnTop': false
});

var mb = menubar({
    alwaysOnTop: conf.get('alwaysOnTop') || false,
    preloadWindow: true,
    dir: __dirname,
    icon: __dirname + '/icon.png',
    tooltip: '新世界的大門',
    width: 800,
    height: 436
});

mb.on('ready', function () {
    console.log('app is ready');

    ipc.on('app-quit', function () {
        mb.app.quit();
    });

    ipc.on('app-restart', function () {
        mb.app.relaunch();
        mb.app.quit();
    });

    mb.on('hide', function () {
        mb.window.webContents.send('app-hide')
    });

    mb.on('show', function () {
        mb.window.webContents.send('app-refresh')
    });
});
