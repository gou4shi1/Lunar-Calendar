/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Transitive = require("react-transitive-number");
var Store = require("../stores/store");

import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

var LunarPanel = React.createClass({
    render: function () {
        var activeDay = this.props.activeDay;
        var festivalElements = [];

        if (activeDay.term) {
            festivalElements.push(<br/>);
            festivalElements.push(
                <Transitive className="festivalDetail">{activeDay.term}</Transitive>
            );
        }
        if (activeDay.lunarFestival) {
            festivalElements.push(<br/>);
            festivalElements.push(
                <Transitive className="festivalDetail">{activeDay.lunar}</Transitive>
            );
        }
        if (activeDay.solarFestival) {
            var festivals = activeDay.solarFestival.split(" ");
            for (var i = 0; i < festivals.length; i++) {
                festivalElements.push(<br/>);
                festivalElements.push(
                    <Transitive className="festivalDetail">{festivals[i]}</Transitive>
                );
            }
        }

        var hl = Store.getHL(activeDay);
        var hl_y = hl.y || "";
        var hl_j = hl.j || "";

        return (
            <GridList cols={10} cellHeight={50} padding={0} className="lunarPanel">
                <GridTile cols={10} rows={1} className="ganZhiPanel">
                <Transitive className="ganZhiDetail">{activeDay.GanZhiYear + "年"}</Transitive>
                <Transitive className="ganZhiDetail">{activeDay.GanZhiMonth + "月"}</Transitive>
                <Transitive className="ganZhiDetail">{activeDay.GanZhiDay + "日"}</Transitive>
                </GridTile>
                <GridTile cols={3} rows={3} className="monthPanel" >
                    <br/><Transitive className="monthDetail">{activeDay.year}</Transitive><br/>
                    <Transitive className="monthDetail">{activeDay.month + "月"}</Transitive>
                </GridTile>
                <GridTile cols={4} rows={3} className="dayPanel">
                    <Paper zDepth={2} style={{background: "#EAF786"}}>
                        <Transitive>{activeDay.day}</Transitive>
                    </Paper>
                </GridTile>
                <GridTile cols={3} rows={3} className="festivalPanel">
                    <br/>{festivalElements}
                </GridTile>
                <GridTile cols={10} rows={1}>
                        <Transitive>{activeDay.lunarMonthName}</Transitive>
                        <Transitive>{activeDay.lunarDayName}</Transitive>
                </GridTile>
                <GridTile cols={10} rows={3}>
                        <p title={hl_y} className="hl-detail">宜：{hl_y}</p>
                        <p title={hl_j} className="hl-detail">忌：{hl_j}</p>
                </GridTile>
            </GridList>
        )
    }
});

module.exports = LunarPanel;
