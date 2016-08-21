/**
 * Created by gou4shi1 on 16-8-21.
 */

var Dispatcher = require('../dispatchers/dispatcher');
var TYPE = require('../constants/action-type');
var EventEmitter = require('events').EventEmitter;
var Assign = require('object-assign');

var DialogStore = Assign({}, EventEmitter.prototype, {
    note: false,
    option: false,
    about: false,
    register: false,

    getNote: function () {
        return this.note;
    },

    getOption: function () {
        return this.option;
    },

    getAbout: function () {
        return this.about;
    },

    getRegister: function () {
        return this.register;
    },

    closeAllDialog: function () {
        this.note = false;
        this.option = false;
        this.about = false;
        this.register = false;
        this.emit(TYPE.CLOSE_DIALOG);
    },

    addCloseDialogListener: function (callback) {
        this.on(TYPE.CLOSE_DIALOG, callback);
    }
});

Dispatcher.register(function (action) {
    if (action.actionType == TYPE.CLOSE_DIALOG)
        DialogStore.closeAllDialog();
});

module.exports = DialogStore;
