/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Action = require("../actions/calendar-actions");
var Assign = require("object-assign");

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {FlatButton} from 'material-ui'

var DateChoosePanel = React.createClass({
    render: function () {
        var today = this.props.today;
        var activeDay = this.props.activeDay;
        var activeMonth = this.props.activeMonth;

        var table = [],
            tableBody = [],
            tableRow = [];

        table.push(
            <TableHeader key="tableHeader"
                adjustForCheckbox={false}
                displaySelectAll={false}
                enableSelectAll={false}
                style={{background: "#a7ffeb"}}
            >
                <TableRow>
                    <TableHeaderColumn>日</TableHeaderColumn>
                    <TableHeaderColumn>一</TableHeaderColumn>
                    <TableHeaderColumn>二</TableHeaderColumn>
                    <TableHeaderColumn>三</TableHeaderColumn>
                    <TableHeaderColumn>四</TableHeaderColumn>
                    <TableHeaderColumn>五</TableHeaderColumn>
                    <TableHeaderColumn>六</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        );

        var orangeLabelStyle = {
            lineHeight: 0,
            fontSize: 10,
            color: "#ff7043"
        };

        var greyLabelStyle = {
            lineHeight: 0,
            fontSize: 10,
            color: "#757575"
        };

        for (var i = 0; i < activeMonth.length; i++) {
            var date = activeMonth[i];

            var label = "";
            if (date.lunarFestival != undefined)
                label = <div style={orangeLabelStyle}>{date.lunarFestival}</div>;
            else if (date.term != undefined)
                label = <div style={orangeLabelStyle}>{date.term}</div>;
            else if (date.solarFestival != undefined) {
                var festivals = date.solarFestival.replace(/國際|世界|\(|\)/g," ").split(" ");
                label = (festivals[0] || festivals[1]).slice(0,5);
                label = <div style={greyLabelStyle}>{label}</div>;
            }
            else if (date.lunarDay == 1)
                label = <div style={orangeLabelStyle}>{date.lunarMonthName}</div>;
            else
                label = <div style={greyLabelStyle}>{date.lunarDayName}</div>;

            var rowColumnStyle = {paddingLeft: 0};
            if (date.day == activeDay.day && date.month == activeDay.month && date.year == activeDay.year)
                Assign(rowColumnStyle,{background: "#64ffda"});
            else if (date.day == today.day && date.month == today.month && date.year == today.year)
                Assign(rowColumnStyle,{background: "#84ffff"});

            var numberStyle = {};
            if (date.month != activeDay.month)
                Assign(numberStyle,{color: "#9e9e9e"});
            else if (i % 7 == 6 || i % 7 == 0)
                Assign(numberStyle,{color: "#f44336"});

            tableRow.push(
                <TableRowColumn style={rowColumnStyle} key={"tableRowColumn" + i}>
                    <FlatButton
                        label={date.day}
                        labelStyle={numberStyle}
                        labelPosition={"before"}
                        rippleColor="#64ffda"
                        onTouchTap={this._onClick.bind(this, date)}
                        style={{minWidth: 66, height: 50}}
                    >
                        {label}
                    </FlatButton>
                </TableRowColumn>
            );

            if ((i+1) % 7  == 0) {
                tableBody.push(
                    <TableRow key={"tableRow" + i}>
                        {tableRow}
                    </TableRow>
                );
                tableRow = [];
            }
        }

        table.push(
            <TableBody
                displayRowCheckbox={false}
                style={{background: "#B8F4FF"}}
                key="tableBody"
            >
                {tableBody}
            </TableBody>
        );

        return (
            <Table selectable={false}>
                {table}
            </Table>
        )
    },

    _onClick: function (date) {
        Action.changeDay(date);
    }
});

module.exports = DateChoosePanel;
