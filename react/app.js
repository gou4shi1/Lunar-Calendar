/**
 * Created by gou4shi1 on 16-8-14.
 */

React = require("react");
ReactDOM = require("react-dom");

var Hello = React.createClass({
    render: function () {
        return (
            <div>
                Hello,World!
            </div>
        );
    }
});

ReactDOM.render(
    <Hello/>,
    document.body
);
