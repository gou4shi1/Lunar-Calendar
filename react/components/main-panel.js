/**
 * Created by gou4shi1 on 16-8-15.
 */

var React = require("react");
var DatePanel = require("./date-panel");
var LunarPanel = require("./lunar-panel");
var Store = require("../stores/store");
var Action = require("../actions/calendar-actions");
var ipc =  electronRequire("electron").ipcRenderer;

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
        return (
            <div style={{width: "800px", position: "relative", border: "2px solid #00897B", borderLeft: "none", marginBottom: "0"}} className="row">
                <div className="col s6">
                    <LunarPanel activeDay={this.state.activeDay} />
                </div>
                <div className="col s6">
                    <DatePanel
                        today={this.state.today}
                        activeDay={this.state.activeDay}
                        activeMonth={this.state.activeMonth}
                    />
                </div>
            </div>
        )
    }
});

module.exports = MainPanel;
