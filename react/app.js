/**
 * Created by gou4shi1 on 16-8-14.
 */

var React = require("react");
var ReactDom = require("react-dom");
var MainPanel = require("./components/main-panel");
import InjectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
InjectTapEventPlugin();

ReactDom.render(<MainPanel/>, document.getElementById("app"));
