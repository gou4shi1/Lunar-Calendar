/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Transitive = require("react-transitive-number");
var Store = require("../stores/store");

var LunarPanel = React.createClass({
    render: function () {
        var activeDay = this.props.activeDay;
        var festivalElements = [];

        if (activeDay.term) {
            festivalElements.push(
                <span className="festival-detail term">{activeDay.term}</span>
            );
        }
        if (activeDay.lunarFestival) {
            festivalElements.push(
                <span className="festival-detail lunar">{activeDay.lunar}</span>
            );
        }
        if (activeDay.solarFestival) {
            var festivals = activeDay.solarFestival.split(" ");
            festivalElements.push(
                <span className="festival-detail">{festivals[0]}</span>
            );
        }

        var hl = Store.getHL(activeDay);
        var hl_y = hl.y || "";
        var hl_j = hl.j || "";

        return (
            <div className="lunar-panel">
                <div className="ganzhi">
                <Transitive key="ganzhinian" className="ganzhi-detail">{activeDay.GanZhiYear + "年"}</Transitive>
                <Transitive key="ganzhimonth" className="ganzhi-detail">{activeDay.GanZhiMonth + "月"}</Transitive>
                <Transitive key="ganzhiri" className="ganzhi-detail">{activeDay.GanZhiDay + "日"}</Transitive>
                </div>
                <div className="daynumber">
                    <div className="solar-panel">
                        <Transitive className="solar-detail">{activeDay.year}</Transitive>
                        <Transitive className="solar-detail">{activeDay.month}</Transitive>
                    </div>
                    <div className="festival-panel">
                        {festivalElements}
                    </div>
                    <h1 className="center-align">
                        <Transitive>{activeDay.day}</Transitive>
                    </h1>
                    <p className="lunar-detail">
                        <Transitive>{activeDay.lunarMonthName}</Transitive>
                        <Transitive>{activeDay.lunarDayName}</Transitive>
                    </p>
                    <div className="hl-panel">
                        <p title={hl_y} className="hl-detail">宜：{hl_y}</p>
                        <p title={hl_j} className="hl-detail">忌：{hl_j}</p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = LunarPanel;
