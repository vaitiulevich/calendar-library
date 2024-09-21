'use strict';

var React = require('react');

var Button = function (_a) {
    _a.type; var textColor = _a.textColor; _a.size; var onClick = _a.onClick, label = _a.label;
    return (React.createElement("button", { type: "button", style: textColor ? { color: textColor } : {}, onClick: onClick }, label));
};

exports.Button = Button;
//# sourceMappingURL=index.js.map
