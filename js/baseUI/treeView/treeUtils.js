define(function () {
    'use strict';

    /**
     * Checks whether (x, y) is inside bounding rect.
     *
     * @param {ClientRect} rect
     * @param {number} x
     * @param {number} y
     * @return {boolean} is the point inside rect?
     */
    function isMouseInside(rect, x, y) {
        return (rect.left <= x) && (x <= rect.right) &&
               (rect.top <= y) && (y <= rect.bottom);
    }

    /**
     * Gets Manhattan distance between two points
     *
     * @param {number} x0
     * @param {number} y0
     * @param {number} x1
     * @param {number} y1
     * @return {number} Dm=|x1-x0|+|y1-y0|
     */
    function getManhattanDistance(x0, y0, x1, y1) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        return dx + dy;
    }

    /**
     * Returns distance from point (x, y) to closest
     * side of bounding rect. If the point is inside,
     * returns 0.
     *
     * @param {ClientRect} rect
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    function getDistanceFromComponent(rect, x, y) {
        if (isMouseInside(rect, x, y)) {
            return 0;
        }

        var d = getOutsideDistance,
            dx = d(rect.left, x, rect.right),
            dy = d(rect.top, y, rect.bottom);

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * If x is outside of [a, b] segment,
     * returns the distance to the closest boundary.
     * Otherwise, returns 0.
     *
     * @param {number} a
     * @param {number} x
     * @param {number} b
     * @return {number}
     */
    function getOutsideDistance(a, x, b) {
        if (x < a) {
            return a - x;
        }

        if (x > b) {
            return b - x;
        }

        return 0;
    }

    /**
     * Removes [data-reactid] attribute from HTML element
     * and all its descendants.
     * @param {HTMLElement} node
     */
    function stripReactIds(node) {
        forEachNode(node, stripReactId);
        return node;
    }

    /**
     * Removes [data-reactid] attribute from HTML element
     *
     * @param {HTMLElement} node
     */
    function stripReactId(node) {
        node.removeAttribute('data-reactid');
    }

    /**
     * Invokes callback on the element passed and
     * on every its descendant also.
     *
     * @param {HTMLElement} node
     * @param {Function} callback
     */
    function forEachNode(node, callback) {
        callback(node);

        var n = node && node.children && node.children.length || 0;

        for (var i = n - 1; i >= 0; i--) {
            forEachNode(node.children[i], callback);
        }
    }

    /**
     * Invokes callback on direct children of the element passed
     *
     * @param {HTMLElement} node
     * @param {Function} callback
     */
    function forEachChild(node, callback) {
        var n = node && node.children && node.children.length || 0;

        for (var i = n - 1; i >= 0; i--) {
            callback(node.children[i]);
        }
    }

    function searchUp(bottomElement, successCondition, failCondition, context) {
        var found = bottomElement;
        failCondition = failCondition || returnFalse;

        while (found) {
            if (successCondition.call(context, found)) {
                return found;
            } else if (failCondition.call(context, found)) {
                break;
            } else {
                found = found.parentElement || found.parentNode; // found.parentNode fixes IE bug SE-5570
            }
        }

        return null;
    }

    function returnFalse() {
        return false;
    }

    /**
     * Adds inline style properties (top, left)
     * accoring to bounding rect
     *
     * @param {HTMLElement} el
     * @param {ClientRect} rect
     * @returns {HTMLElement} the element itself
     */
    function positionate(el, rect) {
        el.style.position = 'absolute';
        el.style.top = px(rect.top);
        el.style.left = px(rect.left);

        return el;
    }

    /**
     * Adds inline style properties (width, height)
     * accoring to bounding rect
     *
     * @param {HTMLElement} el
     * @param {ClientRect} rect
     * @returns {HTMLElement} the element itself
     */
    function resize(el, rect) {
        el.style.width = px(rect.width);
        el.style.height = px(rect.height);

        return el;
    }

    /**
     * Adds 'px' suffix to a number.
     *
     * @param {number} number e.g. 4
     * @returns {string} e.g. '4px'
     */
    function px(number) {
        return number + 'px';
    }

    /**
     * Calculates relative position from child to parent
     * and extracts dimensions of a child.
     *
     * @param {HTMLElement} parent
     * @param {HTMLElement} child
     * @return {ClientRect} - rectangle with child's position (relative to parent) and its dimensions
     */
    function calculateRelativePosition(parent, child) {
        var r0 = parent.getBoundingClientRect(),
            r1 = child.getBoundingClientRect();

        return {
            top: r1.top - r0.top,
            left: r1.left - r0.left,
            right: r0.right - r1.right,
            bottom: r0.bottom - r1.bottom,
            width: r1.width,
            height: r1.height
        };
    }

    /**
     * Returns whether a certain html element has a specific class name
     *
     * @param {HTMLElement} dom
     * @param {string} className
     * @return {boolean}
     */
    function hasClass(dom, className) {
        return dom && className && dom.classList && dom.classList.contains(className);
    }

    return {
        isMouseInside: isMouseInside,
        getManhattanDistance: getManhattanDistance,
        getDistanceFromComponent: getDistanceFromComponent,
        stripReactIds: stripReactIds,
        forEachNode: forEachNode,
        forEachChild: forEachChild,
        hasClass: hasClass,
        searchUp: searchUp,
        positionate: positionate,
        resize: resize,
        calculateRelativePosition: calculateRelativePosition
    };
});
