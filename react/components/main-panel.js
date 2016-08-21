/**
 * Created by gou4shi1 on 16-8-15.
 */

var React = require('react');
var ipc =  electronRequire('electron').ipcRenderer;
var DatePanel = require('./date-panel');
var LunarPanel = require('./lunar-panel');
var CalendarStore = require('../stores/calendar-store');
var CalendarAction = require('../actions/calendar-actions');
var COLOR = require('../constants/calendar-color');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';

var MainPanel = React.createClass({
    getInitialState: function () {
        return {
            today: CalendarStore.getToday(),
            activeDay: CalendarStore.getActiveDay(),
            activeMonth: CalendarStore.getActiveMonth()
        };
    },

    componentDidMount: function () {
        CalendarStore.addChangeDayListener(this._onChange);
        ipc.on('app-refresh', function () {
            CalendarAction.refresh();
        })
    },

    _onChange: function () {
        this.setState({
            today: CalendarStore.getToday(),
            activeDay: CalendarStore.getActiveDay(),
            activeMonth: CalendarStore.getActiveMonth()
        });
    },

    render: function () {
        var styles = {
            mainPanel: {
                 border: '2px solid ' + COLOR.mainPanel.border
            }
        };

        return (
            <MuiThemeProvider>
            <GridList cols={10} cellHeight={432} padding={0} style={styles.mainPanel}>
                <GridTile cols={4}>
                    <LunarPanel activeDay={this.state.activeDay}/>
                </GridTile>
                <GridTile cols={6}>
                    <DatePanel
                        today={this.state.today}
                        activeDay={this.state.activeDay}
                        activeMonth={this.state.activeMonth}
                    />
                </GridTile>
            </GridList>
            </MuiThemeProvider>
        );
    }
});

module.exports = MainPanel;
