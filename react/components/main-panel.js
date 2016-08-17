/**
 * Created by gou4shi1 on 16-8-15.
 */

var React = require("react");
var DatePanel = require("./date-panel");
var LunarPanel = require("./lunar-panel");
var Store = require("../stores/store");
var Action = require("../actions/calendar-actions");
var ipc =  electronRequire("electron").ipcRenderer;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';

var MainPanel = React.createClass({
    getInitialState: function () {
        return {
            today: Store.getToday(),
            activeDay: Store.getActiveDay(),
            activeMonth: Store.getActiveMonth()
        };
    },

    componentDidMount: function () {
        Store.addChangeDayListener(this._onChange);
        ipc.on("app-refresh", function () {
            Action.refresh();
        })
    },

    _onChange: function () {
        this.setState({
            today: Store.getToday(),
            activeDay: Store.getActiveDay(),
            activeMonth: Store.getActiveMonth()
        });
    },

    render: function () {
        var styles = {
            GridList: {
                width: 800,
                height: 400
            }
        };

        return (
            <MuiThemeProvider>
            <GridList cols={2} cellHeight={400} style={styles.GridList}>
                <GridTile>
                    <LunarPanel activeDay={this.state.activeDay} />
                </GridTile>
                <GridTile>
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
