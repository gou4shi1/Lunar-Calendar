/**
 * Created by gou4shi1 on 16-8-16.
 */

var Dispatcher = require('../dispatchers/dispatcher');
var TYPE = require('../constants/action-type');
var ipc =  electronRequire('electron').ipcRenderer;

var CalendarAction = {
    changeDay: function (activeDay) {
        Dispatcher.dispatch({
            actionType: TYPE.CHANGE_DAY,
            activeDay: activeDay
        });
    },

    changeNote: function (activeDay, note) {
        Dispatcher.dispatch({
            actionType: TYPE.CHANGE_NOTE,
            note: note,
            activeDay: activeDay
        });
    },

    addMonth: function () {
        Dispatcher.dispatch({
            actionType: TYPE.ADD_MONTH
        });
    },

    minusMonth: function () {
        Dispatcher.dispatch({
            actionType: TYPE.MINUS_MONTH
        });
    },

    addYear: function () {
        Dispatcher.dispatch({
            actionType: TYPE.ADD_YEAR
        });
    },

    minusYear: function () {
        Dispatcher.dispatch({
            actionType: TYPE.MINUS_YEAR
        });
    },

    refresh: function () {
        Dispatcher.dispatch({
            actionType: TYPE.REFRESH
        });
    },

    quitApp: function () {
        ipc.send('app-quit');
    }
};

module.exports = CalendarAction;
