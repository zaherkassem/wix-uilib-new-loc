define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    function scopeTreeViewTreeNodeContentHasChildren1() {
        var TreeView = this.getTreeViewClass();
        var TreeNodeContent = this.props.nodeContent;
        var hasChildren = this.hasChildren();
        return React.createElement('li', {
            'className': _.keys(_.pickBy({
                'tree-collapsed': this.state.collapsed,
                'has-children': this.hasChildren(),
                'pages-tree-node': true
            }, _.identity)).join(' ')
        }, React.createElement('span', {
            'className': 'expander',
            'onClick': this.toggleCollapsed
        }, hasChildren && this.state.collapsed ? React.createElement(symbols.symbol, {
            'key': 'expand',
            'name': 'expand'
        }) : null, !this.state.collapsed ? React.createElement(symbols.symbol, {
            'key': 'collapse',
            'name': 'collapse'
        }) : null), React.createElement(TreeNodeContent, this.passNodeContentProps(this.props.dataSource)), React.createElement(TreeView, this.passNodeProps()));
    }
    return function () {
        return scopeTreeViewTreeNodeContentHasChildren1.apply(this, []);
    };
});