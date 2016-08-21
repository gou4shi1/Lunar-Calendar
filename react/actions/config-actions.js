/**
 * Created by gou4shi1 on 16-8-21.
 */

var Dispatcher = require('../dispatchers/dispatcher');
var TYPE = require('../constants/action-type');

var ConfigAction = {
    setAlwaysOnTop: function (value) {
        Dispatcher.dispatch({
            actionType: TYPE.ALWAYS_ON_TOP,
            value: value
        });
    },
};

module.exports = ConfigAction;
