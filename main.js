/**
 * Created by gou4shi1 on 16-8-14.
 */

var isDebug = process.argv.some(function (arg) {
    return arg === "--with-dev-tools";
});
if (isDebug) {
    require('electron-debug')();
}

var menubar = require("menubar");

var mb = menubar({
    preloadWindow: true,
    width: 888,
    height: 444,
});

mb.on("ready", function () {
    console.log("app is ready");

});
