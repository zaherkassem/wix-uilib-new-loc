define([], function () {
    'use strict';

    function NodeState(node) {
        this.node = node;
        this.initialState = {
            parentNode: node.parentNode,
            nextSibling: node.nextSibling,
            className: node.className
        };
    }

    NodeState.prototype.restore = function () {
        var node = this.node,
            state = this.initialState;

        if (node.parentNode !== state.parentNode || node.nextSibling !== state.nextSibling) {
            if (state.nextSibling) {
                state.parentNode.insertBefore(node, state.nextSibling);
            } else {
                state.parentNode.appendChild(node);
            }
        }

        if (node.className !== state.className) {
            node.className = state.className;
        }
    };

    return NodeState;
});
