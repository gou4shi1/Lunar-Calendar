/**
 * Created by gou4shi1 on 16-8-16.
 */

var CalendarDatabase = require('./calendar-database');
var Dispatcher = require('../dispatchers/dispatcher');
var TYPE = require('../constants/action-type');
var RANGE = require('../constants/calendar-range');
var EventEmitter = require('events').EventEmitter;
var Assign = require('object-assign');

var CalendarStore = Assign({}, EventEmitter.prototype, {
    activeDay: false,

    getToday: function () {
        var date = new Date();
        //date.getMonth()的返回結果是從零開始的，所以需要+1
        return CalendarDatabase.getLunarByDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
    },

    getActiveDay: function () {
        return this.activeDay || this.getToday();
    },

    getActiveMonth: function () {
        var activeDay = this.getActiveDay();
        return CalendarDatabase.getLunarByMonth(activeDay.year, activeDay.month);
    },

    changeDay: function(year, month, day) {
        //跨年
        if (month == 13) {
            year++;
            month = 1;
        }
        if (month == 0) {
            year--;
            month = 12;
        }
        if (year > RANGE.MAX_YEAR || year < RANGE.MIN_YEAR)
            return false;
        this.activeDay = CalendarDatabase.getLunarByDay(year, month, day);
        this.emit(TYPE.CHANGE_DAY);
        return true;
    },

    changeNote: function (activeDay, note) {
        CalendarDatabase.changeNote(activeDay.year, activeDay.month, activeDay.day, note);
        //保存記事本之後，一定要更新this.activeDay，並且emit，從而使mainPanel進行setState，重新渲染組件
        this.activeDay = CalendarDatabase.getLunarByDay(activeDay.year,activeDay.month,activeDay.day);
        this.emit(TYPE.CHANGE_DAY);
    },

    addChangeDayListener: function (callback) {
        this.on(TYPE.CHANGE_DAY, callback);
    }
});

Dispatcher.register(function (action) {
    var activeDay = CalendarStore.getActiveDay();

    switch (action.actionType) {
        case TYPE.CHANGE_DAY:
            activeDay = action.activeDay;
            CalendarStore.changeDay(activeDay.year, activeDay.month, activeDay.day);
            break;
        case TYPE.ADD_MONTH:
            CalendarStore.changeDay(activeDay.year, activeDay.month + 1, activeDay.day);
            break;
        case TYPE.MINUS_MONTH:
            CalendarStore.changeDay(activeDay.year, activeDay.month - 1, activeDay.day);
            break;
        case TYPE.ADD_YEAR:
            CalendarStore.changeDay(activeDay.year + 1, activeDay.month, activeDay.day);
            break;
        case TYPE.MINUS_YEAR:
            CalendarStore.changeDay(activeDay.year - 1, activeDay.month, activeDay.day);
            break;
        case TYPE.REFRESH:
            activeDay = CalendarStore.getToday();
            CalendarStore.changeDay(activeDay.year, activeDay.month, activeDay.day);
            break;
        case TYPE.CHANGE_NOTE:
            CalendarStore.changeNote(action.activeDay, action.note);
            break;
        default:
            break;
    }
});

module.exports = CalendarStore;