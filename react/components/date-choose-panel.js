/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var ClassName = require("classname");
var Action = require("../actions/calendar-actions");

var DateChoosePanel = React.createClass({
    render: function () {
        var today = this.props.today;
        var activeDay = this.props.activeDay;
        var activeMonth = this.props.activeMonth;

        var dateElements = [],
            rowElements = [];

        dateElements.push(
            <div className="row header">
                <div className="col head center-align weekend">日</div>
                <div className="col head center-align">壹</div>
                <div className="col head center-align">貳</div>
                <div className="col head center-align">叄</div>
                <div className="col head center-align">肆</div>
                <div className="col head center-align">伍</div>
                <div className="col head center-align weekend">陸</div>
            </div>
        );

        for (var i = 0; i < activeMonth.length; i++) {
            var date = activeMonth[i];
            var label = "";

            if (date.lunarFestival != undefined) {
                label = (
                    <div>
                        <span className="date-block-day lunar-fest">{date.day}</span>
                        <span className="date-block-festival lunar-fest">{date.lunarFestival}</span>
                    </div>
                );
            }
            else if (date.term != undefined) {
                label = (
                    <div>
                        <span className="date-block-day lunar-fest">{date.day}</span>
                        <span className="date-block-festival lunar-fest">{date.term}</span>
                    </div>
                );
            }
            else if (date.solarFestival != undefined) {
                label = (
                    <div>
                        <span className="date-block-day solar-fest">{date.day}</span>
                        <span className="date-block-festival solar-fest" title={date.solarFestival}>{date.solarFestival}</span>
                    </div>
                );
            }
            else if (date.lunarDay == 1) {
                label = (
                    <div>
                        <span className="date-block-day lunar-month-name">{date.day}</span>
                        <span className="date-block-festival lunar-month-name">{date.lunarMonthName}</span>
                    </div>
                );
            }
            else {
                label = (
                    <div>
                        <span className="date-block-day lunar-day-name">{date.day}</span>
                        <span className="date-block-festival lunar-day-name">{date.lunarDayName}</span>
                    </div>
                );
            }

            var blockClass = ClassName({
                col: true,
                oneofseven: true,
                overmonth: date.month != activeDay.month,
                weekend: i % 7 == 6 || i % 7 == 0,
                activeDay: date.day == activeDay.day && date.month == activeDay.month && date.year == activeDay.year,
                today: date.day == today.day && date.month == today.month && date.year == today.year
            });

            rowElements.push(
                <div className={blockClass} onClick={this._onClick.bind(this, date)}>
                    {label}
                </div>
            );

            if ((i+1) % 7  == 0) {
                dateElements.push(
                    <div className="row">
                        {rowElements}
                        <div className="clearfix"></div>
                    </div>
                );
                rowElements = [];
            }
        }

        return (
            <div>
                {dateElements}
            </div>
        )
    },

    _onClick: function (date) {
        Action.changeDay(date);
    }
});

module.exports = DateChoosePanel;
