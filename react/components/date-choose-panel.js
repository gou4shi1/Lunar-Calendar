/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require('react');
var CalendarAction = require('../actions/calendar-actions');
var COLOR = require('../constants/calendar-color');

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {FlatButton} from 'material-ui'

var DateChoosePanel = React.createClass({
    render: function () {
        var today = this.props.today;
        var activeDay = this.props.activeDay;
        var activeMonth = this.props.activeMonth;

        var table = [];
        var tableBody = [];
        var tableRow = [];

        var styles = {
            tableHeader: {
                background: COLOR.tableHeader.background
            },
            tableBody: {
                background: COLOR.tableBody.background
            },
            orangeLabel: {
                lineHeight: 0,
                fontSize: 10,
                color: COLOR.orangeLabel.color
            },
            greyLabel: {
                lineHeight: 0,
                fontSize: 10,
                color: COLOR.greyLabel.color
            },
            tableButton: {
                minWidth: 66,
                height: 50
            }
        };

        table.push(
            <TableHeader key='tableHeader'
                adjustForCheckbox={false}
                displaySelectAll={false}
                enableSelectAll={false}
                style={styles.tableHeader}
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

        for (var i = 0; i < activeMonth.length; i++) {
            var date = activeMonth[i];

            var label = '';
            if (date.lunarFestival != undefined)
                label = <div style={styles.orangeLabel}>{date.lunarFestival}</div>;
            else if (date.term != undefined)
                label = <div style={styles.orangeLabel}>{date.term}</div>;
            //爲了美觀，對公歷節日做特殊處理
            else if (date.solarFestival != undefined) {
                var festivals = date.solarFestival.replace(/國際|世界|\(|\)/g,' ').split(' ');
                label = (festivals[0] || festivals[1]).slice(0,5);
                label = <div style={styles.greyLabel}>{label}</div>;
            }
            else if (date.lunarDay == 1)
                label = <div style={styles.orangeLabel}>{date.lunarMonthName}</div>;
            else
                label = <div style={styles.greyLabel}>{date.lunarDayName}</div>;

            var styles_tableCell = {
                background: COLOR.tableCell.background.normal,
                paddingLeft: 0
            };
            if (date.day == activeDay.day && date.month == activeDay.month && date.year == activeDay.year)
                styles_tableCell.background = COLOR.tableCell.background.active;
            else if (date.day == today.day && date.month == today.month && date.year == today.year)
                styles_tableCell.background = COLOR.tableCell.background.today;

            var styles_numberLabel = {
                color: COLOR.numberLabel.color.normal
            };
            if (date.month != activeDay.month)
                styles_numberLabel.color = COLOR.numberLabel.color.overMonth;
            else if (i % 7 == 6 || i % 7 == 0)
                styles_numberLabel.color = COLOR.numberLabel.color.weekend;

            tableRow.push(
                <TableRowColumn style={styles_tableCell} key={'tableRowColumn' + i}>
                    <FlatButton
                        label={date.day}
                        labelStyle={styles_numberLabel}
                        labelPosition={'before'}
                        rippleColor={COLOR.numberLabel.color.ripple}
                        onTouchTap={this._onClick.bind(this, date)}
                        style={styles.tableButton}
                    >
                        {label}
                    </FlatButton>
                </TableRowColumn>
            );

            if ((i+1) % 7  == 0) {
                tableBody.push(
                    <TableRow key={'tableRow' + i}>
                        {tableRow}
                    </TableRow>
                );
                tableRow = [];
            }
        }

        table.push(
            <TableBody
                displayRowCheckbox={false}
                style={styles.tableBody}
                key='tableBody'
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
        CalendarAction.changeDay(date);
    }
});

module.exports = DateChoosePanel;
