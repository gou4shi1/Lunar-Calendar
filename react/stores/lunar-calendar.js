/**
 * Created by gou4shi1 on 16-8-20.
 */

var rangeConstant = require("../constants/calendar-range-constants");
var LC = require("lunar-calendar-zh");
var HL = require("./huangli/huangli");
var Assign = require("object-assign");
var _ = require("lodash");

var lunarCalendar = {
    jishiData : [],

    changeJishi: function (year, month, day, jishi) {
        year = year.toString();
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        this.jishiData[year + month + day] = jishi;
    },

    getLunarByDay: function (year, month, day) {
        if (year < rangeConstant.MIN_YEAR || year > rangeConstant.MAX_YEAR)
            return {};
        if (month < rangeConstant.MIN_MONTH || month > rangeConstant.MAX_MONTH)
            return {};
        var monthData = LC.calendar(year, month, false).monthData;
        if (day < 1 || day > monthData.monthDays)
            return {};
        var dayData =  _.find(monthData, { "day": day});
        year = year.toString();
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        var hl = HL["hl" + year]["d"+month+day];
        return Assign(dayData, {
            hl_y: hl.y || "",
            hl_j: hl.j || "",
            jishi: this.jishiData[year + month + day] || ""
        });
    },

    getLunarByMonth: function (year, month) {
        if (year < rangeConstant.MIN_YEAR || year > rangeConstant.MAX_YEAR)
            return {};
        if (month < rangeConstant.MIN_MONTH || month > rangeConstant.MAX_MONTH)
            return {};
        var monthData = LC.calendar(year, month, true).monthData;
        monthData.forEach(function (dayData, index) {
            monthData[index] = this.getLunarByDay(dayData.year, dayData.month, dayData.day);
        }.bind(this));
        return monthData;
    }
};

module.exports = lunarCalendar;
