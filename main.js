/**
 * Created by gou4shi1 on 16-8-14.
 */

var process = require("process");
var isDebug = process.argv.some(function (arg) {
    return arg === "--with-dev-tools";
});
if (isDebug) {
    require('electron-debug')();
}

var menubar = require("menubar");
var ipc = require("electron").ipcMain;

var mb = menubar({
    preloadWindow: true,
    width: 888,
    height: 444,
});

mb.on("ready", function () {
    console.log("app is ready");

    ipc.on("app-quit", function () {
        mb.app.quit();
    });

    mb.on("show", function () {
        mb.window.webContents.send("app-refresh")
    });
});
