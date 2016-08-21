/**
 * Created by gou4shi1 on 16-8-20.
 */

var RANGE = require('../constants/calendar-range');
var LC = require('lunar-calendar-zh');
var HL = require('./huangli/huangli');
var Assign = require('object-assign');
var _ = require('lodash');

var CalendarDatabase = {
    //使用HTML 5自帶的本地儲存，儲存的數據無時間限制
    noteData : localStorage,

    isInRange: function (year, month, day) {
        if (year < RANGE.MIN_YEAR || year > RANGE.MAX_YEAR)
            return false;
        if (month < RANGE.MIN_MONTH || month > RANGE.MAX_MONTH)
            return false;
        if (day < 1 || day > LC.calendar(year, month, false).monthDays)
            return false;
        return true;
    },

    changeNote: function (year, month, day, note) {
        if (!this.isInRange(year, month, day))
            return false;
        year = year.toString();
        month = (month < 10 ? '0' : '') + month;
        day = (day < 10 ? '0' : '') + day;
        this.noteData.setItem(year + month + day, note);
    },

    getLunarByDay: function (year, month, day) {
        if (!this.isInRange(year, month, day))
            return {};
        var monthData = LC.calendar(year, month, false).monthData;
        var dayData =  _.find(monthData, { 'day': day});
        year = year.toString();
        month = (month < 10 ? '0' : '') + month;
        day = (day < 10 ? '0' : '') + day;
        var hl = HL['hl' + year]['d'+month+day];
        //把'lunar-calendar-zh'模塊返回的數據和黃歷和記事本封裝在一起
        return Assign(dayData, {
            hl_y: hl.y || '',
            hl_j: hl.j || '',
            note: this.noteData.getItem(year + month + day) || ''
        });
    },

    getLunarByMonth: function (year, month) {
        if (!this.isInRange(year, month, 1))
            return {};
        var monthData = LC.calendar(year, month, true).monthData;
        //把'lunar-calendar-zh'模塊返回的數據和黃歷和記事本封裝在一起
        monthData.forEach(function (dayData, index) {
            monthData[index] = this.getLunarByDay(dayData.year, dayData.month, dayData.day);
        }.bind(this));
        return monthData;
    }
};

module.exports = CalendarDatabase;
