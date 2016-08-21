/**
 * Created by gou4shi1 on 16-8-17.
 */

var React = require('react');
var DialogStore = require('../stores/dialog-store');
var ConfigStore = require('../stores/config-store');
var DialogAction = require('../actions/dialog-actions');
var CalendarAction = require('../actions/calendar-actions');
var ConfigAction = require('../actions/config-actions');
var RANGE = require('../constants/calendar-range');
var COLOR = require('../constants/calendar-color');
var ipc =  electronRequire('electron').ipcRenderer;

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {IconButton, FlatButton, RaisedButton} from 'material-ui';
import {IconMenu, MenuItem} from 'material-ui';
import {TextField, Dialog, Toggle} from 'material-ui';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Quit from 'material-ui/svg-icons/action/power-settings-new';
import More from 'material-ui/svg-icons/navigation/more-vert';
import Note from 'material-ui/svg-icons/notification/event-note';
import Save from 'material-ui/svg-icons/content/save'

var DateController = React.createClass({
    getInitialState: function () {
        return {
            noteDialog: DialogStore.getNote(),
            optionDialog: DialogStore.getOption(),
            aboutDialog: DialogStore.getAbout(),
            registerDialog: DialogStore.getRegister(),
            note: this.props.activeDay.note,
            alwaysOnTop: ConfigStore.getAlwaysOnTop()
        };
    },

    componentDidMount: function () {
        DialogStore.addCloseDialogListener(this.closeAllDialog);
        ipc.on('app-hide', function () {
            DialogAction.closeDialog();
        })
    },

    openDialog: function (name) {
        if (name == 'note')
            this.setState({
                note: this.props.activeDay.note,
                [name + 'Dialog']: true
            });
        else if (name == 'option')
            this.setState({
                alwaysOnTop: ConfigStore.getAlwaysOnTop(),
                [name + 'Dialog']: true
            });
        else
            this.setState({
                [name + 'Dialog']: true
            });
    },

    closeDialog: function (name) {
        if (name == 'note')
            this.setState({
                [name + 'Dialog']: false,
                note: this.props.activeDay.note
            });
        else if (name == 'option')
            this.setState({
                [name + 'Dialog']: false,
                alwaysOnTop: ConfigStore.getAlwaysOnTop()
            });
        else
            this.setState({
                [name + 'Dialog']: false
            });
    },

    closeAllDialog: function () {
        this.setState({
            noteDialog: false,
            optionDialog: false,
            aboutDialog: false,
            registerDialog: false
        });
    },

    handleToggle: function (event, toggled) {
        this.setState({
            [event.target.name]: toggled
        });
    },

    changeNote: function (event) {
        this.setState({
            note: event.target.value
        });
    },

    render: function () {
        var activeDay = this.props.activeDay;

        var noteDialogActions = [
            <RaisedButton
                label='保存'
                primary={true}
                icon={<Save/>}
                onTouchTap={this._saveNote}
            />,
            <FlatButton
                label='關閉'
                primary={true}
                onTouchTap={this.closeDialog.bind(this, 'note')}
            />
        ];
        var optionDialogActions = [
            <RaisedButton
                label='保存'
                primary={true}
                icon={<Save/>}
                onTouchTap={this._saveOption}
            />,
            <FlatButton
                label='關閉'
                primary={true}
                onTouchTap={this.closeDialog.bind(this, 'option')}
            />
        ];
        var aboutDialogActions = [
            <FlatButton
            label='關閉'
            primary={true}
            onTouchTap={this.closeDialog.bind(this, 'about')}
            />
        ];
        var registerDialogActions = [
            <FlatButton
                label='打開新世界的大門'
                primary={true}
                disabled={true}
            />,
            <FlatButton
                label='關閉新世界的大門'
                primary={true}
                onTouchTap={this.closeDialog.bind(this, 'register')}
            />
        ];

        var styles = {
            dateController: {
                background: COLOR.dateController.background
            },
            yearField: {
                width: 40
            },
            monthField: {
                width: 18
            }
        };

        return (
            <Toolbar style={styles.dateController}>
                <ToolbarGroup firstChild={true}>
                    <IconButton onTouchTap={this._minusYear} tooltip='上一年'>
                        <Left color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                    <TextField
                        onChange={this._changeYear}
                        hintText={activeDay.year}
                        style={styles.yearField}
                    />
                    <IconButton onTouchTap={this._addYear} tooltip='下一年'>
                        <Right color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                    <IconButton onTouchTap={this._minusMonth} tooltip='上一月'>
                        <Left color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                    <TextField
                        onChange={this._changeMonth}
                        hintText={activeDay.month}
                        style={styles.monthField}
                    />
                    <IconButton onTouchTap={this._addMonth} tooltip='下一月'>
                        <Right color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                    <IconButton onTouchTap={this._refresh} tooltip='返回今天'>
                        <Refresh color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                    <IconButton onTouchTap={this.openDialog.bind(this, 'note')} tooltip='记事本'>
                        <Note color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                    <IconButton onTouchTap={this._quitApp} tooltip='退出日历'>
                        <Quit color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                    </IconButton>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <More color={COLOR.dateController.color} hoverColor={COLOR.dateController.hoverColor}/>
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText='設置' onTouchTap={this.openDialog.bind(this, 'option')}/>
                        <MenuItem primaryText='關於' onTouchTap={this.openDialog.bind(this, 'about')}/>
                        <MenuItem primaryText='注冊' onTouchTap={this.openDialog.bind(this, 'register')}/>
                    </IconMenu>
                    <Dialog
                        open={this.state.noteDialog}
                        onRequestClose={this.closeDialog.bind(this, 'note')}
                        actions={noteDialogActions}
                        title={activeDay.year + '.' + activeDay.month + '.' + activeDay.day}
                    >
                        <textarea
                            cols={66}
                            rows={8}
                            type='text'
                            value={this.state.note}
                            onChange={this.changeNote}
                            placeholder='请在此输入。。。'
                        />
                    </Dialog>
                    <Dialog
                        open={this.state.optionDialog}
                        onRequestClose={this.closeDialog.bind(this, 'option')}
                        actions={optionDialogActions}
                        title='來自東方的神祕力量'
                    >
                        <Toggle
                            name='alwaysOnTop'
                            label='窗口總在最上'
                            toggled={this.state.alwaysOnTop}
                            onToggle={this.handleToggle}
                        />
                        <Toggle
                            label='打開新世界的大門'
                            defaultToggled={false}
                            disabled={true}
                        />
                    </Dialog>
                    <Dialog
                        open={this.state.aboutDialog}
                        onRequestClose={this.closeDialog.bind(this, 'about')}
                        actions={aboutDialogActions}
                        title='關於這個日歷'
                    >
                        <p>開發者：華師某單身狗</p>
                        <p>開發目的：2016年大一暑假作業</p>
                        <p>了解更多，請訪問我這個破站：goushi.me</p>
                    </Dialog>
                    <Dialog
                        open={this.state.registerDialog}
                        onRequestClose={this.closeDialog.bind(this, 'register')}
                        actions={registerDialogActions}
                        title='新世界的大門'
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
        CalendarAction.minusYear();
    },

    _addYear: function () {
        CalendarAction.addYear();
    },

    _changeYear: function (event) {
        var value = parseInt(event.target.value || 0);
        if (value < RANGE.MIN_YEAR || value > RANGE.MAX_YEAR)
            return;
        var activeDay = this.props.activeDay;
        activeDay.year = value;
        CalendarAction.changeDay(activeDay);
    },

    _minusMonth: function () {
        CalendarAction.minusMonth();
    },

    _addMonth: function () {
        CalendarAction.addMonth();
    },

    _changeMonth: function (event) {
        var value = parseInt(event.target.value || 0);
        if (value < RANGE.MIN_MONTH || value > RANGE.MAX_MONTH)
            return;
        var activeDay = this.props.activeDay;
        activeDay.month = value;
        CalendarAction.changeDay(activeDay);
    },

    _refresh: function(){
        CalendarAction.refresh();
    },

    _saveNote: function () {
        CalendarAction.changeNote(this.props.activeDay, this.state.note.substr(0,140));
    },

    _saveOption: function () {
        ConfigAction.setAlwaysOnTop(this.state.alwaysOnTop);
    },

    _quitApp: function(){
        CalendarAction.quitApp();
    }
});

module.exports = DateController;
