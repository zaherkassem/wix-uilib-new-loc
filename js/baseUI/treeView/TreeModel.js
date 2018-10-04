define(['baseUI/treeView/Path', 'baseUI/treeView/treeUtils'], function (Path, treeUtils) {
    'use strict';

    // TODO: move into TreeModel instance, because this is horrible
    var CSS_CLASSES = {
        treeClass: '',
        treeNodeClass: '',
        treeNodeLabelClass: '',
        collapsedClass: '',
        cantBeChildClass: ''
    };

    function initCssClasses(options) {
        CSS_CLASSES.treeClass = options.treeClass;
        CSS_CLASSES.treeNodeClass = options.treeNodeClass;
        CSS_CLASSES.treeNodeLabelClass = options.treeNodeLabelClass;
        CSS_CLASSES.collapsedClass = options.collapsedClass;
        CSS_CLASSES.previewClass = options.previewClass;
        CSS_CLASSES.cantBeChildClass = options.cantBeChildClass;
    }

    function isTree(dom) {
        return treeUtils.hasClass(dom, CSS_CLASSES.treeClass);
    }

    function isTreeNode(dom) {
        return treeUtils.hasClass(dom, CSS_CLASSES.treeNodeClass);
    }

    function isCollapsed(dom) {
        return treeUtils.hasClass(dom, CSS_CLASSES.collapsedClass);
    }

    function cantBeChild(dom){
        return treeUtils.hasClass(dom, CSS_CLASSES.cantBeChildClass);
    }

    /**
     * TreeModel
     *
     * @constructor
     * @param {HTMLDomElement} dom
     * @param options
     */
    function TreeModel(dom, options) {
        initCssClasses(options);

        this.dom = dom;
        this.children = [];
        this.refresh();
    }

    TreeModel.prototype.getChildHeight = function () {
        var child = this.children[0],
            label = child && child.getLabel(),
            rect = label && label.getBoundingClientRect();

        return rect ? Math.round(rect.height * 1.15) : NaN;
    };

    TreeModel.prototype.refresh = function () {
        if (this.dom) {
            this.children = getChildren(this.dom);
        }
    };

    function findPathByDom(parent, dom, path) {
        return parent.children.reduce(function (result, child, index) {
            if (result) {
                return result;
            }

            if (child.dom === dom) {
                return path.concat(index);
            }

            return findPathByDom(child, dom, path.concat(index));
        }, null);
    }

    /**
     * attachPath
     *
     * @param {ChildInfo} childInfo
     * @param {Path} path
     * @return {ChildInfo} the same child with path attached
     */
    function attachPath(childInfo, path) {
        if (childInfo) {
            childInfo.path = path;
        }

        return childInfo;
    }

    TreeModel.prototype.findByDom = function (li) {
        if (this.dom === li) {
            return attachPath(this, new Path());
        }

        var path = findPathByDom(this, li, []);

        if (Array.isArray(path)) {
            path = new Path(path);

            var child = this.findByPath(path);
            return attachPath(child, path);
        }

        return null;
    };

    TreeModel.prototype.findByPath = function (path) {
        var child = path.findIn(this, 'children') || null;
        return attachPath(child, path);
    };

    TreeModel.prototype.findParentTree = function (path) {
        var parent = this.findByPath(path.parent());

        if (parent && !isTree(parent.dom)) {
            return parent.dom.getElementsByClassName(CSS_CLASSES.treeClass)[0] || null;
        }

        return parent && parent.dom;
    };

    function getIndex(collection, item) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === item) {
                return i;
            }
        }

        return -1;
    }

    TreeModel.prototype.insert = function (el, path) {
        var parent = this.findParentTree(path),
            index = getIndex(parent.children, el),
            toIndex = path.atRight(),
            offset = index >= 0 && index < toIndex ? 1 : 0,
            child = parent && parent.children[toIndex + offset];

        if (index === toIndex) {
            return;
        }

        if (child) {
            parent.insertBefore(el, child);
        } else {
            parent.appendChild(el);
        }

        this.refresh();
    };

    function ChildInfo(li) {
        var tree = li.getElementsByClassName(CSS_CLASSES.treeClass)[0];

        this.dom = li;
        this.path = undefined;
        this.children = getChildren(tree);
    }

    ChildInfo.prototype.getLabel = function () {
        var label = this.dom.getElementsByClassName(CSS_CLASSES.treeNodeLabelClass)[0];

        if (label && label.parentNode !== this.dom) {
            return null;
        }

        return label;
    };

    ChildInfo.prototype.hasChildren = function () {
        return this.children && this.children.length > 0;
    };

    ChildInfo.prototype.cantBeChild = function () {
        return this.hasChildren() || cantBeChild(this.dom);
    };

    ChildInfo.prototype.isCollapsed = function () {
        return this.hasChildren() && isCollapsed(this.dom);
    };

    ChildInfo.prototype.getFirstInsertPosition = function () {
        if (this.isCollapsed()) {
            return this.getLastInsertPosition();
        }

        return 0;
    };

    ChildInfo.prototype.getLastInsertPosition = function (strict) {
        if (strict) {
            return Math.max(0, this.children.length - 1);
        }

        return this.children.length;
    };

    function getChildInfo(li) {
        return new ChildInfo(li);
    }

    function getChildren(ul) {
        var children;

        if (ul && ul.children && ul.children.length > 0) {
            children = Array.prototype.slice.call(ul.children);
            return children.filter(isTreeNode).map(getChildInfo);
        }

        return [];
    }

    return TreeModel;
});
