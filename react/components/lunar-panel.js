/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require('react');
var Transitive = require('react-transitive-number');
var COLOR = require('../constants/calendar-color');

import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

var LunarPanel = React.createClass({
    render: function () {
        var activeDay = this.props.activeDay;
        var festivalElements = [];
        var key_index = 0;

        if (activeDay.term) {
            festivalElements.push(<br key={'festival' + (key_index++)}/>);
            festivalElements.push(
                <Transitive key={'festival' + (key_index++)}>{activeDay.term}</Transitive>
            );
        }
        if (activeDay.lunarFestival) {
            festivalElements.push(<br key={'festival' + (key_index++)}/>);
            festivalElements.push(
                <Transitive key={'festival' + (key_index++)}>{activeDay.lunarFestival}</Transitive>
            );
        }
        //爲了美觀，對公歷節日做特殊處理
        if (activeDay.solarFestival) {
            var festivals = activeDay.solarFestival.replace(/國際|世界|\(|\)/g, ' ').split(' ');
            festivals.forEach(function (festival, index) {
                if (festival.length > 5)
                    festivals[index] = festival.slice(0,5) + '日';
            });
            for (var j = 0; j < festivals.length; j++) {
                if (festivals[j])
                    festivalElements.push(<br key={'festival' + (key_index++)}/>);
                festivalElements.push(
                    <Transitive key={'festival' + (key_index++)}>{festivals[j]}</Transitive>
                );
            }
        }

        var styles = {
            ganZhiPanel: {
                background: COLOR.ganZhiPanel.background,
                color: COLOR.ganZhiPanel.color,
                lineHeight: '60px',
                textAlign: 'center'
            },
            ganZhiDetail: {
                marginLeft: 10,
                marginRight: 10
            },
            yearPanel: {
                background: COLOR.yearPanel.background,
                color: COLOR.yearPanel.color,
                fontSize: 24,
                textAlign: 'center',
            },
            dayPanel: {
                background: COLOR.dayPanel.background,
                fontSize: 100,
                textAlign: 'center'
            },
            dayDetail: {
                background: COLOR.dayPanel.background
            },
            festivalPanel: {
                background: COLOR.festivalPanel.background,
                color: COLOR.festivalPanel.color,
                textAlign: 'center',
                fontSize: 16
            },
            monthPanel: {
                background: COLOR.monthPanel.background,
                fontSize: 26,
                textAlign: 'center'
            },
            monthDetail: {
                background: COLOR.monthPanel.background,
                color: COLOR.monthDetail.color
            },
            hlPanel: {
                background: COLOR.hlPanel.background,
                color: COLOR.hlPanel.color,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            }
        };

        return (
            <GridList cols={10} cellHeight={31} padding={0}>
                <GridTile cols={10} rows={2} style={styles.ganZhiPanel}>
                <Transitive>{activeDay.GanZhiYear + '年'}</Transitive>
                <Transitive>{'    ' + activeDay.GanZhiMonth + '月'}</Transitive>
                <Transitive>{'    ' + activeDay.GanZhiDay + '日'}</Transitive>
                </GridTile>
                <GridTile cols={10} rows={1} style={styles.dayPanel}>
                </GridTile>
                <GridTile cols={3} rows={6} style={styles.yearPanel}>
                    <br/><Transitive>{activeDay.year}</Transitive><br/>
                    <Transitive>{activeDay.month + '月'}</Transitive>
                </GridTile>
                <GridTile cols={4} rows={6} style={styles.dayPanel}>
                    <Paper zDepth={2} style={styles.dayDetail}>
                        <Transitive>{activeDay.day}</Transitive>
                    </Paper>
                </GridTile>
                <GridTile cols={3} rows={6} style={styles.festivalPanel}>
                    <br/>{festivalElements}
                </GridTile>
                <GridTile cols={10} rows={1} style={styles.monthPanel}>
                </GridTile>
                <GridTile cols={10} rows={2} style={styles.monthPanel}>
                    <Paper zDepth={1} style={styles.monthDetail}>
                        <Transitive>{activeDay.lunarMonthName + '  '}</Transitive>
                        <Transitive>{activeDay.lunarDayName}</Transitive>
                    </Paper>
                </GridTile>
                <GridTile cols={10} rows={2} style={styles.hlPanel}>
                    宜：{activeDay.hl_y}<br/>
                    忌：{activeDay.hl_j}
                </GridTile>
            </GridList>
        )
    }
});

module.exports = LunarPanel;
