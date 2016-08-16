/**
 * Created by gou4shi1 on 16-8-16.
 */

var Dispatcher = require("../dispatchers/dispatcher");
var typeConstant = require("../constants/action-type-constants");
var ipc = require("electron").ipcRenderer;

var LC_Action = {

    changeDay: function (activeDay) {
        Dispatcher.dispatch({
            actionType: typeConstant.CHANGE_DAY,
            activeDay: activeDay
        })
    },

    addMonth: function () {
        Dispatcher.dispatch({
            actionType: typeConstant.ADD_MONTH
        })
    },

    minusMonth: function () {
        Dispatcher.dispatch({
            actionType: typeConstant.MINUS_MONTH
        })
    },

    addYear: function () {
        Dispatcher.dispatch({
            actionType: typeConstant.ADD_YEAR
        })
    },

    minusYear: function () {
        Dispatcher.dispatch({
            actionType: typeConstant.MINUS_YEAR
        })
    },

    backToToday: function () {
        Dispatcher.dispatch({
            actionType: typeConstant.BACK_TO_TODAY
        })
    },

    quitApp:  function () {
        ipc.send("app-quit");
    }
};

module.exports = LC_Action;
