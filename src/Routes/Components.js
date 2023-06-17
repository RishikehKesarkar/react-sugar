import React from "react";
import jsxElement from "./pages";

export default block => {
    if (typeof jsxElement[block] !== "undefined") {
        return React.createElement(jsxElement[block], {
            block: block
        });
    }
    return React.createElement(
        () => <div>The component {block} has not been created yet.</div>
    );
};
