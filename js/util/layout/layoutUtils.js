define(['lodash'], function (_) {
    'use strict';

    var MENU_PADDING = 20;
    var DEFAULT_WIDTH = 402;
    var RIGHT_SIDE_WIDTH = 288;

    function getMenuWidth() {
        var appWidth = Wix.Utils.getWidth() || DEFAULT_WIDTH;
        var menuWidth = appWidth - RIGHT_SIDE_WIDTH;
        return menuWidth - MENU_PADDING + 'px';
    }

    function addXYOffsetsToLayout(layout, offsets) {
        offsets = _(offsets).defaults({x: 0, y: 0}).pick(['x', 'y']).value();

        var newLayout = _.assign({}, layout, {x: layout.x + offsets.x, y: layout.y + offsets.y});
        return newLayout;
    }

    function areAllNumbers(values) {
        return _.every(values, _.isFinite);
    }

    function isLayoutContainedWithinRect(layout, rectLayout) {
        return layout.x >= rectLayout.x &&
            layout.x + layout.width <= rectLayout.x + rectLayout.width &&
            layout.y >= rectLayout.y &&
            layout.y + layout.height <= rectLayout.y + rectLayout.height;
    }

    function getLayoutsXYDiff(layout1, layout2) {
        layout1 = _.pick(layout1, ['x', 'y']);
        layout2 = _.pick(layout2, ['x', 'y']);

        var diff = {};

        if (areAllNumbers([layout1.x, layout2.x])) {
            diff.x = layout1.x - layout2.x;
        }

        if (areAllNumbers([layout1.y, layout2.y])) {
            diff.y = layout1.y - layout2.y;
        }

        return diff;
    }

    return {
        addXYOffsetsToLayout: addXYOffsetsToLayout,
        getLayoutsXYDiff: getLayoutsXYDiff,
        isLayoutContainedWithinRect: isLayoutContainedWithinRect,
        getMenuWidth: getMenuWidth
    };


});