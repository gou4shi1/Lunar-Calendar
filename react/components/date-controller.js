/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require("react");
var Action = require("../actions/calendar-actions");

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {IconButton, IconMenu, MenuItem, TextField} from 'material-ui'
import Left from 'material-ui/svg-icons/navigation/chevron-left'
import Right from 'material-ui/svg-icons/navigation/chevron-right'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Quit from 'material-ui/svg-icons/action/power-settings-new'
import More from 'material-ui/svg-icons/navigation/more-vert';

var DateController = React.createClass({
    render: function () {
        var activeDay = this.props.activeDay;

        return (
            <Toolbar className="dateController">
                <ToolbarGroup firstChild={true}>
                    <IconButton onTouchTap={this._minusYear}><Left/></IconButton>
                    <TextField hintText={activeDay.year} style={{width: 40}}/>
                    <IconButton onTouchTap={this._addYear}><Right/></IconButton>
                    <IconButton onTouchTap={this._minusMonth}><Left/></IconButton>
                    <TextField hintText={activeDay.month} style={{width: 17}}/>
                    <IconButton onTouchTap={this._addMonth}><Right/></IconButton>
                    <IconButton onTouchTap={this._refresh}><Refresh/></IconButton>
                    <IconButton onTouchTap={this._quitApp}><Quit/></IconButton>
                    <IconMenu
                        iconButtonElement={<IconButton><More/></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Help" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
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
