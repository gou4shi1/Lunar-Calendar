/**
 * Created by gou4shi1 on 16-8-16.
 */

var lunarCalendar = require("./lunar-calendar");
var Dispatcher = require("../dispatchers/dispatcher");
var typeConstant = require("../constants/action-type-constants");
var rangeConstant = require("../constants/calendar-range-constants");
var EventEmitter = require("events").EventEmitter;
var Assign = require("object-assign");

var LC_Store = Assign({}, EventEmitter.prototype, {
    activeDay: false,

    getToday: function () {
        var date = new Date();
        return lunarCalendar.getLunarByDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
    },

    getActiveDay: function () {
        return this.activeDay || this.getToday();
    },

    getActiveMonth: function () {
        var activeDay = this.getActiveDay();
        return lunarCalendar.getLunarByMonth(activeDay.year, activeDay.month);
    },

    changeDay: function(year, month, day) {
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
        this.activeDay = lunarCalendar.getLunarByDay(year, month, day);
        this.emit(typeConstant.CHANGE_DAY);
        return true;
    },

    changeJishi: function (activeDay, jishi) {
        lunarCalendar.changeJishi(activeDay.year, activeDay.month, activeDay.day, jishi);
        this.activeDay = lunarCalendar.getLunarByDay(activeDay.year,activeDay.month,activeDay.day);
        this.emit(typeConstant.CHANGE_DAY);
    },

    addChangeDayListener: function (callback) {
        this.on(typeConstant.CHANGE_DAY, callback);
    }
});

Dispatcher.register(function (action) {
    var activeDay = LC_Store.getActiveDay();

    switch (action.actionType) {
        case typeConstant.CHANGE_DAY:
            activeDay = action.activeDay;
            LC_Store.changeDay(activeDay.year, activeDay.month, activeDay.day);
            break;
        case typeConstant.ADD_MONTH:
            LC_Store.changeDay(activeDay.year, activeDay.month + 1, activeDay.day);
            break;
        case typeConstant.MINUS_MONTH:
            LC_Store.changeDay(activeDay.year, activeDay.month - 1, activeDay.day);
            break;
        case typeConstant.ADD_YEAR:
            LC_Store.changeDay(activeDay.year + 1, activeDay.month, activeDay.day);
            break;
        case typeConstant.MINUS_YEAR:
            LC_Store.changeDay(activeDay.year - 1, activeDay.month, activeDay.day);
            break;
        case typeConstant.REFRESH:
            activeDay = LC_Store.getToday();
            LC_Store.changeDay(activeDay.year, activeDay.month, activeDay.day);
            break;
        case typeConstant.CHANGE_JISHI:
            LC_Store.changeJishi(action.activeDay, action.jishi);
            break;
        default:
            break;
    }
});

module.exports = LC_Store;