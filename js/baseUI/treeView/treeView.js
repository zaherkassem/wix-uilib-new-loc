define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'baseUI/treeView/treeView.rt', 'baseUI/treeView/treeNode.rt'], function (React, _, inputMixin, defaultTreeViewTemplate, defaultTreeNodeTemplate) {
    'use strict';

    function getDefaultProps() {
        return {
            nodePath: [],
            dataSource: [],
            collapsedSelector: null,
            childrenSelector: 'items',
            nodeTemplate: defaultTreeNodeTemplate,
            treeTemplate: defaultTreeViewTemplate,
            openSettings: function() {}
        };
    }

    function continuePath(nodePath, nodeIndex) {
        if (nodeIndex === undefined) {
            return nodePath;
        }

        return nodePath.concat(nodeIndex);
    }

    function passNodeProps(nodeData, nodeIndex) {
        var self = this;
        var nodeProps = _(self.props).omit(['selected', 'isRoot']).extend({
            dataSource: nodeData || self.getChildren(),
            nodePath: continuePath(self.props.nodePath, nodeIndex)
        }).extend(
            nodeData && nodeData.id && { key: nodeData.id }
        ).value();

        return nodeProps;
    }

    function passNodeContentProps(nodeData) {
        var self = this;
        var nodeProps = _(self.props).omit(['selected', 'isRoot']).extend({
            dataSource: nodeData,
            isSelected: this.isSelected(),
            setSelected: this.setSelected
        }).extend(
            nodeData && nodeData.id && { key: nodeData.id }
        ).value();

        return nodeProps;
    }

    function isSelected() {
        var self = this,
            a = self.props.dataSource,
            b = self.getValueFromProps(),
            key,
            comparer;

        if (self.props.valueProperty) {
            key = self.props.valueProperty;
            return Boolean(a && b && a[key] === b[key]);
        }

        if (self.props.equalityComparer) {
            comparer = self.props.equalityComparer;
            return Boolean(comparer(a, b));
        }

        return a === b;
    }

    function applySelector(dataSource, selector, context) {
        if (typeof selector === 'string') {
            return dataSource[selector];
        }

        if (typeof selector === 'function') {
            return selector.call(context, dataSource);
        }
    }

    function getChildren(dataSource, component) {
        if (Array.isArray(dataSource)) {
            return dataSource;
        }

        return applySelector(dataSource, component.props.childrenSelector, component) || [];
    }

    function isCollapsed(dataSource, component) {
        return Boolean(applySelector(dataSource, component.props.collapsedSelector, component));
    }

    var TreeNode = React.createClass({
        displayName: 'treeNode',
        mixins: [inputMixin],
        getInitialState: function () {
            return {
                selected: false,
                collapsed: isCollapsed(this.props.dataSource, this)
            };
        },
        isSelected: isSelected,
        getDefaultProps: getDefaultProps,
        passNodeProps: passNodeProps,
        passNodeContentProps: passNodeContentProps,
        getChildren: function () {
            return getChildren(this.props.dataSource, this);
        },
        hasChildren: function () {
            return this.getChildren().length >= 1;
        },
        componentWillReceiveProps: function (nextProps) {
            var newCollapsed = isCollapsed(nextProps.dataSource, this);

            if (this.state.collapsed !== newCollapsed) {
                this.setState({ collapsed: newCollapsed });
            }
        },
        toggleCollapsed: function (e) {
            var newValue = !this.state.collapsed;

            if (this.props.onNodeToggled) {
                this.props.onNodeToggled(this, newValue);
            }

            this.setState({ collapsed: newValue });

            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        setSelected: function (e) {
            this.setState({ selected: true });
            this.callOnChangeIfExists(this.props.dataSource);

            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        render: function () {
            return this.props.nodeTemplate.call(this);
        },
        getTreeViewClass: function () {
            return TreeView;
        }
    });

    var TreeView = React.createClass({
        displayName: 'treeView',
        mixins: [inputMixin],
        render: function () {
            return this.props.treeTemplate.call(this);
        },
        getDefaultProps: getDefaultProps,
        passNodeProps: passNodeProps,
        getChildren: function () {
            return getChildren(this.props.dataSource, this);
        },
        getTreeNodeClass: function () {
            return TreeNode;
        }
    });

    return TreeView;
});
