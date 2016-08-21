/**
 * Created by gou4shi1 on 16-8-21.
 */

var Dispatcher = require('../dispatchers/dispatcher');
var TYPE = require('../constants/action-type');

var DialogAction = {
    closeDialog: function () {
        Dispatcher.dispatch({
            actionType: TYPE.CLOSE_DIALOG
        });
    },
};

module.exports = DialogAction;
