define(['baseUI/treeView/DragVector'], function (DragVector) {
    'use strict';

    function HierarchicalDragAlgorithm(options) {
        this.root = options.root;
        this.tree = options.tree;
        this.draggedNode = null;
        this.threshold = {
            dx: NaN,
            dy: NaN
        };

        this.x0 = NaN;
        this.y0 = NaN;
        this.x1 = NaN;
        this.y1 = NaN;
    }

    HierarchicalDragAlgorithm.prototype.setInitialPosition = function (draggedNode, x0, y0) {
        this.tree.refresh();
        this.threshold = {
            dx: 23,
            dy: 0.5 * this.tree.getChildHeight()
        };
        this.draggedNode = this.tree.findByDom(draggedNode);

        var depth = this.draggedNode.path.length() - 1;
        this.x0 = x0 - (1 + depth * this.threshold.dx) + this.root.scrollLeft;
        this.y0 = y0 + this.root.scrollTop;
        this.x1 = NaN;
        this.y1 = NaN;
    };

    HierarchicalDragAlgorithm.prototype.setDragPosition = function (x1, y1) {
        this.x1 = x1 + this.root.scrollLeft;
        this.y1 = y1 + this.root.scrollTop;

        this.updateLayout();
    };

    HierarchicalDragAlgorithm.prototype.applyDragVector = function (vector) {
        var tree = this.tree;
        var currentPath = this.draggedNode.path;
        var cantBeChild = this.draggedNode.cantBeChild();
        var depth0 = currentPath.length() - 1;
        var depth1 = cantBeChild ? depth0 : minMax(0, depth0 + vector.depth, 1);
        var newPath = currentPath.inc(vector.position);
        var newNode = tree.findByPath(newPath);

        if (newNode && newNode.hasChildren() && !newNode.isCollapsed()) {

            if (cantBeChild) {
                return newPath;
            }

            if (vector.position > 0) {
                newPath = newPath.append(newNode.getFirstInsertPosition());
            }

            if (vector.position < 0) {
                newPath = newPath.append(newNode.getLastInsertPosition());
            }
        }

        if (!newNode && depth0 === 0) {
            newPath = currentPath;
        }

        if (!newNode && depth0 > 0) {
            newPath = currentPath.parent().inc(vector.position);
            newNode = tree.findByPath(newPath);

            if (newNode && vector.position > 0) {
                newPath = newPath.append(newNode.getFirstInsertPosition());
            } else if (newNode && vector.position < 0) {
                newPath = newPath.append(newNode.getLastInsertPosition());
            } else if (vector.position < 0) {
                newPath = newPath.inc();
            } else {
                newPath = currentPath;
            }
        }

        if (depth1 > depth0 && newPath.length() === 1) {
            newNode = tree.findByPath(newPath.dec(1));

            if (newNode && !newNode.path.equalsTo(currentPath)) {
                newPath = newNode.path.append(newNode.children.length);
            }
        }

        if (depth1 < depth0 && newPath.length() === 2) {
            var posMax = tree.findByPath(newPath.parent()).getLastInsertPosition(true);

            if (newPath.atRight() === posMax) {
                return newPath.parent().inc();
            }
        }

        return newPath;
    };

    HierarchicalDragAlgorithm.prototype.updateLayout = function () {
        var vector = getDragVector(this);

        if (vector.isZero()) {
            return;
        }

        var draggedNode = this.draggedNode;
        var newPath = this.applyDragVector(vector);

        if (!newPath.equalsTo(draggedNode.path)) {
            if (newPath.length() === draggedNode.path.length()) {
                vector.depth = 0; // small hack
            }

            var rect0 = draggedNode.dom.getBoundingClientRect();
            this.tree.insert(draggedNode.dom, newPath);
            this.draggedNode = this.tree.findByDom(draggedNode.dom);
            var rect1 = draggedNode.dom.getBoundingClientRect();

            this.x0 += Math.abs(vector.depth) * (rect1.left - rect0.left);
            this.y0 += Math.abs(vector.position) * (rect1.top - rect0.top);

        }
    };

    function getDragVector(algo) {
        var dx = algo.x1 - algo.x0,
            dy = algo.y1 - algo.y0,
            depth = parseInt(dx / algo.threshold.dx, 10),
            position = parseInt(dy / algo.threshold.dy, 10);

        return new DragVector(
            minMax(-1, depth, 1),
            minMax(-1, position, 1)
        );
    }

    function minMax(min, value, max) {
        return Math.max(min, Math.min(value, max));
    }

    return HierarchicalDragAlgorithm;
});
