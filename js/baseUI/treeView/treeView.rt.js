define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatChild1(TreeNode, children, child, childIndex) {
        return React.createElement(TreeNode, this.passNodeProps(child, childIndex));
    }
    function scopeTreeNodeChildren2() {
        var TreeNode = this.getTreeNodeClass();
        var children = this.getChildren();
        return React.createElement.apply(this, [
            'ul',
            { 'className': this.props.className + (this.props.isRoot ? 'tree-root' : '') },
            _.map(children, repeatChild1.bind(this, TreeNode, children))
        ]);
    }
    return function () {
        return scopeTreeNodeChildren2.apply(this, []);
    };
});