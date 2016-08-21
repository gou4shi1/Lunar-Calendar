/**
 * Created by gou4shi1 on 16-8-21.
 */

var Configstore = electronRequire('configstore');
var pkg = require('../../package.json');
var ipc =  electronRequire('electron').ipcRenderer;
var Dispatcher = require('../dispatchers/dispatcher');
var TYPE = require('../constants/action-type');

var conf = new Configstore(pkg.name);

var ConfigStore = {
    alwaysOnTop: conf.get('alwaysOnTop'),

    getAlwaysOnTop: function () {
        return this.alwaysOnTop;
    },

    setAlwaysOnTop: function (value) {
        var restart = (value != conf.get('alwaysOnTop'));
        conf.set('alwaysOnTop', value);
        if (restart)
            ipc.send('app-restart');
    }
};

Dispatcher.register(function (action) {
    if (action.actionType == TYPE.ALWAYS_ON_TOP)
        ConfigStore.setAlwaysOnTop(action.value);
});

module.exports = ConfigStore;
