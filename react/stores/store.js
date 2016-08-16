/**
 * Created by gou4shi1 on 16-8-16.
 */

var Dispatcher = require("../dispatchers/dispatcher");
var typeConstant = require("../constants/action-type-constants");
var rangeConstant = require("../constants/calendar-range-constants");
var LC = require("lunar-calendar-zh");
var HL = require("huangli/huangli");
var EventEmitter = require("events").EventEmitter;
var Assign = require("object-assign");
var _ = require("lodash");

var LC_Store = Assign({}, EventEmitter.prototype, {

    activeDay: false,

    getToday: function () {
        var date = new Date();
        var monthData = LC.calendar(date.getFullYear(), date.getMonth(), false).monthData;
        return _.find(monthData, { "day": date.getDate() });
    },

    getActiveDay: function () {
        return this.activeDay || this.getToday();
    },

    getActiveMonth: function () {
        var Day = this.getActiveDay();
        return LC.calendar(Day.year, Day.month, true).monthData;
    },

    getHL: function (date) {
        var month = (date.month < 10 ? "0" : "") + date.month;
        var day = (date.day < 10 ? "0" : "") + date.day;
        return HL["hl"+data.year]["d"+month+day];
    },

    refresh: function () {
        this.activeDay = false;
        this.emitChangeDay();
    },

    emitChangeDay: function () {
        this.emit(typeConstant.CHANGE_DAY);
    },

    addChangeDayListener: function (callback) {
        this.on(typeConstant.CHANGE_DAY, callback);
    },

    removeChangeDayListener: function (callback) {
        this.removeListener(typeConstant.CHANGE_DAY, callback);
    }
});

function handleDate(year, month, day) {
    if (month == 13) {
        year++;
        month = 1;
    }
    if (month == 0) {
        year--;
        month = 12;
    }
    if (year > rangeConstant.MAX_YEAR || year < rangeConstant.MIN_YEAR)
        return false;
    var monthData = LC.calendar(year, month, false).monthData;
    LC_Store.activeDay = _.find(monthData, { "day": day} );
    LC_Store.emitChangeDay();
    return true;
}

Dispatcher.register(function (action) {
    var activeDay = LC_Store.getActiveDay();

    switch (action.actionType) {
        case typeConstant.CHANGE_DAY:
            LC_Store.activeDay = action.activeDay;
            LC_Store.emitChangeDay();
            break;
        case typeConstant.ADD_MONTH:
            handleDate(activeDay.year, activeDay.month + 1, activeDay.day);
            break;
        case typeConstant.MINUS_MONTH:
            handleDate(activeDay.year, activeDay.month - 1, activeDay.day);
            break;
        case typeConstant.ADD_YEAR:
            handleDate(activeDay.year + 1, activeDay.month, activeDay.day);
            break;
        case typeConstant.MINUS_YEAR:
            handleDate(activeDay.year - 1, activeDay.month, activeDay.day);
            break;
        case typeConstant.BACK_TO_TODAY:
            LC_Store.activeDay = LC_Store.getToday();
            LC_Store.emitChangeDay();
            break;
        default:
            break;
    }
});

module.exports = LC_Store;