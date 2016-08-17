/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Action = require("../actions/calendar-actions");

var DateController = React.createClass({
    render: function () {
        var activeDay = this.props.activeDay;

        return (
            <div>
                <div className="date-controller">
                    <a href="javascript:void(0);" onClick={this._minusYear}>
                        <i className="fa fa-2x fa-angle-double-left fa-fw" />
                    </a>
                    <a href="javascript:void(0);" onClick={this._minusMonth}>
                        <i className="fa fa-2x fa-angle-left fa-fw" />
                    </a>
                    <span className="year-block">{activeDay.year}</span>
                    <span className="month-block">{activeDay.month}月</span>
                    <a href="javascript:void(0);" onClick={this._addMonth}>
                        <i className="fa fa-2x fa-angle-right fa-fw" />
                    </a>
                    <a href="javascript:void(0);" onClick={this._addYear}>
                        <i className="fa fa-2x fa-angle-double-right fa-fw" />
                    </a>
                    <a href="javascript:void(0);" className="right grey-text" style={{marginRight: "15px"}} onClick={this._quitApp}>
                        <i className="fa fa-2x fa-power-off" />
                    </a>
                    <a href="javascript:void(0);" className="right" style={{marginRight: "15px"}} onClick={this._refresh}>
                        <i className="fa fa-2x fa-refresh" />
                    </a>
                    <div className="clerafix"></div>
                </div>
                <div className="divider"></div>
            </div>
        );
    },

    _addMonth: function () {
        Action.addMonth();
    },

    _minusMonth: function () {
        Action.minusMonth();
    },

    _addYear: function () {
        Action.addYear();
    },

    _minusYear: function () {
        Action.minusYear();
    },

    _refresh: function(){
        Action.refresh()
    },

    _quitApp: function(){
        Action.quitApp();
    }
});

module.exports = DateController;
