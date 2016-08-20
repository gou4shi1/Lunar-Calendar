/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Transitive = require("react-transitive-number");

import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

var LunarPanel = React.createClass({
    render: function () {
        var activeDay = this.props.activeDay;
        var festivalElements = [];
        var i = 0;

        if (activeDay.term) {
            festivalElements.push(<br key={"festival" + (i++)}/>);
            festivalElements.push(
                <Transitive key={"festival" + (i++)}>{activeDay.term}</Transitive>
            );
        }
        if (activeDay.lunarFestival) {
            festivalElements.push(<br key={"festival" + (i++)}/>);
            festivalElements.push(
                <Transitive key={"festival" + (i++)}>{activeDay.lunarFestival}</Transitive>
            );
        }
        if (activeDay.solarFestival) {
            var festivals = activeDay.solarFestival.replace(/國際|世界|\(|\)/g, " ").split(" ");
            festivals.forEach(function (festival, index) {
                if (festival.length > 5)
                    festivals[index] = festival.slice(0,5) + "日";
            });
            for (var j = 0; j < festivals.length; j++) {
                if (festivals[j])
                    festivalElements.push(<br key={"festival" + (i++)}/>);
                festivalElements.push(
                    <Transitive key={"festival" + (i++)}>{festivals[j]}</Transitive>
                );
            }
        }

        return (
            <GridList cols={10} cellHeight={31} padding={0} className="lunarPanel">
                <GridTile cols={10} rows={2} className="ganZhiPanel">
                <Transitive className="ganZhiDetail">{activeDay.GanZhiYear + "年"}</Transitive>
                <Transitive className="ganZhiDetail">{activeDay.GanZhiMonth + "月"}</Transitive>
                <Transitive className="ganZhiDetail">{activeDay.GanZhiDay + "日"}</Transitive>
                </GridTile>
                <GridTile cols={10} rows={1} className="dayPanel">
                </GridTile>
                <GridTile cols={3} rows={6} className="yearPanel">
                    <br/><Transitive className="yearDetail">{activeDay.year}</Transitive><br/>
                    <Transitive className="yearDetail">{activeDay.month + "月"}</Transitive>
                </GridTile>
                <GridTile cols={4} rows={6} className="dayPanel">
                    <Paper zDepth={2} style={{background: "#EAF786"}}>
                        <Transitive>{activeDay.day}</Transitive>
                    </Paper>
                </GridTile>
                <GridTile cols={3} rows={6} className="festivalPanel">
                    <br/>{festivalElements}
                </GridTile>
                <GridTile cols={10} rows={1} className="monthPanel">
                </GridTile>
                <GridTile cols={10} rows={2} className="monthPanel">
                    <Paper zDepth={1} style={{background: "#FFB5A1", color: "#ff3d00"}}>
                        <Transitive>{activeDay.lunarMonthName + "  "}</Transitive>
                        <Transitive>{activeDay.lunarDayName}</Transitive>
                    </Paper>
                </GridTile>
                <GridTile cols={10} rows={2} className="hlPanel">
                    宜：{activeDay.hl_y}<br/>
                    忌：{activeDay.hl_j}
                </GridTile>
            </GridList>
        )
    }
});

module.exports = LunarPanel;
