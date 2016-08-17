/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var DateController = require("./date-controller");
var DateChoosePanel = require("./date-choose-panel");

var DatePanel = React.createClass({
    render: function () {
        return (
            <div>
                <DateController activeDay={this.props.activeDay} />
                <DateChoosePanel
                    today={this.props.today}
                    activeDay={this.props.activeDay}
                    activeMonth={this.props.activeMonth}
                />
            </div>
        )
    }
});

module.exports = DatePanel;
