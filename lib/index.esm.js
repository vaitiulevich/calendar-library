import React from 'react';

var Button = function (_a) {
    _a.type; var textColor = _a.textColor; _a.size; var onClick = _a.onClick, label = _a.label;
    return (React.createElement("button", { type: "button", style: textColor ? { color: textColor } : {}, onClick: onClick }, label));
};

export { Button };
//# sourceMappingURL=index.esm.js.map
