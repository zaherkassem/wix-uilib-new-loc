define([
    'react-dom',
    'react',
    'jquery',
    'lodash',
    'baseUI/treeView/treeUtils',
    'baseUI/treeView/NodeState',
    'baseUI/treeView/TreeModel',
    'baseUI/treeView/HierarchicalDragAlgorithm'
], function(
    ReactDOM,
    React,
    $,
    _,
    treeUtils,
    NodeState,
    TreeModel,
    HierarchicalDragAlgorithm) {
    'use strict';

    var TreeDocker = React.createClass({
        displayName: 'treeDocker',
        propTypes: {
            treeClass: React.PropTypes.string.isRequired,
            treeNodeClass: React.PropTypes.string.isRequired,
            treeNodeLabelClass: React.PropTypes.string.isRequired,
            collapsedClass: React.PropTypes.string.isRequired,
            draggedClass: React.PropTypes.string.isRequired,
            previewClass: React.PropTypes.string.isRequired,
            cantBeChildClass: React.PropTypes.string,
            className: React.PropTypes.string,
            scrollTopGetter: React.PropTypes.func,
            onNodeMoved: React.PropTypes.func
        },
        componentDidMount: function () {
            var root = ReactDOM.findDOMNode(this);
            var ul = root.getElementsByTagName('ul')[0];

            this.algorithm = new HierarchicalDragAlgorithm({
                root: root,
                tree: new TreeModel(ul, {
                    treeClass: this.props.treeClass,
                    treeNodeClass: this.props.treeNodeClass,
                    treeNodeLabelClass: this.props.treeNodeLabelClass,
                    collapsedClass: this.props.collapsedClass,
                    draggedClass: this.props.draggedClass,
                    previewClass: this.props.previewClass,
                    cantBeChildClass: this.props.cantBeChildClass
                })
            });
        },
        componentWillUnmount: function () {
            this.dragData = null;
            this.algorithm = null;
        },
        render: function () {
            var newProps = {
                className: this.props.className
            };

            if (this.props.isDragAvailable){
                newProps.onMouseDown = this.startDrag;
                newProps.onDragStart = this.nativeDragStart;
            }

            return React.createElement('div', newProps, this.props.children);
        },

        nativeDragStart: function(e){
            e.preventDefault();
            e.stopPropagation();
        },

        startDrag: function(e) {
            $(document.body).addClass('block-selection');
            var doc = $(document);
            doc.off('mousemove', this.onMouseMove);
            doc.off('mouseup', this.onMouseUp);

            var root = ReactDOM.findDOMNode(this),
                label = this.findLabel(e.target, root),
                draggedNode,
                initialState;

            this.dragData = null;
            this.removeGhostElements(root);

            if (label) {
                draggedNode = this.findListItem(label);
                draggedNode.classList.remove(this.props.previewClass);
                initialState = new NodeState(draggedNode);

                this.dragData = {
                    root: root,
                    clickedLabel: label,
                    draggedNode: draggedNode,
                    initialState: initialState,
                    ghostElement: null,
                    sx: e.clientX,
                    sy: e.clientY,
                    nx: NaN,
                    ny: NaN
                };

                this.algorithm.setInitialPosition(
                    draggedNode, this.dragData.sx, this.dragData.sy + this.getScrollTop()
                );

                doc.on('mousemove', this.onMouseMove);
                doc.on('mouseup', this.onMouseUp);
            }
        },
        removeGhostElements: function (container) {
            var ghostClass = this.props.draggedClass;
            container = container || ReactDOM.findDOMNode(this);

            treeUtils.forEachChild(container, function (el) {
                if (treeUtils.hasClass(el, ghostClass)) {
                    container.removeChild(el);
                }
            });
        },
        findLabel: function (bottomEl, root) {
            function isRoot(el) { return el === root; }
            return treeUtils.searchUp(bottomEl, this.isTreeLabel, isRoot, this);
        },
        findListItem: function (bottomEl, root) {
            function isRoot(el) { return el === root; }
            return treeUtils.searchUp(bottomEl, this.isTreeItem, isRoot, this);
        },
        insertGhostElement: function (nodeToCopy, container) {
            var ghostClass = this.props.draggedClass;

            return insertGhostElement(
                nodeToCopy,
                container || ReactDOM.findDOMNode(this),
                ghostClass
            );
        },
        onMouseMove: function (e) {
            if (!this.dragData) {
                return;
            }

            var data = this.dragData;

            if (!data.ghostElement) {
                this.startDragIfNeeded(e);
            }

            if (data.ghostElement) {
                this.processDragMove(e);

                // TODO: get the minimum and maximum of the horizontal drag as a parameter
                data.ghostElement.style.left = Math.min(44, Math.max(data.nx, 10)) + 'px';
                data.ghostElement.style.top = Math.min(data.root.offsetHeight + 10, Math.max(-5, data.ny)) + 'px';
            }
        },
        startDragIfNeeded: function (e) {
            var data = this.dragData;
            var distance = treeUtils.getManhattanDistance(data.sx, data.sy, e.clientX, e.clientY);

            if (distance > 5) {
                data.ghostElement = this.insertGhostElement(data.clickedLabel, data.root);
                data.draggedNode.classList.add(this.props.previewClass);
                data.nx = parseInt(data.ghostElement.style.left, 10);
                data.ny = parseInt(data.ghostElement.style.top, 10);
            }
        },
        getScrollTop: function() {
            return (this.props.scrollTopGetter && this.props.scrollTopGetter()) || 0;
        },
        processDragMove: function (e) {
            var data = this.dragData;

            data.nx += (e.clientX - data.sx);
            data.ny += (e.clientY - data.sy);
            data.sx = e.clientX;
            data.sy = e.clientY;

            // TODO: get the "-12" value of the X position that smoothes the horizontal drag as a parameter
            this.algorithm.setDragPosition(
                e.clientX - 12,
                e.clientY + this.getScrollTop()
            );
        },
        onMouseUp: function (e) {
            if (!this.dragData) {
                return;
            }

            var wasDragged = Boolean(this.dragData.ghostElement);

            if (wasDragged) {
                this.processDragMove(e);
            }

            this.removeGhostElements();
            this.dragData.initialState.restore();

            if (wasDragged) {
                this.processDragEnd();
            }

            this.dragData = null;
            var doc = $(document);
            $(document.body).removeClass('block-selection');
            doc.off('mousemove', this.onMouseMove);
            doc.off('mouseup', this.onMouseUp);
        },
        processDragEnd: function () {
            if (typeof this.props.onNodeMoved !== 'function') {
                return;
            }

            var algo = this.algorithm,
                tree = algo.tree,
                node = algo.draggedNode,
                nodeElement = node.dom,
                parentPath = node.path.parent(),
                parentElement = tree.findByPath(parentPath).dom,
                positionInParent = node.path.atRight(),
                onNodeMoved = this.props.onNodeMoved,
                pathFrom,
                pathTo;

            tree.refresh();
            pathFrom = tree.findByDom(nodeElement).path;
            pathTo = tree.findByDom(parentElement).path;
            pathTo = pathTo.append(positionInParent);

            if (!pathFrom.equalsTo(pathTo)) {
                onNodeMoved({ from: pathFrom, to: pathTo });
            }
        },
        isTreeItem: function (el) {
            return treeUtils.hasClass(el, this.props.treeNodeClass);
        },
        isTreeLabel: function (el) {
            return treeUtils.hasClass(el, this.props.treeNodeLabelClass);
        }
    });

    function insertGhostElement(nodeToCopy, container, ghostClass) {
        var dr = treeUtils.calculateRelativePosition(container, nodeToCopy);
        var clonedLabel = nodeToCopy.cloneNode(true);
        var clonedParent = nodeToCopy.parentNode.cloneNode(false);

        clonedParent.classList.add(ghostClass);
        clonedParent.appendChild(clonedLabel);
        treeUtils.stripReactIds(clonedLabel);
        treeUtils.stripReactIds(clonedParent);
        treeUtils.resize(clonedLabel, dr);
        treeUtils.positionate(clonedParent, dr);

        container.appendChild(clonedParent);
        return clonedParent;
    }

    return TreeDocker;
});
