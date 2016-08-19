/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Action = require("../actions/calendar-actions");
var rangeConstant = require("../constants/calendar-range-constants");

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {IconButton, IconMenu, MenuItem, TextField, Dialog, FlatButton} from 'material-ui'
import Left from 'material-ui/svg-icons/navigation/chevron-left'
import Right from 'material-ui/svg-icons/navigation/chevron-right'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Quit from 'material-ui/svg-icons/action/power-settings-new'
import More from 'material-ui/svg-icons/navigation/more-vert';

var DateController = React.createClass({
    getInitialState: function () {
        return {
            aboutDialog: false,
            zhuceDialog: false
        };
    },

    aboutDialogOpen: function () {
        this.setState({
            aboutDialog: true
        });
    },

    aboutDialogClose: function () {
        this.setState({
            aboutDialog: false
        });
    },

    zhuceDialogOpen: function () {
        this.setState({
            zhuceDialog: true
        });
    },

    zhuceDialogClose: function () {
        this.setState({
            zhuceDialog: false
        });
    },

    render: function () {
        var activeDay = this.props.activeDay;

        var aboutDialogAction = <FlatButton
            label="關閉"
            primary={true}
            onTouchTap={this.aboutDialogClose}
        />;
        var zhuceDialogAction = [
            <FlatButton
            label="打開新世界的大門"
            primary={true}
            onTouchTap={this.zhuceDialogOpen}
            disabled={true}
            />,
            <FlatButton
            label="關閉新世界的大門"
            primary={true}
            onTouchTap={this.zhuceDialogClose}
            />
        ];

        return (
            <Toolbar style={{background: "#B8FFB8"}}>
                <ToolbarGroup firstChild={true}>
                    <IconButton onTouchTap={this._minusYear} tooltip="上一年">
                        <Left color="#FFC107" hoverColor="#FF6F00"/>
                    </IconButton>
                    <TextField
                        onChange={this._changeYear}
                        hintText={activeDay.year}
                        style={{width: 40}}
                    />
                    <IconButton onTouchTap={this._addYear} tooltip="下一年">
                        <Right color="#FFC107" hoverColor="#FF6F00"/>
                    </IconButton>
                    <IconButton onTouchTap={this._minusMonth} tooltip="上一月">
                        <Left color="#FFC107" hoverColor="#FF6F00"/>
                    </IconButton>
                    <TextField
                        onChange={this._changeMonth}
                        hintText={activeDay.month}
                        style={{width: 17}}
                    />
                    <IconButton onTouchTap={this._addMonth} tooltip="下一月">
                        <Right color="#FFC107" hoverColor="#FF6F00"/>
                    </IconButton>
                    <IconButton onTouchTap={this._refresh} tooltip="返回今天">
                        <Refresh color="#FFC107" hoverColor="#FF6F00"/>
                    </IconButton>
                    <IconButton onTouchTap={this._quitApp} tooltip="退出日历">
                        <Quit color="#FFC107" hoverColor="#FF6F00"/>
                    </IconButton>
                    <IconMenu
                        iconButtonElement={<IconButton><More/></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="關於" onTouchTap={this.aboutDialogOpen}/>
                        <MenuItem primaryText="注冊" onTouchTap={this.zhuceDialogOpen}/>
                    </IconMenu>
                    <Dialog
                        open={this.state.aboutDialog}
                        onRequestClose={this.aboutDialogClose}
                        actions={aboutDialogAction}
                        title="關於這個日歷"
                    >
                        <p>開發者：華師某單身狗</p>
                        <p>開發目的：2016年大一暑假作業</p>
                        <p>了解更多，請訪問我這個破站：goushi.me</p>
                    </Dialog>
                    <Dialog
                        open={this.state.zhuceDialog}
                        onRequestClose={this.zhuceDialogClose}
                        actions={zhuceDialogAction}
                        title="打開新世界的大門"
                    >
                        <p>只需要向我的支付寶賬號充值100軟妹幣！</p>
                        <p>即可成爲黃金VIP會員！</p>
                        <p>想要知道我的支付寶賬號？</p>
                        <p>去打開新世界的大門吧！</p>
                    </Dialog>
                </ToolbarGroup>
            </Toolbar>
        );
    },

    _minusYear: function () {
        Action.minusYear();
    },

    _addYear: function () {
        Action.addYear();
    },

    _changeYear: function (event) {
        var value = parseInt(event.target.value || 0);
        if (value < rangeConstant.MIN_YEAR || value > rangeConstant.MAX_YEAR)
            return;
        var activeDay = this.props.activeDay;
        activeDay.year = value;
        Action.changeDay(activeDay);
    },

    _minusMonth: function () {
        Action.minusMonth();
    },

    _addMonth: function () {
        Action.addMonth();
    },

    _changeMonth: function (event) {
        var value = parseInt(event.target.value || 0);
        if (value < rangeConstant.MIN_MONTH || value > rangeConstant.MAX_MONTH)
            return;
        var activeDay = this.props.activeDay;
        activeDay.month = value;
        Action.changeDay(activeDay);
    },

    _refresh: function(){
        Action.refresh()
    },

    _quitApp: function(){
        Action.quitApp();
    }
});

module.exports = DateController;
